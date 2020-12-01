import SkillResolver from "./skill";
import UserResolver from "./user";
import TodoResolver from "./todo";
import MissionResolver from "./mission";
import ChallengeResolver from "./challenge";
import MorningResolver from "./morning";

export const resolvers = [
	SkillResolver,
	TodoResolver,
	UserResolver,
	MissionResolver,
	ChallengeResolver,
	MorningResolver,
] as const;
