import { ObjectType, ID, Field } from "type-graphql";
import { getModelForClass, Prop } from "@typegoose/typegoose";

import { Todo } from "./Todo";
import { Skill } from "./Skill";

@ObjectType({ description: "User Model" })
export class User {
	@Field((type) => ID)
	id!: string;

	@Field()
	@Prop({ required: true })
	username!: string;

	@Field()
	@Prop({ required: true })
	email!: string;

	@Field()
	@Prop({ required: true })
	password!: string;

	@Field()
	@Prop({ required: true })
	createdAt!: string;

	//*Short term daily tasks
	@Field(() => [Todo], { nullable: "items" })
	@Prop({ type: () => [Todo] })
	todos!: Todo[];

	//* Skills you want to improve on
	@Field(() => [Skill], { nullable: "items" })
	@Prop({ type: () => [Skill] })
	//Temporary Solution
	skills!: Array<Skill>;

	//*Your long term goals, consisting goals to achieve
	//*by more than two years
	// @Field((type) => [Goal])
	// @Properties()
	// goal!: [Goal];

	//*Your lifelong dream.
	// TODO : If Empty will be written as "Still a blank page"
	// @Field((type) => Dream)
	// @Properties()
	// Dream!: Dream;
}

export const UserModel = getModelForClass(User);
