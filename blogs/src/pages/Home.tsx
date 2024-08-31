import React from 'react';
import useFetch from '../hooks/useFetch';
import apiPrefix from '../utilities/apiPrefix';
import Blog from '../types/Blog';
import { NavLink } from 'react-router-dom';
export default function Home () {
    const { data : blogs, loading, error } = useFetch<Blog[]>(`${apiPrefix}/blogs`);
    return (
        <div className='Home'>
            { loading && <div>loading....</div>}
            { !!error && <div>{ error }</div>}
            { !!blogs && blogs.map((item : Blog) => (
                <div className='p-5 border border-gray-600 rounded-[30px] shadow my-5' key={item.id}>
                    <div className='text-[24px] font-[bold]'>{ item.title }</div>
                    <div>Posted by - { item.author }</div>
                    <button>
                        <NavLink to={`/blogs/${item.id}`} className='text-[14px] text-[#555555]'>read more</NavLink>
                    </button>
                </div>
            ))}
        </div>
    );
}