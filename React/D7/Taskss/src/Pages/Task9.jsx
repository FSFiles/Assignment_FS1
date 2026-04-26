import React, { useState } from 'react'

const Task9 = () => {
    const[Status,setStatus]=useState(false)
    const HandleStatus=()=>{
        setStatus(!Status)
    }
  return (
    <>
    <div className='bg-amber-600 h-screen flex flex-col justify-center items-center gap-7'>
        <input type="text" className='bg-gray-800 flex flex-col justify-center items-center text-white' onChange={HandleStatus}/>
        {Status && "Typing"}
    </div>
    
    </>
  )
}

export default Task9