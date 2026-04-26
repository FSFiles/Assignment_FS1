import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Navbar from './assets/Pages/Navbar'
import Rendering from './Compontes/Rendering'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Rendering/>}/>
    </Routes>
    </>
  )
}

export default App