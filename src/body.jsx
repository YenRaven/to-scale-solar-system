import React from 'react';
import ReactDOM from 'react-dom';

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
            <a-sphere
                ref={(geom) => {this.geom = geom;}}
                id={this.state.id}
                position={`${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)}`}
                radius={this.props.radius * this.props.scale}
                color={this.props.texture?null:this.props.color}
                material={this.props.texture?`src: ${this.props.texture}`:null}
                segments-height={_LOD}
                segments-width={_LOD}
                sync sync-transform
            >
                {this.props.children}
            </a-sphere>
        )
    }

    shouldComponentUpdate(){
        return this.geom.components.sync.isMine || false;
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
            <a-entity>
            <a-image
                width={size}
                height={size}
                transparent="true"
                rotation={`${this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}
                src={this.props.texture}
            />
            <a-image
                width={size}
                height={size}
                transparent="true"
                rotation={`${-this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}
                src={this.props.texture}
            />
            </a-entity>
        )
    }
}
