import { Router } from "express";
import { createRequestHandler } from "../middlewares/handler";
import { validateBody } from "../middlewares/validate";
import { CreateAccountDto, UpdateAccountDto } from "../entities/Account";
import AccountsService from "../services/AccountsService";
import authenticated, { initApi } from "../middlewares/auth";
import Env from "../env";

const AccountsController = Router();

AccountsController.post("/:initCode", initApi(Env.INIT_CODE), validateBody(CreateAccountDto), createRequestHandler(async (req, res) => {
    const dto = req.body as CreateAccountDto;
    const account = await AccountsService.createAccount(dto);
    res.status(200).send(account);
}));

AccountsController.post("/", authenticated(), validateBody(CreateAccountDto), createRequestHandler(async (req, res) => {
    const dto = req.body as CreateAccountDto;
    const account = await AccountsService.createAccount(dto);
    res.status(200).send(account);
}));

AccountsController.patch("/:id", authenticated(), validateBody(UpdateAccountDto), createRequestHandler(async (req, res) => {
    const { id } = req.params;
    const dto = req.body as CreateAccountDto;
    const account = await AccountsService.updateAccount(id, dto);
    res.status(200).send(account);
}));

export default AccountsController;