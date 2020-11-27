import { makeStyles } from "@material-ui/core/styles";

export const skillsPageClasses = makeStyles({
	tabs: {
		minHeight: "50vh",
		maxHeight: "100vh",
		borderRight: "1px solid rgba(0, 0, 0, 0.30)",
		"& .MuiTabs-flexContainerVertical": {
			minHeight: "80vh",
			maxHeight: "100vh",
		},
	},

	noSkillFetched: {
		color: "rgba(0,0,0,50%)",
		textAlign: "center",
	},

	tab: {
		borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
		padding: "20px 0",
	},
});
