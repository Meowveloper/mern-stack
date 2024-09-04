"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RecipeController_1 = __importDefault(require("../controllers/RecipeController"));
const express = require("express");
const express_validator_1 = require("express-validator");
const router = express.Router();
const handleErrorMessage_1 = __importDefault(require("../middleware/handleErrorMessage"));
const RecipeValidationArray = [(0, express_validator_1.body)("title").notEmpty().withMessage("title is required"), (0, express_validator_1.body)("description").notEmpty().withMessage("description is required"), (0, express_validator_1.body)("ingredients").notEmpty().isArray({ min: 3 }).withMessage("ingredients must have at least 3 items")];
router.get("", RecipeController_1.default.index);
router.get("/:id", RecipeController_1.default.show);
router.post("", RecipeValidationArray, handleErrorMessage_1.default, RecipeController_1.default.store);
router.patch("/:id", RecipeValidationArray, RecipeController_1.default.update);
router.delete("/:id", RecipeController_1.default.destroy);
exports.default = router;
