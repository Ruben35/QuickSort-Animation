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
            arraySmaller:['S'].concat(array),
            indexPointer:0,
            indexSmaller:0
        })

        this.newSwap=this.newSwap.bind(this);
        this.click=this.click.bind(this);
        this.cllick=this.cllick.bind(this);
    }

    newSwap(input, index_A, index_B) {
        let array=input.slice();
        let temp = array[index_A];
    
        array[index_A] = array[index_B];
        array[index_B] = temp;

        return array;
    }

    click(event){
        this.setState({
            arrayPointer:this.newSwap(this.state.arrayPointer,this.state.indexPointer,this.state.indexPointer+1),
            indexPointer:this.state.indexPointer+1
        })
    }

    cllick(event){
        this.setState({
            arraySmaller:this.newSwap(this.state.arraySmaller,this.state.indexSmaller,this.state.indexSmaller+1),
            indexSmaller:this.state.indexSmaller+1
        })
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
                                            {item==="P"?<Darrow className="pointer" onClick={this.click}/>:""}
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
                                        <td key={item}>
                                            {item==="S"?<Darrow className="pointer S" onClick={this.cllick}/>:""}
                                        </td>
                                    );
                                })}
                            </FlipMove>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                    <h2><Darrow className="pointer"/>Índice que recorre el arreglo</h2>
                    <h2><Darrow className="pointer S"/>Elemento más pequeño</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainAnimation;