import { Link } from "react-router-dom"

const Navbar =()=>{
    return(
        <>
        <div className="bg-orange-600 p-5 text-zinc-950 flex justify-between gap-5  items-center">
        <div>
            <img src="./public/logo.jpg" alt="Logo" className="w-20"/>
        </div>
        <div className="flex gap-8">
            <Link to="/" className="">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
        </div>
        </>
    )
}

export default Navbar