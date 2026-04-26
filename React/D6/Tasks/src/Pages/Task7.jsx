import React, { useState } from 'react'

const Task7 = () => {
    const[Status,setStatus]=useState(false)
    const HandleStatus=()=>{
        setStatus(!Status)
    }
  return (
    <>
    <div className='bg-amber-600 h-screen flex  justify-center items-center gap-7'>
      <div className='bg-gray-800 h-50 w-50 rounded-2xl flex justify-center items-center text-white gap-3'>
        <input type="checkbox" className='bg-gray-800 flex  justify-center items-center text-white w-5 h-5' onChange={HandleStatus}/>
        {Status && "Accepted"}
      </div>
    </div>
    
    </>
  )
}

export default Task7