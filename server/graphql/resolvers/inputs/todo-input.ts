import { InputType, Field, ID } from "type-graphql";
import { Length } from "class-validator";
import { Todo } from "../../../models/Todo";

@InputType()
export class AddTodoInput implements Partial<Todo> {
	@Field()
	title!: string;
}

@InputType()
export class DeleteTodoInput {
	@Field((type) => ID)
	todoId!: string;
}

@InputType()
export class EditTodoInput extends Todo {
	@Field(() => ID)
	id?: string;

	@Field()
	createdAt!: string;

	@Field()
	deadline!: string;

	@Field()
	title!: string;

	@Field()
	description?: string;

	@Field()
	urgent!: 0 | 1 | 2 | 3;
}
