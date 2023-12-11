import { NextFunction, Request, Response, Router } from "express";
import LocalFilesController from "./controllers/LocalFilesController";
import TagsController from "./controllers/TagsController";
import ServiceError from "./errors/ServiceError";
import UnauthorizedError from "./errors/UnauthorizedError";
import AuthController from "./controllers/AuthController";

const router = Router();

// controllers
router.use("/auth", AuthController);
router.use("/local-files", LocalFilesController);
router.use("/tags", TagsController);
// handle 404
router.use((req, res, next) => {
    res.status(404).send({ message: "API Not Found" });
});
// handle 500
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ServiceError) {
        res.status(400).send({
            message: err.message,
            action: err.action,
            details: err.error
        });
    } else if (err instanceof UnauthorizedError) {
        res.status(401).send({
            message: err.message
        });
    } else {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
router.use(errorHandler);

export default router;