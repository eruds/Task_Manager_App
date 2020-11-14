import { makeStyles } from "@material-ui/core/styles";

export const formClasses = makeStyles({
	background: {
		border: "1px solid white",
	},
	submitButton: {
		margin: "10px 0",
		padding: "10px 0",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		maxWidth: "500px",
		margin: "0 auto",
		"& input": {
			padding: "15px",
		},
	},
});
