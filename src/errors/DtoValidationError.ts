import { ValidationError } from "class-validator";

export default class DtoValidationError extends Error {
    details: Array<ValidationError>;

    constructor(errors: Array<ValidationError>) {
        super("Validation Error!");
        this.details = errors;
    }
}