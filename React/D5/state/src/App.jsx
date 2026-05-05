import { Route, Routes } from "react-router-dom"
import Home from "./Compontes/Home"
import About from "./Compontes/About"
import Contact from "./Compontes/Contact"
import Navbar from "./Compontes/Navbar"

const App =()=>{
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    
    </>
  )
}
export default App;

