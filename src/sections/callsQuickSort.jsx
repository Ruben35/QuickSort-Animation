import React from 'react';
import { ReactComponent as Checked } from '../img/checked.svg';

class CallsQuickSort extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listCalls:this.props.listCalls
        }
        this.refreshListCalls=this.refreshListCalls.bind(this);
    }

    refreshListCalls(newList){
        this.setState({
            listCalls:newList
        })
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
                            <p key={item.text}>
                                {item.text}
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