import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

// interface propsAuthRoute {
// 	component: any;
// 	rest: {
// 		[x: string]: any;
// 	};
// }

export default function AuthRoute({
	redirect,
	nonUser,
	component: Component,
	...rest
}) {
	const { user } = useContext(AuthContext);
	const checkUser = nonUser ? Boolean(!user) : Boolean(user);
	return (
		<Route {...rest}>
			{checkUser ? <Redirect to={redirect} /> : <Component />}
		</Route>
	);
}
