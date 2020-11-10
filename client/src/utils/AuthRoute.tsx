import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function AuthRoute({ Component, ...rest }: { Component: any }) {
	const user = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				return user ? <Redirect to="/" /> : <Component {...props} />;
			}}
		/>
	);
}
