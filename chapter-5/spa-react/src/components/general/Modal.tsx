import React, { ReactNode } from 'react'
import ReactDom from 'react-dom';
interface Props {
    children? : ReactNode
}

export default function Modal(props : Props) {
	const modalPortal = document.getElementById('modal');
	if(!!!modalPortal) return null;
  return (
	ReactDom.createPortal(
    <div className='w-full h-full fixed top-0 left-0 flex justify-center items-center' style={{ backgroundColor : 'rgba(0,0,0,0.5)' }}>
        { props.children }
    </div>, modalPortal)
  )
}
