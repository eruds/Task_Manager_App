import { ApolloServer } from "apollo-server";
import Express from "express"; //? Do I really need Express?
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";

import { resolvers } from "./graphql/resolvers";
import { MONGODB } from "./config";

// const PORT = process.env.port || 5000;
const PORT = 5000;

const main = async () => {
	const schema = await buildSchema({
		resolvers,
		emitSchemaFile: true,
		validate: false,
	});

	const mongoose = await connect(MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	await mongoose.connection; //? What Does This Do?

	// Connecting to ApolloServer
	//? Theres something called bootstraping in TypeGraphQL
	const server = new ApolloServer({
		schema,
		context: ({ req }) => req,
	});
	server.listen().then(({ port: PORT }) => {
		console.log(`Server started at ${PORT}`);
	});
};

//? What is this anyway
main().catch((err) => {
	console.log(err);
});
