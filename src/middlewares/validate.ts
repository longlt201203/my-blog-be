import { ClassConstructor } from "class-transformer"
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { NextFunction, Request } from "express"
import { createRequestHandler } from "./handler";

export const validateBody = <T>(clazz: ClassConstructor<T>) => {
    return createRequestHandler(async (req, res, next) => {
        req.body = plainToClass(clazz, req.body);
        const errors = await validate(req.body);
        if (errors.length > 0) {
            res.status(400).send({
                message: "Validation error",
                errors: errors
            });
        } else {
            if (next) next();
        }
    })
}

export const validateParams = <T>(clazz: ClassConstructor<T>) => {
    return createRequestHandler(async (req: Request<T>, res, next) => {
        req.params = plainToClass(clazz, req.params);
        const errors = await validate(req.params as object);
        if (errors.length > 0) {
            res.status(400).send({
                message: "Validation error",
                errors: errors
            });
        } else {
            if (next) next();
        }
    })
}