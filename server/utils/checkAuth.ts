import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { AuthenticationError } from "apollo-server";

export const checkAuth = (context: any) => {
	const authHeader = context.authHeader;
	if (authHeader) {
		const token = authHeader.split("Bearer ")[1];
		if (token) {
			try {
				const user = jwt.verify(token, SECRET_KEY);
				return user;
			} catch (err) {
				throw new AuthenticationError("Token Invalid/Expired");
			}
		}
	} else {
		throw new AuthenticationError("Authentication header must be provided");
	}
};
