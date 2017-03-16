import React from 'react';
import ReactDOM from 'react-dom';
import {simpleIterator, linear} from "./util.js";

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

        this.doUpdates = true;
    }

    componentWillMount() {
        animationId++;
    }

    render(){
        this.child = React.Children.only(this.props.children);
        if(this.to && this.from){
            let toPos = this.to.getAttribute("position");
            let fromPos = this.from.getAttribute("position");
        }
        return (
            <a-entity>
                <a-entity id={`a-to-${animationId}`} ref={(el) => {this.to = el;}} position={
                    this.doUpdates?
                    `${this.state.to.x} ${this.state.to.y} ${this.state.to.z}`:
                    `${toPos.x} ${toPos.y} ${toPos.z}`
                } sync sync-transform />
                <a-entity id={`a-from-${animationId}`} ref={(el) => {this.from = el;}} position={
                    this.doUpdates?
                    `${this.state.from.x} ${this.state.from.y} ${this.state.from.z}`:
                    `${fromPos.x} ${fromPos.y} ${fromPos.z}`
                } sync sync-transform />
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
        let {from, to} = this;
        from = from.getAttribute("position");
        to = to.getAttribute("position");
        if(from.x != this.state.from.x || from.y != this.state.from.y || from.z != this.state.from.z){
            this.animate(
                this.from.getAttribute("position"),
                this.to.getAttribute("position")
            )
            this.setState((state) => {
                return {
                    ...state,
                    from,
                    to
                }
            })
        }
    }

    unwatch(){

    }

    isMine(){
        return this.to && this.to.components.sync && this.to.components.sync.isMine;
    }

    componentDidMount(){
        this.doUpdates = this.isMine();
    }

    componentDidUpdate(){
        this.doUpdates = this.isMine();
        if(this.isMine()){
            this.animate(
                this.state.from,
                this.state.to
            );
        }else{
            this.watch();
        }
    }

    componentWillUnmount(){
        if(this.observer){
            this.observer.disconnect();
        }
    }
}

Animator.defaultProps = {
    animationTime: 100
};
