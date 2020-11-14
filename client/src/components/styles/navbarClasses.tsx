import { makeStyles } from "@material-ui/core/styles";

const template = {
	navbar: {},
	container: {},
	navToolbar: { alignItems: "stretch" },
	navbarLogo: {
		flexGrow: 1,
		display: "flex",
		alignItems: "stretch",
	},

	navbarButton: {
		margin: "0 10px ",
		borderRadius: 0,
	},

	menuButton: {
		padding: "1rem 2rem",
		paddingRight: "8rem",
		justifyContent: "flex-start",
		borderRadius: "0",
		"& span": {
			marginRight: "20px",
		},
	},

	registerButton: {},
};

export const navbarClasses = makeStyles({
	...template,
});

export const navbarLandingClasses = makeStyles({
	...template,
	navbar: {
		height: "12vh",
		background: "rgba(10,10,10,20%)",
	},
	container: {
		margin: "0 60px",
		maxWidth: "1400px",
	},
	navToolbar: {
		height: "12vh",
		alignItems: "stretch",
	},
	navbarLogo: {
		display: "flex",
		alignItems: "stretch",
		paddingRight: "3rem",
		"& h6 ": {
			fontSize: "2rem",
		},
	},
	navbarButton: {
		marginRight: "2rem",
		minWidth: "80px",
		borderRadius: 0,
		color: "white",
		fontSize: "1.1rem",
		textTransform: "none",
	},

	registerButton: {
		borderRadius: "10px",
		alignSelf: "center",
		padding: "8px 20px",
		fontSize: "0.9rem",
		fontWeight: 300,
		textTransform: "none",
	},
});
