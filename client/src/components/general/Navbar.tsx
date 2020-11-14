import React, { useContext } from "react";
import {
	AppBar,
	Button,
	Box,
	Container,
	Toolbar,
	Typography,
} from "@material-ui/core";

import UserDropdown from "./UserDropdown";
import { AuthContext } from "../../context/auth";
import { navbarClasses, navbarLandingClasses } from "../styles/navbarClasses";

export default function Navbar() {
	const { user } = useContext(AuthContext);
	const isHomepage = window.location.pathname === "/";
	const classes = isHomepage ? navbarLandingClasses() : navbarClasses();
	function redirect(ref: string) {
		window.location.pathname = ref;
	}

	return (
		<AppBar
			position={isHomepage ? "absolute" : "static"}
			color={isHomepage ? "transparent" : "primary"}
			className={classes.navbar}
		>
			<Container className={classes.container}>
				<Toolbar className={classes.navToolbar}>
					<Box className={classes.navbarLogo}>
						<Button
							onClick={() => redirect("/")}
							color="inherit"
							className={classes.navbarButton}
							disableRipple
						>
							<Typography variant="h6" color="inherit" align="left">
								Blank Pages
							</Typography>
						</Button>
					</Box>

					<Button
						disableRipple
						onClick={() => redirect("/")}
						className={classes.navbarButton}
						color="inherit"
					>
						Blog
					</Button>
					<Button
						onClick={() => redirect("/")}
						className={classes.navbarButton}
						color="inherit"
					>
						Guide
					</Button>
					{isHomepage && (
						<Button
							onClick={() => redirect("/")}
							className={classes.navbarButton}
							color="inherit"
						>
							About Us
						</Button>
					)}
					{!user ? (
						!isHomepage ? (
							<>
								<Button
									onClick={() => redirect("/report")}
									className={classes.navbarButton}
									color="inherit"
								>
									Report
								</Button>
								<Button
									onClick={() => redirect("/login")}
									className={classes.navbarButton}
									color="inherit"
								>
									Login
								</Button>

								<Button
									onClick={() => redirect("/register")}
									className={classes.navbarButton}
									color="inherit"
								>
									Register
								</Button>
							</>
						) : (
							<Button
								onClick={() => redirect("/register")}
								className={classes.navbarButton + " " + classes.registerButton}
								color="inherit"
								style={{ marginLeft: "auto" }}
								variant="outlined"
							>
								Register Here
							</Button>
						)
					) : (
						<UserDropdown classes={classes} />
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
