import MessageError from "./MessageError";

export default class ServiceError extends MessageError {
    action: string;
    error: any;

    constructor() {
        super("Service Error!");
    }
}