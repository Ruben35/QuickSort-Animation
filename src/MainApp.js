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
    )
    var i = (low - 1)  
    var j;
    var contI=0;
    var contJ=0;
    for (j = low; j <= high-1; j++){
        contJ++;
        this.state.script.push(
          {
            oper:"Pmovej",
            start:low,
            end:high,
            i:contI,
            j:contJ,
            arrayState:array.slice(),
          }
        )
        if (array[j] < pivot){
            contI++;
            this.state.script.push(
              {
                oper:"Pmovei",
                start:low,
                end:high,
                i:contI,
                j:contJ,
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
                i:contI,
                j:contJ,
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
        i:contI,
        j:contJ,
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
          i:0,
          j:0,
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
      listCalls:[{
        text:"QuickSort("+this.props.script[0].start+","+this.props.script[0].end+")",
        done:false,
      }
      ],
      Pstart:this.props.script[0].start,
      Pend:this.props.script[0].end,
      wasABack:false,
      actualStep:0,
    }

    this.handleOperationControl=this.handleOperationControl.bind(this);
    this.manageOperation=this.manageOperation.bind(this);
    this.goFinal=this.goFinal.bind(this);
    this.goFirst=this.goFirst.bind(this);
    this.refreshNextListCalls=this.refreshNextListCalls.bind(this);
    this.refreshBackListCalls=this.refreshBackListCalls.bind(this);
  }

  refreshNextListCalls(scriptStep){
    this.state.listCalls[this.state.listCalls.length-1].done=true;
        this.state.listCalls.push(
          {
            text:"QuickSort("+scriptStep.start+","+scriptStep.end+")",
            done:false,
          }
        )
    this.refs.callQS.refreshListCalls(this.state.listCalls)
  }

  refreshBackListCalls(scriptStep){
    this.state.listCalls.pop();
    this.state.listCalls[this.state.listCalls.length-1].done=false;
    this.refs.callQS.refreshListCalls(this.state.listCalls)
  }

  manageOperation(scriptStep,step,type){
    this.refs.explication.refreshPasoActual(step,scriptStep.oper)
    switch(scriptStep.oper){
      case "quicksort":
        this.refs.animation.disableAnimation()
        this.refs.animation.refreshQuickSort(scriptStep.start,scriptStep.end,scriptStep.arrayState);
        if(type==="NEXT")
          this.refreshNextListCalls(scriptStep);
      break;
      case "Pmovej":
        this.refs.animation.enableAnimation()
        this.refs.animation.moveJ(scriptStep.j)
        if("BACK"){
          this.refs.animation.moveI(scriptStep.i)
          this.refs.animation.swapNormal(scriptStep.arrayState)
        }
      break;
      case "Pmovei":
        this.refs.animation.enableAnimation()
        this.refs.animation.moveI(scriptStep.i)
        if("BACK"){
          this.refs.animation.moveJ(scriptStep.j)   
          this.refs.animation.swapNormal(scriptStep.arrayState)
        }
      break;
      case "Pswap":
        this.refs.animation.enableAnimation()
        this.refs.animation.swapNormal(scriptStep.arrayState)
        this.refs.arrayActual.update(scriptStep.arrayState)
        this.refs.arrayActual.update(scriptStep.arrayState)
      break;
      case "PPswap":
        if(type==="NEXT"){
          this.refs.animation.swapNormal(scriptStep.arrayState)
        }
        else{

          if(step===(this.state.script.length-2)){
            this.state.listCalls[this.state.listCalls.length-1].done=false;
            this.refs.callQS.refreshListCalls(this.state.listCalls)
          }else{
            this.refreshBackListCalls(scriptStep);
          }
          this.refs.animation.swapAndUpdate(scriptStep.start,scriptStep.end,scriptStep.arrayState,scriptStep.j,scriptStep.i,this.state.script[step-1].arrayState[scriptStep.end])
        }
        this.refs.arrayActual.update(scriptStep.arrayState)
      break;
      case "Fquicksort":
          this.state.listCalls[this.state.listCalls.length-1].done=true;
          this.refs.callQS.refreshListCalls(this.state.listCalls)
      break;
      default:
      break;
    }
  }

  handleOperationControl(type){
    var nextStep;
    switch(type){
      case "NEXT":
        if(this.state.actualStep<this.state.script.length-1){
          nextStep=this.state.actualStep+1;
          this.setState({actualStep:nextStep});
          this.manageOperation(this.state.script[nextStep],nextStep,type);
        }
      break;
      case "BACK":
        if(this.state.actualStep!==0){
          nextStep=this.state.actualStep-1;
          this.setState({actualStep:nextStep});
          this.manageOperation(this.state.script[nextStep],nextStep,type);
        }
      break;
      case "FNEXT":
          nextStep=this.state.script.length-1;
          this.setState({actualStep:nextStep});
          this.goFinal();
      break;
      case "FBACK":
          nextStep=0;
          this.setState({actualStep:nextStep});
          this.goFirst();
      break;
      default:
      break;
    }
  }

  goFinal(){
    const scriptStep=this.state.script[this.state.script.length-1];
    this.refs.animation.disableAnimation()
    this.refs.animation.swapAndUpdate(scriptStep.start,scriptStep.end,scriptStep.arrayState,scriptStep.j,scriptStep.i,this.state.script[this.state.script.length-2].arrayState[scriptStep.end])
    this.refs.arrayActual.update(scriptStep.arrayState)
    this.refs.explication.refreshPasoActual(this.state.script.length-1,scriptStep.oper)
  }

  goFirst(){
    const scriptStep=this.state.script[0];
    this.refs.animation.disableAnimation()
    this.refs.animation.refreshQuickSort(scriptStep.start,scriptStep.end,scriptStep.arrayState);
    this.refs.arrayActual.update(scriptStep.arrayState)
    this.refs.explication.refreshPasoActual(0,scriptStep.oper)

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
          />
          <CallsQuickSort ref="callQS" listCalls={this.state.listCalls}/>
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
