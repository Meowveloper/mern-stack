import { Outlet } from 'react-router-dom'
import Nav from './components/general/Nav'

function App() {

  return (
    <>
     <Nav></Nav> 
      <div className='p-5 bg-main-bg min-h-[100vh]'>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
