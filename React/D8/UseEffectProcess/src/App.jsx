import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FetchToDo from './Components/FetchToDo'
import FetchUsers from './Components/FetchUsers'
import Navbar from './Pages/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<FetchToDo/>}/>
        <Route path="/FetchUsers" element={<FetchUsers/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App