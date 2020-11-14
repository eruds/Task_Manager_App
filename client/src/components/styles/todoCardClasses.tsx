import { makeStyles } from "@material-ui/core/styles";

export const todoCardClasses = makeStyles({
	titleEdit: {
		flexGrow: 1,
		alignSelf: "center",
		padding: "0 20px",
	},
	title: {
		flexGrow: 1,
		alignSelf: "center",
		paddingLeft: "20px",
	},
	summary: {
		paddingLeft: "20px",
	},
	deadline: {
		alignSelf: "center",
		paddingRight: "2rem",
	},
	detailInputs: {
		display: "flex",
		padding: "10px",
		paddingTop: "0px",
		margin: "1.3rem 0",
		marginTop: "0px",
		justifyContent: "space-between",
	},
});
