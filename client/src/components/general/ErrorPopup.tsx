import React from "react";
import { Snackbar } from "@material-ui/core";

interface ErrorComponentInput {
	message: string;
	open: boolean;
	openErrorMessage: () => void;
	closeErrorMessage: (
		event?: React.SyntheticEvent<Element, Event> | undefined,
		reason?: string | undefined
	) => void;
}

export default function ErrorPopup({
	message,
	open,
	closeErrorMessage,
}: ErrorComponentInput) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			message={message}
			onClose={closeErrorMessage}
		/>
	);
}
