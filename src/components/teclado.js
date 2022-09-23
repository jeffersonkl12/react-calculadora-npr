import "./teclado.css";

function teclado(props){
    let opreadores = ["+","-","/","*","C"];
    let numero = [7,8,9,4,5,6,1,2,3,0];
    return(
    <div className="teclado-container">
        <div className="btn-container operadores">
            {opreadores.map((v,i)=>{
                return <button className="btn btn-operador" key={i.toString()} onClick={(e)=>props.opreadorClick(v)}>{v}</button>
            })}
        </div>
        <div className="btn-container numeros">
            {numero.map((v,i)=>{
                return <button className="btn btn-numero" key={i.toString()} onClick={(e)=>props.numeroClick(v)}>{v}</button>
            })}
            <button className="btn btn-operador" onClick={(e)=>props.opreadorClick(".")}>.</button>
            <button className="btn btn-operador" onClick={(e)=>props.opreadorClick("=")}>=</button>
        </div>    

    </div>)
};

export default teclado;