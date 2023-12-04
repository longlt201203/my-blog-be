import { Request, Response, Router } from "express";

const router = Router();

// controllers

// handle 404
router.use((req, res, next) => {
    res.status(404).send({ message: "API Not Found" });
});
// handle 500
const errorHandler = (err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
}
router.use(errorHandler);

export default router;