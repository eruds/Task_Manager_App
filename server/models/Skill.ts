import { ObjectType, ID, Field, Int } from "type-graphql";
import { Prop, Ref } from "@typegoose/typegoose";
import { Mission } from "./Mission";
import { Challenge } from "./Challenge";

@ObjectType({ description: "Skill" })
export class Skill {
	@Field(() => ID)
	id?: string;

	@Field()
	@Prop()
	title!: string;

	@Field()
	@Prop()
	createdAt!: string;

	@Field(() => Int)
	@Prop()
	progress!: number;

	@Field(() => [String], { nullable: "items" })
	@Prop({ type: () => [String] })
	categories!: Array<string>;

	@Field(() => [Mission], { nullable: "items" })
	@Prop({ type: () => [Mission] })
	missions!: Array<Mission>;

	@Field(() => [Challenge], { nullable: "items" })
	@Prop({ type: () => [Challenge] })
	challenges!: Array<Challenge>;
}
