import React, { ReactNode } from 'react'
interface Props {
    children? : ReactNode
}

export default function Modal(props : Props) {
  return (
    <div className='w-full h-full fixed top-0 left-0 flex justify-center items-center' style={{ backgroundColor : 'rgba(0,0,0,0.5)' }}>
        { props.children }
    </div>
  )
}
