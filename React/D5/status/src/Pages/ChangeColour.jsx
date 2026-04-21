import { useState } from "react"

const ChangeColour=()=>{
    const [colour, setColour] = useState("bg-orange-500 h-screen")
    const handleColourchange=()=>{
        setColour("bg-red-500 h-screen")
    }
    const handleColourchange1=()=>{
        setColour("bg-green-500 h-screen ")
    }
    const handleColourchange2=()=>{
        setColour("bg-blue-500 h-screen ")
    }

    return(<>
        <button onClick={handleColourchange} className={colour} rounded>RED</button>
        <button onClick={handleColourchange1} className={colour} rounded>GREEN</button>
        <button onClick={handleColourchange2} className={colour} rounded>BLUE</button>
        </>
    )

}
export default ChangeColour