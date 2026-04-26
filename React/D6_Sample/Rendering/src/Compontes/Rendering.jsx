import { useState } from "react"

const Rendering = () => {
const [Changes,setChange]=useState(true)
const Changer=()=>{
    setChange(!Changes)
}
  return (
    <>
    <div className='bg-amber-600 h-screen flex flex-col justify-center items-center gap-5'>
    <div className="bg-black w-80 h-80 flex flex-col justify-center items-center gap-10 rounded-2xl">
    <div className="text-white">Rendering</div>
    <p>{Changes?<p className="bg-red-600 p-4">TRUE</p>:<p className="bg-green-600 p-4">FALSE</p>}</p>
    <button onClick={Changer} className="bg-blue-800 rounded-3xl p-2">Click to change</button>
    </div>
    </div>
    </>
  )
}

export default Rendering