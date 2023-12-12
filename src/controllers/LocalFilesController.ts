import { Router } from "express";
import upload from "../middlewares/upload";
import LocalFilesService from "../services/LocalFilesService";
import * as path from "path";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate";
import { LocalFilesFilterDto, UpdateLocalFileDto } from "../entities/LocalFile";
import { createRequestHandler } from "../middlewares/handler";
import * as fs from "fs";
import MessageError from "../errors/MessageError";
import authenticated from "../middlewares/auth";

const LocalFilesController = Router();

LocalFilesController.get("/:id", createRequestHandler(async (req, res) => {
    let { id } = req.params;
    const localFile = await LocalFilesService.getFileInfo(id);
    if (localFile) {
        res.status(200).send(localFile);
    } else {
        res.status(404).send(MessageError.fileNotFoundError(id));
    }
}));

LocalFilesController.get("/file/:id", createRequestHandler(async (req, res) => {
    let { id } = req.params;
    const localFile = await LocalFilesService.getFileInfo(id);
    if (localFile) {
        res.status(200).sendFile(path.join(__dirname, "../..", localFile.filePath));
    } else {
        res.status(404).send(MessageError.fileNotFoundError(id));
    }
}));

LocalFilesController.get("/", validateQuery(LocalFilesFilterDto), createRequestHandler(async (req, res) => {
    const listFiles = await LocalFilesService.getListFiles(req.params);
    res.status(200).send(listFiles);
}));

LocalFilesController.post("/", authenticated(), upload.array("files"), createRequestHandler(async (req, res) => {
    const localFiles = await LocalFilesService.uploadFiles(Object.values(req.files ?? []));
    res.status(200).send(localFiles);
}));

LocalFilesController.patch("/:id", authenticated(), validateBody(UpdateLocalFileDto), createRequestHandler(async (req, res) => {
    const { id } = req.params;
    const localFile = await LocalFilesService.updateFileInfo(id, req.body as UpdateLocalFileDto);
    if (localFile) {
        res.status(200).send(localFile);
    } else {
        res.status(404).send(MessageError.fileNotFoundError(id));
    }
}));

LocalFilesController.delete("/:id", authenticated(), createRequestHandler(async (req, res) => {
        const { id } = req.params;
        const localFile = await LocalFilesService.deleteFile(id);
        if (localFile.value && fs.existsSync(localFile.value.filePath)) {
            fs.unlinkSync(localFile.value.filePath);
            console.log(`File ${localFile.value.filePath} is deleted.`);
        }
        res.sendStatus(200);
}));

export default LocalFilesController;