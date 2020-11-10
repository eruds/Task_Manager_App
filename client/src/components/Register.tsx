import React from "react";
import {
	Button,
	Container,
	TextField,
	Typography,
	Paper,
} from "@material-ui/core";

import { useForm } from "../utils/hooks";

export default function Register() {
	const { values, onChange, onSubmit } = useForm(() => {}, {
		email: "",
		password: "",
	});
	return (
		<Container>
			<Paper
				style={{
					margin: "2rem 20%",
				}}
				className="section"
				elevation={3}
			>
				<Typography variant="h3" color="inherit" align="center">
					Register
				</Typography>
				<form
					action="submit"
					onSubmit={onSubmit}
					autoComplete="off"
					style={{ display: "flex", flexDirection: "column" }}
				>
					<TextField
						id="username"
						label="username"
						type="username"
						value={values.username}
						onChange={() => onChange}
						variant="outlined"
						margin="normal"
					/>
					<TextField
						id="email"
						label="email"
						type="text"
						value={values.email}
						onChange={() => onChange}
						variant="outlined"
						margin="normal"
					/>
					<TextField
						id="password"
						label="password"
						type="password"
						value={values.password}
						onChange={() => onChange}
						variant="outlined"
						margin="normal"
					/>
					<TextField
						id="confirmPassword"
						label="confirmPassword"
						type="confirmPassword"
						value={values.confirmPassword}
						onChange={() => onChange}
						variant="outlined"
						margin="normal"
					/>
					<Button type="submit" className="sub-content">
						Register
					</Button>
				</form>
			</Paper>
		</Container>
	);
}
