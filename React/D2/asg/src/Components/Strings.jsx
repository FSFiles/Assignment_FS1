import Num from "./Num"
import Boolean from "./Boolean "
import Null from "./Null"

const String =() =>{
    const name = "Leon"
    const Dept = "CSE Department"
    const city = "Madrid"
    const Info  = "I am leo and I am 30 years old and I live in Madrid"
    const Info2 = `I am and I am years old and I live in`
    const Info3 = "I am Leon and I am 30 years old and I live in Madrid"
    return(<>
    <h2>STRINGS</h2>
        <h1>{name}</h1>
        <p>{Dept}</p>
        <p>{city}</p>
        <p>{Info}</p>
        <p>{Info2}</p>
        <p>{Info3}</p>
         <Num/>
        <Boolean/>
        <Null/>
        </>
    )
}

export default String