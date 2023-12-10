import { NextFunction, Request, Response, Router } from "express";
import LocalFilesController from "./controllers/LocalFilesController";
import TagsController from "./controllers/TagsController";

const router = Router();

// controllers
router.use("/local-files", LocalFilesController);
router.use("/tags", TagsController);
// handle 404
router.use((req, res, next) => {
    res.status(404).send({ message: "API Not Found" });
});
// handle 500
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
}
router.use(errorHandler);

export default router;