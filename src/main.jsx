import React from 'react';
import ReactDOM from 'react-dom';
import * as Bodies from './bodies.jsx';

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
            <a-entity position="0 1.5 -10" ref="sys" sync sync-transform>
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
        )
    }

    componentDidUpdate(){
        let pos = this.refs[this.state.selected].refs.body.refs.geom.getAttribute("position");
        this.refs.sys.setAttribute("position", `${-pos.x} 1.5 ${-pos.z}`);
    }

    componentDidMount(){
      setInterval(()=>{
          this.setState((state) => {
              return {
                  ...state,
                  calcBase:state.calcBase+0.01
              }
          });
      }, 10)
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById("appMain")
);
