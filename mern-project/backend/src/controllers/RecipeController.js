"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe_1 = require("../models/Recipe");
const mongoose_1 = __importDefault(require("mongoose"));
const generateLoopAbleLinks_1 = __importDefault(require("../helpers/generateLoopAbleLinks"));
const RecipeController = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = 6;
        const page = (!!req.query.page && !!Number(req.query.page)) ? Number(req.query.page) : 1;
        const recipes = yield Recipe_1.Recipe
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        const totalRecipeCount = yield Recipe_1.Recipe.countDocuments();
        const totalPageCount = Math.ceil(totalRecipeCount / limit);
        const links = {
            nextPage: page < totalPageCount,
            previousPage: page > 1,
            currentPage: page,
            loopAbleLinks: (0, generateLoopAbleLinks_1.default)(totalPageCount)
        };
        return res.json({ data: recipes, links: links });
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                res.status(400).json({ msg: "not a valid id" });
            }
            const recipe = yield Recipe_1.Recipe.findById(req.params.id);
            if (!!!recipe) {
                res.status(404).json({ msg: "recipe not found" });
            }
            else
                return res.json(recipe);
        }
        catch (e) {
            res.status(500).json({ msg: "internal server error" });
        }
    }),
    store: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const recipe = new Recipe_1.Recipe(req.body);
        yield recipe.save();
        return res.status(200).json(recipe);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                res.status(400).json({ msg: "not a valid id" });
            }
            const recipe = yield Recipe_1.Recipe.findByIdAndUpdate(req.params.id, Object.assign({}, req.body));
            if (!!!recipe) {
                res.status(404).json({ msg: "recipe not found" });
            }
            else
                return res.json(recipe);
        }
        catch (e) {
            res.status(500).json({ msg: "internal server error" });
        }
    }),
    destroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                res.status(400).json({ msg: "not a valid id" });
            }
            const recipe = yield Recipe_1.Recipe.findByIdAndDelete(req.params.id);
            if (!!!recipe) {
                res.status(404).json({ msg: "recipe not found" });
            }
            else
                return res.json(recipe);
        }
        catch (e) {
            res.status(500).json({ msg: "internal server error" });
        }
    })
};
exports.default = RecipeController;
