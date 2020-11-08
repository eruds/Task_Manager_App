import { jwt } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { AuthChecker } from "type-graphql";
import { AuthenticationError } from "apollo-server";

export const authChecker: AuthChecker<any> = ({ context: { user } }, roles) => {
	if (!user) {
		return false;
	} else {
		return true;
	}
};
