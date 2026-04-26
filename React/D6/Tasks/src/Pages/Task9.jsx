import React, { useState } from 'react'

const Task9 = () => {
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
    <h1> {Hides?<img src="https://t4.ftcdn.net/jpg/05/13/79/77/360_F_513797754_KyKftzXhlul8FalDksafJf1TmtqrX1Px.jpg" alt="Hello" />:""}</h1>
    </div>
    </div>
    </>
  )
}

export default Task9