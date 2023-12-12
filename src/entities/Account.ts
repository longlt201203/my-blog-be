import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword, Length } from "class-validator";
import mongoose, { Schema, Types } from "mongoose";

export interface Account {
    _id: Types.ObjectId;
    username: string;
    password: string;
    email: string;
    phone: string;
}

const AccountSchema = new Schema<Account>({
    _id: { type: Schema.Types.ObjectId, default: new Types.ObjectId(), required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, require: true, unique: true }
});

export const AccountModel = mongoose.model("Account", AccountSchema);

export class CreateAccountDto {
    @IsString()
    @Length(6, 30)
    username: string;

    @IsStrongPassword({ minLength: 6, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 })
    password: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber("VN")
    phone: string;
}

export class UpdateAccountDto implements Omit<CreateAccountDto, "password"> {
    @IsString()
    @Length(6, 30)
    username: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber("VN")
    phone: string;
}