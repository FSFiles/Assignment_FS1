import React from 'react'
import { useState } from 'react'

const Task1 = () => {
  const[Texts,setTexts] = useState("");
  const HandleTexts =(e)=>{
    setTexts(e.target.value)
  }
  return (
    <>
    <div className='bg-blue-900 h-screen flex flex-col justify-center items-center'>
    <input type="text" onChange={HandleTexts} className='bg-red-400'/>
    <h1 className='text-white'>{Texts}</h1>
    </div>
    </>
  )
}

export default Task1