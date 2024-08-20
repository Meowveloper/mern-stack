import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex justify-between px-3 items-center bg-lime-300'>
        <div className='font-bold text-[34px]'>LOGO</div> 
        <ul className='flex justify-start items-center gap-4'>
          <li>Home</li>
          <li>Posts</li>
        </ul>
    </nav>
  )
}
