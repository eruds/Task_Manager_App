import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import {
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
	ApolloClient,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { AuthProvider } from "./context/auth";

import AuthRoute from "./utils/AuthRoute.js";
import Navbar from "./components/general/Navbar";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList/TodoList";
import Skills from "./components/SkillPage/SkillsPage";
import WorkoutPage from "./components/WorkoutPage/WorkoutPage";

import "./App.css";

const http = createHttpLink({
	uri: "http://localhost:4000",
});

const authLink = setContext(() => {
	const token = localStorage.getItem("jwtToken");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(http),
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<Router>
					<Switch>
						<Route exact path="/">
							<Navbar />
							<AuthRoute
								exact
								path="/"
								redirect="/home"
								nonUser={false}
								component={LandingPage}
							/>
						</Route>
						<Route path="*">
							<Navbar />
							<Switch>
								<AuthRoute
									exact
									path="/home"
									redirect="/"
									nonUser={true}
									component={Home}
								/>
								<AuthRoute
									exact
									path="/login"
									redirect="/home"
									nonUser={false}
									component={Login}
								/>
								<AuthRoute
									exact
									path="/register"
									redirect="/home"
									nonUser={false}
									component={Register}
								/>
								<AuthRoute
									exact
									path="/workout"
									redirect="/home"
									nonUser={true}
									component={WorkoutPage}
								/>
								{/* <AuthRoute
									exact
									path="/todos"
									redirect="/home"
									nonUser={true}
									component={TodoList}
								/> */}
								<AuthRoute
									exact
									path="/skills"
									redirect="/home"
									nonUser={true}
									component={Skills}
								/>

								<Route exact path="*">
									<Redirect to="/" />
								</Route>
							</Switch>
						</Route>
					</Switch>
				</Router>
			</AuthProvider>
		</ApolloProvider>
	);
}
