import React, { useState } from 'react'

const Task2 = () => {
    const [Hides,setHides] = useState(false)
    const Hide =()=>{
        setHides(!Hides)
    }
  return (
    <>
    <div className='bg-blue-950 text-amber-500 text-center flex justify-center items-center h-100 w-100'>
    <div className='flex flex-col justify-center items-center gap-5'>
    <div>Hi</div>
    <button onClick={Hide} className='bg-green-400 w-20 p-2 rounded-2xl'>{Hides?"Hide":"Show"}</button>
    <h1> {Hides?"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti dolorem recusandae, excepturi, quibusdam porro ipsum perspiciatis quam praesentium ratione sint? Odio placeat at autem unde aliquam eius incidunt inventore fugit dicta voluptas molestias qui quos vitae. Unde, voluptatum ipsum aperiam fugit, consequatur doloremque cumque vero amet ad quibusdam fugiat corrupti rerum ullam nihil?":""}</h1>
    </div>
    </div>
    </>
  )
}

export default Task2