import React from 'react';
import { ReactComponent as Checked } from '../img/checked.svg';

class CallsQuickSort extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listCalls:this.props.listCalls
        }
    }

    render(){
        return(
            <div className="callsQuickSort">
                <div>
                    Llamadas a QuickSort
                </div>
                <div>
                    {
                        this.state.listCalls.map((item,i)=>
                            <p key={item.x+""+item.y}>
                                QuickSort({item.x},{item.y})
                                <Checked className={!item.done?"invisible":""}/>
                            </p>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default CallsQuickSort;