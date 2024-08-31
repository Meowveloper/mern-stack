import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='max-w-[1200px] mx-auto'>
      <nav className='flex justify-between items-center my-4 border-b border-[#555555]'>
        <div className='text-[30px] font-[bold]'>My Blogs</div>
        <ul className='flex justify-start items-center gap-4'>
          <li>
            <NavLink to='/' className='text-[#555555]'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/about' className='text-[#555555]'>About</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
