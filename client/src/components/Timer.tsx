import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";

import { useForm } from "../utils/hooks";

// * timer stops slighly after pressing stop

export default function Timer() {
	const [time, setTime] = useState<number>(20 * 60);
	const [start, setTimer] = useState<boolean>(false);
	const { values, onChange } = useForm(() => {}, {
		time: "",
	});

	function startTimer() {
		setTimer(!start);
		if (values.time === "") {
			values.time = 20;
		}
		setTime(values.time * 60);
	}

	useEffect(() => {
		try {
			if (start) {
				if (time === 0 || !start) {
					return () => clearTimeout(timer);
				}
				const timer = setTimeout(() => {
					if (start) {
						setTime(time - 1);
					}
				}, 1000);
			}
			//! FIX THIS
		} catch (err) {
			console.log(err);
		}
	});

	const minutes = Math.floor(time / 60);
	const seconds = time - minutes * 60;
	const format =
		(minutes < 10 ? "0" + minutes : minutes) +
		" : " +
		(seconds < 10 ? "0" + seconds : seconds);
	return (
		<Container maxWidth="xs">
			<Typography
				variant="h3"
				color="initial"
				align="center"
				style={{ margin: "1.3rem 0" }}
			>
				{format}
			</Typography>

			{!start && (
				//? Maybe add fade animation
				<Container style={{ margin: "1.3rem 0" }}>
					<form autoComplete="off">
						<TextField
							id="time"
							label=""
							type="int"
							value={values.time}
							onChange={onChange}
							size="small"
						/>
					</form>
				</Container>
			)}

			<Button onClick={() => startTimer()} fullWidth>
				{start ? "Stop Pomo" : "Start Pomo"}
			</Button>
		</Container>
	);
}
