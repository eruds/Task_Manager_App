import { Resolver, Mutation, Arg, Query, Args } from "type-graphql";
import { Todo } from "../../models/Todo";
import { User, UserModel } from "../../models/User";
import { AddTodoInput } from "./inputs/todo-input";
import { ObjectID } from "mongodb";

@Resolver()
export class TodoResolver {
	//! This shit somehow returns an array
	@Mutation(() => User)
	async addTodo(
		@Arg("data") { userId, title, description }: AddTodoInput
	): Promise<User> {
		const user = await UserModel.findById(userId);
		if (user) {
			const todo: Todo = {
				_id: new ObjectID(),
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
			throw new Error("Error");
		}
	}
}
