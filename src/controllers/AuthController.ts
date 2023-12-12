import { Router } from "express";
import { createRequestHandler } from "../middlewares/handler";
import UnauthorizedError from "../errors/UnauthorizedError";
import AuthService from "../services/AuthService";

const AuthController = Router();

AuthController.use("/", createRequestHandler(async (req, res) => {
    const {mode} = req.query;
    switch (mode) {
        case "google": {
            const {credential} = req.query;
            if (credential && typeof credential == "string") {
                const authData = await AuthService.loginWithGoogle(credential);
                res.status(200).send(authData);
            } else {
                throw new UnauthorizedError();
            }
            break;
        }
        case "info": {
            const {info, password} = req.body;
            const authData = await AuthService.loginWithInfoAndPassword(info, password);
            res.status(200).send(authData);
            break;
        }
        default: {
            throw new UnauthorizedError();
        }
    }
}));

export default AuthController;