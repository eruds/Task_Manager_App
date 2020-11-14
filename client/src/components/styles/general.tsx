import { makeStyles } from "@material-ui/core/styles";

export const generalClasses = makeStyles({
	/* Classes for container type of stuff */
	main: {
		padding: "3rem 5rem",
		margin: "2rem",
	},

	section: {
		padding: "2rem 3rem 3rem 3rem",
	},

	content: {
		margin: "1rem 0",
		padding: "1rem 3rem",
	},
	subContent: {
		margin: "1rem 0",
	},
});

export const formErrorMessage = makeStyles({
	card: {
		borderColor: "#c7241e",
		backgroundColor: "#F44336",
		padding: "1rem 0.8rem",
	},
	text: {
		color: "white",
	},
});
