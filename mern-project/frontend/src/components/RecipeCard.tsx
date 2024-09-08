import React from "react";
import IRecipe from "../types/IRecipe";
import Ingredients from "./Ingredients";
import { useNavigate } from "react-router-dom";
import EnumRoutes from "../types/EnumRoutes";
interface Props {
  item : IRecipe, 
  deleteRecipe : (_id : IRecipe['_id']) => void;
}
export default function RecipeCard({ item, deleteRecipe } : Props) {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-card shadow p-5 space-y-4">
            <img src={import.meta.env.VITE_BACKEND_URL + item.image} alt="" className="rounded-card" />
            <div className="text-h1 font-bold text-brand">{item.title}</div>
            <div>Description : </div>
            <div>{item.description}</div>
            <Ingredients ingredients={item.ingredients}/> 
            <div>
                <span>Published at - </span>
                <span className="text-gray-500">5 min ago</span>
            </div>
            <button onClick={() => { navigate(`${EnumRoutes.RecipeEdit}/${item._id}`) }} className="bg-brand text-white px-3 py-2 rounded-button me-3">Edit</button>
            <button onClick={ () => { deleteRecipe(item._id); }} className="bg-red-500 text-white px-3 py-2 rounded-button">Delete</button>
        </div>
    );
}
