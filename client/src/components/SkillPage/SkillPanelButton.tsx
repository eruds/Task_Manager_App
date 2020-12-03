import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface props {
	isActive?: boolean;
	changeActive: (n: number) => void;
	index: number;
	style?: any;
	title: string;
}

export default function SkillPanelButton({
	isActive,
	changeActive,
	index,
	style,
	title,
}: props) {
	// #f50057
	const buttonStyle = makeStyles({
		root: {
			padding: "30px 20px",
			marginTop: index === 0 ? "0" : "",
			fontSize: "0.9rem",
			color: isActive ? "white" : "#000000",
			backgroundColor: isActive ? "rgba(48,71,94,0.9)" : "",
			borderRadius: "0",
			fontWeight: isActive ? 900 : 500,
			letterSpacing: "0.045rem",
			"&:hover": {
				backgroundColor: isActive ? "rgba(48,71,94,1)" : "",
			},
		},
	});
	const classes = buttonStyle();
	return (
		<Button
			className={classes.root}
			style={style}
			onClick={() => changeActive(index)}
			disableRipple
		>
			{title}
		</Button>
	);
}
