import React from 'react';

class ArrayActualState extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array:this.props.array
        };

    }


    render(){

        return(
            <div className="containerAA">
                <div className="array">
                    {
                        this.state.array.map((item,i)=>
                        <div className="element-Array" id={item} key={item}>
                            {item}
                        </div>)
                    }
                </div>
                <p>
                    Array Estado Actual
                </p>
            </div>
        );
    }
}

export default ArrayActualState;