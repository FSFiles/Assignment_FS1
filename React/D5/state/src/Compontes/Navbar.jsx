import { Link } from "react-router-dom"
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

const Navbar =()=>{
    return(
        <>
        <div>
        <div>
            Logo
        </div>
        <div>
            <Link to="/" element={<Home/>}/>
            <Link to="/about" element={<About/>}/>
            <Link to="/contact" element={<Contact/>}/>
        </div>
        </div>
        
        </>
    )
}

export default Navbar;