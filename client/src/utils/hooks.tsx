import { useState } from "react";

export const useForm = (callback: () => any, initialValues: any = {}) => {
	const [values, setValues] = useState(initialValues);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValues(initialValues);
		callback();
	};

	const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[e.target.id]: e.target.value,
		});
	};

	return {
		values,
		onSubmit,
		onFormChange,
	};
};

export const useModal = () => {
	const [open, setOpen] = useState(false);

	const openModal = () => {
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
	};

	return {
		open,
		openModal,
		closeModal,
	};
};
