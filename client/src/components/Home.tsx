import React from "react";
import { Grid, Typography, Container, Paper } from "@material-ui/core";

import TodoList from "./TodoList";
import Quote from "./Quote";
import Timer from "./Timer";

export default function Home() {
	return (
		<>
			<Quote />
			<Container>
				<Grid container spacing={4} className="main">
					<Grid item xs={8}>
						{/* <Typography variant="h4">TodoList</Typography> */}
						<Paper className="content">
							<TodoList />
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h4" align="center">
							Pomo Timer
						</Typography>
						<Paper className="content">
							<Timer />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
