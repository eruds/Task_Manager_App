import {
	Resolver,
	InputType,
	Int,
	Field,
	Mutation,
	Arg,
	Ctx,
} from "type-graphql";
import { UserInputError } from "apollo-server";

import { Challenge } from "../../models/Challenge";
import { Log } from "../../models/General";
import {
	CreateChallengeInput,
	AddLogInput,
	DeleteChallengeInput,
} from "./inputs/challenge-inputs";
import { User, UserModel } from "../../models/User";
import { checkAuth } from "../../utils/checkAuth";

@Resolver()
export default class ChallengeResolver {
	@Mutation(() => User)
	async createChallenge(
		@Arg("Data")
		{ skillId, title, description, duration, days }: CreateChallengeInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				if (skillIdx === -1) {
					throw new UserInputError("Skill Not Found");
				}
				const newChallenge: Challenge = {
					title,
					description,
					duration,
					days,
					startedAt: new Date().toISOString(),
				};
				user.skills[skillIdx].challenges.unshift(newChallenge);
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async deleteChallenge(
		@Arg("Data")
		{ skillId, challengeId }: DeleteChallengeInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				if (skillIdx === -1) {
					throw new UserInputError("Skill Not Found");
				}
				const challengeIdx = user.skills[skillIdx].challenges.findIndex(
					(challenge) => challenge.id === challengeId
				);
				if (skillIdx === -1) {
					throw new UserInputError("Challenge Not Found");
				}
				user.skills[skillIdx].challenges.splice(challengeIdx, 1);
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async addLog(
		@Arg("Data") { description, challengeId, skillId, dayNum }: AddLogInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				if (skillIdx === -1) {
					throw new UserInputError("Skill Not Found");
				}

				const challengeIdx = user.skills[skillIdx].challenges.findIndex(
					(challenge) => challenge.id === challengeId
				);
				if (challengeIdx === -1) {
					throw new UserInputError("Challenge Not Found");
				}

				const newLog: Log = {
					description,
					createdAt: new Date().toISOString(),
				};

				user.skills[skillIdx].challenges[challengeIdx].days[
					dayNum
				].log = newLog;
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}
}
