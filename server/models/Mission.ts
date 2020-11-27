import { ObjectType, ID, Field, Int } from "type-graphql";
import { Prop, Ref } from "@typegoose/typegoose";
import { Log } from "./General";

@ObjectType({ description: "The Mission Model" })
export class Mission {
	@Field(() => ID, { nullable: true })
	id?: string;

	@Field()
	@Prop()
	title!: string;

	@Field()
	@Prop()
	lastStartedAt!: string;

	@Field()
	@Prop()
	createdAt!: string;

	@Field({ nullable: true })
	@Prop()
	startedAt?: string;

	@Field({ nullable: true })
	@Prop()
	finishedAt?: string;

	@Field({ nullable: true })
	@Prop()
	pausedAt?: string;

	@Field()
	@Prop()
	isStarted!: boolean;

	@Field()
	@Prop()
	isFinished!: boolean;

	@Field()
	@Prop()
	isPaused!: boolean;

	@Field()
	@Prop()
	timeSpent!: number;

	@Field()
	@Prop()
	description!: string;

	@Field(() => [Log], { nullable: "items" })
	@Prop({ type: () => [Log] })
	log!: Array<Log>;
}
