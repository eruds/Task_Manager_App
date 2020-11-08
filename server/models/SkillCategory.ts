import { ObjectType, ID, Field } from "type-graphql";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";

//TODO Change this schema
@ObjectType({ description: "Skill Category" })
export class SkillCategory {
	// @Field(() => ID)
	// _id?: ObjectID;
	// @Field()
	// @Prop()
	// name!: string;
	// //TODO
	// @Field()
	// @Prop()
	// recomendations!: Challenge;
}

export const SkillModel = getModelForClass(SkillCategory);
