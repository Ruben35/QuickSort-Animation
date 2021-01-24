import React from "react";

class MainAnimation extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            array:this.props.array
        })


    }

    render(){

        return(
            <div className="mainAnimation">
                Hola
            </div>
        );
    }
}

export default MainAnimation;