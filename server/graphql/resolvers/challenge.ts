import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { UserInputError } from "apollo-server";

import { Challenge } from "../../models/Challenge";
import { AddChallengeInput } from "./inputs/challenge-inputs";
import { User, UserModel } from "../../models/User";
import { checkAuth } from "../../utils/checkAuth";

@Resolver()
export default class ChallengeResolver {
	@Mutation(() => User)
	async addChallenge(
		@Arg("data")
		{ skillId, title, description, duration }: AddChallengeInput,
		@Ctx() ctx: { authHeader: string }
	) {
		// if (title.trim() === "") {
		// 	throw new UserInputError("Title can't be Empty");
		// }
		// if (duration === 0) {
		// 	throw new UserInputError("Duration can't be 0");
		// }
		// const authorizedUser: any = checkAuth(ctx);
		// if (authorizedUser) {
		// 	const user = await UserModel.findById(authorizedUser.id);
		// 	if (user) {
		// 		const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
		// 		const challenge: Challenge = {
		// 			title,
		// 			description,
		// 			duration,
		// 			startedAt: new Date().toISOString(),
		// 			days,
		// 		};
		// 		user.skills[skillIdx].challenges.unshift(challenge);
		// 		user.save();
		// 		return user;
		// 	} else {
		// 		throw new UserInputError("User not found");
		// 	}
		// }
	}
}
