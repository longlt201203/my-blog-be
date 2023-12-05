import { NextFunction, Request, Response } from "express";

export function createRequestHandler<T = any>(handler: (req: Request<T>, res: Response, next?: NextFunction) => void | Promise<void>) {
    return async (req: Request<T>, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}