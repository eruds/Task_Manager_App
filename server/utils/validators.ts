export const validateRegisterInput = (
	username: string,
	email: string,
	password: string,
	confirmPassword: string
) => {
	const errors = <any>{};
	if (username.trim() === "") {
		errors.username = "Username must not be empty";
	}
	if (email.trim() === "") {
		errors.email = "Email must not be empty";
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = "Email must be a valid email address";
		}
	}
	if (password === "" || confirmPassword === "") {
		if (password === "") {
			errors.password = "Password must not empty";
		}
		if (confirmPassword === "") {
			errors.confirmPassword = "Confirm Password mush not be empty";
		}
	}
	if (password !== confirmPassword) {
		errors.confirmPassword = "Passwords must match";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

export const validateLoginInput = (email: string, password: string) => {
	const errors = <any>{};
	if (email.trim() === "") {
		errors.email = "Email must not be empty";
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = "Email must be a valid email address";
		}
	}
	if (password.trim() === "") {
		errors.password = "Password must not be empty";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

// function checkProgress(progress: string) {
// 	let response: number = 0;
// 	if (progress === "Beginner") {
// 		return response;
// 	} else if (progress === "Amateur") {
// 		response = 400;
// 	} else if (progress === "Intermediate") {
// 		response === 3000;
// 	} else if (progress === "Expert") {
// 		response === 8000;
// 	} else if (progress === "Master") {
// 		response === 10000;
// 	}

// 	return response;
// }
