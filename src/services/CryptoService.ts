import {genSalt, hash, compare} from "bcrypt";

export default class CryptoService {
    public static randomSecret(minLength: number = 6, maxLength: number = 30) {
        const seed = "ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxz0123456789!@#$%^&*()-=_+";
        const secretLength = Math.floor(minLength + Math.random()*(maxLength-minLength));
        let secret = "";
        for (let i = 0; i < secretLength; i++) {
            const seedIndex = Math.floor(Math.random()*(seed.length-1));
            secret += seed[seedIndex];
        }
        return secret;
    }

    public static async hashPassword(password: string) {
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        const hashPassword = await hash(password, salt);
        return hashPassword;
    }

    public static async checkPassword(password: string, hashPassword: string) {
        return await compare(password, hashPassword);
    }
}