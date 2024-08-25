import React, { ReactNode } from 'react'
import ReactDom from 'react-dom';
import ModalManager from '../../classes/ModalManager';
interface Props {
    children? : ReactNode;
	modalManager : ModalManager;
	setModalManager : React.Dispatch<React.SetStateAction<ModalManager>>;
}

export default function Modal(props : Props) {
	const modalPortal = document.getElementById('modal');
	if(!!!modalPortal) return null;
  return (
	ReactDom.createPortal(
    <div className='w-full h-full fixed top-0 left-0 flex flex-col justify-center items-center' style={{ backgroundColor : 'rgba(0,0,0,0.5)' }}>
        { props.children }
			<button onClick={() => { props.modalManager.control(false, props.setModalManager) }} className='bg-green-300 w-[151px] h-[44px]'>
									Close Modal
								</button>
    </div>, modalPortal)
  )
}
