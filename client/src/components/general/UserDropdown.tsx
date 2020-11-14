import React, { useContext } from "react";
import { Button, Divider, Paper, Popper, Grow } from "@material-ui/core";

import BrushIcon from "@material-ui/icons/Brush";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

import { AuthContext } from "../../context/auth";

export default function UserDropdown({ classes }: { classes: any }) {
	const { user, logout } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	function redirect(ref: string) {
		window.location.pathname = ref;
	}

	function logoutUser() {
		logout();
		redirect("/");
	}
	return (
		<>
			<Button color="inherit" onClick={(e) => handleClick(e)}>
				{user?.username}
			</Button>
			<Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: "100% 0 0" }}>
						<Paper
							style={{
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Divider />
							<Button
								onClick={() => {
									redirect("/morning");
								}}
								className={classes.menuButton}
								color="inherit"
								startIcon={<WbSunnyIcon />}
							>
								Morning
							</Button>
							<Divider />
							<Button
								onClick={() => {
									redirect("/workout");
								}}
								className={classes.menuButton}
								color="inherit"
								startIcon={<FitnessCenterIcon />}
							>
								Workout
							</Button>
							<Divider />
							<Button
								onClick={() => {
									redirect("/todos");
								}}
								className={classes.menuButton}
								color="inherit"
								startIcon={<AssignmentIcon />}
							>
								Todos
							</Button>
							<Divider />
							<Button
								onClick={() => {
									redirect("/skills");
								}}
								className={classes.menuButton}
								color="inherit"
								startIcon={<BrushIcon />}
							>
								Skills
							</Button>
							<Divider />
							<Button
								onClick={logoutUser}
								className={classes.menuButton}
								color="inherit"
								startIcon={<ExitToAppIcon />}
							>
								Logout
							</Button>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
}
