import React from 'react';
import ReactDOM from 'react-dom';
import {Body, Rings} from './body.jsx';

export class Sun extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={696342}
            color="#FFFF00"
            orbitalDist={0}
            {...scaleProps}
        />)
    }
}

export class Mercury extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={2440}
            color="#FF8800"
            orbitalDist={46}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            />
        )
    }
}

export class Venus extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={6052}
            color="#8888FF"
            orbitalDist={108}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            />
        )
    }
}

export class Earth extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={6371}
            color="#003399"
            orbitalDist={149}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            />
        )
    }
}

export class Mars extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={3389}
            color="#FF4400"
            orbitalDist={228}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            />
        )
    }
}

export class Juipter extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={69911}
            color="#AA8800"
            orbitalDist={778}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            />
        )
    }
}

export class Saturn extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={58232}
            color="#AA8899"
            orbitalDist={1400}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            >
                <Rings
                    radius={138232}
                    color="#00000000"
                    rotation="-90 0 0"
                    texture="#saturnRings"
                    {...scaleProps}
                />
            </Body>
        )
    }
}

export class Uranus extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={25362}
            color="#FF8800"
            orbitalDist={2750}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            />
        )
    }
}

export class Neptune extends React.Component {
    render(){
        let scaleProps = {
            calcBase: this.props.calcBase,
            scale: this.props.scale,
            orbitalScale: this.props.orbitalScale
        };
        return (<Body
            texture={this.props.texture}
            ref="body"
            now={this.props.now}
            radius={24622}
            color="#0088FF"
            orbitalDist={4500}
            parentRadius={this.props.parentRadius}
            {...scaleProps}
            />
        )
    }
}
