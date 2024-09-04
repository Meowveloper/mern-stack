import { Request, Response } from 'express';
import { IRecipe, Recipe } from '../models/Recipe';
import mongoose from 'mongoose';
import IPaginationLinks from '../types/IPaginationLinks';
import generateLoopAbleLinks from '../helpers/generateLoopAbleLinks';
const RecipeController = {
    index : async ( req : Request, res: Response ) => {
        const limit : number = 6;
        const page : number = (!!req.query.page && !!Number(req.query.page)) ? Number(req.query.page) : 1;
        const recipes : IRecipe[] = await Recipe
        .find()
        .skip((page -1) * limit)
        .limit(limit) 
        .sort({ createdAt : -1 });
        const totalRecipeCount : number = await Recipe.countDocuments();
        const totalPageCount : number = Math.ceil(totalRecipeCount/limit);
        const links : IPaginationLinks = {
            nextPage : page < totalPageCount, 
            previousPage : page > 1, 
            currentPage : page, 
            loopAbleLinks : generateLoopAbleLinks(totalPageCount)  
        };
        return res.json({ data : recipes, links : links });
    }, 

    show : async (req : Request, res : Response) => {
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
                res.status(400).json({ msg : "not a valid id" });
            }
            const recipe : IRecipe | null = await Recipe.findById(req.params.id)
            if(!!!recipe) {
                res.status(404).json({ msg : "recipe not found" });
            }
            else return res.json(recipe);
        } catch (e) {
            res.status(500).json({ msg : "internal server error" });
        }
    }, 

    store : async (req : Request, res : Response) => {
        const recipe : IRecipe = new Recipe(req.body);
        await recipe.save();
        return res.status(200).json(recipe);
    }, 

    update : async (req : Request, res : Response) => {
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
                res.status(400).json({ msg : "not a valid id" });
            }
            const recipe : IRecipe | null = await Recipe.findByIdAndUpdate(req.params.id, {
                ...req.body
            });
            if(!!!recipe) {
                res.status(404).json({ msg : "recipe not found" });
            }
            else return res.json(recipe);
        } catch (e) {
            res.status(500).json({ msg : "internal server error" });
        }
    }, 

    destroy : async (req : Request, res : Response) => {
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
                res.status(400).json({ msg : "not a valid id" });
            }
            const recipe : IRecipe | null = await Recipe.findByIdAndDelete(req.params.id)
            if(!!!recipe) {
                res.status(404).json({ msg : "recipe not found" });
            }
            else return res.json(recipe);
        } catch (e) {
            res.status(500).json({ msg : "internal server error" });
        }
    }
}
export default RecipeController;