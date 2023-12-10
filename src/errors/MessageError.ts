export default class MessageError {
    message: string;
    [key: string]: any;

    constructor(message: string) {
        this.message = message;
    }
    
    public static fileNotFoundError(id: string) {
        const error = new MessageError("File not found");
        error.id = id;
        return error;
    }

    public static tagNotFoundError(id: string) {
        const error = new MessageError("Tag not found");
        error.id = id;
        return error;
    }
}