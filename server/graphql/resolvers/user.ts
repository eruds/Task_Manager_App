import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { UserInputError } from "apollo-server";
import { ObjectID } from "mongodb";
import bcrypt from "bcryptjs";

//? Why use @field on type defs? you can just use simple type
//? Learn more about typegraphql
import { User, UserModel } from "../../models/User";
import { Todo } from "../../models/Todo";
import { Skill } from "../../models/Skill";
import { CreateUserInput } from "./inputs/user-input";

@Resolver()
export default class userResolver {
	@Query(() => [User])
	async returnAllUsers() {
		return await UserModel.find();
	}

	@Mutation(() => User)
	async createNewUser(
		@Arg("data") { username, email, password }: CreateUserInput
	): Promise<User> {
		const user = await UserModel.findOne({ username });
		if (user) {
			throw new UserInputError("Username is taken", {
				errors: {
					username: "This username is taken",
				},
			});
		}

		password = await bcrypt.hash(password, 12);
		const newUser = await UserModel.create({
			_id: new ObjectID(),
			username,
			email,
			password,
			todos: new Array<Todo>(),
			skills: new Array<Skill>(),
			createdAt: new Date().toISOString(),
		});
		newUser.save();
		return newUser;
	}
}
