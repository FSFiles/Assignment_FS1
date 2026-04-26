import React from 'react'
import { useState } from 'react'

const Task3 = () => {
  const[Texts,setTexts] = useState("");
  const HandleTexts =(e)=>{
    setTexts(e.target.value)
  }
  return (
    <>
    <div className="bg-blue-200 flex flex-col justify-center items-center h-screen">
    <input type="text" onChange={HandleTexts} className='bg-gray-500 text-white'/>
    <div className="text-black">
    <h1>{Texts.length === 0 ?"" : Texts.length >= 6 ? "Strong":"Weak"}</h1>
    </div>
    </div>
    </>
  )
}

export default Task3