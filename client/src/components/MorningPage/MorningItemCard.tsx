import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";
import {
	Button,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { MorningItem } from "../../utils/typeDefs";

interface MorningItemCardProps {
	item: MorningItem;
	finishedAt?: string;
	setFinishedAt: any;
	started?: boolean;
	isActive?: boolean;
	changeActive: any;
}

export default function MorningItemCard({
	item,
	finishedAt,
	setFinishedAt,
	started,
	isActive,
	changeActive,
}: MorningItemCardProps) {
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
		<Card variant="outlined" style={{ marginBottom: "10px" }}>
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
