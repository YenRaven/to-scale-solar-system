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
            ref="body"
            radius={696342}
            color="#FFFF00"
            orbitalDist={0}
            {...this.props}
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
            ref="body"
            radius={2440}
            color="#FF8800"
            orbitalDist={46}
            {...this.props}
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
            ref="body"
            radius={6052}
            color="#8888FF"
            orbitalDist={108}
            {...this.props}
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
            ref="body"
            radius={6371}
            color="#003399"
            orbitalDist={149}
            {...this.props}
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
            ref="body"
            radius={3389}
            color="#FF4400"
            orbitalDist={228}
            {...this.props}
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
            ref="body"
            radius={69911}
            color="#AA8800"
            orbitalDist={778}
            {...this.props}
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
            ref="body"
            radius={58232}
            color="#AA8899"
            orbitalDist={1400}
            {...this.props}
            {...scaleProps}
            >
                <Rings
                    radius={138232}
                    color="#000000"
                    rotationX={-90}
                    rotationY={0}
                    rotationZ={0}
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
            ref="body"
            radius={25362}
            color="#FF8800"
            orbitalDist={2750}
            {...this.props}
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
            ref="body"
            radius={24622}
            color="#0088FF"
            orbitalDist={4500}
            {...this.props}
            {...scaleProps}
            />
        )
    }
}
