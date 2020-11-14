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
	// skills!: Skill[];
}

// interface Skill {}

export type { User, Todo };
