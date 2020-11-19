import React from "react";
import {
	Button,
	Card,
	CardContent,
	Checkbox,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { generalClasses } from "../styles/general";
import { Mission } from "../../utils/typeDefs";

interface MissionsData {
	missions?: Mission[];
}

const missionStyles = makeStyles({
	title: {
		flexGrow: 1,
		alignSelf: "center",
		paddingLeft: "20px",
	},
	card: {
		marginBottom: "10px",
	},
	cardContent: {
		display: "flex",
		padding: "16px !important",
	},
});

export default function MissionsList({ missions }: MissionsData) {
	const classes = { ...generalClasses(), ...missionStyles() };
	return (
		<div className={classes.columnContainer}>
			{missions?.map((mission: any) => {
				console.log(mission.description);
				return (
					<Card key={mission.id} variant="outlined" className={classes.card}>
						<CardContent className={classes.cardContent}>
							<Typography variant="h6" className={classes.title}>
								{mission.title}
							</Typography>
							{mission.startedAt && (
								<p>Mission started at : {mission.startedAt}</p>
							)}
							{mission.finishedAt && (
								<p>Mission finished at : {mission.finishedAt}</p>
							)}
							{!mission.isStarted ? (
								<Button>Start</Button>
							) : (
								<Button>Finish</Button>
							)}
						</CardContent>

						{mission.description !== "" && (
							<Typography
								variant="subtitle1"
								className={classes.title}
								style={{ padding: "20px" }}
							>
								{mission.description}
							</Typography>
						)}
					</Card>
				);
			})}
		</div>
	);
}
