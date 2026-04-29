import React from 'react'
import Form from '../Components/Form'
import Looping from '../Components/Looping'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='bg-blue-500 flex justify-between items-center p-2 gap-5'>
        <div className='mx-5'>
            Logo
        </div>
        <div className='mx-5'>
            <Link to='/'>Form</Link>
            <Link to='/Looping'>Looping</Link>
        </div>
    </div>
    
    </>
  )
}

export default Navbar