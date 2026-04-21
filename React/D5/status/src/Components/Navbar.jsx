import { Link } from "react-router-dom"

const Navbar=()=>{
    return(
        <div className="bg-neutral-950 text-yellow-300 p-6 flex justify-between">
            <div className="flex justify-start">
                <h1>Logo</h1>
            </div>
            <div className="flex justify-end gap-10">
                <Link to="/">Home</Link>
                <Link to="/Rendering">Rendering</Link>
                <Link to="/ChangeColour">Change Colour</Link>
                <Link to="/MulCounter">Multiple Counter</Link>
            </div>
            </div>
    )
}

export default Navbar