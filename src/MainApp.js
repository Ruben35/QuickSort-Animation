import React from 'react';
import Inputs from './sections/inputs.jsx';
import ArrayActualState from './sections/arrayActualState.jsx';
import MainPartition from "./sections/mainPartition.jsx";
import CallsQuickSort from "./sections/callsQuickSort.jsx";
import Controls from "./sections/controls.jsx";
import AnimationExplication from "./sections/animationExplication.jsx";

class MainApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      array:[],
      script:[]
    };

    this.getArrayFromControls=this.getArrayFromControls.bind(this);
    this.generateQuickSortScript=this.generateQuickSortScript.bind(this);
    this.swap=this.swap.bind(this);
    this.partition=this.partition.bind(this);
    this.quickSort=this.quickSort.bind(this);
  }

  getArrayFromControls(value){
    this.setState({array:value})
  }

  generateQuickSortScript(){
    if(this.state.script.length===0){
      var array=this.state.array.slice();
      this.quickSort(array,0,array.length-1);
      this.state.script.push(
        {
          oper:"Fquicksort",
          arrayState:array.slice(),
          start:this.state.script[this.state.script.length-1].start,
          end:this.state.script[this.state.script.length-1].end
        }
      )
      console.log(this.state.script);
    }
  } 

  swap(input, index_A, index_B) {
    let temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
  }

  partition(array,low,high){
    var pivot = array[high];  
    this.state.script.push(
      {
        oper:"initPart",
        start:low,
        end:high,
        i:(low-1),
        j:low,
        arrayState:array.slice(),
      }
    )
    var i = (low - 1)  
    var j;
    for (j = low; j <= high-1; j++){
        this.state.script.push(
          {
            oper:"Pmovej",
            start:low,
            end:high,
            i:i,
            j:j,
            arrayState:array.slice(),
          }
        )
        if (array[j] < pivot){
            this.state.script.push(
              {
                oper:"Pmovei",
                start:low,
                end:high,
                i:i,
                j:j,
                arrayState:array.slice(),
              }
            )
            i++;  
            this.swap(array,i,j)
            this.state.script.push(
              {
                oper:"Pswap",
                start:low,
                end:high,
                i:i,
                j:j,
                arrayState:array.slice(),
              }
            )
        }
    }
    this.swap(array,i + 1,high)
    this.state.script.push(
      {
        oper:"PPswap",
        start:low,
        end:high,
        i:i,
        j:j,
        arrayState:array.slice(),
      }
    )
    return (i + 1)
  }

  quickSort(array,start,end){
    if(start<end){
      this.state.script.push(
        {
          oper:"quicksort",
          start:start,
          end:end,
          arrayState:array.slice(),
        }
      )
      var pi= this.partition(array,start,end);
      this.quickSort(array,start, pi-1);
      this.quickSort(array,pi+1,end);
    }
  }


  render(){
    var screen;

    if(this.state.array.length!==0){
      this.generateQuickSortScript()
      screen=<MainAnimation array={this.state.array} script={this.state.script}/>
    }
      


    return (
      <div className="container">
        <div className="blueBar">
          <div className="inputs">
            <div className="title">
              QuickSort
            </div>
              <Inputs onChange={this.getArrayFromControls}/>
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



class MainAnimation extends React.Component{
  constructor(props){
    super(props);
    this.state={
      array:this.props.array,
      script:this.props.script,
      listCalls:[],
      Pstart:this.props.script[0].start,
      Pend:this.props.script[0].end,
      wasABack:false,
      actualStep:0,
    }

    this.handleOperationControl=this.handleOperationControl.bind(this);
    this.manageOperation=this.manageOperation.bind(this);
    this.updateArray=this.updateArray.bind(this);
  }

  updateArray(newarray){
    this.setState({
      array:newarray
    });
    this.refs.arrayActual.update(newarray);
  }

  manageOperation(scriptStep,type,step){
    this.refs.explication.refreshPasoActual(step,scriptStep.oper)
    switch(scriptStep.oper){
      case "quicksort":
        this.setState({
          Pstart:scriptStep.start,
          Pend:scriptStep.end
        })
        this.refs.animation.refresh(scriptStep.start,scriptStep.end);
        //alert("quicksort"+scriptStep.start+"|"+scriptStep.end);
      break;
      case "initPart":
        //alert("iniciamos particion"+this.state.Pstart+"|"+this.state.Pend);
      break;
      case "Pmovej":
        if(type==="NEXT")
          this.refs.animation.moveJRight();
        else
          this.refs.animation.moveJLeft();
      break;
      case "Pmovei":
        if(type==="NEXT")
          this.refs.animation.moveIRight();
        else
          this.refs.animation.moveILeft();
      break;
      case "Pswap":
        this.refs.animation.swapIJ();
      break;
      case "PPswap":
        this.refs.animation.swapP();
      break;
      case "Fquicksort":
        //alert("termino QuickSort");
      break;
    }
  }

  handleOperationControl(type){
    switch(type){
      case "NEXT":
        if(this.state.wasABack){
          this.manageOperation(this.state.script[this.state.actualStep],type,this.state.actualStep);
          this.setState({wasABack:false});
        }else if(this.state.actualStep<this.state.script.length-1){
            var actualS=this.state.actualStep+1;
            this.setState({actualStep:actualS});
            this.manageOperation(this.state.script[actualS],type,actualS);
          }else{
            alert("ya no se puede")
          }
        
      break;
      case "BACK":
        if(this.state.actualStep!==0){
          var actualSS=this.state.actualStep-1;
          if(!this.state.wasABack){
            this.setState({actualStep:actualSS});
            this.manageOperation(this.state.script[this.state.actualStep],type,this.state.actualStep);//Deshacemos actual
            this.manageOperation(this.state.script[actualSS],type,actualSS)//Deshacemos anterior
            this.setState({
              wasABack:true
            })
          }else{
            this.manageOperation(this.state.script[actualSS],type,actualSS)
          }
          this.setState({actualStep:actualSS});
          console.log(actualSS)
        }else{
          alert("ya no se puede B");
        }
      break;
      default:

      break;
    }
  }

  render(){

    return(
      <div className="mainScreen">
        <ArrayActualState ref="arrayActual" array={this.state.array}/>
        <div className="screenCenter">
          <MainPartition ref="animation" 
          array={this.state.array}
          start={this.state.Pstart}
          end={this.state.Pend}
          changeArray={this.updateArray}
          />
          <CallsQuickSort listCalls={this.state.listCalls}/>
        </div>
        <div className="screenCenter">
          <Controls onControl={this.handleOperationControl}/>
          <AnimationExplication ref="explication" totalPasos={this.state.script.length}
           descripcion={this.state.script[this.state.actualStep].oper}
           pasoActual={this.state.actualStep} />
        </div>
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
