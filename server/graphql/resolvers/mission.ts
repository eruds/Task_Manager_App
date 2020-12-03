import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { UserInputError } from "apollo-server";

import { Mission } from "../../models/Mission";
import {
	MissionInput,
	AddMissionInput,
	EditMissionInput,
	AddLogMissionInput,
} from "./inputs/mission-input";
import { UserModel, User } from "../../models/User";
import { checkAuth } from "../../utils/checkAuth";

@Resolver()
export default class MissionResolver {
	@Mutation(() => User)
	async addMission(
		@Arg("data") { skillId, title, description }: AddMissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx: number = user.skills.findIndex(
					(skill) => skill.id === skillId
				);
				const mission: Mission = {
					description,
					title,
					lastStartedAt: "",
					isStarted: false,
					isFinished: false,
					isPaused: false,
					timeSpent: 0,
					log: [],
					createdAt: new Date().toISOString(),
				};
				user.skills[skillIdx].missions.unshift(mission);
				user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async deleteMission(
		@Arg("Data") { skillId, missionId }: MissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				const missionIdx = user.skills[skillIdx].missions.findIndex(
					(mission) => mission.id === missionId
				);

				const currentMission = user.skills[skillIdx].missions[missionIdx];

				user.skills[skillIdx].progress -= currentMission.timeSpent;
				user.skills[skillIdx].missions.splice(missionIdx, 1);
				await user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async editMission(
		@Arg("Data") { skillId, missionId, description, title }: EditMissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				const missionIdx = user.skills[skillIdx].missions.findIndex(
					(mission) => mission.id === missionId
				);

				const currentMission: Mission =
					user.skills[skillIdx].missions[missionIdx];
				const mission: Mission = {
					description,
					title,
					timeSpent: currentMission.timeSpent,
					lastStartedAt: currentMission.lastStartedAt,
					startedAt: currentMission.startedAt,
					createdAt: currentMission.createdAt,
					finishedAt: currentMission.finishedAt,
					pausedAt: currentMission.pausedAt,
					isFinished: currentMission.isFinished,
					isStarted: currentMission.isStarted,
					isPaused: currentMission.isPaused,
					log: currentMission.log,
				};

				user.skills[skillIdx].missions[missionIdx] = mission;
				await user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async resetMission(
		@Arg("Data") { skillId, missionId }: MissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				const missionIdx = user.skills[skillIdx].missions.findIndex(
					(mission) => mission.id === missionId
				);
				const currentMission: Mission =
					user.skills[skillIdx].missions[missionIdx];

				currentMission.isStarted = false;
				currentMission.isPaused = false;
				currentMission.lastStartedAt = "";
				currentMission.startedAt = undefined;
				currentMission.pausedAt = undefined;
				currentMission.timeSpent = 0;
				user.skills[skillIdx].missions[missionIdx] = currentMission;

				await user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async startMission(
		@Arg("Data") { skillId, missionId }: MissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				const missionIdx = user.skills[skillIdx].missions.findIndex(
					(mission) => mission.id === missionId
				);
				const currentMission: Mission =
					user.skills[skillIdx].missions[missionIdx];

				if (!currentMission.startedAt) {
					currentMission.startedAt = new Date().toISOString();
				}

				currentMission.isPaused = false;
				currentMission.isStarted = true;
				currentMission.lastStartedAt = new Date().toISOString();
				user.skills[skillIdx].missions[missionIdx] = currentMission;

				await user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async pauseMission(
		@Arg("Data") { skillId, missionId }: MissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				const missionIdx = user.skills[skillIdx].missions.findIndex(
					(mission) => mission.id === missionId
				);

				const currentMission = user.skills[skillIdx].missions[missionIdx];

				currentMission.isStarted = false;
				currentMission.isPaused = true;

				const lastStartedAt = new Date(currentMission.lastStartedAt).getTime();
				const time = Math.floor((new Date().getTime() - lastStartedAt) / 60000);
				currentMission.timeSpent += time;
				user.skills[skillIdx].missions[missionIdx] = currentMission;

				await user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async finishMission(
		@Arg("Data") { skillId, missionId }: MissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			const user = await UserModel.findById(authorizedUser.id);
			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				const missionIdx = user.skills[skillIdx].missions.findIndex(
					(mission) => mission.id === missionId
				);

				const currentMission = user.skills[skillIdx].missions[missionIdx];

				currentMission.isFinished = true;
				currentMission.finishedAt = new Date().toISOString();

				const lastStartedAt = new Date(currentMission.lastStartedAt).getTime();
				const time = Math.floor((new Date().getTime() - lastStartedAt) / 60000);
				currentMission.timeSpent += time;
				user.skills[skillIdx].progress += currentMission.timeSpent;
				user.skills[skillIdx].missions[missionIdx] = currentMission;

				await user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}

	@Mutation(() => User)
	async addLog(
		@Arg("Data") { skillId, missionId, description }: AddLogMissionInput,
		@Ctx() ctx: { authHeader: string }
	) {
		const authorizedUser: any = checkAuth(ctx);
		if (authorizedUser) {
			if (description.trim() === "") {
				throw new UserInputError("Description can't be empty ");
			}
			const user = await UserModel.findById(authorizedUser.id);

			if (user) {
				const skillIdx = user.skills.findIndex((skill) => skill.id === skillId);
				const missionIdx = user.skills[skillIdx].missions.findIndex(
					(mission) => mission.id === missionId
				);

				const newLog = {
					description,
					createdAt: new Date().toISOString(),
				};

				user.skills[skillIdx].missions[missionIdx].log.push(newLog);

				await user.save();
				return user;
			} else {
				throw new UserInputError("User not found");
			}
		}
	}
}
