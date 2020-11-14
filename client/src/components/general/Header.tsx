import React from "react";
import { IconButton, Typography } from "@material-ui/core";

interface headerInput {
	icon?: JSX.Element;
	text: string;
}

export default function Header({ text, icon }: headerInput) {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<IconButton>{icon}</IconButton>
			<div style={{ flexGrow: 1, height: "100%" }}>
				<Typography variant="h4"> {text}</Typography>
			</div>
		</div>
	);
}
