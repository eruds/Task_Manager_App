import { Todo } from "./typeDefs";

export function getRemainingTime(todo: Todo) {
	const today = new Date().getTime();
	const deadline = new Date(todo.deadline).getTime();
	const remainingTimeInMinutes = Math.floor((deadline - today) / 60000);
	const remaningTimeInMinutesAbs = Math.abs(remainingTimeInMinutes);
	const remainingTimeInHours = Math.floor(remaningTimeInMinutesAbs / 60);
	const overdue = remainingTimeInMinutes < 0 ? "Overdue" : "Left";
	const remainingTime =
		remaningTimeInMinutesAbs > 60
			? remainingTimeInHours > 24
				? Math.floor(remainingTimeInHours / 24) + " Days " + overdue
				: remainingTimeInHours + " Hours " + overdue
			: remaningTimeInMinutesAbs + " Minutes " + overdue;
	return { overdue, remainingTime };
}
