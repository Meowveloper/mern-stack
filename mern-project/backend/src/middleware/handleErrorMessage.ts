import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import multer from "multer";

export function handleErrorMessage (req : Request, res : Response, next : NextFunction) {
    const result = validationResult(req);

    if(!result.isEmpty()) res.status(400).json({ errors : result.mapped() });
    else next();
}

export const multerErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError || err.message === 'Invalid file type, only images are allowed') {
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