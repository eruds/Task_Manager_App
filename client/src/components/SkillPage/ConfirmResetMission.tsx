import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@material-ui/core";

interface Props {
	resetFunction: () => void;
	open: boolean;
	setOpen: any;
}

export default function ConfirmResetMission({
	resetFunction,
	open,
	setOpen,
}: Props) {
	return (
		<Dialog open={open}>
			<DialogTitle>Reset this mission?</DialogTitle>
			<DialogContent>
				Are you sure you want to reset your progress on this mission? All
				progress will be lost and time spent on this mission will revert back to
				0.
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Cancel</Button>
				<Button
					onClick={() => {
						resetFunction();
						setOpen(false);
					}}
				>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}
