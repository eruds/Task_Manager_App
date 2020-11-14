import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

interface userInputInterface {
	name: string;
	error: any;
	value: string;
	onChange: (e: any) => any;
	icon: JSX.Element;
}

export default function UserTextInput({
	name,
	error,
	value,
	onChange,
	icon,
}: userInputInterface) {
	const isHomepage = window.location.pathname === "/";
	const capitalize = name.charAt(0).toUpperCase() + name.slice(1);
	const type =
		name === "password" || name === "confirmPassword" ? "password" : "text";
	return (
		<TextField
			id={name}
			label={capitalize}
			type={type}
			value={value}
			error={error}
			onChange={onChange}
			variant={isHomepage ? "standard" : "outlined"}
			margin="normal"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">{icon}</InputAdornment>
				),
			}}
		/>
	);
}
