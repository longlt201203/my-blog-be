import { AccountModel } from "../entities/Account";
import ServiceError from "../errors/ServiceError";

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

    public static async getAccountByEmail(email: string) {
        const account = await AccountModel.findOne({ email: email });
        return account;
    }
}