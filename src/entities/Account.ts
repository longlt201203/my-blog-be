import mongoose, { Schema, Types } from "mongoose";

export interface Account {
    _id: Types.ObjectId;
    username: string;
    password: string;
    email: string;
    phone: string;
}

const AccountSchema = new Schema<Account>({});

export const AccountModel = mongoose.model("Account", AccountSchema);