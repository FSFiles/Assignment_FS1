import { Route , Routes} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Rendering from "./Pages/Rendering"
import ChangeColour from "./Pages/ChangeColour"
import MulCounter from "./Pages/MulCounter"

const App=()=>{
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Rendering" element={<Rendering />} />
      <Route path="/ChangeColour" element={<ChangeColour />} />
      <Route path="/MulCounter" element={<MulCounter />} />
    </Routes>
    </>
  )
}

export default App