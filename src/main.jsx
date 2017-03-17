import React from 'react';
import ReactDOM from 'react-dom';
import * as Bodies from './bodies.jsx';
import Animator from './utils/animator.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calcBase: 0,
            centered: "earth",
            scale: 0.00001,
            orbitalScale: 0.001,
            user:{}
        }
        console.log("Initializing!");
        altspace.getUser().then((user) => {
            this.setState({user});
        });
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

        let controls = {
            x: -1,
            y: 0.5,
            z: -1.5,
            selectBody:{
                width:0.1,
                height:0.1
            }
        }

        return (
            <a-scene altspace='vertical-align: middle; fullspace: true;' sync-system='app: myapp; author: YenRaven'>
                <Assets />
                <Sky />
                <a-entity  position="0 0 -2">
                    <Animator ref="animator" animationTime={1000}>
                        <a-entity id="System"
                            position={this.refs.animator?`${this.refs.animator.state.to.x} 1.5 ${this.refs.animator.state.to.z}` : "0 1.5 0"}
                            ref={(system) => {this.sys = system;}}>
                            <Sun texture="#sun" now={this.state.calcBase} ref="sun" {...scaleProps}  onClick={this.centerPlanet("sun")}/>
                            <Mercury texture="#mercury" {...bodyProps} ref="mercury" onClick={this.centerPlanet("mercury")} />
                            <Venus texture="#venus" {...bodyProps} ref="venus" onClick={this.centerPlanet("venus")}/>
                            <Earth texture="#earth" {...bodyProps} ref="earth"  onClick={this.centerPlanet("earth")}/>
                            <Mars texture="#mars" {...bodyProps} ref="mars"  onClick={this.centerPlanet("mars")}/>
                            <Juipter texture="#jupiter" {...bodyProps} ref="jupiter" onClick={this.centerPlanet("jupiter")}/>
                            <Saturn texture="#saturn" {...bodyProps} ref="saturn"  onClick={this.centerPlanet("saturn")}/>
                            <Uranus texture="#uranus" {...bodyProps} ref="uranus"  onClick={this.centerPlanet("uranus")}/>
                            <Neptune texture="#neptune" {...bodyProps} ref="neptune"  onClick={this.centerPlanet("neptune")}/>
                        </a-entity>
                    </Animator>
                </a-entity>
                {
                    this.state.user.isModerator?[
                        <BodySelectControl src="#sun" centerPlanet={this.centerPlanet("sun")} {...controls} key={0}/>,
                        <BodySelectControl src="#mercury"  centerPlanet={this.centerPlanet("mercury")} {...controls} key={1}/>,
                        <BodySelectControl src="#venus"  centerPlanet={this.centerPlanet("venus")} {...controls} key={2}/>,
                        <BodySelectControl src="#earth"  centerPlanet={this.centerPlanet("earth")} {...controls} key={3}/>,
                        <BodySelectControl src="#mars"  centerPlanet={this.centerPlanet("mars")} {...controls} key={4}/>,
                        <BodySelectControl src="#jupiter"  centerPlanet={this.centerPlanet("jupiter")} {...controls} key={5}/>,
                        <BodySelectControl src="#saturn"  centerPlanet={this.centerPlanet("saturn")} {...controls} key={6}/>,
                        <BodySelectControl src="#uranus"  centerPlanet={this.centerPlanet("uranus")} {...controls} key={7}/>,
                        <BodySelectControl src="#neptune"  centerPlanet={this.centerPlanet("neptune")} {...controls} key={8}/>,
                        <TextControlBtn
                            width="0.9"
                            height="0.1"
                            position={`${controls.x+0.4} ${controls.y+0.13} ${controls.z}`}
                            value="Orbital Scale"
                            color="#888888"
                            key="orbitBtn"
                            onClick={this.adjustOrbit}
                        />
                    ]:null
                }
            </a-scene>
        )
    }

    adjustOrbit = () => {
        this.setState((state) =>{
            return {
                ...state,
                orbitalScale: state.orbitalScale>=1?0.001:state.orbitalScale*10
            }
        })
    }
    centerPlanet = (ref) => () => {
        console.log(ref);
        this.setState({centered:ref});
    }

    componentWillUpdate(nextProps, nextState){
        let targPos;
        let sysPos;
        if(this.refs.animator && this.refs.animator.isMine()){
            targPos = this.refs[this.state.centered].refs.body.getPosition(nextState.calcBase);
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
      }, 1000);
    }
}

var bodySelectControlCount = 0;
class BodySelectControl extends React.Component {
    constructor(props){
        super(props);
        this.bodySelectControlCount = bodySelectControlCount++;
    }
    render(){
        return (
            <a-image
                ref={(el) => {this.el = el;}}
                width={this.props.selectBody.width}
                height={this.props.selectBody.height}
                position={`${this.props.x+this.props.selectBody.width*this.bodySelectControlCount} ${this.props.y} ${this.props.z}`}
                material={`src:${this.props.src}`}
                onClick={this.props.centerPlanet}
                n-cockpit-parent
            />
        )
    }
    componentDidMount(){
        this.el.setAttribute("altspace-cursor-collider", "enabled: true");
    }
}

class TextControlBtn extends React.Component {
    render(){
        return (
            <a-plane
                ref={(el)=>{this.el = el;}}
                position={this.props.position}
                onClick={this.props.onClick}
                color={this.props.color}
                width={this.props.width}
                height={this.props.height}
                n-cockpit-parent
            >
            </a-plane>
        )
    }
    componentDidMount(){
        this.el.setAttribute("text", `color:white; align:center; value:${this.props.value}`)
        this.el.setAttribute("altspace-cursor-collider", "enabled: true");
    }
}

class Assets extends React.Component {
    render(){
        return (
            <a-assets>
                <img id="sky" src="assets/eso0932a.jpg" />
                <img id="sun" src="assets/sun.jpg" />
                <img id="mercury" src="assets/mercury.jpg" />
                <img id="venus" src="assets/venus.jpg" />
                <img id="earth" src="assets/earth.jpg" />
                <img id="mars" src="assets/mars.jpg" />
                <img id="jupiter" src="assets/jupiter.jpg" />
                <img id="saturn" src="assets/saturn.jpg" />
                <img id="saturnRings" src="assets/saturn-rings.png" />
                <img id="uranus" src="assets/uranus.jpg" />
                <img id="neptune" src="assets/neptune.jpg" />
            </a-assets>
        )
    }
}

class Sky extends React.Component {
    render(){
        return (
            <a-sky src='#sky' radius='2000'></a-sky>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById("appMain")
);
