import { ClassConstructor } from "class-transformer"
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request } from "express"
import { createRequestHandler } from "./handler";
import DtoValidationError from "../errors/DtoValidationError";

export const validateBody = <T>(clazz: ClassConstructor<T>) => {
    return createRequestHandler(async (req, res, next) => {
        req.body = plainToClass(clazz, req.body);
        const errors = await validate(req.body);
        if (errors.length > 0) {
            throw new DtoValidationError(errors);
        } else {
            if (next) next();
        }
    });
}

export const validateParams = <T>(clazz: ClassConstructor<T>) => {
    return createRequestHandler(async (req: Request<T>, res, next) => {
        req.params = plainToClass(clazz, req.params);
        const errors = await validate(req.params as object);
        if (errors.length > 0) {
            throw new DtoValidationError(errors);
        } else {
            if (next) next();
        }
    });
}

export const validateQuery = <T>(clazz: ClassConstructor<T>) => {
    return createRequestHandler(async (req: Request<T>, res, next) => {
        req.params = plainToClass(clazz, req.query);
        const errors = await validate(req.params as object);
        if (errors.length > 0) {
            throw new DtoValidationError(errors);
        } else {
            if (next) next();
        }
    });
}