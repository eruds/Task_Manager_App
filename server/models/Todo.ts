import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@ObjectType({ description: "The Todo Model" })
export class Todo {
	@Field(() => ID)
	_id!: ObjectId;

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

export const TodoModel = getModelForClass(Todo);
