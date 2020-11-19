import React, { useContext, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
	Button,
	Container,
	Grid,
	Tabs,
	Tab,
	Paper,
	Typography,
} from "@material-ui/core";

import { skillsPageClasses } from "../styles/skillsPageClasses";
import { generalClasses } from "../styles/general";
import AddSkillForm from "./AddSkillForm";
import SkillPanel from "./SkillPanel";

import { useModal } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";
import { Skill } from "../../utils/typeDefs";

export default function Skills() {
	// General Imports
	const classes = { ...generalClasses(), ...skillsPageClasses() };
	const { user } = useContext(AuthContext);

	// Props data state
	const [currentSkill, setCurrentSkill] = useState<Skill>();

	// JSX Elements state
	const [active, setActive] = useState<number>(0);
	const { open, openModal, closeModal } = useModal();

	// Fetching data
	const { data } = useQuery(FETCH_SKILLS, {
		onError(err) {
			console.log(err);
		},
		variables: {
			userId: user?.id,
		},
	});

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		if (data) {
			setCurrentSkill(data.returnUserData.skills[newValue]);
		}
		setActive(newValue);
	};

	// If data is fetched

	let skills: Skill[] = [];
	if (data) {
		skills = data.returnUserData.skills;
		if (!currentSkill) {
			setCurrentSkill(skills[active]);
		}
	}

	return (
		<Container>
			<Paper style={{ minHeight: "80vh" }} elevation={3}>
				<Grid
					container
					spacing={4}
					className={classes.main}
					style={{ paddingLeft: "2rem" }}
				>
					<Grid item xs={3}>
						<Tabs
							value={active}
							indicatorColor="primary"
							textColor="secondary"
							orientation="vertical"
							variant="scrollable"
							onChange={handleChange}
							className={classes.tabs}
						>
							{skills.length > 0 ? (
								skills.map((skill: any, index: number) => {
									return (
										<Tab
											key={skill.id}
											label={skill.title}
											value={index}
											style={{
												borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
												padding: "20px 0",
											}}
										/>
									);
								})
							) : (
								<Tab
									label="Loading Skills..."
									value={0}
									style={{
										borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
										padding: "20px 0",
									}}
								/>
							)}
							<Button
								style={{
									color: "grey",
									marginTop: "auto",
									padding: "20px 0",
								}}
								onClick={openModal}
							>
								Add New Skill
							</Button>
						</Tabs>
						<AddSkillForm
							open={open}
							closeModal={closeModal}
							classes={classes}
						/>
					</Grid>
					<Grid item xs={9}>
						{data && <SkillPanel classes={classes} skill={currentSkill} />}
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}

const FETCH_SKILLS = gql`
	query returnUserData($userId: String!) {
		returnUserData(userId: $userId) {
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
