import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
	Accordion,
	AccordionActions,
	AccordionSummary,
	AccordionDetails,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	IconButton,
	Menu,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";

import moment from "moment";

import { Todo } from "../../utils/typeDefs";
import { getRemainingTime } from "../../utils/tools";
import { todoCardClasses } from "../styles/todoCardClasses";

interface todoInput {
	todo: Todo;
}

export default function TodoCard({ todo }: todoInput) {
	const classes = todoCardClasses();

	// Check todo deadline
	const { overdue, remainingTime } = getRemainingTime(todo);

	// Accordion Handler
	const [expand, setExpand] = useState<boolean>(false);

	// Checkbox handler
	const [checked, setChecked] = useState<boolean>(false);
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}
	// Enable editing todo
	const [editState, activateEditState] = useState<boolean>(false);

	// To update form
	const [currentTodo, setCurrentTodo] = useState<Todo>(todo);

	// Delete todo mutation
	const [DeleteTodo] = useMutation(DELETE_TODO, {
		onError(err) {
			console.log(err);
		},
		variables: {
			todoId: todo.id,
		},
	});

	// Edit todo mutation
	const [EditTodo] = useMutation(EDIT_TODO, {
		onError(err) {
			console.log(err);
		},
		variables: {
			id: currentTodo.id,
			title: currentTodo.title,
			description: currentTodo.description,
			urgent: currentTodo.urgent,
			createdAt: currentTodo.createdAt,
			deadline: currentTodo.deadline,
		},
	});

	// Form Handler on edit state
	function changeDeadline(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setCurrentTodo({
			...currentTodo,
			deadline: new Date(e.target.value).toISOString(),
		});
	}

	function changeDescription(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setCurrentTodo({
			...currentTodo,
			description: e.target.value,
		});
	}

	function changeTitle(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setCurrentTodo({
			...currentTodo,
			title: e.target.value,
		});
	}

	function changeTodoUrgent(e: React.ChangeEvent<HTMLInputElement>) {
		setCurrentTodo({
			...currentTodo,
			urgent: parseInt(e.target.value),
		});
	}

	return (
		<>
			<Accordion key={todo.id} expanded={expand}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon onClick={() => setExpand(!expand)} />}
					className={classes.summary}
				>
					<Checkbox
						checked={checked}
						onChange={(e) => {
							handleChange(e);
							if (!checked) {
								DeleteTodo();
							}
						}}
					/>
					{editState ? (
						<TextField
							id="title"
							type="text"
							value={currentTodo.title}
							onChange={(e) => changeTitle(e)}
							size="medium"
							className={classes.titleEdit}
						/>
					) : (
						<Typography variant="h6" className={classes.title}>
							{currentTodo.title}
						</Typography>
					)}

					<Typography
						variant="caption"
						color={overdue === "Overdue" ? "error" : "primary"}
						className={classes.deadline}
					>
						{remainingTime}
					</Typography>
					<IconButton
						onClick={() => {
							setExpand(true);
							activateEditState(true);
						}}
					>
						<EditIcon />
					</IconButton>
					<IconButton onClick={() => DeleteTodo()}>
						<DeleteIcon />
					</IconButton>
				</AccordionSummary>
				<AccordionDetails
					style={{
						flexDirection: "column",
					}}
				>
					<div className={classes.detailInputs}>
						<TextField
							id="deadline"
							label="Set deadline"
							type="datetime-local"
							value={moment(currentTodo.deadline).format("YYYY-MM-DDThh:mm")}
							onChange={(e) => changeDeadline(e)}
							disabled={!editState}
						/>
						<FormControl disabled={!editState}>
							<RadioGroup
								name="Urgent"
								value={currentTodo.urgent}
								onChange={(e) => changeTodoUrgent(e)}
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
								}}
							>
								<FormControlLabel
									value={3}
									control={<Radio />}
									label={3}
									labelPlacement="bottom"
								/>
								<FormControlLabel
									value={2}
									control={<Radio />}
									label={2}
									labelPlacement="bottom"
								/>
								<FormControlLabel
									value={1}
									control={<Radio />}
									label={1}
									labelPlacement="bottom"
								/>
								<FormControlLabel
									value={0}
									control={<Radio />}
									label={0}
									labelPlacement="bottom"
								/>
							</RadioGroup>
						</FormControl>
					</div>
					{editState ? (
						<TextField
							id="editTodoDescription"
							value={currentTodo.description}
							onChange={(e) => changeDescription(e)}
							variant="outlined"
							placeholder="Write description here..."
							rows={5}
							multiline
						/>
					) : (
						<Typography
							variant="caption"
							style={{
								padding: "10px 30px",
								paddingLeft: "10px",
								fontSize: "1rem",
								color: currentTodo.description === "" ? "#DADADA" : "inherit",
							}}
						>
							{currentTodo.description === ""
								? "Write description here..."
								: currentTodo.description}
						</Typography>
					)}
				</AccordionDetails>
				<AccordionActions>
					<Button
						onClick={() => {
							setExpand(false);
							activateEditState(false);
							EditTodo();
						}}
					>
						Save
					</Button>
				</AccordionActions>
			</Accordion>
		</>
	);
}

const DELETE_TODO = gql`
	mutation deleteTodo($todoId: String!) {
		deleteTodo(todoId: $todoId) {
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

const EDIT_TODO = gql`
	mutation editTodo(
		$id: ID!
		$title: String!
		$description: String!
		$createdAt: String!
		$deadline: String!
		$urgent: Float!
	) {
		editTodo(
			data: {
				id: $id
				title: $title
				description: $description
				createdAt: $createdAt
				deadline: $deadline
				urgent: $urgent
			}
		) {
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
