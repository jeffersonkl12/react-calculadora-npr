import "./tela.css";

function tela(props){

    return (
    <div className="tela-container">
        <input type="text" value={props.result ? props.result: 0} onChange={props.change} className="tela-entrada"/>
    </div>)
};

export default tela;