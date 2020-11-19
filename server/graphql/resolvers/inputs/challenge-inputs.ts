import { ID, Field, Int, InputType } from "type-graphql";
import { Challenge, Day } from "../../../models/Challenge";

@InputType({ description: "Add Challenge Input Type" })
export class AddChallengeInput {
	@Field(() => ID)
	skillId?: string;

	@Field()
	title!: string;

	@Field()
	description!: string;

	@Field(() => Int)
	duration!: number;

	// @Field(() => [Day], { nullable: "items" })
	// days!: Array<Day>;
}
