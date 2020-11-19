import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Paper } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import MailIcon from "@material-ui/icons/Mail";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import UserForm from "./form/UserForm";

import { generalClasses } from "./styles/general";
import { formClasses } from "./styles/formClasses";

export default function Login(props: any) {
	const isHomepage = window.location.pathname;
	// Import Styles
	const classes: any =
		isHomepage === "/"
			? { ...generalClasses(), ...formClasses() }
			: generalClasses();

	//Import context
	const context = useContext(AuthContext);

	//For error messages
	const [errors, setErrors] = useState<any>({});

	//Form Handler
	const { values, onFormChange, onSubmit } = useForm(callLoginUser, {
		email: "",
		password: "",
	});

	// For Constructing Form
	const icons = {
		email: <MailIcon style={{ color: errors.email ? "#F44336" : "#3F51B5" }} />,
		password: (
			<LockIcon style={{ color: errors.password ? "#F44336" : "#3F51B5" }} />
		),
	};

	// Login Mutation
	const [loginUser] = useMutation(LOGIN_USER, {
		update(_, { data }) {
			context.login(data.login);
			props.history.push("/");
		},
		onError(err) {
			const errors = err.graphQLErrors[0]?.extensions?.exception.errors;
			if (errors) {
				setErrors(errors);
			} else {
				setErrors({});
			}
		},
		variables: values,
	});

	function callLoginUser() {
		loginUser();
	}

	return (
		<Container>
			<Paper
				className={classes.main + " " + classes.background}
				elevation={isHomepage ? 0 : 3}
			>
				<UserForm
					name="Login"
					onSubmit={onSubmit}
					onChange={onFormChange}
					values={values}
					errors={errors}
					icons={icons}
				/>
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
