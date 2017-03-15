import React from 'react';
import ReactDOM from 'react-dom';
import * as Bodies from './bodies.jsx';
import Animator from './utils/animator.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calcBase: 0,
            selected: "earth",
            scale: 0.00001,
            orbitalScale: 0.001
        }
    }
    render() {
        let {
            Sun,
            Mercury, Venus, Earth, Mars, Juipter, Saturn, Uranus, Neptune
        } = Bodies;
        let scaleProps = {
                calcBase: this.state.calcBase,
                scale: this.state.scale,
                orbitalScale: this.state.orbitalScale
        }
        let bodyProps = {
            ...scaleProps,
            now: this.state.calcBase,
            parentRadius: 695700
        };

        return (
            <Animator ref="animator" animationTime={1000}>
                <a-entity id="System"
                    position={this.refs.animator?`${this.refs.animator.state.to.x} 1.5 ${this.refs.animator.state.to.z}` : "0 1.5 0"}
                    ref={(system) => {this.sys = system;}}>
                    <Sun texture="#sun" now={this.state.calcBase} ref="sun" {...scaleProps} />
                    <Mercury texture="#mercury" {...bodyProps} ref="mercury" />
                    <Venus texture="#venus" {...bodyProps} ref="venus" />
                    <Earth texture="#earth" {...bodyProps} ref="earth" />
                    <Mars texture="#mars" {...bodyProps} ref="mars" />
                    <Juipter texture="#juipter" {...bodyProps} ref="juipter" />
                    <Saturn texture="#saturn" {...bodyProps} ref="saturn" />
                    <Uranus texture="#uranus" {...bodyProps} ref="uranus" />
                    <Neptune texture="#neptune" {...bodyProps} ref="neptune" />
                </a-entity>
            </Animator>
        )
    }

    componentWillUpdate(nextProps, nextState){
        let targPos;
        let sysPos;
        if(this.sys && this.sys.components.sync && this.sys.components.sync.isMine){
            targPos = this.refs[this.state.selected].refs.body.getPosition(nextState.calcBase);
            sysPos = this.refs.animator.state.to;
            targPos.x = -targPos.x;
            targPos.z = -targPos.z;
            targPos.y = 1.5;

            this.refs.animator.setState((state) => {
                return {
                    ...state,
                    from: sysPos,
                    to: targPos
                }
            })
        }else{
            targPos = {x:0, y:1.5, z:-10};
            sysPos = {x:0, y:1.5, z:-10};
        }
    }

    componentDidMount(){
      setInterval(()=>{
          this.setState((state) => {
              return {
                  ...state,
                  calcBase:state.calcBase+1
              }
          });
      }, 1000)
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById("appMain")
);
