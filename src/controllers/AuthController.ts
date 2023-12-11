import { Router } from "express";
import { createRequestHandler } from "../middlewares/handler";
import UnauthorizedError from "../errors/UnauthorizedError";
import AuthService from "../services/AuthService";

const AuthController = Router();

AuthController.get("/", createRequestHandler(async (req, res) => {
    const credential = req.query.credential;
    if (credential && typeof credential == "string") {
        const authData = await AuthService.loginWithGoogle(credential);
        res.status(200).send(authData);
    } else {
        throw new UnauthorizedError();
    }
}));

export default AuthController;