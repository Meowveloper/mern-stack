import { useState } from 'react';
import { Post, Posts } from '../classes/Post';
interface Props {
    classes? : string;
}

export default function PostList(props : Props) {
    const [ posts, setPosts ] = useState<Posts>(new Posts( [ new Post(1, 'Post 1'), new Post(2, 'Post 2'), new Post(3, 'Post 3') ] ));

    return (
    <div className={props.classes}>
        <div className="font-bold text-[20px] mb-4">Posts</div>
        <div className='flex flex-wrap justify-center items-center gap-2'>
            { !!posts.posts.length && posts.posts.map((item : Post) => (
                <div key={item.id} className='w-[30%] bg-lime-200 shadow-sm rounded-sm p-9'>{item.title}</div>
            )) }
            
        </div>
    </div>
    )
}
