import React from "react";
import FlipMove from 'react-flip-move';
import { ReactComponent as Darrow } from '../img/down-arrow.svg';

const FLIP_DURATION=750;

class MainAnimation extends React.Component{
    constructor(props){
        super(props);
        var array=[]
        for(var i=0;i<this.props.array.length;i++){
            array.push(i);
        }
        this.state=({
            array:this.props.array,
            pivot:this.props.array[this.props.array.length-1],
            arrayPointer:['P'].concat(array),
            arraySmaller:['S'].concat(array)
        })

        this.newSwap=this.newSwap.bind(this);
    }

    newSwap(input, index_A, index_B) {
        let array=input.slice();
        let temp = array[index_A];
    
        array[index_A] = array[index_B];
        array[index_B] = temp;

        return array;
    }
    

    render(){

        return(
            <div className="mainAnimation">
                <h1>Partición de QuickSort(0,12)</h1>
                <div>
                    <table>
                        <tbody>
                            <FlipMove
                                typeName="tr"
                                duration={FLIP_DURATION}
                                easing="cubic-bezier(.12,.36,.14,1.2)"
                            >
                                {this.state.arrayPointer.map((item,i)=>{
                                    return(
                                        <td key={item}>
                                            {item==="P"?<Darrow/>:""}
                                        </td>
                                    );
                                })}
                            </FlipMove>
                            <FlipMove
                                typeName="tr"
                                duration={FLIP_DURATION}
                                easing="cubic-bezier(.12,.36,.14,1.2)"
                                >
                                <td></td>
                                {this.state.array.map((item,i)=>{
                                    return(
                                    <td key={item} id={item} className={item===this.state.pivot?"pivot":""}>{item}</td>
                                    );
                                })
                                }
                            </FlipMove>
                            <FlipMove
                                typeName="tr"
                                duration={FLIP_DURATION}
                                easing="cubic-bezier(.12,.36,.14,1.2)"
                            >
                                {this.state.arraySmaller.map((item,i)=>{
                                    return(
                                        <td key={item}>{item}</td>
                                    );
                                })}
                            </FlipMove>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MainAnimation;