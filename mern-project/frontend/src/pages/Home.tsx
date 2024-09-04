import { useEffect, useState } from "react";
import apiPrefix from "../utilities/apiPrefix";
import IRecipe from "../types/IRecipe";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/general/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import IPaginationLinks from "../types/IPaginationLinks";
import axios from "axios";
import EnumRoutes from "../types/EnumRoutes";

export default function Home () {
    const [ recipes, setRecipes ] =  useState<IRecipe[]>([] as IRecipe[]);
    const [ paginationLinks, setPaginationLinks ] = useState<IPaginationLinks | null>(null);
    const navigate = useNavigate()
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search);
    const page = Number(searchQuery.get('page')) || 1;
    useEffect(() => {
        fetch(`${apiPrefix}/recipes?page=${page}`).then((response) => {
            return response.json();
        }).then((response) => {
            console.log("recipe array from home page", response);
            setRecipes(response.data as IRecipe[]);
            setPaginationLinks(response.links as IPaginationLinks);
            window.scroll({top : 0, left : 0, behavior : 'smooth'})
        })
    }, [page])
    return (
        <div>
            <div className="space-y-4">
                { !!recipes.length && recipes.map((item : IRecipe) => (
                    <RecipeCard key={item._id} item={item} deleteRecipe={deleteRecipe}></RecipeCard>
                ))}
                { !!paginationLinks && <Pagination paginationLinks={paginationLinks} /> }
                
            </div>
        </div>
    );


    function deleteRecipe (_id : IRecipe['_id']) {
        axios.delete(`${apiPrefix}/recipes/${_id}`).then(() => {
            setRecipes((prev : IRecipe[]) => prev.filter((item : IRecipe) => item._id !== _id));
            if(recipes.length === 1 && page > 1) navigate(`${EnumRoutes.Home}?page=${page - 1}`); 
        });
    }
}