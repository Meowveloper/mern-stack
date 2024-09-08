import React, { FormEvent, useEffect, useState } from "react";
import Ingredients from "./Ingredients";
import IRecipe from "../types/IRecipe";
import EnumRecipeFormActions from "../types/EnumRecipeFormActions";
import { useNavigate, useParams } from "react-router-dom";
import EnumRoutes from "../types/EnumRoutes";
import IRecipeError from "../types/IRecipeError";
import axios from "../utilities/axios";
interface Props {
    formAction: EnumRecipeFormActions.Store | EnumRecipeFormActions.Update;
}
export default function RecipeForm({ formAction }: Props) {
    const [ingredients, setIngredients] = useState<string[]>([] as string[]);
    const [newIngredient, setNewIngredient] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>("");
    const [description, setDescription] = useState<string>("");
    const [recipeStoreErrors, setRecipeStoreErrors] = useState<IRecipeError>({} as IRecipeError);
    const [ createLoading , setCreateLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const params = useParams();
    const editId = params.id || null;
    useEffect(() => {
        if (editId) {
            axios.get(`/recipes/${editId}`).then(response => {
                console.log("recipe-edit/RecipeForm", response);
                setTitle((response.data.data as IRecipe).title);
                setDescription((response.data.data as IRecipe).description);
                setIngredients((response.data.data as IRecipe).ingredients);
                if((response.data.data as IRecipe).image) {
                    setImagePreview(`http://localhost:8000${response.data.data.image}`);
                }
            });
        }
    }, [editId]);
    return (
        <form action="" className="space-y-4" onSubmit={formAction === EnumRecipeFormActions.Store ? createRecipe : updateRecipe}>
            <input
                onInput={e => {
                    setTitle((e.target as HTMLInputElement).value);
                }}
                value={title}
                type="text"
                name=""
                placeholder="title"
                className=" placeholder:text-gray-500 w-full px-4 py-2"
                id=""
            />
            {!!recipeStoreErrors.title && <div className="text-red-600 font-bold">{recipeStoreErrors.title.msg}</div>}

            <input type="file" onChange={uploadImage} accept="image/*" name="" id="" />
            {!!imagePreview && <img src={imagePreview} />}
            <textarea
                onInput={e => {
                    setDescription((e.target as HTMLTextAreaElement).value);
                }}
                value={description}
                name=""
                id=""
                className="placeholder:text-gray-500 w-full px-4 py-2"
                placeholder="description"
                rows={5}
            ></textarea>
            {!!recipeStoreErrors.description && <div className="text-red-600 font-bold">{recipeStoreErrors.description.msg}</div>}
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
            {!!recipeStoreErrors.ingredients && <div className="text-red-600 font-bold">{recipeStoreErrors.ingredients.msg}</div>}
            {!!ingredients.length && <Ingredients ingredients={ingredients} />}

            {formAction == EnumRecipeFormActions.Store && (
                <button type="submit" className="w-full px-3 py-3 bg-brand rounded-button text-white">
                    { createLoading ? 'Loading....' : 'Create' }
                </button>
            )}
            {formAction == EnumRecipeFormActions.Update && (
                <button type="submit" className="w-full px-3 py-3 bg-brand rounded-button text-white">
                    Update
                </button>
            )}
        </form>
    );
    function addNewIngredient() {
        setIngredients((prev: string[]) => [...prev, newIngredient]);
        setNewIngredient("");
    }

    function createRecipe(e: FormEvent) {
        e.preventDefault();
        setCreateLoading(true);
        const recipe: IRecipe = {
            title,
            description,
            ingredients,
        };

        axios
            .post(`/recipes`, recipe)
            .then(response => {
                console.log("recipe create", response.data.data);
                setTitle("");
                setDescription("");
                setIngredients([] as string[]);
                const formData = new FormData();
                if (image) formData.set("image", image);
                axios.post(`/recipes/${response.data.data._id}/upload-photo`, formData, {
                    headers: {
                        "Content-Type": "multipart/formdata",
                    },
                });
                navigate(EnumRoutes.Home);
            })
            .catch(error => {
                setRecipeStoreErrors(error.response.data.errors);
            }).finally(() => {
                setCreateLoading(false);
            });
    }

    function updateRecipe(e: FormEvent) {
        e.preventDefault();
        const recipe: IRecipe = {
            title,
            description,
            ingredients,
        };
        axios
            .patch(`/recipes/${editId}`, recipe)
            .then(() => {
                const formData = new FormData();
                if (image) formData.set("image", image);
                axios.post(`/recipes/${editId}/upload-photo`, formData, {
                    headers: {
                        "Content-Type": "multipart/formdata",
                    },
                });
                navigate(EnumRoutes.Home);
            })
            .catch(error => {
                setRecipeStoreErrors(error.response.data.errors);
            });
    }

    function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]); // Set the selected file only if files is not null and contains at least one file

            const fileReader = new FileReader();

            fileReader.onload = e => {
                const result = e.target?.result;
                if (result && typeof result === "string") {
                    setImagePreview(result); // Set only if it's a string
                }
            };

            fileReader.readAsDataURL(files[0]); // Read the file as a data URL
        }
    }
}
