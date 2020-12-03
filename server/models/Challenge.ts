import { ObjectType, ID, Field, Int, InputType } from "type-graphql";
import { Prop } from "@typegoose/typegoose";
import { Log } from "./General";

@ObjectType({ description: "The Day Model" })
export class Day {
	@Field()
	@Prop()
	title!: string;

	@Field()
	@Prop()
	completed!: boolean;

	@Field()
	@Prop()
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

	@Field()
	@Prop()
	finishedAt?: string;

	@Field(() => [Day], { nullable: "items" })
	@Prop({ type: () => [Day] })
	days!: Array<Day>;
}
