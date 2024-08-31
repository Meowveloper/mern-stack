import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Blog from "../types/Blog";
import apiPrefix from "../utilities/apiPrefix";
import { useEffect } from "react";
export default function BlogDetail() {
    const params = useParams();
    const { data : blog , loading, error } = useFetch<Blog>(`${apiPrefix}/blogs/${params.id}`);
    const navigate= useNavigate();
    useEffect(() => {
        if(!!error) {
            setTimeout(() => {
                if(window.confirm("Error loading blog data, do you wish to go back to home page???")) {
                    navigate('/');
                }
            }, 2000)
        }
    }, [error , navigate])
    return (

        <div className="BlogDetail">
            { !!error && <div>{error}</div>}
            { loading && <div>loading...</div>}
            { !!blog && (
                <div className="mt-5">
                    <div className="text-[24px] font-bold">{ blog.title }</div>
                    <div className="text-gray-500">Posted by - <span className="font-bold">{ blog.author }</span></div>
                    <div className="text-justify">{ blog.body }</div>
                </div>
            )}
        </div>
    )
}