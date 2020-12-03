import React, { useContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {
	Button,
	Container,
	Drawer,
	Divider,
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
import SkillPanelButton from "./SkillPanelButton";

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
	const changeActive = (newActive: number) => {
		if (data) {
			setCurrentSkill(data.returnUserData.skills[newActive]);
		}
		setActive(newActive);
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

	const skillLength = skills?.length === 0 ? 5 : skills?.length + 2;
	useEffect(() => {
		setCurrentSkill(skills[active]);
	}, [skills]);

	return (
		<div style={{ minHeight: "80vh" }}>
			<div className={classes.horizontalContainer}>
				<div
					className={classes.columnContainer}
					style={{
						borderRight: "1px solid rgba(0,0,0, 0.2)",
						height: `${90 * skillLength}px`,
						maxHeight: `100vh`,
						flexBasis: "20%",
						// overflowY: "scroll",
						// "&::-webkit-scrollbar": {
						// 	width: "200px",
						// },
					}}
				>
					{loading ? (
						<Button disabled className={classes.tab}>
							No Skils Added Yet
						</Button>
					) : !loading ? (
						skills.map((skill: any, index: number) => {
							return (
								<>
									<SkillPanelButton
										index={index}
										isActive={index === active}
										title={skill.title}
										changeActive={changeActive}
									/>
									<Divider style={{ backgroundColor: "rgba(0,0,0,0.2)" }} />
								</>
							);
						})
					) : (
						<Button
							disabled
							style={{
								borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
								padding: "20px 0",
							}}
						>
							Loading Skills...
						</Button>
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
					<AddOrEditSkillForm open={open} closeModal={closeModal} />
				</div>
				<div
					className={classes.columnContainer}
					style={{
						justifyContent: loading ? "center" : "flex-start",
						padding: "3rem 5rem 2rem 3rem",
						flexBasis: "80%",
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
				</div>
			</div>
		</div>
	);
}
