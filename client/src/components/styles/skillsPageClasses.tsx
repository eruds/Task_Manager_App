import { makeStyles } from "@material-ui/core/styles";

export const skillsPageClasses = makeStyles({
	tabs: {
		minHeight: "50vh",
		maxHeight: "70vh",
		borderRight: "1px solid rgba(0, 0, 0, 0.30)",
		"& .MuiTabs-flexContainerVertical": {
			minHeight: "70vh",
		},
	},
});
