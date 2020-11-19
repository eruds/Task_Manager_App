import React, { useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import { Button, Box, Fade, IconButton, TextField } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";

import TodoCard from "./TodoCard";
import Header from "../general/Header";
import { generalClasses } from "../styles/general";

export default function TodoList() {
	const classes = generalClasses();
	// Get User from Context
	const { user } = useContext(AuthContext);

	// Form Handler
	const { values, onFormChange, onSubmit } = useForm(callAddTodo, {
		title: "",
	});

	// Fetch data from backend
	const { data, refetch } = useQuery(GET_TODOS, {
		variables: {
			userId: user?.id,
		},
	});

	// Add Todo Mutation
	const [AddTodo] = useMutation(ADD_TODO, {
		onError(err) {
			console.log(err);
		},
		variables: values,
	});

	function callAddTodo() {
		AddTodo();
	}

	//* Todolist constructor
	let todosEl;

	if (!data) {
		todosEl = <p>Loading Todos...</p>;
	} else {
		const todos = data.returnUserData.todos;
		todosEl = (
			<div style={{ display: "flex", flexDirection: "column" }}>
				{todos.map((todo: any) => {
					return (
						<Fade key={todo.id} timeout={500}>
							<TodoCard todo={todo} />
						</Fade>
					);
				})}
			</div>
		);
	}

	return (
		<Box>
			<Header text="Today" icon={<MenuIcon fontSize="large" />} />
			<form action="submit" autoComplete="off" onSubmit={onSubmit}>
				<TextField
					id="title"
					label="Task"
					value={values.title}
					onChange={onFormChange}
					fullWidth
					placeholder="Add new Task..."
					variant="outlined"
					className={classes.subContent}
				/>
				<Button type="submit" className={classes.subContent}>
					Add Todo
				</Button>
				<Button className={classes.subContent} onClick={() => refetch()}>
					Refresh
				</Button>
				<IconButton className={classes.subContent}>
					<ImportExportIcon />
				</IconButton>
				{todosEl}
			</form>
		</Box>
	);
}

const GET_TODOS = gql`
	query returnUserData($userId: String!) {
		returnUserData(userId: $userId) {
			id
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

const ADD_TODO = gql`
	mutation addTodo($title: String!) {
		addTodo(title: $title) {
			id
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
