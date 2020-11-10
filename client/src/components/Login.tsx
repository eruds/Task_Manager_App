import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import {
	Button,
	Container,
	InputAdornment,
	TextField,
	Typography,
	Paper,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

export default function Login(props: any) {
	const context = useContext(AuthContext);
	const { values, onChange, onSubmit } = useForm(callLoginUser, {
		email: "",
		password: "",
	});
	//! BACKEND email need to be perfectly match ( if there is an uppercase difference it creates a problem )
	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data }) {
			context.login(data.login);
			props.history.push("/");
		},
		onError(err) {
			console.log(err);
		},
		variables: values,
	});

	function callLoginUser() {
		loginUser();
	}

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
					Login
				</Typography>
				<form
					action="submit"
					onSubmit={onSubmit}
					autoComplete="off"
					style={{ display: "flex", flexDirection: "column" }}
				>
					<TextField
						id="email"
						label="Email"
						type="text"
						value={values.email}
						onChange={onChange}
						variant="outlined"
						margin="normal"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle color="primary" />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="password"
						label="Password"
						type="password"
						value={values.password}
						onChange={onChange}
						variant="outlined"
						margin="normal"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon color="primary" />
								</InputAdornment>
							),
						}}
					/>
					<Button type="submit" className="sub-content">
						Login
					</Button>
				</form>
			</Paper>
		</Container>
	);
}

const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(data: { email: $email, password: $password }) {
			id
			email
			username
			token
			todos {
				id
				title
				urgent
				createdAt
				deadline
				description
			}
		}
	}
`;
