import UnauthorizedError from "../errors/UnauthorizedError";
import AuthService from "../services/AuthService";
import { createRequestHandler } from "./handler";

export default function authenticated() {
    return createRequestHandler(async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.slice("Bearer ".length, authHeader.length);
            const account = await AuthService.verifyJwtToken(token);
            req.auth = account;
            if (next) next();
        } else {
            throw new UnauthorizedError();
        }
    });
}