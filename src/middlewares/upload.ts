import multer, { diskStorage } from "multer";
import * as fs from "fs";

const uploadDir = "uploads";

const storage = diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const [filename, ext] = file.originalname.split('.');
        let i = 1;
        while (fs.existsSync(`${uploadDir}/${filename} (${i})${ext ? `.${ext}` : ""}`)) {
            i++;
        }
        cb(null, `${filename} (${i})${ext ? `.${ext}` : ""}`);
    }
});

const upload = multer({ storage });

export default upload;