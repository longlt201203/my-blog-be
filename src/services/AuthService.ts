import jwt from "jsonwebtoken";
import { Account } from "../entities/Account";
import Env from "../env";
import ServiceError from "../errors/ServiceError";
import AccountsService from "./AccountsService";
import UnauthorizedError from "../errors/UnauthorizedError";
import { OAuth2Client } from "google-auth-library";
import CryptoService from "./CryptoService";

export default class AuthService {
    public static signJwtToken(account: Account) {
        const signData = {}
        const token = jwt.sign(signData, Env.JWT_SECRET, {
            algorithm: "HS256",
            subject: account._id.toString(),
            issuer: "Long Dep Trai Chu Con Ai Vao Day Nua",
            expiresIn: "999d"
        });
        return token;
    }

    public static async verifyJwtToken(token: string) {
        try {
            const j = jwt.verify(token, Env.JWT_SECRET);
            if (typeof j == "string") {
                throw new Error(`Invalid data when verify JWT token: ${j}`);
            } else {
                if (j.sub) {
                    const account = await AccountsService.getAccountById(j.sub);
                    if (account) {
                        return account;
                    } else {
                        throw new UnauthorizedError("Account not found!");
                    }
                } else {
                    throw new UnauthorizedError("Account ID not found!");
                }
            }
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `AuthService.verifyJwtToken`;
            serviceError.error = err;
            throw serviceError;
        }
    }

    public static async loginWithGoogle(credential: string) {
        try {
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: Env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            if (payload && payload.email) {
                const email = payload.email;
                const account = await AccountsService.getAccountByInfo(email);
                if (account) {
                    const token = this.signJwtToken(account);
                    return { accessToken: token };
                } else {
                    throw new UnauthorizedError();
                }
            } else {
                throw new Error("Payload error!");
            }
        } catch (err) {
            if (err instanceof UnauthorizedError) {
                throw err;
            } else {
                const serviceError = new ServiceError();
                serviceError.action = `AuthService.loginWithGoogle`;
                serviceError.error = err;
                throw serviceError;
            }
        }
    }

    public static async loginWithInfoAndPassword(info: string, password: string) {
        const account = await AccountsService.getAccountByInfo(info);
        if (account && await CryptoService.checkPassword(password, account.password)) {
            const token = this.signJwtToken(account);
            return { accessToken: token };
        } else {
            throw new UnauthorizedError("Wrong info or password!");
        }
    }
}