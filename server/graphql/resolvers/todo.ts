import { Resolver, Mutation, Arg, Query, Args } from "type-graphql";
import { Todo } from "../../models/Todo";
import { User, UserModel } from "../../models/User";
import { AddTodoInput, DeleteTodoInput } from "./inputs/todo-input";
import { ObjectID } from "mongodb";

@Resolver()
export default class TodoResolver {
	@Mutation(() => User)
	async addTodo(@Arg("data") { userId, title, description }: AddTodoInput) {
		const user = await UserModel.findById(userId);
		if (user) {
			//TODO FIX THIS
			const todo: Todo = {
				// _id: new ObjectID(),
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
	@Mutation(() => Boolean)
	async deleteTodo(@Arg("data") { userId, todoId }: DeleteTodoInput) {
		const user = await UserModel.findById(userId);
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
