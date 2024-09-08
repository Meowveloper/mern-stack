"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '/../../public'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-recipcity-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // Check if the file is an image
    if (!file.mimetype.startsWith('image')) {
        return cb(new Error('Invalid file type, only images are allowed'));
    }
    cb(null, true);
};
const uploadImage = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
exports.default = uploadImage;
