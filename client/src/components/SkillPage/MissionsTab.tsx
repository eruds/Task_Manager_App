import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import MissionCard from "./MissionCard";

import { generalClasses } from "../styles/general";
import { useForm } from "../../utils/hooks";
import { Mission } from "../../utils/typeDefs";

interface MissionsData {
	missions?: Mission[];
	skillId?: String;
}

const missionStyles = makeStyles({
	main: {
		flexGrow: 1,
		alignSelf: "center",
		paddingLeft: "20px",
		display: "flex",
		flexDirection: "column",
	},
	title: {
		display: "flex",
		alignItems: "center",
	},
	date: {
		marginRight: "3rem",
		display: "flex",
		"& p": {
			marginTop: "10px",
			marginBlockStart: "0",
			marginBlockEnd: "0",
		},
	},
	description: {
		paddingLeft: "20px",
	},
	card: {
		marginBottom: "10px",
	},
	cardContent: {
		display: "flex",
		padding: "10px !important",
	},

	cardSection: {
		padding: "5px 10px",
	},
	cardActions: {
		paddingLeft: "12px",
	},

	pushButton: {
		marginLeft: "auto !important",
	},
});

export default function MissionsTab({ skillId, missions }: MissionsData) {
	const classes = { ...generalClasses(), ...missionStyles() };
	// Dialog Handling
	const [addMissionState, setAddMissionState] = useState<boolean>(false);

	// Form Handling
	const { values, onFormChange, onSubmit } = useForm(callAddMission, {
		title: "",
		description: "",
	});

	// Mutation Handling
	const [addMission] = useMutation(ADD_MISSION_MUTATION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId,
			...values,
		},
	});

	function callAddMission() {
		addMission();
		// window.location.pathrename = "/skills";
	}
	return (
		<div className={classes.columnContainer}>
			<Button
				onClick={(e) => setAddMissionState(true)}
				style={{ marginBottom: "20px" }}
			>
				Add New Mission
			</Button>
			<Dialog open={addMissionState}>
				<DialogTitle>Add a new mission</DialogTitle>
				<form action="submit" onSubmit={onSubmit} autoComplete="off">
					<DialogContent>
						<TextField
							id="title"
							label="Title"
							value={values.title}
							onChange={onFormChange}
							helperText="Set the title of your mission"
							fullWidth
						/>
						<TextField
							id="description"
							label="Description"
							value={values.description}
							onChange={onFormChange}
							helperText="Describe your mission"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button
							type="submit"
							onClick={() => {
								setAddMissionState(false);
								// window.location.pathname = "/skills";
							}}
						>
							Add Mission
						</Button>
						<Button onClick={() => setAddMissionState(false)}>Cancel</Button>
					</DialogActions>
				</form>
			</Dialog>
			<div>
				{missions?.map((mission: any) => {
					return (
						<MissionCard
							key={mission?.id}
							mission={mission}
							classes={classes}
							skillId={skillId}
						/>
					);
				})}
			</div>
		</div>
	);
}

const ADD_MISSION_MUTATION = gql`
	mutation addMission(
		$skillId: String!
		$title: String!
		$description: String!
	) {
		addMission(
			data: { skillId: $skillId, title: $title, description: $description }
		) {
			id
			username
			skills {
				missions {
					id
					title
					lastStartedAt
					createdAt
					startedAt
					finishedAt
					pausedAt
					isStarted
					isFinished
					isPaused
					timeSpent
					description
					log {
						createdAt
						description
					}
				}
			}
		}
	}
`;
