import React, { useContext, useState, useEffect } from "react";
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
import AddOrEditSkillForm from "./AddOrEditSkillForm";
import SkillPanel from "./SkillPanel";

import { useModal } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";
import { Skill } from "../../utils/typeDefs";
import { FETCH_SKILLS } from "../../utils/graphql";

export default function Skills() {
	// General Imports
	const classes = { ...generalClasses(), ...skillsPageClasses() };
	const { user } = useContext(AuthContext);

	// Props data state
	const [currentSkill, setCurrentSkill] = useState<Skill>();

	// JSX Elements state
	const [active, setActive] = useState<number>(0);
	const { open, openModal, closeModal } = useModal();

	// Tab Handler
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		if (data) {
			setCurrentSkill(data.returnUserData.skills[newValue]);
		}
		setActive(newValue);
	};

	// Fetching data
	const { data, loading } = useQuery(FETCH_SKILLS, {
		onError(err) {
			console.log(err);
		},
		variables: {
			userId: user?.id,
		},
	});

	const skills: Skill[] = loading ? [] : data.returnUserData.skills;
	useEffect(() => {
		setCurrentSkill(skills[active]);
	}, [skills]);

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
							{loading ? (
								<Button disabled className={classes.tab}>
									No Skils Added Yet
								</Button>
							) : !loading ? (
								skills.map((skill: any, index: number) => {
									return (
										<Tab
											key={skill.id}
											label={skill.title}
											value={index}
											className={classes.tab}
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
						<AddOrEditSkillForm open={open} closeModal={closeModal} />
					</Grid>
					<Grid
						container
						item
						xs={9}
						direction="column"
						style={{
							justifyContent: loading ? "center" : "flex-start",
						}}
					>
						{loading ? (
							<div className={classes.noSkillFetched}>
								<Typography variant="h4">There's Nothing Here!</Typography>
								<Typography variant="h6">
									Start Using The Skills Feature By Adding A New Skill!
								</Typography>
							</div>
						) : (
							data && <SkillPanel classes={classes} skill={currentSkill} />
						)}
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
