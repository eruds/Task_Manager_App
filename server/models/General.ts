import { ObjectType, ID, Field, InputType } from "type-graphql";

@InputType({ description: "The Log Input Type " })
@ObjectType({ description: "Log Model" })
export class Log {
	@Field()
	createdAt!: string;

	@Field()
	description!: string;
}
