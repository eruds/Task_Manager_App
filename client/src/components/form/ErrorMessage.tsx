import React from "react";
import { CardContent, Card, Typography } from "@material-ui/core";
import { formErrorMessage } from "../styles/general";

export default function ErrorMessage({ errors }: any) {
	const classes = formErrorMessage();
	return (
		<Card variant="outlined" className={classes.card}>
			<CardContent>
				<Typography variant="h6" className={classes.text}>
					An Error has occured
				</Typography>
				{Object.values(errors).map((value: any, index: number) => {
					return (
						<Typography
							key={index}
							variant="subtitle1"
							className={classes.text}
						>
							{index + 1 + ". " + value}
						</Typography>
					);
				})}
			</CardContent>
		</Card>
	);
}
