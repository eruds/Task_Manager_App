import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const TextInputStyles = makeStyles({
	textField: {
		border: "none",
		// padding: "5px 20px 5px 0",
		padding: "0",
		backgroundColor: "white",
		width: "100%",
		"&:focus": {
			border: "none",
			backgroundColor: "white",
			outline: "none",
		},
	},
});

export default function TextInputField({
	value,
	onChange,
	className,
	style,
}: {
	value?: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	style?: any;
	className?: string;
}) {
	const classes = TextInputStyles();
	return (
		<input
			type="text"
			value={value}
			className={(className || "") + " " + classes.textField}
			onChange={onChange}
			style={style}
		/>
	);
}
