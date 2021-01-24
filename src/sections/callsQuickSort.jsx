import React from 'react';

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
                Hola
            </div>
        );
    }
}

export default CallsQuickSort;