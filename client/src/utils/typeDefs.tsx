// interface Errors {
// 	username?: string | null;
// 	email?: string | null;
// 	password?: string | null;
// 	confirmPassword?: string | null;
// }

interface Todo {
	id?: string;
	createdAt: string;
	deadline: string;
	title: string;
	description: string;
	urgent: number;
}

interface SkillCategory {
	id?: string;
	title: string;
	challenges: Challenge[];
}

interface Log {
	createdAt: string;
	description: string;
}

interface Mission {
	id?: string;
	title: string;
	lastStartedAt: string;
	createdAt: string;
	startedAt?: string;
	finishedAt?: string;
	pausedAt?: string;
	isStarted: boolean;
	isFinished: boolean;
	isPaused: boolean;
	timeSpent: number;
	description: string;
	log?: Log;
}

interface Day {
	title: string;
	completed: boolean;
	log: Log;
}

interface Challenge {
	id?: string;
	title: string;
	startedAt: string;
	duration: number;
	description: string;
	day: Day;
}

interface Skill {
	id: string;
	title: string;
	createdAt: string;
	progress: number;
	categories: string[];
	missions: Mission[];
	challenges: Challenge[];
}

interface User {
	id?: string;
	username: string;
	email: string;
	password: string;
	createdAt: string;
	token: string;

	// //*Short term daily tasks
	todos: Todo[];

	// //* Skills you want to improve on
	skills: Skill[];
}

export type { User, Todo, Skill, Mission, Challenge, SkillCategory };
