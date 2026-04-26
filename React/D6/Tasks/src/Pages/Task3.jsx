import React, { useState } from 'react'

const Task3 = () => {
    const[Dark,setDark]=useState("")
    const HandleDark=()=>{
        setDark(!Dark)
    }
  return (
    <>
    <div className={Dark?"h-screen bg-gray-600 text-white justify-center items-center flex":"h-screen bg-white text-black justify-center items-center flex"}>
        <button onClick={HandleDark} className='bg-blue-500 w-30 p-2 rounded-2xl flex justify-center items-center'>{Dark?"White":"Dark"}</button>
    </div>
    
    </>
  )
}

export default Task3