import React, { useContext } from "react";
import {
	AppBar,
	Button,
	Box,
	Container,
	Paper,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function Navbar() {
	const { user } = useContext(AuthContext);
	const history = useHistory();
	function redirect(ref: string) {
		history.push(ref);
	}
	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Box style={{ flexGrow: 1 }}>
						<Button onClick={() => redirect("/")} color="inherit" disableRipple>
							<Typography variant="h6" color="inherit" align="left">
								Blank Pages
							</Typography>
						</Button>
					</Box>

					<Button
						disableRipple
						onClick={() => redirect("/register")}
						className="app-bar-button"
						color="inherit"
					>
						Blog
					</Button>
					<Button
						onClick={() => redirect("/register")}
						className="app-bar-button"
						color="inherit"
					>
						Guide
					</Button>
					{/* <Button
						onClick={() => redirect("/support")}
						className="app-bar-button"
						color="inherit"
					>
						Support Us
					</Button> */}
					{!user && (
						<>
							<Button
								onClick={() => redirect("/login")}
								className="app-bar-button"
								color="inherit"
							>
								Login
							</Button>

							<Button
								onClick={() => redirect("/register")}
								className="app-bar-button"
								color="inherit"
							>
								Register
							</Button>
						</>
					)}

					<Button
						onClick={() => redirect("/report")}
						className="app-bar-button"
						color="inherit"
					>
						Report
					</Button>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
