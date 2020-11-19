import SkillResolver from "./skill";
import UserResolver from "./user";
import TodoResolver from "./todo";
import MissionResolver from "./mission";
import ChallengeResolver from "./challenge";

export const resolvers = [
	SkillResolver,
	TodoResolver,
	UserResolver,
	MissionResolver,
	ChallengeResolver,
] as const;
