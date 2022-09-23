import React from "react";
import Teclado from "./teclado";
import Tela from "./tela";
import "./calculadora.css";

class calculadora extends React.Component {

        constructor(props) {
            super(props);

            this.numeros = [];
            this.operadores = [];

            this.state = {
                result: ""
            };
            this.changeEntrada = this.changeEntrada.bind(this);
            this.clickNumero = this.clickNumero.bind(this);
            this.clickOperador = this.clickOperador.bind(this);
        }

        changeEntrada(e) {
            this.setState({
                result: e.target.value
            });
        }

        clickNumero(valor) {
            let aux = this.state.result + valor;

            this.setState({
                result: aux
            });
        }

        clickOperador(operador) {
            let numero = this.state.result;
            if(operador === "C"){
                
                numero = numero.slice(0,numero.length-1);
                this.setState({
                    result: numero
                });
            }else if (operador !== "=") {
                if (!isNaN(parseFloat(numero.at(numero.length - 1))) && numero !== "") {
                    numero += operador;
                }

                this.setState({
                    result: numero
                });
            }
             else {
                let resultado = this.notacaoPolonesa();
                this.setState({result: resultado.toString()});
            }

        }

        notacaoPolonesa() {
            let notacaoPolonesa = "";

            let expressao = this.state.result;

            let index = 0;
            let valor = "";

            while (index < expressao.length) {

                if(isNaN(parseFloat(expressao.at(index))) && valor !== "" ){
                    this.numeros.push(valor);
                    valor = "";
                }else if(index+1 === expressao.length){
                    this.numeros.push(valor+expressao.at(expressao.lastIndexOf()));
                }
            
                if(expressao.at(index) >= "0" && expressao.at(index) <= "9"){
                    notacaoPolonesa += expressao.at(index);
                    valor += expressao.at(index);
                } else if (expressao.at(index) === "+" || expressao.at(index) === "-") {
                    while (this.operadores.at(this.operadores.length - 1) === "*" || this.operadores.at(this.operadores.length - 1) === "/") {
                        this.numeros.push(this.operadores.at(this.operadores.lastIndexOf()));
                        notacaoPolonesa += this.operadores.pop();
                    };
                    this.operadores.push(expressao.at(index));
                }else if(expressao.at(index) === "*" || expressao.at(index) === "/"){
                    if(this.operadores.includes("*")){
                        this.numeros.push(this.operadores.at(this.operadores.indexOf("*")));
                        notacaoPolonesa += this.operadores.at(this.operadores.indexOf("*"));
                        this.operadores.splice(this.operadores.indexOf(expressao.at(index)),1);
                    }
            
                    if(this.operadores.includes("/")){
                        this.numeros.push(this.operadores.at(this.operadores.indexOf("/")));
                        notacaoPolonesa += this.operadores.at(this.operadores.indexOf("/"));
                        this.operadores.splice(this.operadores.indexOf(expressao.at(index)),1);
                    }
                    this.operadores.push(expressao.at(index));
            
                }
                 else if (expressao.at(index) === "(") {
                    this.operadores.push(expressao.at(index))
                } else if (expressao.at(index) === ")") {
                    for (let x = this.operadores.indexOf("(") + 1; x < this.operadores.length; x++) {
                        notacaoPolonesa += this.operadores.at(x);
                        this.numeros.push(this.operadores.at(x));
                        this.operadores.splice(x, 1);
                    };
                    this.operadores.splice(this.operadores.indexOf(")"), 1);
                } else {
                    this.operadores.push(expressao.at(index));
                }
                index++;
            };



            while(this.operadores.length > 0){
                let aux = this.operadores.pop();
                this.numeros.push(aux);
                notacaoPolonesa += aux;
     
         }
            console.log(notacaoPolonesa);
            return this.calcula();
        }

        calcula(){
            let aux = []; 
            let result = 0.0;

            for(let index = 0; index <= this.numeros.length; index++){

                if(["/","*","+","-"].includes(this.numeros.at(index))){
                    let num1 = parseFloat(aux.pop());
                    let num2 = parseFloat(aux.pop());

                    switch(this.numeros.at(index)){

                        case "+":
                        result = num2 + num1; 
                        break;

                        case "-":
                        result = num2 - num1; 
                        break;

                        case "*":
                        result = num2 * num1; 
                        break;

                        case "/":
                        result = num2 / num1; 
                        break;

                        default:
                            break;
                    };

                    aux.push(result);
                }else{
                    aux.push(this.numeros.at(index));
                }

            };
            result = aux.at(0);
            this.numeros = [];
            this.operadores = [];
            return result;
        }



        render() {

            return (
                 <div className="calculadora-container">
                    < Tela result = { this.state.result}change = {this.changeEntrada }/>
                    <  Teclado numeroClick = {this.clickNumero }opreadorClick = {this.clickOperador} /> 
                 </div>);
            }

        };

        export default calculadora;