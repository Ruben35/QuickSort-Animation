import React from 'react';
import FlipMove from 'react-flip-move';

const FLIP_DURATION=750;

class ArrayActualState extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array:this.props.array
        };
        this.update=this.update.bind(this);
    }

    update(newarray){
        this.setState({
            array:newarray
        })
    }

    render(){

        return(
            <div className="containerAA">
                <FlipMove
                typeName="div"
                className="array"
                duration={FLIP_DURATION}
                easing="cubic-bezier(.12,.36,.14,1.2)"
                >
                    {
                        this.state.array.map((item,i)=>
                        <div className="element-Array" id={item} key={item}>
                            {item}
                        </div>)
                    }
                </FlipMove>
                <p>
                    Array Estado Actual
                </p>
            </div>
        );
    }
}

export default ArrayActualState;