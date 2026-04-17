const Navbar =()=>{
    return(
        <>
        <div >
        <div style={{backgroundColor:"Black",color:"Blue",gap:"20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <img src="./1.png" alt="" style={{width:"80px", height:"80px", padding : "5px"}}/>
        <h1 style={{textAlign:"end",padding:"10px",display:"flex",justifyContent:"end",display:"flex",gap:"20px"}}>
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Contact</a>
        </h1>
        </div>
        </div>
        </>
    )
}
export default Navbar