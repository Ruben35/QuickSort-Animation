import React from 'react';
import { ReactComponent as Ffarrow } from '../img/ffarrow.svg';
import IOSSwitch from "../components/toggle.jsx"

class RandomNumbers extends React.Component{
  constructor(props){
    super(props)
    this.state={
      options:[3,4,5,6,7,8,9,10],
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
      textValue:props.textValue
    }

    this.changeHandler=this.changeHandler.bind(this);
  }

  changeHandler(event){
    this.props.onChange(event.target.value);
  }

  render(){
    return (
      <div className="userNumbers">
        <br></br>
        <label>
          Valores del Array:
          <input type="text" name="numbers" value={this.state.textValue} onChange={this.changeHandler} placeholder="Ejemplo: 2,5,4,10"/>
        </label>   
        <p>Nota: Ingrese de 3 a 12 números</p>
      </div>
    );
  }
}

class Controls extends React.Component{
    constructor(props){
      super(props)
      this.state={
        isNumberRandom:false,
        noRandom:3,
        input:"",
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
      alert(this.state.input+""+this.state.noRandom)
      event.preventDefault()
    }

    render (){

      const isNumberRandom=this.state.isNumberRandom;
      let displayControl;
      if(isNumberRandom)
        displayControl=<RandomNumbers name="random" number={this.state.noRandom} onChange={this.obtainNumberRandom} />;
      else
        displayControl=<UserNumbers name="users" textValue="sdad" onChange={this.obtainInput}/>

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
            <button className="button start" onClick={this.startAnimation}>
              <span>
              Empezar
              <Ffarrow/>
              </span>
            </button>
            <button className="button restart">
              Reiniciar
            </button>
            
          </div>
      </form>);
    }
  }

export default Controls;