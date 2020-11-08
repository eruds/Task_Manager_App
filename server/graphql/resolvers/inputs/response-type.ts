import { Field, ObjectType } from "type-graphql";
import { User } from "../../../models/User";

@ObjectType()
export class loginResponseType extends User {
	@Field()
	token!: string;
}
