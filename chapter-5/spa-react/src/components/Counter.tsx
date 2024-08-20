import React, { useState } from 'react'

export default function Counter() {
  const [ count, setCount ] = useState<Count>(new Count(1));
  return (
    <div className='mt-6'>
      <h1 className="font-bold text-[34px]">Counter</h1>

      <div className="font-bold text-[20px]">
        Count - { count.count }
      </div>

      <button onClick={ () => { count.increment(setCount); } } className="w-[151px] h-[44px] bg-green-200 mr-5 mt-3">Increment</button>
      <button onClick={ () => { count.decrement(setCount); } } className="w-[151px] h-[44px] bg-red-200">Decrement</button>
    </div>
  )
}

class Count {
  private _count : number;

  constructor(count : number) {
    this._count = count;
  }

  get count () : number {
    return this._count;
  }

  increment(setState : React.Dispatch<React.SetStateAction<Count>>) : void {
    setState(prevCount => new Count(prevCount.count + 1));
  }

  decrement(setState : React.Dispatch<React.SetStateAction<Count>>) : void {
    setState(prevCount => new Count(prevCount.count - 1));
  }

}
