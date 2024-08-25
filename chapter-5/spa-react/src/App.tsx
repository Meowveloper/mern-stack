import Modal from "./components/general/Modal";
import Navbar from "./components/general/Navbar";
import PostList from "./components/post/PostList";
import ModalManager from "./classes/ModalManager";
import { useState } from "react";
import PostForm from './components/post/Form';
import { Post, Posts , Status} from './classes/Post';
function App() {
	const [modalManager, setModalManager] = useState<ModalManager>(new ModalManager(false));
	
    const [ posts, setPosts ] = useState<Posts>(new Posts( [ new Post(1, 'Post 1', Status.Ongoing), new Post(2, 'Post 2', Status.Dropped), new Post(3, 'Post 3', Status.Upcoming) ] ));
	return (
			<>
				<Navbar modalManager={modalManager} setModalManager={setModalManager}></Navbar>
				<main>
					<PostList classes="mt-5" posts={posts}></PostList>
				</main>
				{ modalManager.show && 
					<Modal modalManager={modalManager} setModalManager={setModalManager}>
						<div className='w-[30%] bg-white shadow-sm rounded-lg p-9'>
							<PostForm posts={posts} setPosts={setPosts} modalManager={modalManager} setModalManager={setModalManager}></PostForm>
						</div>
					</Modal> }

			</>
		   );
}

export default App;



