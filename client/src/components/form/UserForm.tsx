import React from "react";
import { Button, Typography } from "@material-ui/core";

import UserTextInput from "./UserTextInput";
import ErrorMessage from "./ErrorMessage";

import { generalClasses } from "../styles/general";
import { formClasses } from "../styles/formClasses";

interface userFormProps {
	name: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errors: any;
	values: any;
	icons?: any;
}

export default function UserForm({
	name,
	onSubmit,
	onChange,
	errors,
	values,
	icons,
}: userFormProps) {
	const classes = { ...generalClasses(), ...formClasses() };
	return (
		<>
			<Typography
				variant="h3"
				color="inherit"
				align="center"
				style={{ marginBottom: "2rem" }}
			>
				{name}
			</Typography>
			<form
				action="submit"
				onSubmit={onSubmit}
				autoComplete="off"
				className={classes.form}
			>
				{Object.keys(values).map((item) => {
					return (
						<UserTextInput
							key={item}
							name={item}
							value={values[item]}
							error={errors?.[item]}
							onChange={onChange}
							icon={icons[item]}
						/>
					);
				})}

				<Button
					type="submit"
					className={classes.subContent + " " + classes.submitButton}
				>
					{name}
				</Button>
				{Object.keys(errors).length > 0 && <ErrorMessage errors={errors} />}
			</form>
		</>
	);
}
