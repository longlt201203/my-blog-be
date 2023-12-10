import { Types } from "mongoose";
import { CreateTagDto, Tag, TagFilterDto, TagModel, UpdateTagDto } from "../entities/Tag";
import GetManyResponseDto from "../utils/GetManyResponseDto";
import ServiceError from "../errors/ServiceError";

export default class TagsService {
    public static async createTag(dto: CreateTagDto) {
        const tag = new TagModel({
            ...dto,
            _id: new Types.ObjectId()
        });
        return await tag.save();
    }

    public static async getTags(filter: TagFilterDto): Promise<GetManyResponseDto<Tag>> {
        const page = filter.page ?? 1;
        const perPage = filter.perPage ?? 40;
        
        const tags = await TagModel
                            .find({})
                            .limit(perPage)
                            .skip((page-1)*perPage)
                            .exec();

        const count = await TagModel.countDocuments({});

        return {
            page: page,
            perPage: perPage,
            nextPage: page*perPage < count ? page+1 : undefined,
            prevPage: page-1 > 0 ? page-1 : undefined,
            data: tags
        };
    }

    public static async getTag(id: string) {
        try {
            const tag = await TagModel.findById(id);
            return tag;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `TagsService.getTag`;
            serviceError.error = err;
            throw serviceError;
        }
    }

    public static async updateTag(id: string, dto: UpdateTagDto) {
        try {
            const tag = await TagModel.findByIdAndUpdate(id, {
                name: dto.name,
                description: dto.description
            }, { new: true });
            return tag;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `TagsService.updateTag`;
            serviceError.error = err;
            throw serviceError;
        }
    }

    public static async deleteTag(id: string) {
        try {
            const tag = await TagModel.findByIdAndDelete(id);
            return tag;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `TagsService.deleteTag`;
            serviceError.error = err;
            throw serviceError;
        }
    }
}