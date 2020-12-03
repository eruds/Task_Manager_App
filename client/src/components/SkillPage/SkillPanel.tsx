import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
	ButtonGroup,
	Chip,
	Container,
	Divider,
	Grid,
	Paper,
	IconButton,
	LinearProgress,
	Tabs,
	Tab,
	Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import MissionsTab from "./MissionsTab";
import AddOrEditSkillForm from "./AddOrEditSkillForm";
import DeleteConfirm from "./../general/DeleteConfirm";
import { Skill } from "../../utils/typeDefs";

interface SkillData {
	skill?: Skill;
	classes: any;
}

export default function SkillPanel({ skill, classes }: SkillData) {
	const [active, setActive] = useState<"Missions" | "Challenges">("Missions");
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<boolean>(
		false
	);
	const [editState, setEditState] = useState<boolean>(false);
	// Mutations
	const [deleteSkill] = useMutation(DELETE_SKILL, {
		onError(err) {
			console.log(err);
		},
		variables: {
			skillId: skill?.id,
		},
	});
	function tabChange(
		e: React.ChangeEvent<{}>,
		newValue: "Missions" | "Challenges"
	) {
		setActive(newValue);
	}

	const progress = ((skill?.progress || 0) / 60 / 10000) * 100;
	return (
		<Container>
			<Grid container spacing={2}>
				<Grid container item xs={12} style={{ justifyContent: "space-around" }}>
					<Typography variant="h4" align="left" style={{ flexBasis: "80%" }}>
						{skill?.title}
					</Typography>
					<ButtonGroup>
						<IconButton onClick={() => setConfirmDeleteDialog(true)}>
							<DeleteForeverIcon />
						</IconButton>
						<IconButton onClick={() => setEditState(true)}>
							<EditIcon />
						</IconButton>
					</ButtonGroup>
					<DeleteConfirm
						open={confirmDeleteDialog}
						setOpen={setConfirmDeleteDialog}
						item={skill}
						type="Skill"
						deleteFunction={deleteSkill}
					/>
					<AddOrEditSkillForm
						open={editState}
						closeModal={() => setEditState(false)}
						currentSkill={skill}
					/>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid container item xs={12}>
					<Grid item xs={2}>
						<Typography variant="body1">Progress : </Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1">{progress.toFixed(2)} % </Typography>
					</Grid>

					<Grid item xs={8} style={{ alignSelf: "center" }}>
						<LinearProgress
							variant="determinate"
							value={progress}
							style={{ borderRadius: "20px" }}
						/>
					</Grid>
				</Grid>
				<Grid container item xs={12}>
					{skill?.categories.map((category: any, i: number) => {
						return (
							<Chip
								label={category}
								key={i + category}
								// variant="outlined"
								// color="primary"
								// color={i % 2 === 0 ? "primary" : "secondary"}
								style={{ marginRight: "6px" }}
							/>
						);
					})}
				</Grid>

				<Grid item xs={12}>
					<Tabs value={active} onChange={tabChange}>
						<Tab label="Missions" value="Missions" />
						<Tab label="Challenges" value="Challenges" />
					</Tabs>
				</Grid>
				<Grid item xs={12}>
					{active === "Missions" ? (
						<Paper className={classes.section}>
							<MissionsTab skillId={skill?.id} missions={skill?.missions} />
						</Paper>
					) : (
						<Paper className={classes.section}>
							<Typography variant="h6" align="center">
								Challenges
							</Typography>
						</Paper>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}

const DELETE_SKILL = gql`
	mutation deleteSkill($skillId: String!) {
		deleteSkill(skillId: $skillId) {
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
