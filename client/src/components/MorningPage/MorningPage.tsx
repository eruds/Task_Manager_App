import React, { useState, useContext, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
import { MorningItem } from "../../utils/typeDefs";
import { useForm } from "../../utils/hooks";

interface MorningItemLogInput {
	id: string;
	title: string;
	finishedAt: string;
}

export default function MorningPage() {
	const classes = { ...generalClasses() };
	const { user } = useContext(AuthContext);

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

	//* Form and Adding Task to Morning Schedule
	// Form Handler
	const { values, onSubmit, onFormChange } = useForm(callAddMorningItem, {
		title: "",
	});

	// Add MorningItem
	const [addMorningItem] = useMutation(ADD_ITEM, {
		onError(err) {
			console.log(err);
		},
		variables: values,
	});

	function callAddMorningItem() {
		if (values.title !== "") {
			addMorningItem();
		}
		//! Add Alert Here
	}

	//* Handling State Change for each morning item
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

	// Cancel the morning routine
	const cancelMorning = () => {
		setStarted(false);
		setActive(0);
		setFinishedTime([]);
	};

	//* Sending Data to Backend when Routine is Finished
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

	// Adding Morning Routine to Backend

	useEffect(() => {
		addMorningLog();
	}, [morningLogs, sendData]);

	//* Drag and Drop Functions
	// Edit State handler
	const [editState, setEditState] = useState<boolean>(false);

	// Current schedule to edit
	const [currentSchedule, setCurrentSchedule] = useState(schedule);

	useEffect(() => {
		setCurrentSchedule(schedule);
	}, [schedule]);

	// Reordering function
	const reorder = (
		list: MorningItem[],
		startIndex: number,
		endIndex: number
	): MorningItem[] => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	// Triggers function when drag ended
	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const items: MorningItem[] = reorder(
			currentSchedule,
			result.source.index,
			result.destination.index
		);

		setCurrentSchedule(items);
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
										{!editState && (
											<>
												{currentSchedule.length > 0 && (
													<Button
														onClick={() => {
															setStarted(false);
														}}
													>
														Start
													</Button>
												)}
												<Button type="submit"> Add Task </Button>
											</>
										)}
										<Button onClick={() => setEditState(!editState)}>
											{editState ? "Confirm" : "Edit"}
										</Button>
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
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="Morning_Routine_List">
							{(provided) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									{schedule &&
										currentSchedule.map((item: any, i: number) => {
											return (
												<MorningItemCard
													key={item.id}
													item={item}
													isDragDisabled={!editState}
													index={i}
													started={started}
													isActive={active === i}
													changeActive={changeActive}
													finishedAt={finishedTime[i]}
													setFinishedAt={addNewFinishedTime}
												/>
											);
										})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</Paper>
		</Container>
	);
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
