import { useState } from 'react';
import { Post , Posts , Status} from '../../classes/Post';
import ModalManager from '../../classes/ModalManager';
interface Props {
	posts : Posts;
	setPosts : React.Dispatch<React.SetStateAction<Posts>>;
	modalManager : ModalManager;
	setModalManager : React.Dispatch<React.SetStateAction<ModalManager>>;
}


export default function PostForm (props : Props) {
	const [ post, setPost ] = useState<Post>(new Post(new Date().getTime(), "", Status.Ongoing));
	function addPost () : void {
		props.posts.addPost(post, props.setPosts);
		props.modalManager.control(false, props.setModalManager);
	}
	return (
		<form>
			<div className="text-[20px] text-center font-bold">Create a Post</div>
			<div>
				<div>Title</div>
				<input value={post.title} onInput={ (e) => post.setTitle((e.target as HTMLInputElement).value , setPost) } type="text" name="title" className="border border-gray outline-none px-4 py-2 w-full rounded-[3px]"/>
			</div>

			<div>
				<div>Status</div>
				<select value={post.status} onChange={ (e) => post.setStatus(((e.target as HTMLSelectElement).value as Status), setPost) }>
					<option value={Status.Dropped}>Dropped</option>
					<option value={Status.Ongoing}>Ongoing</option>
					<option value={Status.Upcoming}>Upcoming</option>
				</select>
			</div>

			<div className="mt-4 text-center">
				<button onClick={() => {addPost();}} type="button" className="bg-green-300 w-[151px] h-[44px]">
					Post Now
				</button>
			</div>
			<div className="mt-4 text-center">
				<button onClick={ () => { post.setTitle('', setPost) } } type="button" className="bg-green-300 w-[151px] h-[44px]">
					Reset Form
				</button>
			</div>
		</form>
	);
}
