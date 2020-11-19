import { ObjectType, ID, Field } from "type-graphql";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Challenge } from "./Challenge";

@ObjectType({ description: "Skill Category" })
export class SkillCategory {
	@Field()
	id?: string;

	@Field()
	@Prop()
	title!: string;

	@Field(() => [Challenge], { nullable: "items" })
	@Prop({ type: () => [Challenge] })
	challenges?: Challenge[];
}
