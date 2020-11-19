import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
	Button,
	Chip,
	Divider,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	IconButton,
	MenuItem,
	TextField,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import { useForm } from "../../utils/hooks";

interface AddSkillProps {
	classes: any;
	open: boolean;
	closeModal: () => void;
}

export default function AddSkillForm({
	classes,
	open,
	closeModal,
}: AddSkillProps) {
	const sampleCategories = [
		"Web Development",
		"Programming",
		"Art",
		"Music",
		"Classical Music",
		"Sports",
	];

	const [category, setCategory] = useState<string>(sampleCategories[0]);
	const [currentProgress, setCurrentProgress] = useState<number>(0);
	const [categories, setCategories] = useState<string[]>([]);
	const { values, onFormChange, onSubmit } = useForm(callAddSkill, {
		title: "",
	});
	const [errors, setErrors] = useState<any>();

	// JSX Elements handle functions
	const addToCategories = () => {
		const check = categories.indexOf(category);
		if (check === -1) {
			setCategories([...categories, category]);
		}
	};

	const cancelAddSkill = () => {
		closeModal();
		setCategories([]);
	};

	const deleteCategory = (
		e: React.MouseEvent<HTMLButtonElement>,
		category: string
	) => {
		const newCategories = categories.filter((item) => item !== category);

		setCategories(newCategories);
	};

	//Add Skill Mutation
	const [addSkill] = useMutation(ADD_SKILL_MUTATION, {
		update() {
			setErrors(null);
		},
		onError(err) {
			setErrors(err.graphQLErrors[0]);
		},
		variables: {
			title: values.title,
			progress: currentProgress,
			categories,
		},
	});

	function callAddSkill() {
		if (!errors) {
			addSkill();
		}
	}

	return (
		<Dialog open={open} onClose={closeModal} scroll="body">
			<DialogTitle>Add new skill</DialogTitle>
			<Divider />
			<form action="submit" onSubmit={onSubmit} autoComplete="off">
				<DialogContent style={{ minWidth: "30vw", maxWidth: "60vw" }}>
					<DialogContentText>
						Add a new skill that you want to track!
					</DialogContentText>
					<TextField
						value={values.title}
						id="title"
						label="Title"
						onChange={onFormChange}
						margin="normal"
						variant="outlined"
						helperText="Create the skill title"
						fullWidth
					/>
					<TextField
						label="Progress"
						select
						value={currentProgress}
						variant="outlined"
						fullWidth
						margin="normal"
						helperText="Describe your current level of mastery"
						onChange={(e) => setCurrentProgress(parseInt(e.target.value))}
					>
						<MenuItem value={0}>Beginner</MenuItem>
						<MenuItem value={400}>Amateur</MenuItem>
						<MenuItem value={3000}>Intermediate</MenuItem>
						<MenuItem value={8000}>Expert</MenuItem>
						<MenuItem value={10000}>Master</MenuItem>
					</TextField>
					<div
						style={{
							display: "flex",
						}}
					>
						<TextField
							label="Categories"
							select
							value={category}
							variant="outlined"
							fullWidth
							margin="normal"
							helperText="Add a category to your skill "
							onChange={(e) => setCategory(e.target.value)}
							style={{ marginRight: "10px", flexBasis: "90%" }}
						>
							{sampleCategories.map((category: any) => (
								<MenuItem value={category}> {category} </MenuItem>
							))}
						</TextField>
						<div
							style={{
								flexBasis: "10%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<IconButton
								onClick={addToCategories}
								style={{ alignSelf: "center" }}
							>
								<AddIcon />
							</IconButton>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "stretch",
							paddingTop: "20px",
						}}
					>
						<p
							style={{
								margin: "0 20px 0 0",
								flexBasis: "20%",
							}}
						>
							Categories :
						</p>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								flexBasis: "70%",
							}}
						>
							{categories.map((category: any, i: number) => (
								<Chip
									label={category}
									onDelete={(e) => deleteCategory(e, category)}
									color="primary"
									variant="outlined"
									style={{ margin: "5px 3px" }}
								/>
							))}
						</div>
					</div>
				</DialogContent>
				<DialogActions style={{ paddingBottom: "15px", paddingRight: "24px" }}>
					<Button onClick={cancelAddSkill} color="primary">
						Cancel
					</Button>
					<Button onClick={closeModal} type="submit" color="primary">
						Add Skill
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

const ADD_SKILL_MUTATION = gql`
	mutation addSkill(
		$title: String!
		$progress: Float!
		$categories: [String]!
	) {
		addSkill(
			data: { title: $title, progress: $progress, categories: $categories }
		) {
			id
			skills {
				id
				title
				categories
				progress
				createdAt
				missions {
					id
					title
					description
				}
				challenges {
					id
					title
				}
			}
		}
	}
`;
