import React from 'react';
import Controls from './sections/controls.jsx';
import ArrayActualState from './sections/arrayActualState.jsx';
import MainAnimation from "./sections/mainAnimation.jsx";
import CallsQuickSort from "./sections/callsQuickSort.jsx";

class MainApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      array:[]
    };

    this.getArrayFromControls=this.getArrayFromControls.bind(this);
  }

  getArrayFromControls(value){
    this.setState({array:value})
    alert("Array: "+value);
  }

  render(){
    var screen;

    //if(this.state.array.length!==0){
      screen=<MainScreen array={this.state.array}/>
    //}

    return (
      <div className="container">
        <div className="blueBar">
          <div className="inputs">
            <div className="title">
              QuickSort
            </div>
              <Controls onChange={this.getArrayFromControls}/>
          </div>
          <Explication/>
        </div>
        <div className="mainScreen">
          {screen}
        </div>
      </div>
    );
  }
}

class MainScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      array:this.props.array
    }
  }

  render(){
    return(
      <div className="mainScreen">
        <ArrayActualState array={[2,4,3,7,8,10,9,8,11,1,5,6]}/>
        <MainAnimation/>  
        <CallsQuickSort/>
      </div>
    );
  }
}


function Explication(){
  return (
    <div className="explication">
        <h1>
          ¿Qué es QuickSort?
        </h1>
        <p>
        Es un algoritmo “divide y vencerás” que resuelve el problema de ordenamiento.
        </p>
        <p>
        Su funcionamiento se basa primordialmente en la selección de un pivote (el cual será
        el elemento por el que se va a ir dividiendo una matriz) y la función de partición que ordena
        los elementos menores y mayores al pivote (por eso es DyV). 
        </p>
        <p>
        Su mejor caso y caso promedio son de <b>O(nlogn).</b><br></br>
        Su peor caso es de <b>O(n<sup>2</sup>)</b>.
        </p>
    </div>
  );
}


export default MainApp;
