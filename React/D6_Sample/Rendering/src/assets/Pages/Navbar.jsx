import React from 'react'
import { Link } from 'react-router-dom'
import Rendering from '../../Compontes/Rendering'

const Navbar = () => {
  return (
    <>
    <div className='bg-blue-600 flex justify-between'>
    <div className='m-5 p-2'>Logo</div>
    <div className='m-5 p-2'>
        <Link to='/' >Rendering</Link>
    </div>
    </div>
    
    </>
  )
}

export default Navbar