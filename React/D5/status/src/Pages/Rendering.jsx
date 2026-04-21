import React, { useState } from 'react'

const Rendering=()=>{
const [count,setCount]=useState(0)
        const handleclick=()=>{
            setCount(count+1)
        }
        const handleDecrease=()=>{
            setCount(count-1)
        }
        const handleReset=()=>{
            setCount(0)
        }
    
    return(
        <div className='bg-orange-600 h-screen flex justify-center items-center'>
        <div className='bg-black h-100 w-100 flex flex-col items-center justify-center gap-5 rounded-4xl'>
            <h1 className='bg-white text-black  w-10 h-5 flex items-center justify-center p-5 rounded-2xl w-20'>{count}</h1>
            <button onClick={handleclick} className='bg-orange-600 text-black px-4 py-2 rounded-3xl'>increase</button>
            <button onClick={handleDecrease} className='bg-orange-600 text-black px-4 py-2 rounded-3xl'>decrease</button>
            <button onClick={handleReset} className='bg-orange-600 text-black px-4 py-2 rounded-3xl'>reset</button>
        </div>
        </div>
    
    )
}
export default Rendering