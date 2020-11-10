import React, { useState, useEffect } from "react";
import { Container, Fade, Typography, Paper } from "@material-ui/core";

export default function Quote() {
	const [quote, setQuote] = useState<string>("Loading...");
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (quote === "Loading...") {
			fetch("https://quotes.rest/qod")
				.then((res) => res.json())
				.then((data) => {
					const quote = data.contents.quotes[0].quote;
					const person = data.contents.quotes[0].author;
					const message = '"' + quote + '" - ' + person;
					setQuote(message);
				});
			setLoading(false);
			//TODO Add a catch block
		}
	}, [quote]);

	return (
		<Paper className="app-bar-message">
			<Container>
				{isLoading ? (
					<Fade in={true}>
						<Typography variant="body1"> Loading ... </Typography>
					</Fade>
				) : (
					<Fade in={true}>
						<Typography variant="body1"> {quote}</Typography>
					</Fade>
				)}
			</Container>
		</Paper>
	);
}
