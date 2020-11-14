import { makeStyles } from "@material-ui/core/styles";
import bg from "../../images/notebook-731212_1920.jpg";

export const landingPageClasses = makeStyles({
	homepageJumbotron: {
		background: `url("${bg}")`,
		minHeight: "100vh",
	},

	homepageJumbotronOv: {
		background: `linear-gradient(to right,
            rgba(30, 30, 30, 80%),
            rgba(30, 30, 30, 60%),
            rgba(30, 30, 30, 40%),
            rgba(30, 30, 30, 0%),
            rgba(30, 30, 30, 40%))`,
		minHeight: "100vh",
	},

	landingPageMessage: {
		position: "fixed",
		top: "20vh",
		minWidth: "1280px",
		padding: "10px",
		color: "white",
		margin: "0 10vw",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	loginForm: {
		flexGrow: 2,
	},

	jumbotronText: {
		flexGrow: 1.5,
		"& .MuiTypography-h2": {
			fontSize: "4.3rem",
			fontWeight: 500,
		},
	},
});
