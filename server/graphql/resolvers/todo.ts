import { AuthenticationError } from "apollo-server";
import { Resolver, Mutation, Arg, Query, Args, Ctx } from "type-graphql";
import { Todo } from "../../models/Todo";
import { User, UserModel } from "../../models/User";
import { checkAuth } from "../../utils/checkAuth";
import { EditTodoInput } from "./inputs/todo-input";
import { ObjectID } from "mongodb";

@Resolver()
export default class TodoResolver {
	@Mutation(() => User)
	async addTodo(
		@Arg("title") title: string,
		@Ctx() ctx: { authHeader: string }
	) {
		// I don't know if i need to be authorized to make my own todo but eh
		// Auth error is checked on index.ts
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const todo: Todo = {
					title,
					description: "",
					createdAt: new Date().toISOString(),
					deadline: new Date().toISOString(),
					urgent: 0,
				};
				user.todos.unshift(todo);
				await user.save();
				return user;
			} else {
				throw new Error("User not found");
			}
		}
	}
	@Mutation(() => User)
	async deleteTodo(
		@Arg("todoId") todoId: string,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const todoIndex = user.todos.findIndex((todo) => todo.id === todoId);
				user.todos.splice(todoIndex, 1);
				await user.save();
				return user;
			} else {
				throw new Error("User not found");
			}
		}
	}

	@Mutation(() => User)
	async editTodo(
		@Arg("data")
		{ id, title, urgent, createdAt, deadline, description }: EditTodoInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		console.log(authorizedUser);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const todoIdx = user.todos.findIndex((todo) => todo.id === id);
				const todo: Todo = {
					id,
					title,
					description,
					createdAt,
					deadline,
					urgent,
				};
				user.todos[todoIdx] = todo;

				await user.save();
				return user;
			} else {
				throw new Error("User not found");
			}
		}
	}
}
