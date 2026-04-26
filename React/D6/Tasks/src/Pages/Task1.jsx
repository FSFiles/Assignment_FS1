import React, { useState } from 'react'

const Task1 = () => {
const [login,setLogin] = useState(false)
    const handleLog =()=>{
        setLogin(!login)
    }
  return (
    <>
    <div className='flex flex-col justify-center items-center m-20'>
    <div className='bg-red-500 w-80 h-80 rounded-3xl flex flex-col justify-center items-center gap-8 '>
    <div>{login ? "Welcome You Have Logged In":"You Have Logged Out"}</div>
    <button onClick={handleLog}  className='bg-green-500 w-25 p-2 rounded-3xl '>{login?"Login":"Logout"}</button>
    </div>
    </div>
    </>
  )
}

export default Task1