import React from 'react';
import { ReactComponent as Ffarrow } from '../img/ffarrow.svg';
import IOSSwitch from "../components/toggle.jsx"

class RandomNumbers extends React.Component{
  constructor(props){
    super(props)
    this.state={
      options:[3,4,5,6,7,8,9,10,11,12],
      number:props.number
    }

    this.changeHandler=this.changeHandler.bind(this);
  }

  changeHandler(event){
    this.setState({number:event.target.value})
    this.props.onChange(event.target.value);
  }

  render(){
  return (
    <div>
    <br></br><br></br>
    <label>
      Valores del Array: 
      <select className="select" onChange={this.changeHandler} value={this.state.number}>
        {this.state.options.map((item,i)=><option key={item} value={item}>{item}</option>)}
      </select>
      
    </label>
  </div>);
  }
}

class UserNumbers extends React.Component{
  constructor(props){
    super(props);
    this.state={
      textValue:props.textValue,
      inputE:props.inputE
    }

    this.changeHandler=this.changeHandler.bind(this);
  }

  changeHandler(event){
    this.setState({textValue:event.target.value});
    this.props.onChange(event.target.value);
  }

  render(){
    var error;

    if(this.state.inputE===0)
      error=<p className="Error">Llena los campos</p>
    if(this.state.inputE===1)
      error=<p className="Error">Formato incorrecto (seperado por comas y 0&#60;n&#60;100)</p>
    if(this.state.inputE===2)
      error=<p className="Error">Menos de 3 o más de 12 números</p>
    
    return (
      <div className="userNumbers">
        <br></br>
        <label>
          Valores del Array:
          <input type="text" name="numbers" className={this.state.inputE!==-1?"error":""} value={this.state.textValue} onChange={this.changeHandler} placeholder="Ejemplo: 2,5,4,10"/>
        </label>
        {error}   
        <p>Nota: Ingrese de 3 a 12 números</p>
      </div>
    );
  }
}

class Inputs extends React.Component{
    constructor(props){
      super(props)
      this.state={
        isNumberRandom:false,
        noRandom:3,
        input:"3,5,2,9,1,4",
        inputE:-1,
        numbers:[]
      };

      this.changeControl=this.changeControl.bind(this)
      this.obtainInput=this.obtainInput.bind(this)
      this.obtainNumberRandom=this.obtainNumberRandom.bind(this)
      this.startAnimation=this.startAnimation.bind(this)
    }
  
    changeControl(){
      if(this.state.isNumberRandom)
        this.setState({isNumberRandom:false})
      else
        this.setState({isNumberRandom:true})
    }

    obtainInput(value){
      this.setState({input:value});
    }

    obtainNumberRandom(value){
      this.setState({noRandom:value});
    }

    startAnimation(event){
      var array=[];
      var ok=true;
      if(this.state.isNumberRandom){
        for(var i=0;i<this.state.noRandom;i++){
          array.push(Math.floor(Math.random()*(100-1))+1);
        }
      }else{
        if(this.state.input===""){
          this.setState({inputE:0})
          ok=false;
        }else{
          array=this.state.input.split(',');
          if(array.length<3 || array.length>12){
            this.setState({inputE:2})
            ok=false;
          }
          for(let n of array){
            if(n<0 || n>99 || n===''){
              this.setState({inputE:1})
              ok=false;
              break;
            }
          }

        }
      }
      if(ok){
        this.setState({inputE:-1})
        this.setState({numbers:array})
        this.setState({numbers:array})
        this.props.onChange(array);
      }
      event.preventDefault()
    }

    render (){
      const isNumberRandom=this.state.isNumberRandom;
      var restartDisabled=false;
      var startDisabled=false;
      let displayControl;
      if(isNumberRandom){
        displayControl=<RandomNumbers name="random" number={this.state.noRandom} onChange={this.obtainNumberRandom} />;
        if(this.state.numbers.length===0)
          restartDisabled=true;
      }
      else{
        if(this.state.input==="")
          restartDisabled=true;
        displayControl=<UserNumbers name="users" key={this.state.inputE} inputE={this.state.inputE} textValue={this.state.input} onChange={this.obtainInput}/>
      }
      if(this.state.numbers.length!==0){
        startDisabled=true;
      }
    return (
        <form>
        <p>
          Entradas
        </p>

          <label>Números random: 
          <IOSSwitch 
            onChange={this.changeControl}
          />
          </label> 
          {displayControl}
          <div className="input-button-group">
            <button className="button start" onClick={this.startAnimation} disabled={startDisabled}>
              <span>
              Empezar
              <Ffarrow/>
              </span>
            </button>
            <button className="button restart" disabled={restartDisabled}>
              Reiniciar
            </button>
            
          </div>
      </form>);
    }
  }

export default Inputs;