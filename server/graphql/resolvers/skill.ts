import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { UserInputError } from "apollo-server";

import { Skill } from "../../models/Skill";
import { AddSkillInput } from "./inputs/skill-input";
import { UserModel } from "../../models/User";
import { ObjectID } from "mongodb";

@Resolver()
export class SkillResolver {
	//! This shit somehow returns an array
	@Mutation(() => Skill)
	async addSkill(@Arg("data") { userId, title }: AddSkillInput) {
		const user = await UserModel.findById(userId);
		if (user) {
			const skill: Skill = {
				_id: new ObjectID(),
				title,
			};
			user.username = "notHello";
			user.save();
			return user;
		} else {
			throw new UserInputError("User not found");
		}
	}
}
