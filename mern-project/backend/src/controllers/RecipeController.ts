import { Request, Response } from "express";
import { IRecipe, Recipe } from "../models/Recipe";
import mongoose from "mongoose";
import IPaginationLinks from "../types/IPaginationLinks";
import generateLoopAbleLinks from "../helpers/generateLoopAbleLinks";
import removeFile from "../helpers/removeFile";
import User, { IUser } from "../models/User";
import sendEmail, { IParams } from "../helpers/sendEmail";
import { EnumViewFiles } from "../routes/emails";
const fs = require("fs").promises;
import emailQueue from "../queues/emailQueue";
// Reusable function for finding and updating a recipe
const findAndUpdateRecipe = async (id: string, updateData: Partial<IRecipe>, res: Response, justImgUpload: boolean) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "not a valid id" });
        }
        const recipe: IRecipe | null = await Recipe.findByIdAndUpdate(id, updateData, { new: true });
        if (!recipe) {
            return res.status(404).json({ msg: "recipe not found" });
        }
        if (!justImgUpload) {
            await removeFile(__dirname + "/../../public" + recipe.image);
        }

        return res.status(200).json({ data: recipe });
    } catch (e) {
        return res.status(500).json({ msg: "internal server error" });
    }
};

const RecipeController = {
    index: async (req: Request, res: Response) => {
        const limit: number = 6;
        const page: number = !!req.query.page && !!Number(req.query.page) ? Number(req.query.page) : 1;
        const recipes: IRecipe[] = await Recipe.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        const totalRecipeCount: number = await Recipe.countDocuments();
        const totalPageCount: number = Math.ceil(totalRecipeCount / limit);
        const links: IPaginationLinks = {
            nextPage: page < totalPageCount,
            previousPage: page > 1,
            currentPage: page,
            loopAbleLinks: generateLoopAbleLinks(totalPageCount),
        };
        return res.json({ data: recipes, links: links });
    },

    show: async (req: Request, res: Response) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ msg: "not a valid id" });
            }
            const recipe: IRecipe | null = await Recipe.findById(req.params.id);
            if (!recipe) {
                return res.status(404).json({ msg: "recipe not found" });
            }
            return res.json({ data: recipe });
        } catch (e) {
            return res.status(500).json({ msg: "internal server error" });
        }
    },

    store: async (req: Request, res: Response) => {
        try {
            const recipe: IRecipe = new Recipe(req.body);
            await recipe.save();
            const users: Partial<IUser>[] = await User.find({}, { name: 1, email: 1 });
            const userEmails: string[] = users.map(item => item.email!).filter(item => item !== req.user?.email);
            const forQueueJob : IParams = {
                viewFile : EnumViewFiles.Email, 
                data : {
                    name : req.user!.name
                }, 
                to : userEmails, 
                from : req.user!.email, 
                subject : 'Recipe Created' 
            }
            emailQueue.add(forQueueJob);
            return res.status(200).send({
                data: recipe,
                msg: "successfully created",
            });
        } catch (e) {
            return res.status(500).send({ msg: "internal server error" });
        }
    },

    update: async (req: Request, res: Response) => {
        // Reuse the find and update logic here
        return findAndUpdateRecipe(req.params.id, req.body, res, false);
    },

    destroy: async (req: Request, res: Response) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ msg: "not a valid id" });
            }
            const recipe: IRecipe | null = await Recipe.findByIdAndDelete(req.params.id);
            if (!recipe) {
                return res.status(404).json({ msg: "recipe not found" });
            }
            await removeFile(__dirname + "/../../public" + recipe.image);
            return res.json({ data: recipe });
        } catch (e) {
            return res.status(500).json({ msg: "internal server error" });
        }
    },

    uploadPhoto: async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ msg: "image is required" });
            }

            // Assuming req.file.filename contains the path to the saved image
            const imageUpdateData = { image: `/${req.file.filename}` };

            // Reuse the find and update logic here
            return findAndUpdateRecipe(req.params.id, imageUpdateData, res, true);
        } catch (e) {
            return res.status(500).json({ msg: "internal server error" });
        }
    },
};

export default RecipeController;
