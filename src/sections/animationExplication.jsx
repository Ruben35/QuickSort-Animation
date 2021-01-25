import React from 'react'

class AnimationExplication extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            totalPasos:this.props.totalPasos,
            pasoActual:this.props.pasoActual+1,
            descripcion:this.props.descripcion
        });

        this.refreshPasoActual=this.refreshPasoActual.bind(this)
    }

    refreshPasoActual(paso,descripcion){
        this.setState({
            pasoActual:paso+1,
            descripcion:descripcion
        })
    }

    render(){

        return(
            <div className="AnimationExplication">
                <h2>Paso {this.state.pasoActual} de {this.state.totalPasos}</h2>
                <p>{this.state.descripcion}</p>
            </div>
        )
    }
}

export default AnimationExplication;