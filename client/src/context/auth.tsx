import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { User, Todo } from "../utils/typeDefs";

const initialState = {
	user: { id: "", todos: new Array<Todo>() },
};

const token: string | null = localStorage.getItem("jwtToken");

if (token) {
	const decoded: any = jwtDecode(token);
	if (decoded.exp * 1000 < Date.now()) {
		localStorage.removeItem("jwtToken");
	} else {
		initialState.user = decoded;
	}
}

export const AuthContext = createContext({
	user: initialState.user,
	login: (userData: User) => {},
	logout: () => {},
});

//?  Change this later for a better typescript integration
function AuthReducer(state: any, action: any) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: initialState.user,
			};
		default:
			return state;
	}
}

export function AuthProvider(props: any) {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	function login(userData: User) {
		localStorage.setItem("jwtToken", userData.token);
		dispatch({
			type: "LOGIN",
			payload: userData,
		});
	}

	function logout() {
		localStorage.removeItem("jwtToken");
		dispatch({ type: "LOGOUT" });
	}

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
}
