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
        var p = this.props.now / this.props.orbitalDist
        p = isNaN(p)?0:p;
        p = Infinity == p?0:p;
        var x = ((Math.sin(p) * this.props.orbitalDist * 1000000) * this.props.orbitalScale * this.props.scale) + (Math.sin(p) * (this.props.parentRadius * this.props.scale));
        var y = 0;
        var z = ((Math.cos(p) * this.props.orbitalDist * 1000000) * this.props.orbitalScale * this.props.scale) + (Math.cos(p) * (this.props.parentRadius * this.props.scale));
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
}

Body.defaultProps = {
        parentRadius: 0
}

export class Rings extends React.Component {
    render() {
        return (
            <a-entity>
            <a-circle
                radius={this.props.radius * this.props.scale}
                rotation={`${this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}
                color={this.props.texture?null:this.props.color}
                material={this.props.texture?`src: ${this.props.texture}`:null}
            />
            <a-circle
                radius={this.props.radius * this.props.scale}
                rotation={`${-this.props.rotationX} ${this.props.rotationY} ${this.props.rotationZ}`}
                color={this.props.texture?null:this.props.color}
                material={this.props.texture?`src: ${this.props.texture}`:null}
            />
            </a-entity>
        )
    }
}
