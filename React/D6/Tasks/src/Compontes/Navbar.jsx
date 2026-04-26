import React from 'react'
import { Link } from 'react-router-dom'
import Task1 from '../Pages/Task1'
import Task2 from '../Pages/Task2'
import Task5 from '../Pages/Task5'
import Task3 from '../Pages/Task3'
import Task4 from '../Pages/Task4'
import Task6 from '../Pages/Task6'
import Task7 from '../Pages/Task7'
import Task8 from '../Pages/Task8'
import Task9 from '../Pages/Task9'
import Home from '../Pages/Home'


const Navbar = () => {
  return (
    <>
    <div className='bg-black text-amber-400 flex justify-between p-5'>
    <div><img src="../public/1.avif"  className='w-30 h-30' alt="" /></div>
    <div className='flex gap-5 flex justify-center items-center'>
    <Link to="/">Home</Link>
     <Link to="/Task1">Task1</Link>
     <Link to="/Task2">Task2</Link>
     <Link to="/Task3">Task3</Link>
     <Link to="/Task4">Task4</Link>
     <Link to="/Task5">Task5</Link>
     <Link to="/Task6">Task6</Link>
     <Link to="/Task7">Task7</Link>
     <Link to="/Task8">Task8</Link>
     <Link to="/Task9">Task9</Link>
    </div>
    </div>
    </>
  )
}

export default Navbar