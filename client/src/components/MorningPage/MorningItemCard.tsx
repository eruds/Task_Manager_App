import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Draggable } from "react-beautiful-dnd";
import moment from "moment";
import {
	Button,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { MorningItem } from "../../utils/typeDefs";

const morningCardClasses = makeStyles({
	card: {
		marginBottom: "10px",
	},
});

interface MorningItemCardProps {
	item: MorningItem;
	index: number;
	finishedAt?: string;
	setFinishedAt: any;
	started?: boolean;
	isActive?: boolean;
	changeActive: any;
	isDragDisabled: boolean;
}

export default function MorningItemCard({
	item,
	index,
	finishedAt,
	setFinishedAt,
	started,
	isActive,
	changeActive,
	isDragDisabled,
}: MorningItemCardProps) {
	const classes = morningCardClasses();

	// Delete MorningItem
	const [deleteMorningItem] = useMutation(DELETE_ITEM, {
		onError(err) {
			console.log(err);
		},
		variables: {
			itemId: item.id,
		},
	});

	const finishTask = () => {
		const time = moment(new Date()).format("hh:mm");
		setFinishedAt(time);
		changeActive();
	};

	return (
		<Draggable
			draggableId={item.id}
			index={index}
			isDragDisabled={isDragDisabled}
		>
			{(provided) => (
				<Card
					variant="outlined"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={classes.card}
				>
					<CardContent style={{ display: "flex" }}>
						<div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
							<Typography variant="body1">{item.title}</Typography>
						</div>
						{started ? (
							isActive ? (
								<Button
									onClick={(e) => {
										finishTask();
									}}
								>
									Finish
								</Button>
							) : (
								<div>
									<Typography variant="body1">{finishedAt}</Typography>
								</div>
							)
						) : (
							<IconButton onClick={() => deleteMorningItem()}>
								<DeleteForeverIcon />
							</IconButton>
						)}
					</CardContent>
				</Card>
			)}
		</Draggable>
	);
}

const DELETE_ITEM = gql`
	mutation deleteMorningItem($itemId: String!) {
		deleteMorningItem(itemId: $itemId) {
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
