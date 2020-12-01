import React, { useState, useContext, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
	Button,
	Container,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";

import MorningItemCard from "./MorningItemCard";

import { generalClasses } from "../styles/general";
import { AuthContext } from "../../context/auth";
import { MorningItem, MorningItemLog } from "../../utils/typeDefs";
import { useForm } from "../../utils/hooks";

interface MorningItemLogInput {
	id: string;
	title: string;
	finishedAt: string;
}

function MorningTimer({
	isFinished,
	className,
}: {
	isFinished: boolean;
	className: any;
}) {
	const [time, setTime] = useState<number>(0);
	useEffect(() => {
		if (!isFinished) {
			const timer = setInterval(() => {
				setTime(time + 1);
			}, 1000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [time, isFinished]);

	const seconds = time;
	const mins = Math.floor(seconds / 60);
	const hours = Math.floor(mins / 60);
	const formatedSeconds = (seconds % 60 < 10 ? "0" : "") + (seconds % 60);
	const formatedMinutes = (mins < 10 ? "0" : "") + (mins % 60);
	const formatedHours = (hours < 10 ? "0" : "") + (hours % 60);
	const formatedTime: string =
		formatedHours + " : " + formatedMinutes + " : " + formatedSeconds;
	return (
		<div className={className} style={{ marginBottom: "20px" }}>
			<Typography variant="h5">{formatedTime}</Typography>
		</div>
	);
}

export default function MorningPage() {
	const classes = { ...generalClasses() };
	const { user } = useContext(AuthContext);

	// Form
	const { values, onSubmit, onFormChange } = useForm(callAddMorningItem, {
		title: "",
	});

	// Fetching data
	const { data, loading } = useQuery(FETCH_SCHEDULE, {
		onError(err) {
			console.log(err);
		},
		variables: {
			userId: user?.id,
		},
	});

	const schedule: MorningItem[] = loading
		? []
		: data.returnUserData.morning?.schedule;

	// Add MorningItem
	const [addMorningItem] = useMutation(ADD_ITEM, {
		onError(err) {
			console.log(err);
		},
		variables: values,
	});

	function callAddMorningItem() {
		addMorningItem();
	}

	// ActiveItem
	const [active, setActive] = useState<number>(0);

	const changeActive = (n: number = active) => {
		const length = schedule.length;
		if (active < length) {
			setActive(n + 1);
		}
	};

	// SetStart
	const [started, setStarted] = useState<boolean>(false);

	// Finished Time
	const [finishedTime, setFinishedTime] = useState<string[]>([]);
	const addNewFinishedTime = (time: string) => {
		setFinishedTime([...finishedTime, time]);
	};

	// Add Log
	const [morningLogs, setMorningLogs] = useState<MorningItemLogInput[]>([]);
	const [sendData, setSendData] = useState<boolean>(false);

	const [addMorningLog] = useMutation(ADD_LOG, {
		onError(err) {
			console.log(err);
		},
		variables: {
			logs: morningLogs,
		},
	});

	// console.log(morningLogs);

	// Finish Morning Routine
	const finishMorning = () => {
		const logs: Array<MorningItemLogInput> = finishedTime.map(
			(time: any, i: number) => {
				const item = schedule[i];
				return {
					id: item.id,
					title: item.title,
					finishedAt: time,
				};
			}
		);

		setStarted(false);
		setActive(0);
		setFinishedTime([]);
		setMorningLogs(logs);
		setSendData(true);
	};

	useEffect(() => {
		addMorningLog();
	}, [morningLogs, sendData]);

	// Cancel the morning routine

	const cancelMorning = () => {
		setStarted(false);
		setActive(0);
		setFinishedTime([]);
	};

	return (
		<Container className={classes.columnCenterItem}>
			<Paper
				className={classes.main + " " + classes.columnContainer}
				style={{ alignItems: "center" }}
			>
				<div className={classes.section} style={{ minWidth: "30vw" }}>
					<div className={classes.content + " " + classes.columnCenterItem}>
						<WbSunnyOutlinedIcon style={{ fontSize: 150 }} />
					</div>
					<div className={classes.columnCenterItem}>
						<Typography variant="h4" align="center">
							Start your morning!
						</Typography>
					</div>

					<div className={classes.content + " " + classes.columnContainer}>
						{!started ? (
							<>
								<Typography variant="h6" className={classes.columnCenterItem}>
									Add New Task
								</Typography>
								<form action="submit" onSubmit={onSubmit} autoComplete="off">
									<TextField
										id="title"
										value={values.title}
										onChange={onFormChange}
										helperText="Add a new routine to your morning"
										fullWidth
									/>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											paddingTop: "10px",
										}}
									>
										<Button onClick={() => setStarted(true)}>Start</Button>
										<Button type="submit"> Add Task </Button>
									</div>
								</form>
							</>
						) : (
							<>
								<MorningTimer
									isFinished={active === schedule.length}
									className={classes.columnCenterItem}
								/>
								<div
									className={classes.horizontalContainer}
									style={{ justifyContent: "center" }}
								>
									<Button onClick={() => finishMorning()}>Finish</Button>
									<Button onClick={() => cancelMorning()}>Cancel</Button>
								</div>
							</>
						)}
					</div>
					<div>
						{schedule &&
							schedule.map((item: any, i: number) => {
								return (
									<MorningItemCard
										key={item.id}
										item={item}
										started={started}
										isActive={active === i}
										changeActive={changeActive}
										finishedAt={finishedTime[i]}
										setFinishedAt={addNewFinishedTime}
									/>
								);
							})}
					</div>
				</div>
			</Paper>
		</Container>
	);
}

const FETCH_SCHEDULE = gql`
	query returnUserData($userId: String!) {
		returnUserData(userId: $userId) {
			id
			morning {
				schedule {
					id
					title
				}
			}
		}
	}
`;

const ADD_ITEM = gql`
	mutation addMorningItem($title: String!) {
		addMorningItem(title: $title) {
			id
			morning {
				schedule {
					id
					title
				}
			}
		}
	}
`;

const ADD_LOG = gql`
	mutation addMorningLog($logs: [MorningItemLogInput!]!) {
		addMorningLog(logs: $logs) {
			id
			morning {
				schedule {
					id
					title
				}
			}
		}
	}
`;
