import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Paper } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import MailIcon from "@material-ui/icons/Mail";

import UserForm from "./form/UserForm";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { generalClasses } from "./styles/general";
import { formClasses } from "./styles/formClasses";

export default function Register(props: any) {
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
	const { values, onChange, onSubmit } = useForm(callregisterUser, {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// For Constructing Form
	const icons = {
		username: (
			<AccountCircle
				style={{ color: errors?.username ? "#F44336" : "#3F51B5" }}
			/>
		),
		email: (
			<MailIcon style={{ color: errors?.email ? "#F44336" : "#3F51B5" }} />
		),
		password: (
			<LockIcon style={{ color: errors?.password ? "#F44336" : "#3F51B5" }} />
		),
		confirmPassword: (
			<LockIcon
				style={{ color: errors?.confirmPassword ? "#F44336" : "#3F51B5" }}
			/>
		),
	};

	//Register Mutation
	const [registerUser] = useMutation(REGISTER_USER, {
		update(_, { data }) {
			context.login(data.createNewUser);
			props.history.push("/");
		},
		onError(err) {
			const errors = err.graphQLErrors[0].extensions?.exception.errors;
			console.log(errors);
			if (errors) {
				setErrors(errors);
			} else {
				setErrors({});
			}
		},
		variables: values,
	});

	function callregisterUser() {
		registerUser();
	}

	return (
		<Container>
			<Paper
				className={classes.main + " " + classes.background}
				elevation={isHomepage ? 0 : 3}
			>
				<UserForm
					name="Register"
					onSubmit={onSubmit}
					onChange={onChange}
					values={values}
					errors={errors}
					icons={icons}
				/>
			</Paper>
		</Container>
	);
}

const REGISTER_USER = gql`
	mutation createNewUser(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		createNewUser(
			data: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
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
