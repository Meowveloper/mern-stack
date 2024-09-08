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
const removeFile_1 = __importDefault(require("../helpers/removeFile"));
const User_1 = __importDefault(require("../models/User"));
const emails_1 = require("../routes/emails");
const fs = require("fs").promises;
const emailQueue_1 = __importDefault(require("../queues/emailQueue"));
// Reusable function for finding and updating a recipe
const findAndUpdateRecipe = (id, updateData, res, justImgUpload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "not a valid id" });
        }
        const recipe = yield Recipe_1.Recipe.findByIdAndUpdate(id, updateData, { new: true });
        if (!recipe) {
            return res.status(404).json({ msg: "recipe not found" });
        }
        if (!justImgUpload) {
            yield (0, removeFile_1.default)(__dirname + "/../../public" + recipe.image);
        }
        return res.status(200).json({ data: recipe });
    }
    catch (e) {
        return res.status(500).json({ msg: "internal server error" });
    }
});
const RecipeController = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = 6;
        const page = !!req.query.page && !!Number(req.query.page) ? Number(req.query.page) : 1;
        const recipes = yield Recipe_1.Recipe.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        const totalRecipeCount = yield Recipe_1.Recipe.countDocuments();
        const totalPageCount = Math.ceil(totalRecipeCount / limit);
        const links = {
            nextPage: page < totalPageCount,
            previousPage: page > 1,
            currentPage: page,
            loopAbleLinks: (0, generateLoopAbleLinks_1.default)(totalPageCount),
        };
        return res.json({ data: recipes, links: links });
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ msg: "not a valid id" });
            }
            const recipe = yield Recipe_1.Recipe.findById(req.params.id);
            if (!recipe) {
                return res.status(404).json({ msg: "recipe not found" });
            }
            return res.json({ data: recipe });
        }
        catch (e) {
            return res.status(500).json({ msg: "internal server error" });
        }
    }),
    store: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const recipe = new Recipe_1.Recipe(req.body);
            yield recipe.save();
            const users = yield User_1.default.find({}, { name: 1, email: 1 });
            const userEmails = users.map(item => item.email).filter(item => { var _a; return item !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.email); });
            const forQueueJob = {
                viewFile: emails_1.EnumViewFiles.Email,
                data: {
                    name: req.user.name
                },
                to: userEmails,
                from: req.user.email,
                subject: 'Recipe Created'
            };
            emailQueue_1.default.add(forQueueJob);
            return res.status(200).send({
                data: recipe,
                msg: "successfully created",
            });
        }
        catch (e) {
            return res.status(500).send({ msg: "internal server error" });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Reuse the find and update logic here
        return findAndUpdateRecipe(req.params.id, req.body, res, false);
    }),
    destroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ msg: "not a valid id" });
            }
            const recipe = yield Recipe_1.Recipe.findByIdAndDelete(req.params.id);
            if (!recipe) {
                return res.status(404).json({ msg: "recipe not found" });
            }
            yield (0, removeFile_1.default)(__dirname + "/../../public" + recipe.image);
            return res.json({ data: recipe });
        }
        catch (e) {
            return res.status(500).json({ msg: "internal server error" });
        }
    }),
    uploadPhoto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.file) {
                return res.status(400).json({ msg: "image is required" });
            }
            // Assuming req.file.filename contains the path to the saved image
            const imageUpdateData = { image: `/${req.file.filename}` };
            // Reuse the find and update logic here
            return findAndUpdateRecipe(req.params.id, imageUpdateData, res, true);
        }
        catch (e) {
            return res.status(500).json({ msg: "internal server error" });
        }
    }),
};
exports.default = RecipeController;
