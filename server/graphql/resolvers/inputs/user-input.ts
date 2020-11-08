import { InputType, ID, Field } from "type-graphql";
import { User } from "../../../models/User";

@InputType({ description: "User Create Input Field" })
export class CreateUserInput implements Partial<User> {
	@Field()
	username!: string;

	//TODO : Add Email Validation
	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field()
	confirmPassword!: string;
}

//TODO Need Fixing
@InputType({ description: "User Login Input Field" })
export class LoginInput implements Partial<User> {
	@Field()
	email!: string;

	@Field()
	password!: string;
}
