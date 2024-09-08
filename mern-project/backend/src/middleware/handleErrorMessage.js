"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerErrorHandler = void 0;
exports.handleErrorMessage = handleErrorMessage;
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
function handleErrorMessage(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        res.status(400).json({ errors: result.mapped() });
    else
        next();
}
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError || err.message === 'Invalid file type, only images are allowed') {
        return res.status(400).json({
            errors: {
                image: {
                    type: 'field',
                    msg: err.message,
                    path: 'image',
                    location: 'body',
                },
            },
        });
    }
    next(err); // Pass the error to the next middleware if it's not Multer-specific
};
exports.multerErrorHandler = multerErrorHandler;
