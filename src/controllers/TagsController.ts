import { Router } from "express";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate";
import { CreateTagDto, TagFilterDto, UpdateTagDto } from "../entities/Tag";
import TagsService from "../services/TagsService";
import { createRequestHandler } from "../middlewares/handler";
import MessageError from "../errors/MessageError";

const TagsController = Router();

TagsController.post("/", validateBody(CreateTagDto), createRequestHandler(async (req, res) => {
    const dto = req.body as CreateTagDto;
    const tag = await TagsService.createTag(dto);
    res.status(200).send(tag);
}));

TagsController.get("/", validateParams(TagFilterDto), createRequestHandler(async (req, res) => {
    const listTags = await TagsService.getTags(req.params);
    res.status(200).send(listTags);
}));

TagsController.get("/:id", createRequestHandler(async (req, res) => {
    const { id } = req.params;
    const tag = await TagsService.getTag(id);
    if (tag) {
        res.status(200).send(tag);
    } else {
        res.status(404).send(MessageError.tagNotFoundError(id));
    }
}));

TagsController.patch("/:id", validateBody(UpdateTagDto), createRequestHandler(async (req, res) => {
    const { id } = req.params;
    const dto = req.body as UpdateTagDto;
    const tag = await TagsService.updateTag(id, dto);
    if (tag) {
        res.status(200).send(tag);
    } else {
        res.status(404).send(MessageError.tagNotFoundError(id));
    }
}));

TagsController.delete("/:id", createRequestHandler(async (req, res) => {
    const { id } = req.params;
    const tag = await TagsService.deleteTag(id);
    if (tag) {
        res.status(200).send(tag);
    } else {
        res.status(404).send(MessageError.tagNotFoundError(id));
    }
}));

export default TagsController;