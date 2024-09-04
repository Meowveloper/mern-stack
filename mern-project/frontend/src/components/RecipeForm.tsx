import React, { FormEvent, useEffect, useState } from "react";
import Ingredients from "./Ingredients";
import IRecipe from "../types/IRecipe";
import EnumRecipeFormActions from "../types/EnumRecipeFormActions";
import axios from "axios";
import apiPrefix from "../utilities/apiPrefix";
import { useNavigate, useParams } from "react-router-dom";
import EnumRoutes from "../types/EnumRoutes";
import IRecipeError from "../types/IRecipeError";
interface Props {
    formAction : EnumRecipeFormActions.Store | EnumRecipeFormActions.Update
}
export default function RecipeForm({ formAction } : Props) {
    const [ ingredients, setIngredients ] = useState<string[]>([] as string[]);
    const [ newIngredient, setNewIngredient ] = useState<string>("");
    const [ title, setTitle ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');
    const [ recipeStoreErrors, setRecipeStoreErrors ] = useState<IRecipeError>({} as IRecipeError);
    const navigate = useNavigate(); 
    const params = useParams();
    const editId = params.id || null;
    useEffect(() => {
        if(editId) {
            axios.get(`${apiPrefix}/recipes/${editId}`).then(response => {
                console.log('recipe-edit/RecipeForm', response);
                setTitle((response.data as IRecipe).title);
                setDescription((response.data as IRecipe).description);
                setIngredients((response.data as IRecipe).ingredients);
            })
        }
    }, [editId]) 
    return (
        <form action="" className="space-y-4" onSubmit={ formAction === EnumRecipeFormActions.Store ? createRecipe : updateRecipe }>
            <input onInput={ (e) => { setTitle((e.target as HTMLInputElement).value); }} value={title} type="text" name="" placeholder="title" className=" placeholder:text-gray-500 w-full px-4 py-2" id="" />
            { !!recipeStoreErrors.title && <div className="text-red-600 font-bold">{ recipeStoreErrors.title.msg }</div> }
            <textarea onInput={ (e) => { setDescription((e.target as HTMLTextAreaElement).value); }} value={description} name="" id="" className="placeholder:text-gray-500 w-full px-4 py-2" placeholder="description" rows={5}></textarea>
            { !!recipeStoreErrors.description && <div className="text-red-600 font-bold">{ recipeStoreErrors.description.msg }</div> }
            <div className="flex justify-between items-center gap-3">
                <input
                    onInput={e => {
                        setNewIngredient((e.target as HTMLInputElement).value);
                    }}
                    value={newIngredient}
                    type="text"
                    name=""
                    id=""
                    className="w-full px-4 py-2 placeholder:text-gray-500"
                    placeholder="ingredient"
                />
                <span onClick={addNewIngredient} className="w-[20px] h-[20px] rounded-full leading-[20px] text-center bg-brand text-white cursor-pointer">
                    +
                </span>
            </div>
            { !!recipeStoreErrors.ingredients && <div className="text-red-600 font-bold">{ recipeStoreErrors.ingredients.msg }</div> }
            {!!ingredients.length && <Ingredients ingredients={ingredients} />}

            { formAction == EnumRecipeFormActions.Store &&  <button type="submit" className="w-full px-3 py-3 bg-brand rounded-button text-white">Create</button> }
            { formAction == EnumRecipeFormActions.Update &&  <button type="submit" className="w-full px-3 py-3 bg-brand rounded-button text-white">Update</button> }

        </form>
    );
    function addNewIngredient() {
        setIngredients((prev: string[]) => [...prev, newIngredient]);
        setNewIngredient("");
    }

    function createRecipe (e : FormEvent) {
        e.preventDefault();
        const recipe : IRecipe = {
            title, 
            description, 
            ingredients
        } 

        axios.post(`${apiPrefix}/recipes`, recipe).then(response => {
            console.log("recipe create", response);
            setTitle('');
            setDescription('');
            setIngredients([] as string[]);
            navigate(EnumRoutes.Home);
        }).catch(error => {
            setRecipeStoreErrors(error.response.data.errors);
        })
    }

    function updateRecipe (e : FormEvent) {
        e.preventDefault();
        const recipe : IRecipe = {
            title, 
            description, 
            ingredients
        }
        axios.patch(`${apiPrefix}/recipes/${editId}`, recipe).then(() => {
            navigate(EnumRoutes.Home);
        }).catch(error => {
            setRecipeStoreErrors(error.response.data.errors);
        });
    }
}
