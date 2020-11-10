import React, { useContext } from "react";

import MenuIcon from "@material-ui/icons/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import {
	Button,
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	TextField,
	Typography,
} from "@material-ui/core";

import { useForm } from "../utils/hooks";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { Todo } from "../utils/typeDefs";

export default function TodoList() {
	//!CONTEXT DECLARED TODOS AS A TEMPORARY FIX
	const { user } = useContext(AuthContext);
	const { values, onChange, onSubmit } = useForm(callAddTodo, {
		title: "",
	});

	//!FIX ON ERROR
	const { data } = useQuery(GET_TODOS, {
		onError(err) {
			console.log(err);
		},
		variables: {
			userId: user.id,
		},
		pollInterval: 500,
	});
	//!Fix this
	function callAddTodo() {
		return 0;
	}
	let todosEl;
	console.log(data);
	if (data) {
		//? Maybe fix this later
		const todos = data.returnUserData.todos;
		try {
			todosEl = (
				<div style={{ display: "flex", flexDirection: "column" }}>
					{todos.map((todo: any) => {
						//? This looks like garbage programming
						const today = new Date().getTime();
						const deadline = new Date(todo.deadline).getTime();
						const remainingTimeInMinutes = Math.floor(
							(deadline - today) / 60000
						);
						const overdue = remainingTimeInMinutes < 0 ? "Overdue" : "Left";
						const remainingTime =
							remainingTimeInMinutes < 60
								? Math.floor(Math.abs(remainingTimeInMinutes) / 60) +
								  " Hours " +
								  overdue
								: Math.abs(remainingTimeInMinutes) + " Minutes " + overdue;
						return (
							<Card
								key={todo.id}
								style={{
									margin: "0.3rem 0",
									display: "flex",
									alignItems: "center",
								}}
							>
								<CardContent style={{ flexGrow: 1 }}>
									<Typography variant="h6">{todo.title}</Typography>
									<Typography variant="caption">{todo.description}</Typography>
								</CardContent>
								<CardContent>
									<Typography
										variant="caption"
										color={overdue === "Overdue" ? "error" : "primary"}
									>
										{remainingTime}
									</Typography>
								</CardContent>
								<CardActions>
									<IconButton>
										<EditIcon />
									</IconButton>
									<IconButton>
										<DeleteIcon />
									</IconButton>
								</CardActions>
							</Card>
						);
					})}
				</div>
			);
		} catch (err) {
			console.log("Error");
		}
	}

	//?Maybe make this a custom element
	const Header = (
		<div style={{ display: "flex", alignItems: "center" }}>
			<IconButton>
				<MenuIcon fontSize="large" />
			</IconButton>
			<div style={{ flexGrow: 1, height: "100%" }}>
				<Typography variant="h4">Today</Typography>
			</div>
		</div>
	);

	return (
		<Box>
			{Header}
			<form action="submit" autoComplete="off" onSubmit={onSubmit}>
				<TextField
					id="title"
					label="Task"
					value={values.title}
					onChange={onChange}
					fullWidth
					placeholder="Add new Task..."
					variant="outlined"
					className="sub-content"
				/>
				<Button type="submit" className="sub-content">
					Add Todo
				</Button>
				{todosEl}
			</form>
		</Box>
	);
}

const GET_TODOS = gql`
	query returnUserData($userId: String!) {
		returnUserData(userId: $userId) {
			username
			todos {
				id
				title
				urgent
				createdAt
				deadline
				description
			}
		}
	}
`;
