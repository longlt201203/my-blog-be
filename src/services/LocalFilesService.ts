import { Types } from "mongoose";
import { LocalFileModel, LocalFilesFilterDto, UpdateLocalFileDto } from "../entities/LocalFile";
import ServiceError from "../errors/ServiceError";

export default class LocalFilesService {
    public static async uploadFiles(files: Express.Multer.File[]) {
        const localFiles = [];
        for (let file of files) {
            const localFile = new LocalFileModel({
                _id: new Types.ObjectId(),
                filePath: `${file.destination}/${file.filename}`,
                aliasName: file.filename.split('.')[0]
            });
            localFiles.push(localFile);
        }
        return await LocalFileModel.insertMany(localFiles);
    }

    public static async getListFiles(filter: LocalFilesFilterDto) {
        const page = filter.page ?? 1;
        const perPage = filter.perPage ?? 20;
        
        const localFiles = await LocalFileModel
                            .find({})
                            .limit(perPage)
                            .skip((page-1)*perPage)
                            .exec();

        return localFiles.map(item => ({
            ...item.toObject(),
            link: `http://localhost:3000/local-files/file/${item._id.toString()}`
        }));
    }

    public static async getFileInfo(id: string) {
        try {
            const localFile = await LocalFileModel.findById(id);
            return localFile;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `LocalFilesService.uploadFiles`;
            serviceError.error = err;
            throw serviceError;
        }
    }

    public static async updateFileInfo(id: string, info: UpdateLocalFileDto) {
        try {
            const localFile = await LocalFileModel.findByIdAndUpdate(id, {
                aliasName: info.aliasName
            }, { new: true });
            return localFile;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `LocalFilesService.updateFileInfo`;
            serviceError.error = err;
            throw serviceError;
        }
    }

    public static async deleteFile(id: string) {
        try {
            const localFile = await LocalFileModel.findByIdAndDelete(id);
            return localFile;
        } catch (err) {
            const serviceError = new ServiceError();
            serviceError.action = `LocalFilesService.updateFileInfo`;
            serviceError.error = err;
            throw serviceError;
        }
    }
}