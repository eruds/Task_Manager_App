import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";
import {
	Button,
	ButtonGroup,
	IconButton,
	Card,
	CardContent,
	CardActions,
	TextField,
	Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";

import DeleteConfirm from "./../general/DeleteConfirm";
import ConfirmResetMission from "./ConfirmResetMission";
import TextInputField from "./../general/TextInputField";
import { Mission } from "../../utils/typeDefs";

interface MissionData {
	mission?: Mission;
	skillId?: String;
	classes?: any;
}

export default function MissionCard({
	mission,
	skillId,
	classes,
}: MissionData) {
	// * Delete Dialog Confirmation and Mutation
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<boolean>(
		false
	);

	const [deleteMission] = useMutation(DELETE_MISSION_MUTATION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skillId,
			missionId: mission?.id,
		},
	});

	//* Start Mission Mutation

	const [startMission] = useMutation(START_MISSION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skillId,
			missionId: mission?.id,
		},
	});

	//* Reset current progress confirm and mutation

	const [confirmResetDialog, setConfirmResetDialog] = useState<boolean>(false);

	const [resetMission] = useMutation(RESET_MISSION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skillId,
			missionId: mission?.id,
		},
	});

	// * Pause and Finish Mission Mutation

	const [pauseMission] = useMutation(PAUSE_MISSION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skillId,
			missionId: mission?.id,
		},
	});

	const [finishMission] = useMutation(FINISH_MISSION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skillId,
			missionId: mission?.id,
		},
	});

	//* Functions to Edit The Current Mission

	// Prerequisite States
	const [editState, setEditState] = useState<boolean>(false);

	const [currentMission, setCurrentMission] = useState<Mission>(
		mission || {
			title: "",
			lastStartedAt: "",
			createdAt: "",
			isStarted: false,
			isFinished: false,
			isPaused: false,
			timeSpent: 0,
			description: "",
		}
	);
	// Mutation
	const [editMission] = useMutation(EDIT_MISSION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skillId,
			missionId: mission?.id,
			description: currentMission.description.trim(),
			title: currentMission.title.trim(),
		},
	});

	// Text field handlers
	const changeTitle = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setCurrentMission({
			...currentMission,
			title: e.target.value,
		});
	};

	const changeDescription = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setCurrentMission({
			...currentMission,
			description: e.target.value,
		});
	};

	const submitEdit = () => {
		setEditState(false);
		editMission();
	};

	//* Time Formatting
	const timeSpentMinutes = mission ? mission?.timeSpent % 60 : 0;
	const timeSpentHours = mission ? Math.floor(mission?.timeSpent / 60) : 0;
	const timeSpent =
		timeSpentHours !== 0
			? `${timeSpentHours} Hours and ${timeSpentMinutes} Minutes`
			: `${timeSpentMinutes} Minutes`;
	return (
		<Card key={mission?.id} variant="outlined" className={classes.card}>
			<CardContent className={classes.cardContent}>
				<div className={classes.main}>
					<div className={classes.title}>
						{!editState ? (
							<Typography
								variant="h6"
								style={{
									flexGrow: mission?.isPaused ? 0 : 1,
									paddingRight: "20px",
								}}
							>
								{currentMission.title}
							</Typography>
						) : (
							<TextInputField
								value={currentMission?.title}
								onChange={changeTitle}
								style={{
									flexGrow: 1,
									fontSize: "1.25rem",
									fontFamily: "Roboto",
									fontWeight: 500,
									letterSpacing: "0.0075em",
									color: "rgba(0, 0, 0, 0.87)",
								}}
							/>
						)}
						{mission?.isPaused && !editState && (
							<Typography
								variant="subtitle1"
								style={{ flexGrow: 1, color: "rgba(0, 0, 0, 0.4)" }}
							>
								Paused
							</Typography>
						)}
						<ButtonGroup>
							{!mission?.isFinished && !mission?.isStarted && (
								<>
									<IconButton onClick={() => setConfirmResetDialog(true)}>
										<HistoryOutlinedIcon />
									</IconButton>
									<IconButton onClick={() => setEditState(true)}>
										<EditIcon />
									</IconButton>
								</>
							)}
							{(!mission?.isStarted || mission?.isFinished) && (
								<IconButton onClick={() => setConfirmDeleteDialog(true)}>
									<DeleteForeverIcon />
								</IconButton>
							)}
						</ButtonGroup>

						<DeleteConfirm
							open={confirmDeleteDialog}
							setOpen={setConfirmDeleteDialog}
							item={mission}
							type="Mission"
							deleteFunction={deleteMission}
						/>
						<ConfirmResetMission
							open={confirmResetDialog}
							setOpen={setConfirmResetDialog}
							resetFunction={resetMission}
						/>
					</div>

					<div className={classes.date}>
						{mission?.startedAt && (
							<p style={{ paddingRight: "10px" }}>
								{moment(mission?.startedAt).format("lll")}
							</p>
						)}
						{mission?.finishedAt && (
							<>
								<p> | </p>
								<p style={{ paddingLeft: "10px" }}>
									{moment(mission?.finishedAt).format("lll")}
								</p>
							</>
						)}
					</div>
					<div>
						<Typography variant="body2">Time Spent : {timeSpent}</Typography>
					</div>
				</div>
			</CardContent>
			<div className={classes.cardSection}>
				{editState ? (
					<div style={{ padding: "0 20px" }}>
						<TextField
							value={currentMission.description}
							onChange={(e) => changeDescription(e)}
							variant="outlined"
							placeholder="Write description here..."
							rows={5}
							multiline
							fullWidth
							margin="dense"
						/>
					</div>
				) : (
					currentMission.description !== "" && (
						<Typography variant="subtitle1" className={classes.description}>
							{currentMission.description}
						</Typography>
					)
				)}
			</div>
			<div className={classes.cardSection}>
				<CardActions className={classes.cardActions}>
					{!mission?.isStarted ? (
						!editState ? (
							<Button onClick={() => startMission()}>Start</Button>
						) : (
							<Button onClick={() => submitEdit()}>Confirm Edit</Button>
						)
					) : (
						<>
							<Button
								onClick={() => pauseMission()}
								disabled={mission?.isFinished}
							>
								Pause
							</Button>
							<Button
								onClick={() => finishMission()}
								disabled={mission?.isFinished}
							>
								{!mission?.isFinished ? "Finish" : "Finished"}
							</Button>
						</>
					)}
					<Button className={classes.pushButton} disabled>
						Add Log
					</Button>
				</CardActions>
			</div>
		</Card>
	);
}

