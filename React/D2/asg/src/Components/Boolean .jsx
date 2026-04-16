const Boolean = () => {

    const Words = "Heilo"
    const Number  = 10
    const False = 0
    return (<>
    <h2>BOOLEAN</h2>
    {Words ? "True" : "False"}
    <br/>
    {Number > 0 ? "True" : "False"}
    <br/>
    {False ? "True" : "False"}

    </>
    )
}
export default Boolean