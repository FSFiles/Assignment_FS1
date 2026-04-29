import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Pages/Navbar'
import Form from './Components/Form'
import Looping from './Components/Looping'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Form/>}/>
      <Route path="/Looping" element={<Looping/>}/>
    </Routes>
    </>
  )
}

export default App