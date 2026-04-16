const Null = () => {

   let a = null
   let b = undefined
   let c = "Heilo"
   let d = true
    return (<>
    <h2>NULL</h2>
    {a ?? "Null Value"}
    <br/>
    {b ?? "Undefined Value"}
    <br/>
    {c ?? "Null"}
    <br/>
    {d ?? "Null"}
    </>
    )
}
export default Null