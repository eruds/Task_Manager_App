import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { AuthenticationError, UserInputError } from "apollo-server";

import { Skill } from "../../models/Skill";
import { AddSkillInput, EditSkillInput } from "./inputs/skill-input";
import { User, UserModel } from "../../models/User";
import { checkAuth } from "../../utils/checkAuth";

@Resolver()
export default class SkillResolver {
	@Mutation(() => User)
	async addSkill(
		@Arg("data") { title, progress, categories }: AddSkillInput,
		@Ctx() ctx: { authHeader: string }
	) {
		if (title.trim() === "") {
			throw new UserInputError("Title can't be Empty");
		}

		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);

			if (user) {
				const skill: Skill = {
					title,
					progress,
					createdAt: new Date().toISOString(),
					categories,
					missions: [],
					challenges: [],
				};
				if (!user.skills) {
					user.skills = [];
				}
				user.skills.unshift(skill);
				user.save();
				return user;
			} else {
				throw new Error("User not found");
			}
		}
	}

	@Mutation(() => User)
	async deleteSkill(
		@Arg("skillId") skillId: string,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);

			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				user.skills.splice(skillIdx, 1);
				user.save();
				return user;
			} else {
				throw new Error("User not found");
			}
		}
	}

	@Mutation(() => User)
	async editSkill(
		@Arg("data") { skillId, title, progress, categories }: EditSkillInput,
		@Ctx() ctx: { authHeader: string }
	) {
		if (title.trim() === "") {
			throw new UserInputError("Title can't be Empty");
		}
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				if (skillIdx === -1) {
					throw new UserInputError("Skill not found");
				}
				const currentSkill = user.skills[skillIdx];
				const skill: Skill = {
					title,
					progress,
					categories,
					createdAt: currentSkill.createdAt,
					missions: currentSkill.missions,
					challenges: currentSkill.challenges,
				};
				user.skills[skillIdx] = skill;

				await user.save();
				return user;
			} else {
				throw new Error("User not found");
			}
		}
	}
}
