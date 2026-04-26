import React from 'react'
import Navbar from './Compontes/Navbar'
import { Route, Routes } from 'react-router-dom'
import Task1 from './Pages/Task1'
import Task2 from './Pages/Task2'
import Home from './Pages/Home'
import Task5 from './Pages/Task5'
import Task3 from './Pages/Task3'
import Task4 from './Pages/Task4'
import Task6 from './Pages/Task6'
import Task7 from './Pages/Task7'
import Task8 from './Pages/Task8'
import Task9 from './Pages/Task9'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/Task1" element={<Task1/>}/>
      <Route path="/Task2" element={<Task2/>}/>
      <Route path='/Task3' element={<Task3/>}/>
      <Route path='/Task4' element={<Task4/>}/>
      <Route path="/Task5" element={<Task5/>}/>
      <Route path="/Task6" element={<Task6/>}/>
      <Route path='/Task7' element={<Task7/>}/>
      <Route path='/Task8' element={<Task8/>}/>
      <Route path='/Task9' element={<Task9/>}/>
    </Routes>
    </>
  )
}

export default App