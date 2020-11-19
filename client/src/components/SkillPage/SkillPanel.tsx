import React, { useState } from "react";
import {
	Container,
	Divider,
	Grid,
	Paper,
	Tabs,
	Tab,
	Typography,
} from "@material-ui/core";

import MissionsList from "./MissionsList";
import { generalClasses } from "../styles/general";
import { Skill } from "../../utils/typeDefs";

interface SkillData {
	skill?: Skill;
	classes: any;
}

export default function SkillPanel({ skill, classes }: SkillData) {
	const [active, setActive] = useState<"Missions" | "Challenges">("Missions");

	function tabChange(
		e: React.ChangeEvent<{}>,
		newValue: "Missions" | "Challenges"
	) {
		setActive(newValue);
	}

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h4" align="center">
						{skill?.title}
					</Typography>
					<Divider style={{ margin: "20px 0 " }} />
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
							<Typography
								variant="h6"
								align="center"
								style={{ marginBottom: "30px" }}
							>
								Missions
							</Typography>
							<MissionsList missions={skill?.missions} />
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