const DELETE_MISSION_MUTATION = gql`
	mutation deleteMission($skillId: String!, $missionId: String!) {
		deleteMission(Data: { skillId: $skillId, missionId: $missionId }) {
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

const EDIT_MISSION = gql`
	mutation editMission(
		$skillId: String!
		$missionId: String!
		$description: String!
		$title: String!
	) {
		editMission(
			Data: {
				skillId: $skillId
				missionId: $missionId
				description: $description
				title: $title
			}
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

const START_MISSION = gql`
	mutation startMission($skillId: String!, $missionId: String!) {
		startMission(Data: { skillId: $skillId, missionId: $missionId }) {
			id
			username
			skills {
				id
				missions {
					id
					isStarted
					isPaused
					isFinished
					timeSpent
					startedAt
					lastStartedAt
				}
			}
		}
	}
`;

const RESET_MISSION = gql`
	mutation resetMission($skillId: String!, $missionId: String!) {
		resetMission(Data: { skillId: $skillId, missionId: $missionId }) {
			id
			username
			skills {
				id
				missions {
					id
					isStarted
					isPaused
					isFinished
					timeSpent
					startedAt
					lastStartedAt
				}
			}
		}
	}
`;

const PAUSE_MISSION = gql`
	mutation pauseMission($skillId: String!, $missionId: String!) {
		pauseMission(Data: { skillId: $skillId, missionId: $missionId }) {
			id
			username
			skills {
				missions {
					id
					isStarted
					isPaused
					isFinished
					timeSpent
					startedAt
					lastStartedAt
				}
			}
		}
	}
`;

const FINISH_MISSION = gql`
	mutation finishMission($skillId: String!, $missionId: String!) {
		finishMission(Data: { skillId: $skillId, missionId: $missionId }) {
			id
			username
			skills {
				missions {
					id
					isStarted
					isPaused
					isFinished
					timeSpent
					startedAt
					lastStartedAt
				}
			}
		}
	}
`;
