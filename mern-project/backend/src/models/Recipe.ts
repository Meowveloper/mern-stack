import mongoose, { Schema , Document, Model , ObjectId } from 'mongoose';

export interface IRecipe extends Document {
    _id : ObjectId;
    title : string;
    description : string;
    ingredients : string[];
    createdAt? : Date;
    updatedAt? : Date;
}

const RecipeSchema : Schema<IRecipe> = new Schema({
    title : {
        type : String, 
        required : true
    }, 

    description : {
        type : String, 
        required : true
    }, 

    ingredients : {
        type : [String], 
        required : true
    }
}, { timestamps : true });


export const Recipe : Model<IRecipe> = mongoose.model<IRecipe>('Recipe', RecipeSchema);