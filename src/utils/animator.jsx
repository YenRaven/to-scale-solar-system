import React from 'react';
import ReactDOM from 'react-dom';
import {simpleIterator, linear} from "./util.js";


class AnimatorSync extends React.Component {
    render(){
        return <a-entity id={`a-${this.props.type}-${animationId}`} position={`${this.props.position.x} ${this.props.position.y} ${this.props.position.z}`} ref={(el) => {this.el = el;}} sync sync-transform />
    }

    shouldComponentUpdate(){
        return this.el && this.el.components.sync && this.el.components.sync.isMine;
    }
}

var animationId = 0;
export default class Animator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to:{
                x:0,
                y:0,
                z:0
            },
            from:{
                x:0,
                y:0,
                z:0
            }
        }

        this.lastFrom = this.state.from;
        this.watching = false;
    }

    componentWillMount() {
        animationId++;
    }

    render(){
        this.child = React.Children.only(this.props.children);
        return (
            <a-entity>
                <AnimatorSync type="to" ref={(to) => {this.to = to;}} position={this.state.to} />
                <AnimatorSync type="from" ref={(from) => {this.from = from;}} position={this.state.from} />
                {
                    React.cloneElement(this.child,
                        {
                            ref:(el) => {this.el = el; this.child.ref(el);}
                        }
                    )
                }
            </a-entity>
        );
    }

    animate(from, to){
        let xtween = simpleIterator(from.x, to.x, linear);
        let ytween = simpleIterator(from.y, to.y, linear);
        let ztween = simpleIterator(from.z, to.z, linear);

        let fn = Date.now();
        let at = this.props.animationTime;
        let el = this.el;
        let a = (fn, at, el, xtween, ytween, ztween)=>()=>{
            var n = Date.now();
            var i = (n - fn) / at;
            if(i < 1){
                    window.requestAnimationFrame(a(fn, at, el, xtween, ytween, ztween));
                    el.setAttribute("position", `${xtween(i)} ${ytween(i)} ${ztween(i)}`);
            }
        }
        window.requestAnimationFrame(a(fn, at, el, xtween, ytween, ztween));
    }

    watch(){
        if(!this.watching){
            this.watching = setInterval(()=>{
                let {from, to} = this;
                from = from.el.getAttribute("position");
                to = to.el.getAttribute("position");
                if(from.x != this.lastFrom.x || from.y != this.lastFrom.y || from.z != this.lastFrom.z){
                    this.animate(
                        from,
                        to
                    )
                    this.lastFrom = from;
                }
            }, 100);
        }
    }

    unwatch(){
        if(this.watching){
            clearInterval(this.watching);
            this.watching = false;
        }
    }

    isMine(){
        return this.to && this.to.el.components.sync && this.to.el.components.sync.isMine;
    }

    componentDidUpdate(){
        if(this.isMine()){
            this.unwatch();
            this.animate(
                this.state.from,
                this.state.to
            );
        }else{
            this.watch();
        }
    }

    componentWillUnmount(){
        if(this.watching){
            this.unwatch();
        }
    }
}

Animator.defaultProps = {
    animationTime: 100
};
