import { useState } from "react";

export const useForm = (callback: () => any, initialValues: any = {}) => {
	const [values, setValues] = useState(initialValues);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		callback();
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[e.target.id]: e.target.value,
		});
	};

	return {
		values,
		onSubmit,
		onChange,
	};
};
