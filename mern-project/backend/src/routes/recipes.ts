import RecipeController from "../controllers/RecipeController";
const express = require("express");
import { body } from "express-validator";
const router = express.Router();
import handleErrorMessage from "../middleware/handleErrorMessage";

const RecipeValidationArray = [body("title").notEmpty().withMessage("title is required"), body("description").notEmpty().withMessage("description is required"), body("ingredients").notEmpty().isArray({ min: 3 }).withMessage("ingredients must have at least 3 items")]  

router.get("", RecipeController.index);
router.get("/:id", RecipeController.show);
router.post("", RecipeValidationArray , handleErrorMessage, RecipeController.store);
router.patch("/:id", RecipeValidationArray , RecipeController.update);
router.delete("/:id", RecipeController.destroy);

export default router;
