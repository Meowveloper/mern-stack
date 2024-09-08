import RecipeController from "../controllers/RecipeController";
const express = require("express");
import { body } from "express-validator";
const router = express.Router();
import { handleErrorMessage, multerErrorHandler} from "../middleware/handleErrorMessage";
import upload from "../helpers/uploadImage";
import { Request } from "express";

const RecipeValidationArray = [body("title").notEmpty().withMessage("title is required"), body("description").notEmpty().withMessage("description is required"), body("ingredients").notEmpty().isArray({ min: 3 }).withMessage("ingredients must have at least 3 items")]  

router.get("", RecipeController.index);
router.get("/:id", RecipeController.show);
router.post("/:id/upload-photo", [
    upload.single('image'),
    multerErrorHandler,
    body('image').custom((value, {req}) => {
        if(!req.file) {
            throw new Error("image is required");

        } if(!req.file.mimetype.startsWith('image')) {
            throw new Error('Invalid file type or extension');
        }
         else {
            return true;
        }
    }), 
    handleErrorMessage
], RecipeController.uploadPhoto);
router.post("", RecipeValidationArray , handleErrorMessage, RecipeController.store);
router.patch("/:id", RecipeValidationArray , RecipeController.update);
router.delete("/:id", RecipeController.destroy);

export default router;
