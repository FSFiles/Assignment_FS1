import React, { useState } from 'react'

const Task6  = () => {
    const[Me,setMe]=useState("")
    const HandleMe=()=>{
        setMe(!Me)
    }
  return (
    <>
    <div className='bg-amber-700 h-screen flex flex-col justify-center items-center'>
        <button onClick={HandleMe} className='bg-cyan-800 p-3 rounded-2xl'>{Me?"Click to Close":"Click Me "}</button>
        {Me && "Button Clicked"}
    </div>
    
    </>
  )
}

export default Task6