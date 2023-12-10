import { IsNotEmpty, IsOptional } from "class-validator";
import mongoose, { Types, Schema } from "mongoose";
import FilterDto from "../utils/FilterDto";

export interface Tag {
    _id: Types.ObjectId;
    name: string;
    description: string;
}

const TagSchema = new Schema<Tag>({
    _id: { type: Schema.Types.ObjectId, required: true, default: new Types.ObjectId() },
    name: { type: String, required: true },
    description: { type: String }
});

export const TagModel = mongoose.model("Tag", TagSchema);

export class CreateTagDto {
    @IsNotEmpty()
    name: string;
    
    @IsOptional()
    description?: string;
}

export class UpdateTagDto extends CreateTagDto {

}

export class TagFilterDto extends FilterDto {

} 