import React from 'react';
import ModalManager from "../../classes/ModalManager";
interface Props {
	modalManager : ModalManager;
	setModalManager : React.Dispatch<React.SetStateAction<ModalManager>>; 
}
export default function Navbar(props : Props) {
  return (
    <nav className='flex justify-between px-3 items-center bg-lime-300'>
        <div className='font-bold text-[34px]'>LOGO</div> 
        <ul className='flex justify-start items-center gap-4'>
          <li>Home</li>
          <li>Posts</li>
		  <li className='cursor-pointer' onClick={ () => { props.modalManager.control(true, props.setModalManager) } }>Create Post</li>
        </ul>
    </nav>
  )
}
