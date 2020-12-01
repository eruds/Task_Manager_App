import { makeStyles } from "@material-ui/core/styles";

export const missionClasses = makeStyles({
	main: {
		flexGrow: 1,
		alignSelf: "center",
		paddingLeft: "20px",
		display: "flex",
		flexDirection: "column",
	},
	title: {
		display: "flex",
		alignItems: "center",
	},

	date: {
		marginRight: "3rem",
		display: "flex",
		paddingBottom: "5px",
		"& p": {
			marginTop: "10px",
			marginBlockStart: "0",
			marginBlockEnd: "0",
		},
	},
	description: {
		paddingLeft: "20px",
	},
	card: {
		marginBottom: "10px",
	},
	cardContent: {
		display: "flex",
		padding: "10px !important",
	},

	cardSection: {
		padding: "5px 10px",
	},
	cardActions: {
		paddingLeft: "12px",
	},

	pushButton: {
		marginLeft: "auto !important",
	},
});
