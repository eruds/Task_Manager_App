import { ID, Field, Int, InputType } from "type-graphql";
import { Challenge, Day } from "../../../models/Challenge";
@InputType({ description: "Input Type for Log" })
export class AddLogInput {
	@Field()
	description!: string;

	@Field()
	challengeId!: string;

	@Field()
	skillId!: string;

	@Field()
	dayNum!: number;
}

@InputType({ description: "Input type for each day in a challenge" })
export class DayInput extends Day {
	@Field()
	title!: string;

	@Field()
	completed!: boolean;
}

@InputType({ description: "Input for adding new Challenge" })
export class CreateChallengeInput extends Challenge {
	@Field()
	skillId!: string;

	@Field()
	title!: string;

	@Field()
	description!: string;

	@Field(() => Int)
	duration!: number;

	@Field(() => [DayInput], { nullable: "items" })
	days!: Array<DayInput>;
}

@InputType()
export class DeleteChallengeInput {
	@Field()
	skillId!: string;

	@Field()
	challengeId!: string;
}
