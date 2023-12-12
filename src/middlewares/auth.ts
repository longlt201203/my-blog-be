import { AccountModel } from "../entities/Account";
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

export function initApi(code: string) {
    return createRequestHandler(async (req, res, next) => {
        const { initCode } = req.params;
        const count = await AccountModel.countDocuments();
        if (initCode == code && count == 0) {
            if (next) next();
        } else {
            throw new UnauthorizedError("You dont't have permission to do this!");
        }
    });
}