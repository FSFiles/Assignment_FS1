import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Componets/Navbar'
import Home from './Pages/Home'
import Task1 from './Pages/Task1'
import Task3 from './Pages/Task3'
import Task6 from './Pages/Task6'
import Task9 from './Pages/Task9'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Task1' element={<Task1/>}/>
      <Route path='/Task3' element={<Task3/>}/>
      <Route path='/Task6' element={<Task6/>}/>
      <Route path='/Task9' element={<Task9/>}/>
    </Routes>
    </>
  )
}

export default App