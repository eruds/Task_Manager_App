import SkillResolver from "./skill";
import UserResolver from "./user";
import TodoResolver from "./todo";

export const resolvers = [SkillResolver, TodoResolver, UserResolver] as const;
