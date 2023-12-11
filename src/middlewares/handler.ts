import { NextFunction, Request, Response } from "express";
import { Account } from "../entities/Account";

export function createRequestHandler<T = any>(handler: (req: Request<T> & { auth?: Account }, res: Response, next?: NextFunction) => void | Promise<void>) {
    return async (req: Request<T> & { auth?: Account }, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}