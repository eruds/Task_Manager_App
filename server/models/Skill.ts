import { ObjectType, ID, Field } from "type-graphql";
import { getModelForClass, prop as Properties } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";

@ObjectType({ description: "Skill" })
export class Skill {
	@Field(() => ID)
	_id!: ObjectID;

	@Field()
	title!: string;
}

export const SkillModel = getModelForClass(Skill);
