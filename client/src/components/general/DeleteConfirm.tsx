import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@material-ui/core";

interface Props {
	deleteFunction: () => void;
	open: boolean;
	setOpen: any;
	item: any;
	type: "Skill" | "Challenge" | "Mission";
}

export default function DeleteConfirm({
	deleteFunction,
	open,
	item,
	setOpen,
	type,
}: Props) {
	let itemName = item?.title;
	let extraMessage = "";
	if (type === "Skill") {
		extraMessage =
			"If you choose to confirm, all progress would be lost and you won't be able to retrieve it.";
	}
	return (
		<Dialog open={open}>
			<DialogTitle>Delete {type}?</DialogTitle>
			<DialogContent>
				Are you sure you want to delete the {itemName} {type}? {extraMessage}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Cancel</Button>
				<Button
					onClick={() => {
						deleteFunction();
						setOpen(false);
						// window.location.pathname = "/skills";
					}}
				>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}
