import Modal from "./components/general/Modal";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import ModalManager from "./classes/ModalManager";
import { useState } from "react";

function App() {
	const [modalManager, setModalManager] = useState<ModalManager>(new ModalManager(false));
	return (
			<>
				<Navbar modalManager={modalManager} setModalManager={setModalManager}></Navbar>
				<main>
					<PostList classes="mt-5"></PostList>
				</main>
				{ modalManager.show && <Modal>
					<div className='w-[30%] bg-white shadow-sm rounded-lg p-9'>
						Zoom Class is available now
						<div>
							<button onClick={() => { modalManager.control(false, setModalManager) }} className='bg-green-300 w-[151px] h-[44px]'>Close Modal</button>
						</div>		
					</div>
					
				</Modal> }

			</>
		   );
}

export default App;



