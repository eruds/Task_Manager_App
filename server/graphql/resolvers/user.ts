import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//? Why use @field on type defs? you can just use simple type
//? Learn more about typegraphql
import { SECRET_KEY } from "../../config";
import {
	validateRegisterInput,
	validateLoginInput,
} from "../../utils/validators";
import { User, UserModel } from "../../models/User";
import { CreateUserInput, LoginInput } from "./inputs/user-input";
import { loginResponseType } from "./inputs/response-type";

function generateToken(user: User) {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
		},
		SECRET_KEY,
		{
			expiresIn: "1h",
		}
	);
}

@Resolver()
export default class userResolver {
	@Query(() => [User])
	async returnAllUsers() {
		return await UserModel.find();
	}

	@Query(() => User)
	async returnUserData(@Arg("userId") userId: string) {
		return await UserModel.findById(userId);
	}

	@Mutation(() => loginResponseType)
	async createNewUser(
		@Arg("data")
		{ username, email, password, confirmPassword }: CreateUserInput
	): Promise<any> {
		const { valid, errors } = validateRegisterInput(
			username,
			email,
			password,
			confirmPassword
		);
		if (!valid) {
			throw new UserInputError("Error", errors);
		}

		const findUser: User | null = await UserModel.findOne({ username });
		if (!findUser) {
			password = await bcrypt.hash(password, 12);
			const newUser = await UserModel.create({
				username,
				email,
				password,
				createdAt: new Date().toISOString(),
				todos: [],
				skills: [],
			});

			const user: any = await newUser.save();
			const token = generateToken(newUser);

			const res: User = {
				...user,
				token,
			};

			return res;
		} else {
			throw new UserInputError("Username is taken", {
				errors: {
					username: "This username is taken",
				},
			});
		}
	}

	//! email need to be perfectly match ( if there is an uppercase difference it creates a problem )
	@Mutation(() => loginResponseType)
	async login(@Arg("data") { email, password }: LoginInput): Promise<any> {
		const { valid, errors } = validateLoginInput(email, password);
		if (!valid) {
			throw new UserInputError("Errors", errors);
		}
		//!Fix this
		const user: any = await UserModel.findOne({ email });
		if (!user) {
			errors.general = "User not found";
			throw new UserInputError("User not Found", errors);
		}

		const match = bcrypt.compare(password, user.password);
		if (!match) {
			errors.general = "Wrong Credentials";
			throw new UserInputError("Wrong Credentials", errors);
		}

		const token = generateToken(user);

		const res = {
			...user._doc,
			id: user._id,
			token,
		};

		return res;
	}
}
