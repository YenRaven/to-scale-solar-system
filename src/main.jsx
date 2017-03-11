import React from 'react';
import ReactDOM from 'react-dom';

class Particle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            m: Math.random() * this.props.r,
            o: Math.random() * this.props.r
        }
    }

    render() {
        var i = this.props.c * this.state.m + this.state.o;
        var x = Math.sin(i) * this.props.scaleX;
        var y = Math.cos(i+this.state.m) * this.props.scaleY;
        var z = Math.cos(i) * this.props.scaleZ;
        return <a-sphere
            position={`${x} ${y} ${z}`}
            radius={this.props.radius}
            color={this.props.color}
            segments-height={this.props.segments}
            segments-width={this.props.segments}
        ></a-sphere>
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calcBase: 0,
            particleCount: 200,
            segments: 1,
            particleSize: 0.01,
            radius: 0.5
        }
    }
  render() {
      var particles = []
      for(var i=0; i<this.state.particleCount; i++){
          particles.push(
              <Particle
                  key={i}
                  c={this.state.calcBase}
                  radius={this.state.particleSize}
                  color="#FF0000"
                  segments={this.state.segments}
                  scaleX={this.state.radius}
                  scaleY={this.state.radius * 2}
                  scaleZ={this.state.radius}
                  r={50}
              />
          )
      }
    return (
        <a-entity position="0 1.5 0">
            {particles}
        </a-entity>
    )
  }

  componentDidMount(){
      setInterval(()=>{
          this.setState((state) => {
              return {
                  ...state,
                  calcBase:state.calcBase+0.001
              }
          });
      }, 10)
  }
}

ReactDOM.render(
    <Main />,
    document.getElementById('appMain')
);
