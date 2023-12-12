import { Types } from "mongoose";
import { AccountModel, CreateAccountDto, UpdateAccountDto } from "../entities/Account";
import ServiceError from "../errors/ServiceError";
import { ValidationError } from "class-validator";
import CryptoService from "./CryptoService";
import DtoValidationError from "../errors/DtoValidationError";

export default class AccountsService {
    public static async getAccountById(id: string) {
        try {
            const account = await AccountModel.findById(id);
            return account;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `AccountsService.getAccountById`;
            serviceError.error = err;
            throw serviceError;
        }
    }

    public static async getAccountByInfo(info: string) {
        const account = await AccountModel.findOne({
            $or: [
                {
                    email: info,
                },
                {
                    username: info,
                },
                {
                    phone: info
                }
            ]
        });
        return account;
    }

    public static async createAccount(dto: CreateAccountDto) {
        const errors: Array<ValidationError> = [];
        // Check username, email, phone
        const checkResult = await Promise.all([
            AccountModel.findOne({ username: dto.username }),
            AccountModel.findOne({ username: dto.email }),
            AccountModel.findOne({ username: dto.phone })
        ]);

        if (checkResult[0]) {
            // Username error
            const ve = new ValidationError();
            ve.property = "username";
            ve.constraints = { isUnique: "Username already existed" };
            errors.push(ve);
        }
        if (checkResult[1]) {
            // Email error
            const ve = new ValidationError();
            ve.property = "email";
            ve.constraints = { isUnique: "Email already existed" };
            errors.push(ve);
        }
        if (checkResult[2]) {
            // Phone error
            const ve = new ValidationError();
            ve.property = "phone";
            ve.constraints = { isUnique: "Phone already existed" };
            errors.push(ve);
        }

        if (errors.length > 0) {
            throw new DtoValidationError(errors);
        }

        try {
            const account = new AccountModel({
                ...dto,
                password: await CryptoService.hashPassword(dto.password),
                _id: new Types.ObjectId()
            });
    
            return await account.save();
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `AccountsService.createAccount`;
            serviceError.error = err;
            throw serviceError;
        }
    }

    public static async updateAccount(id: string, dto: UpdateAccountDto) {
        const errors: Array<ValidationError> = [];
        // Check username, email, phone
        const checkResult = await Promise.all([
            AccountModel.findOne({ _id: { $ne: id }, username: dto.username }),
            AccountModel.findOne({ _id: { $ne: id }, username: dto.email }),
            AccountModel.findOne({ _id: { $ne: id }, username: dto.phone })
        ]);

        if (checkResult[0]) {
            // Username error
            const ve = new ValidationError();
            ve.property = "username";
            ve.constraints = { isUnique: "Username already existed" };
            errors.push(ve);
        }
        if (checkResult[1]) {
            // Email error
            const ve = new ValidationError();
            ve.property = "email";
            ve.constraints = { isUnique: "Email already existed" };
            errors.push(ve);
        }
        if (checkResult[2]) {
            // Phone error
            const ve = new ValidationError();
            ve.property = "phone";
            ve.constraints = { isUnique: "Phone already existed" };
            errors.push(ve);
        }

        if (errors.length > 0) {
            throw new DtoValidationError(errors);
        }

        try {
            const account = await AccountModel.findByIdAndUpdate(id, {
                username: dto.username,
                email: dto.email,
                phone: dto.phone
            }, { new: true });
            return account;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `AccountsService.updateAccount`;
            serviceError.error = err;
            throw serviceError;
        }
    }
}