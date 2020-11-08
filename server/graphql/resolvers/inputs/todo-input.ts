import { InputType, Field, ID } from "type-graphql";
import { Length } from "class-validator";
import { Todo } from "../../../models/Todo";

@InputType()
export class AddTodoInput implements Partial<Todo> {
	@Field((type) => ID)
	userId!: string;

	@Field()
	title!: string;

	@Field()
	@Length(1, 255)
	description?: string;
}

@InputType()
export class DeleteTodoInput {
	@Field((type) => ID)
	userId!: string;

	@Field((type) => ID)
	todoId!: string;
}
