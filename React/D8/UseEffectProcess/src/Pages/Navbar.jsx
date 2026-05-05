import React from 'react'
import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    <>
    <div className='bg-black text-amber-400 flex justify-between p-5'>
    <div><img src="https://img.freepik.com/premium-vector/planning-man-marks-completed-tasks-list_491047-705.jpg"  className='w-30 h-30' alt="" /></div>
    <div className='flex gap-5 flex justify-center items-center'>
     <Link to="/">FetchToDo</Link>
     <Link to="/FetchUsers">FetchUsers</Link>
    </div>
    </div>
    </>
  )
}

export default Navbar