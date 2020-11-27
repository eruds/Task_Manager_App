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
	Checkbox,
	Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import DeleteConfirm from "./../general/DeleteConfirm";
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

	const [startMission] = useMutation(START_MISSION, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skillId,
			missionId: mission?.id,
		},
	});

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
	return (
		<Card key={mission?.id} variant="outlined" className={classes.card}>
			<CardContent className={classes.cardContent}>
				<div className={classes.main}>
					<div className={classes.title}>
						<Typography variant="h6" style={{ flexGrow: 1 }}>
							{mission?.title}
						</Typography>
						<ButtonGroup>
							<IconButton onClick={() => setConfirmDeleteDialog(true)}>
								<DeleteForeverIcon />
							</IconButton>
							<DeleteConfirm
								open={confirmDeleteDialog}
								setOpen={setConfirmDeleteDialog}
								item={mission}
								type="Mission"
								deleteFunction={deleteMission}
							/>
							<IconButton>
								<EditIcon />
							</IconButton>
						</ButtonGroup>
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
				</div>
			</CardContent>
			<div className={classes.cardSection}>
				{mission?.description !== "" && (
					<Typography variant="subtitle1" className={classes.description}>
						{mission?.description}
					</Typography>
				)}
			</div>
			<div className={classes.cardSection}>
				<CardActions className={classes.cardActions}>
					{!mission?.isStarted ? (
						<Button onClick={() => startMission()}>Start</Button>
					) : (
						<>
							<Button
								onClick={() => pauseMission}
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
					<Button className={classes.pushButton}>Add Log</Button>
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
					startedAt
					lastStartedAt
				}
			}
		}
	}
`;
