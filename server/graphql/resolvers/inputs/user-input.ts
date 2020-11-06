import { InputType, ID, Field } from "type-graphql";

@InputType({ description: "User Create Input Field" })
export class CreateUserInput {
	@Field()
	username!: string;

	//TODO : Add Email Validation
	@Field()
	email!: string;

	@Field()
	password!: string;
}
