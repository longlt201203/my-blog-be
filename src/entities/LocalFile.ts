import { IsNotEmpty } from "class-validator";
import mongoose, { Schema, SchemaType, Types } from "mongoose";
import FilterDto from "../utils/FilterDto";

export interface Localfile {
    _id: Types.ObjectId;
    filePath: string;
    aliasName: string;
}

const LocalFileSchema = new Schema<Localfile>({
    _id: { type: Schema.Types.ObjectId, required: true, default: new Types.ObjectId() },
    filePath: { type: String, required: true },
    aliasName: { type: String, required: true }
});

export const LocalFileModel = mongoose.model("LocalFile", LocalFileSchema);

export class UpdateLocalFileDto {
    @IsNotEmpty({ message: "File name cannot be blank" })
    aliasName: string;
}

export class LocalFilesFilterDto extends FilterDto {
    
}