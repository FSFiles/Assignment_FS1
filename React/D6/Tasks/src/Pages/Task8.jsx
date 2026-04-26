import React, { useState } from 'react'

const Task8 = () => {
    const[Pass,setPass]=useState("")
    const handlePassword=(e)=>{
        setPass(e.target.value);
    }
  return (
    <>
    <div className='bg-amber-600 h-screen flex flex-col justify-center items-center gap-7'>
        <input type="text" className='bg-gray-800 flex flex-col justify-center items-center text-white' onChange={handlePassword}/>
        <h1 className='text-white'>
            {Pass.length === 0 ?"": Pass.length > 6 ?"Strong":"Weak"}
        </h1>
    </div>
    
    </>
  )
}

export default Task8