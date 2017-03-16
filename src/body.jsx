import React from 'react';
import ReactDOM from 'react-dom';
import Animator from './utils/animator.jsx';

const _LOD = 32;
var bodyCount = 0;

export class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: `Body${bodyCount++}`
        }
    }

    render() {
        let {x, y, z} = this.getPosition(this.props.now);
        return (
            <Animator ref="animator" animationTime={1000}>
                <a-sphere
                    ref={(geom) => {this.geom = geom;}}
                    id={this.state.id}
                    position={this.refs.animator?`${this.refs.animator.state.to.x} ${this.refs.animator.state.to.y} ${this.refs.animator.state.to.z}` : "0 0 0"}
                    radius={this.props.radius * this.props.scale}
                    color={this.props.texture?null:this.props.color}
                    material={this.props.texture?`src: ${this.props.texture}`:null}
                    segments-height={_LOD}
                    segments-width={_LOD}
                >
                    {this.props.children}
                </a-sphere>
            </Animator>
        )
    }

    componentWillUpdate(nextProps){
        let newPos = this.getPosition(nextProps.now);
        let oldPos = this.getPosition(this.props.now);

        this.refs.animator.setState((state) => {
            return {
                ...state,
                from: oldPos,
                to: newPos
            }
        })

    }

    getPosition(n){
        let p = n / this.props.orbitalDist;
        p = isNaN(p)?0:p;
        p = Infinity == p?0:p;
        return {
            x: ((Math.sin(p) * this.props.orbitalDist * 1000000) * this.props.orbitalScale * this.props.scale) + (Math.sin(p) * (this.props.parentRadius * this.props.scale)),
            y: 0,
            z: ((Math.cos(p) * this.props.orbitalDist * 1000000) * this.props.orbitalScale * this.props.scale) + (Math.cos(p) * (this.props.parentRadius * this.props.scale))
        };
    }
}

Body.defaultProps = {
        parentRadius: 0
}

export class Rings extends React.Component {
    render() {
        let size = this.props.radius * this.props.scale * 2;
        return (
            <a-entity ref={(el)=>{this.containerEl = el}}>
                <a-image
                    key="top"
                    width={size}
                    height={size}
                    transparent="true"
                    rotation={`${this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}
                    src={this.props.texture?this.props.texture:null}
                />
                <a-image
                    key="btm"
                    width={size}
                    height={size}
                    transparent="true"
                    rotation={`${-this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}
                    src={this.props.texture?this.props.texture:null}
                />
            </a-entity>
        )
    }
}
