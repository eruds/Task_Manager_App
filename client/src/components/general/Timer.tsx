import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";

import { useForm } from "../../utils/hooks";

// * timer stops slighly after pressing stop

export default function Timer() {
	const [time, setTime] = useState<number>(20 * 60);
	const [start, setTimer] = useState<boolean>(false);
	const [initialTime, setInitialTime] = useState<number>(time);
	const { values, onFormChange } = useForm(() => {}, {
		time: "",
	});

	function startTimer() {
		if (values.time !== "") {
			setTime(values.time * 60);
			setInitialTime(time);
		}

		setTimer(true);
	}

	function stopTimer() {
		setTimer(false);
		setTime(initialTime);
	}

	useEffect(() => {
		if (start) {
			const timer =
				time > 0
					? setTimeout(() => setTime(time - 1), 1000)
					: setTimeout(() => {}, 1000);
			if (time === 0) {
				setTimer(false);
			}
			return () => clearTimeout(timer);
		}
	}, [time, start]);

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
							onChange={onFormChange}
							size="small"
						/>
					</form>
				</Container>
			)}

			<Button
				onClick={() => {
					if (start) {
						stopTimer();
					} else {
						startTimer();
					}
				}}
				fullWidth
			>
				{start ? "Stop Pomo" : "Start Pomo"}
			</Button>
		</Container>
	);
}
