import { InputType, ID, Field } from "type-graphql";

@InputType({ description: "Skill add input" })
export class AddSkillInput {
	@Field()
	userId!: string;

	@Field()
	title!: string;
}
