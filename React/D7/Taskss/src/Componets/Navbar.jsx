import React from 'react'
import Home from '../Pages/Home'
import Task1 from '../Pages/Task1'
import Task2 from '../Pages/Task3'
import Task9 from '../Pages/Task9'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-mauve-950 h-30 flex items-center justify-between px-4 text-white '>
        <div><img src="https://cdn-icons-png.flaticon.com/512/4345/4345800.png" alt="Tasks" className='h-25 w-25'/></div>
        <div className='flex gap-4'>
            <Link to='/'>Home</Link>
            <Link to='/Task1'>Task1</Link>
            <Link to='/Task3'>Task3</Link>
            <Link to='/Task6'>Task6</Link>
            <Link to='/Task9'>Task9</Link>
        </div>
    </div>
  )
}

export default Navbar