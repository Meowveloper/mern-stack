import Modal from "./components/general/Modal";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";

function App() {

  return (
    <>
      <Navbar></Navbar>
      <main>
        <PostList classes="mt-5"></PostList>
      </main>
      <Modal>
        <div className='w-[30%] bg-white shadow-sm rounded-lg p-9'>Zoom Class is available now</div>
      </Modal>
    </>
  );
}

export default App;


