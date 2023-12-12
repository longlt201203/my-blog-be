import mongoose, { Schema, Types } from "mongoose";

export interface Post {
    _id: Types.ObjectId;
    title: string;
    tags: string[];
    thumbnail_img: string;
    thumbnail_description: string;
    content: string;
}

const PostSchema = new Schema<Post>({
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    thumbnail_img: { type: String, required: true },
    thumbnail_description: { type: String, required: true },
    content: { type: String, required: true }
});

export const PostModel = mongoose.model("Post", PostSchema);