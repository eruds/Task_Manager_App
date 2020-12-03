import { ObjectType, ID, Field, InputType } from "type-graphql";

@ObjectType({ description: "Log Model" })
export class Log {
	@Field()
	createdAt!: string;

	@Field()
	description!: string;
}
