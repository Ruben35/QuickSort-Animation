import React from 'react'
import { ReactComponent as FFarrow } from '../img/ffarrow.svg';
import { ReactComponent as Arrow } from '../img/right-arrow.svg';
import { ReactComponent as SVGPlay } from '../img/play.svg';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { ReactComponent as SVGPause } from '../img/pause.svg';


const PrettoSlider = withStyles({
    root: {
      color: '#97cadb',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundImage: "linear-gradient(to bottom, #02457a, #001b48)",
      boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.2)",
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);


class Controls extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            play:false,
            isButtonDisabled:false,
        });

        this.togglePlay=this.togglePlay.bind(this);
        this.clickControlButton=this.clickControlButton.bind(this);
    }

    togglePlay(){
        this.setState({play:!this.state.play});
    }

    clickControlButton(type){
        this.setState({
            isButtonDisabled: true
        });
        setTimeout(() => this.setState({ isButtonDisabled: false }), 750);

        this.props.onControl(type);
    }

    render(){

        return(
            <div className="Controls">
                <div className="containSlider">
                    <div>
                        <span>Lento</span>
                        <span>Rápido</span>
                    </div>
                    <PrettoSlider
                        step={1}
                        defaultValue={2}
                        marks
                        min={1}
                        max={5}
                    />
                </div>
                <div className="containerButtons">
                    <FFarrow className="ffarrow L" onClick={this.clickControlButton.bind(this,"FBACK")} disabled={this.state.isButtonDisabled}/>
                    <Arrow className="arrow L"  onClick={this.clickControlButton.bind(this,"BACK")} disabled={this.state.isButtonDisabled}/>
                    <div className="buttonPlayPause" onClick={this.togglePlay} disabled={this.state.isButtonDisabled}>
                        {!this.state.play?<SVGPlay/>:<SVGPause className="pause"/>}
                    </div> 
                    <Arrow name="NEXT" className="arrow"  onClick={this.clickControlButton.bind(this,"NEXT")} disabled={this.state.isButtonDisabled}/>
                    <FFarrow name="FNEXT" className="ffarrow"  onClick={this.clickControlButton.bind(this,"FNEXT")} disabled={this.state.isButtonDisabled}/>
                </div>
            </div>
        )
    }
}



export default Controls;