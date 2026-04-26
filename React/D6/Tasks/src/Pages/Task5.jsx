import React, { useState } from 'react'

const Task5 = () => {
    const [Hides,setHides] = useState(0)
    const Increment =()=>{
        setHides(Hides + 1)
    }
    const Decrement =()=>{
        if(Hides > 0){
        setHides(Hides - 1)
        }
    }
    const Reset =()=>{
      setHides(0)
    }
  return (
    <>
    <div className='bg-blue-950 text-amber-500 text-center flex justify-center items-center h-100 w-100'>
    <div className='flex flex-col justify-center items-center gap-5'>
    <div>Count:{Hides}</div>
    <h2>{Hides % 2 === 0 ? "Even":"odd"}</h2>
    <button onClick={Increment} className='bg-green-400 w-30 p-2 rounded-2xl text-black'>Increment</button>
    <button onClick={Decrement} className='bg-red-500 w-30 p-2 rounded-2xl text-black'>Decrement</button>
    <button onClick={Reset} className='bg-yellow-500 w-30 p-2 rounded-2xl text-black'>Reset</button>
    </div>
    </div>
    </>
  )
}

export default Task5