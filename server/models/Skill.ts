import { ObjectType, ID, Field, Int } from "type-graphql";
import { getModelForClass, Prop, Ref } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";
import { SkillCategory } from "./SkillCategory";

//TODO Change this schema
@ObjectType({ description: "Skill" })
export class Skill {
	@Field(() => ID)
	_id?: ObjectID;
	@Field()
	@Prop()
	name!: string;
	//? How would you track progress?
	@Field(() => Int)
	@Prop()
	progress!: number;
	// 	@Field()
	// 	@Prop({ ref: () => SkillCategory })
	// 	skillCategory?: Ref<SkillCategory>;
}

export const SkillModel = getModelForClass(Skill);
