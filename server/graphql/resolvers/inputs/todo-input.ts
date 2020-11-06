import { InputType, Field, ID } from "type-graphql";
import { Length } from "class-validator";
import { Todo } from "../../../models/Todo";

@InputType()
export class AddTodoInput implements Partial<Todo> {
	@Field((type) => ID)
	//? Maybe Change this to MongoDB Object ID?
	userId!: string;

	@Field()
	title!: string;

	@Field()
	@Length(1, 255)
	description?: string;
}
