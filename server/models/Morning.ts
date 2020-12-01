import { ObjectType, ID, Field, Int } from "type-graphql";
import { Prop, Ref } from "@typegoose/typegoose";

@ObjectType({ description: "Morning Item" })
class MorningItem {
	@Field(() => ID, { nullable: true })
	id?: string;

	@Field()
	@Prop()
	title!: string;
}

@ObjectType({ description: "Morning Item Log, a singular Morning log" })
export class MorningItemLog {
	@Field(() => ID, { nullable: true })
	id?: string;

	@Field()
	@Prop()
	title!: string;

	@Field()
	@Prop()
	finishedAt!: string;
}

@ObjectType({ description: "Morning Log Arrays with date" })
export class MorningLog {
	@Field(() => MorningItemLog)
	@Prop()
	logs?: MorningItemLog[];

	@Field()
	@Prop()
	date?: string;
}

@ObjectType({ description: "Morning Routine" })
export class MorningRoutine {
	@Field(() => [MorningLog], { nullable: "items" })
	@Prop({ type: () => [MorningLog] })
	log!: MorningLog[];

	@Field(() => [MorningItem], { nullable: "items" })
	@Prop({ type: () => [MorningItem] })
	schedule!: MorningItem[];
}
