import { ObjectType, ID, Field, Int, InputType } from "type-graphql";
import { Prop } from "@typegoose/typegoose";
import { Log } from "./General";

@InputType({ description: "The Day Input Type " })
@ObjectType({ description: "The Day Model" })
export class Day {
	@Field()
	title!: string;

	@Field()
	completed!: boolean;

	@Field()
	log!: Log;
}

@ObjectType({ description: "The Challenge Model" })
export class Challenge {
	@Field(() => ID)
	id?: string;

	@Field()
	@Prop()
	title!: string;

	@Field()
	@Prop()
	description!: string;

	@Field(() => Int)
	@Prop()
	duration!: number;

	@Field()
	@Prop()
	startedAt!: string;

	// @Field(() => [Day], { nullable: "items" })
	// @Prop({ type: () => [Day] })
	// days!: Array<Day>;
}
