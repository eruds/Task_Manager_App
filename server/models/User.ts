import { ObjectType, ID, Field } from "type-graphql";
import { getModelForClass, prop as Properties } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";

import { Todo } from "./Todo";
import { Skill } from "./Skill";

@ObjectType({ description: "User Model" })
export class User {
	@Field((type) => ID)
	_id!: ObjectID;

	@Field()
	@Properties()
	username!: string;

	@Field()
	@Properties()
	email!: string;

	@Field()
	@Properties()
	password!: string;

	@Field()
	@Properties()
	createdAt!: string;

	//*Short term daily tasks
	@Field(() => [Todo], { nullable: "items" })
	@Properties()
	todos!: [Todo];

	//* Skills you want to improve on
	@Field((type) => [Skill])
	@Properties()
	skills!: [Skill];

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
