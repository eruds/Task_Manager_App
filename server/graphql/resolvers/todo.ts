import { AuthenticationError } from "apollo-server";
import { Resolver, Mutation, Arg, Query, Args, Ctx } from "type-graphql";
import { Todo } from "../../models/Todo";
import { User, UserModel } from "../../models/User";
import { checkAuth } from "../../utils/checkAuth";
import { AddTodoInput, DeleteTodoInput } from "./inputs/todo-input";

@Resolver()
export default class TodoResolver {
	//Do i need to return user after creating a todo
	@Mutation(() => User)
	async addTodo(
		@Arg("data") { title, description }: AddTodoInput,
		@Ctx() ctx: { authHeader: string }
	) {
		// I don't know if i need to be authorized to make my own todo but eh
		// Auth error is checked on index.ts
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				//TODO FIX THIS
				const todo: Todo = {
					title,
					description,
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
	@Mutation(() => Boolean)
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
				return true;
			} else {
				throw new Error("User not found");
			}
		}
	}

	//TODO Add Edit todo resolver
}
