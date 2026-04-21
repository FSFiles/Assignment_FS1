import { Route, Routes } from "react-router-dom"
import Navbar from "./Compontes/Navbar.jsx"
import Home from "./Compontes/Home.jsx"
import About from "./Compontes/About.jsx"
import Contact from "./Compontes/Contact.jsx"
 
 const App =()=>{
    return(
        <>\
        <div>
        <div>
            Logo
        </div>
        <div>
            <link to="/" element={<Home/>}/>
            <link to="/about" element={<About/>}/>
            <link to="/contact" element={<Contact/>}/>
        </div>
        </div>
        
        </>
    )
}
export default App