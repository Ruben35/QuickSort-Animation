import React from "react";
import FlipMove from 'react-flip-move';
import { ReactComponent as Darrow } from '../img/down-arrow.svg';

const FLIP_DURATION=750;

class MainPartition extends React.Component{
    constructor(props){
        super(props);
        var array=[]
        for(var i=this.props.start;i<this.props.end;i++){
            array.push(i);
        }
        this.state=({
            array:this.props.array,
            pivot:this.props.array[this.props.end],
            start:this.props.start,
            end:this.props.end,
            arrayPointer:['P'].concat(array),
            arraySmaller:['S'].concat(array),
            indexPointer:0,
            indexSmaller:0,
        })

        this.newSwap=this.newSwap.bind(this);
        this.moveJRight=this.moveJRight.bind(this);
        this.moveIRight=this.moveIRight.bind(this);
        this.moveJLeft=this.moveJLeft.bind(this);
        this.moveILeft=this.moveILeft.bind(this);
        this.swapIJ=this.swapIJ.bind(this);
        this.swapP=this.swapP.bind(this);
        this.refresh=this.refresh.bind(this);
    }


    refresh(start,end){
        var array=[]
        for(var i=start;i<end;i++){
            array.push(i);
        }
        this.setState({
            pivot:this.props.array[end],
            start:start,
            end:end,
            arrayPointer:['P'].concat(array),
            arraySmaller:['S'].concat(array),
            indexPointer:0,
            indexSmaller:0,
        })
    }

    newSwap(input, index_A, index_B) {
        let array=input.slice();
        let temp = array[index_A];
    
        array[index_A] = array[index_B];
        array[index_B] = temp;

        return array;
    }

    moveJRight(){
        this.setState({
            arrayPointer:this.newSwap(this.state.arrayPointer,this.state.indexPointer,this.state.indexPointer+1),
            indexPointer:this.state.indexPointer+1
        })
    }

    moveIRight(){
        this.setState({
            arraySmaller:this.newSwap(this.state.arraySmaller,this.state.indexSmaller,this.state.indexSmaller+1),
            indexSmaller:this.state.indexSmaller+1
        })
    }

    moveJLeft(){
        this.setState({
            arrayPointer:this.newSwap(this.state.arrayPointer,this.state.indexPointer,this.state.indexPointer-1),
            indexPointer:this.state.indexPointer-1
        })
    }

    moveILeft(){
        this.setState({
            arraySmaller:this.newSwap(this.state.arraySmaller,this.state.indexSmaller,this.state.indexSmaller-1),
            indexSmaller:this.state.indexSmaller-1
        })
    }
    
    swapIJ(){
        var newarray=this.newSwap(this.state.array,this.state.indexSmaller-1+this.state.start,this.state.indexPointer-1+this.state.start);
        this.setState({
            array:newarray
        })
        this.props.changeArray(newarray);
    }

    swapP(){
        var newarray=this.newSwap(this.state.array,this.state.indexSmaller+this.state.start,this.state.end);
        this.setState({
            array:newarray
        })
        this.props.changeArray(newarray);
    }


    render(){

        return(
            <div className="mainAnimation">
                <h1>Partición de QuickSort({this.state.start},{this.state.end})</h1>
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
                                            {item==="P"?<Darrow className="pointer"/>:""}
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
                                {this.state.array.slice(this.state.start,this.state.end+1).map((item,i)=>{
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
                                            {item==="S"?<Darrow className="pointer S"/>:""}
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

export default MainPartition;