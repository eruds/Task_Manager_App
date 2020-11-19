import { InputType, ID, Field } from "type-graphql";
import { Skill } from "../../../models/Skill";

@InputType({ description: "Skill add input" })
export class AddSkillInput extends Skill {
	@Field()
	title!: string;

	@Field()
	progress!: number;

	@Field(() => [String], { nullable: "items" })
	categories!: string[];
}

@InputType({ description: "Skill edit input " })
export class EditSkillInput extends Skill {
	@Field()
	skillId!: string;

	@Field()
	title!: string;

	@Field()
	progress!: number;

	@Field(() => [String], { nullable: "items" })
	categories!: string[];
}
