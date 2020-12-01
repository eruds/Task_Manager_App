import React, { useState, useEffect } from "react";
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
	IconButton,
	MenuItem,
	TextField,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import SkillCategoryButton from "./SkillCategoryButton";

import { useForm } from "../../utils/hooks";
import { Skill } from "../../utils/typeDefs";

interface AddOrEditSkillProps {
	open: boolean;
	closeModal: () => void;
	currentSkill?: Skill;
}

export default function AddOrEditSkillForm({
	open,
	closeModal,
	currentSkill,
}: AddOrEditSkillProps) {
	const sampleCategories = [
		"Web Development",
		"Programming",
		"Art",
		"Music",
		"Classical Music",
		"Sports",
	];

	// Form values handling
	const [values, setValues] = useState({
		title: currentSkill?.title || "",
	});

	const [category, setCategory] = useState<string>(sampleCategories[0]);
	const [currentProgress, setCurrentProgress] = useState<number>(
		currentSkill?.progress || 0
	);
	const [categories, setCategories] = useState<string[]>(
		currentSkill?.categories || []
	);

	const [errors, setErrors] = useState<any>();

	//UseEffect to watch for props changes
	useEffect(() => {
		setCurrentProgress(currentSkill?.progress || 0);
		setCategories(currentSkill?.categories || []);
		setValues({
			title: currentSkill?.title || "",
		});
	}, [currentSkill]);

	// JSX Elements handle functions
	const addToCategories = () => {
		const check = categories.indexOf(category);
		if (check === -1) {
			setCategories([...categories, category]);
		}
	};

	const cancelAddSkill = () => {
		closeModal();
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

	// Edit Skill Mutation
	const [editSkill] = useMutation(EDIT_SKILL_MUTATION, {
		update() {
			setErrors(null);
			// window.location.pathname = "/skills";
		},
		onError(err) {
			setErrors(err.graphQLErrors[0]);
		},
		variables: {
			skillId: currentSkill?.id,
			progress: currentProgress,
			title: values.title,
			categories,
		},
	});

	function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValues({
			...values,
			[e.target.id]: e.target.value,
		});
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setValues({ title: "" });
		if (currentSkill) {
			editSkill();
		} else {
			addSkill();
		}
	}

	const title = !currentSkill ? "Add New Skill" : "Edit Skill";
	const button = !currentSkill ? "Add Skill" : "Confirm Edit";
	const subtitle = !currentSkill
		? "Add a new skill that you want to track!"
		: "Edit this current skill";

	return (
		<Dialog open={open} onClose={closeModal} scroll="body">
			<DialogTitle>{title}</DialogTitle>
			<Divider />
			<form action="submit" onSubmit={(e) => onSubmit(e)} autoComplete="off">
				<DialogContent style={{ minWidth: "30vw", maxWidth: "60vw" }}>
					<DialogContentText>{subtitle}</DialogContentText>
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
								<MenuItem value={category} key={category}>
									{category}
								</MenuItem>
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
							alignItems: "center",
							justifyContent: "space-between",
							paddingTop: "20px",
						}}
					>
						<p
							style={{
								margin: "0",
								paddingLeft: "0px",
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
							{categories.map((category: any, i: number) => {
								return (
									<SkillCategoryButton
										key={i + category}
										category={category}
										onClick={(e) => deleteCategory(e, category)}
										deleteable
									/>
								);
							})}
						</div>
					</div>
				</DialogContent>
				<DialogActions style={{ paddingBottom: "15px", paddingRight: "24px" }}>
					<Button onClick={cancelAddSkill} color="primary">
						Cancel
					</Button>
					<Button onClick={closeModal} type="submit" color="primary">
						{button}
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

const EDIT_SKILL_MUTATION = gql`
	mutation editSkill(
		$skillId: String!
		$title: String!
		$progress: Float!
		$categories: [String]!
	) {
		editSkill(
			data: {
				skillId: $skillId
				title: $title
				progress: $progress
				categories: $categories
			}
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
