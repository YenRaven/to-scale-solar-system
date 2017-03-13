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
            orbitalScale: 0.01
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
        var pos;
        if(this.sys && this.sys.components.sync && this.sys.components.sync.isMine){
            pos = this.refs[this.state.selected].refs.body.getPosition(bodyProps.now);
        }else{
            pos = {x:0, y:1.5, z:-10};
        }

        return (
            <a-entity id="System" position={`${-pos.x} ${pos.y+1.5} ${-pos.z}`} ref={(system) => {this.sys = system;}} sync sync-transform>
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
        var pos;
        if(this.sys && this.sys.components.sync && this.sys.components.sync.isMine){
            pos = this.refs[this.state.selected].refs.body.geom.getAttribute("position");
        }else{
            pos = {x:0, y:1.5, z:-10};
        }
        this.sys.setAttribute("position", `${-pos.x} ${pos.y+1.5} ${-pos.z}`);
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
