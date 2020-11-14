import { ObjectType, Field, ID } from "type-graphql";
import { getModelForClass, Prop } from "@typegoose/typegoose";

@ObjectType({ description: "The Todo Model" })
export class Todo {
	//It is not required in adding the data, but it is required to fetch it
	@Field(() => ID)
	id?: string;

	@Field()
	@Prop()
	createdAt!: string;

	@Field()
	@Prop()
	deadline!: string;

	@Field()
	@Prop()
	title!: string;

	@Field()
	@Prop()
	description?: string;

	@Field()
	@Prop()
	urgent!: 0 | 1 | 2 | 3;
}
