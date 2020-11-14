import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import {
	Container,
	Grid,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";

import { skillsPageClasses } from "./styles/skillsPageClasses";
import { generalClasses } from "./styles/general";
import Header from "./general/Header";

import { AuthContext } from "../context/auth";

export default function Skills() {
	const classes = { ...generalClasses(), ...skillsPageClasses() };
	const { user } = useContext(AuthContext);

	return (
		<Container>
			<Header text="Skills" />
			<Grid container spacing={1}>
				<Grid item xs={3}>
					<List component="div" aria-label="main mailbox folders">
						<ListItem button>
							<ListItemText primary="Inbox" />
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={9}>
					<Header text="Skill" />
				</Grid>
			</Grid>
		</Container>
	);
}
