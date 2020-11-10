import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
	ApolloClient,
} from "@apollo/client";

import { AuthProvider } from "./context/auth";

import Navbar from "./components/AppBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

const http = createHttpLink({
	uri: "http://localhost:4000",
});

const client = new ApolloClient({
	link: http,
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<Router>
					<Navbar />
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Router>
			</AuthProvider>
		</ApolloProvider>
	);
}
