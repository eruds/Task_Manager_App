import React from "react";
import { Box, Typography } from "@material-ui/core";
import { landingPageClasses } from "./styles/landingPageClasses";

import Login from "./Login";

export default function LandingPage() {
	const classes = landingPageClasses();
	return (
		<div className={classes.homepageJumbotron}>
			<div className={classes.homepageJumbotronOv}>
				<Box className={classes.landingPageMessage}>
					<div className={classes.jumbotronText}>
						<Typography variant="h2" paragraph>
							Improve Yourself
						</Typography>
						<Typography variant="subtitle1" paragraph>
							Keep track of your skills, habits and achievements.
						</Typography>
					</div>
					<div className={classes.loginForm}>
						<Login />
					</div>
				</Box>
			</div>
		</div>
	);
}
