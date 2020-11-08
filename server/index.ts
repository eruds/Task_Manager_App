import { ApolloServer, AuthenticationError } from "apollo-server";
import Express from "express"; //? Do I really need Express?
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import jwt from "jsonwebtoken";

import { resolvers } from "./graphql/resolvers";
import { MONGODB, SECRET_KEY } from "./config";

const main = async () => {
	// Building graphql schema
	const schema = await buildSchema({
		resolvers,
		emitSchemaFile: true,
		validate: false,
	});

	// Connecting to mongoDB using mongoose
	const mongoose = await connect(MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	await mongoose.connection; //? What Does This Do?

	const PORT: string | number = process.env.port || 5000;
	// Connecting to ApolloServer
	const server = new ApolloServer({
		schema,
		context: ({ req }) => {
			const authHeader = req.headers.authorization || "";
			return { authHeader };
		},
	});
	server.listen().then(({ url }) => {
		console.log(`Server started at ${url}`);
	});
};

//? What is this anyway
main().catch((err) => {
	console.log(err);
});
