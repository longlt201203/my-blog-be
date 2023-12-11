import MessageError from "./MessageError";

export default class UnauthorizedError extends MessageError {
    constructor(message: string = "Unauthorized!") {
        super(message);
    }
}