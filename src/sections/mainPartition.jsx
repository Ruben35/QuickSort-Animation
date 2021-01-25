import React from "react";
import FlipMove from 'react-flip-move';
import { ReactComponent as Darrow } from '../img/down-arrow.svg';

var FLIP_DURATION=750;

class MainPartition extends React.Component{
    constructor(props){
        super(props);
        var array=[]
        for(var i=this.props.start;i<this.props.end;i++){
            array.push(i);
        }
        this.state=({
            array:this.props.array.slice(this.props.start,this.props.end+1),
            pivot:this.props.array[this.props.end],
            start:this.props.start,
            end:this.props.end,
            arrayPointer:['P'].concat(array),
            arraySmaller:['S'].concat(array),
            indexPointer:0,
            indexSmaller:0,
        })

        this.newSwap=this.newSwap.bind(this);
        this.refreshQuickSort=this.refreshQuickSort.bind(this);
        this.moveJ=this.moveJ.bind(this);
        this.moveI=this.moveI.bind(this);
        this.swapNormal=this.swapNormal.bind(this);
        this.swapAndUpdate=this.swapAndUpdate.bind(this);
        this.disableAnimation=this.disableAnimation.bind(this);
        this.enableAnimation=this.enableAnimation.bind(this);
    }

    newSwap(input, index_A, index_B) {
        let array=input.slice();
        let temp = array[index_A];
    
        array[index_A] = array[index_B];
        array[index_B] = temp;

        return array;
    }

    refreshQuickSort(start,end,array){
        var extra=[]
        var newArray=array.slice(start,end+1);
        for(var i=0;i<newArray.length;i++){
            extra.push(i);
        }
        this.setState({
            array:newArray,
            pivot:newArray[newArray.length-1],
            start:start,
            end:end,
            arrayPointer:['P'].concat(extra),
            arraySmaller:['S'].concat(extra),
            indexPointer:0,
            indexSmaller:0,
        })
    }

    moveJ(newIndex){
        this.setState({
            arrayPointer:this.newSwap(this.state.arrayPointer,this.state.indexPointer,newIndex),
            indexPointer:newIndex
        })
        console.log(this.state.arrayPointer)
    }

    moveI(newIndex){
        this.setState({
            arraySmaller:this.newSwap(this.state.arraySmaller,this.state.indexSmaller,newIndex),
            indexSmaller:newIndex
        })
    }
    
    swapNormal(newarray){
        this.setState({
            array:newarray.slice(this.state.start,this.state.end+1)
        })
    }

    swapAndUpdate(start,end,arrayState,j,i,pivot){
        var aP=[]
        var aS=[]
        var cont=0;
        for(var k=start;k<end;k++){
            aP.push(cont);
            aS.push(cont);
            cont++;
        }
        aP.splice(j,0,"P");
        aS.splice(i,0,"S");
        this.setState({
            array:arrayState.slice(start,end+1),
            pivot:pivot,
            start:start,
            end:end,
            arrayPointer:aP,
            arraySmaller:aS,
            indexPointer:j,
            indexSmaller:i,
        })
    }

    disableAnimation(){
        this.setState({
            disable:true
        })
    }

    enableAnimation(){
        this.setState({
            disable:false
        })
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
                                disableAllAnimations={this.state.disable}
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
                                disableAllAnimations={this.state.disable}
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
                                disableAllAnimations={this.state.disable}
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