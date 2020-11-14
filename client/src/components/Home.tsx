import React from "react";
import { Grid, Typography, Container, Paper } from "@material-ui/core";

import TodoList from "./TodoList/TodoList";
import Quote from "./Quote";
import Timer from "./general/Timer";

import { generalClasses } from "./styles/general";

export default function Home() {
	const classes = generalClasses();
	return (
		<>
			<Quote />
			<Container>
				<Grid container spacing={4} style={{ padding: "3rem 0" }}>
					<Grid item xs={8}>
						<Paper className={classes.content}>
							<TodoList />
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.content}>
							<Typography variant="h4" align="center">
								Pomo Timer
							</Typography>
							<Timer />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
