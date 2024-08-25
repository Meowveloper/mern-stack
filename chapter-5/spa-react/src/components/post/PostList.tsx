import { useState } from 'react';
import { Post, Posts } from '../../classes/Post';
interface Props {
    classes? : string;
	posts : Posts;
}

export default function PostList(props : Props) {

    return (
    <div className={props.classes}>
        <div className="font-bold text-[20px] mb-4">Posts</div>
        <div className='flex flex-wrap justify-center items-center gap-2'>
            { !!props.posts.posts.length && props.posts.posts.map((item : Post) => (
                <div key={item.id} className='w-[30%] bg-lime-200 shadow-sm rounded-sm p-9'>{item.title}</div>
            )) }
            
        </div>
    </div>
    )
}
