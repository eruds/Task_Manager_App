import {
	Resolver,
	Query,
	Mutation,
	InputType,
	Arg,
	Ctx,
	Field,
} from "type-graphql";
import { UserInputError } from "apollo-server";

import { UserModel, User } from "../../models/User";
import { MorningItem, MorningItemLog, MorningLog } from "../../models/Morning";
import { checkAuth } from "../../utils/checkAuth";

@InputType()
class MorningItemLogInput implements MorningItemLog {
	@Field()
	id?: string;

	@Field()
	title!: string;

	@Field()
	finishedAt!: string;
}

@InputType()
class MorningItemInput implements MorningItem {
	@Field()
	id?: string;

	@Field()
	title!: string;
}

@Resolver()
export default class MorningResolver {
	@Mutation(() => User)
	async addMorningItem(
		@Arg("title") title: string,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				if (!user.morning) {
					user.morning = {
						log: [],
						schedule: [],
					};
				}
				user.morning.schedule.push({
					title,
				});
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async deleteMorningItem(
		@Arg("itemId") itemId: string,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const idx = user.morning.schedule.findIndex(
					(item) => item.id === itemId
				);
				user.morning.schedule.splice(idx, 1);
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async addMorningLog(
		@Arg("logs", (type) => [MorningItemLogInput])
		logs: MorningItemLogInput[],
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const newLog: MorningLog = {
					logs,
					date: new Date().toISOString(),
				};
				user.morning.log.push(newLog);
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async saveSchedule(
		@Arg("items", (type) => [MorningItemInput])
		items: MorningItemInput[],
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				user.morning.schedule = items;
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}
}
