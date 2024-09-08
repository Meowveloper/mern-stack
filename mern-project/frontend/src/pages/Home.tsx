import { useEffect, useState } from "react";
import IRecipe from "../types/IRecipe";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/general/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import IPaginationLinks from "../types/IPaginationLinks";
import axios from '../utilities/axios';
import EnumRoutes from "../types/EnumRoutes";

export default function Home () {
    const [ recipes, setRecipes ] =  useState<IRecipe[]>([] as IRecipe[]);
    const [ paginationLinks, setPaginationLinks ] = useState<IPaginationLinks | null>(null);
    const navigate = useNavigate()
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search);
    const page = Number(searchQuery.get('page')) || 1;
    useEffect(() => {
        axios.get(`/recipes?page=${page}`).then((response) => {
            console.log("recipe array from home page", response);
            setRecipes(response.data.data as IRecipe[]);
            setPaginationLinks(response.data.links as IPaginationLinks);
            window.scroll({top : 0, left : 0, behavior : 'smooth'})
        })
    }, [page])
    return (
        <div>
            <div className="grid grid-cols-3 gap-3 mb-4">
                { !!recipes.length && recipes.map((item : IRecipe) => (
                    <RecipeCard key={item._id} item={item} deleteRecipe={deleteRecipe}></RecipeCard>
                ))}
                
            </div>
                { !!paginationLinks && <Pagination paginationLinks={paginationLinks} /> }
        </div>
    );


    function deleteRecipe (_id : IRecipe['_id']) {
        axios.delete(`/recipes/${_id}`).then(() => {
            setRecipes((prev : IRecipe[]) => prev.filter((item : IRecipe) => item._id !== _id));
            if(recipes.length === 1 && page > 1) navigate(`${EnumRoutes.Home}?page=${page - 1}`); 
        }).catch(e => {
            console.error(e);
        });
    }
}