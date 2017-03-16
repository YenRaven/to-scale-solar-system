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

        this.animationState = {
            cx:0,
            cy:0,
            cz:0
        }
    }

    componentWillMount() {
        animationId++;
    }

    render(){
        return (
            <a-entity>
                <a-entity id={`a-to-${animationId}`} ref={(el) => {this.to = el;}} position={`${this.state.to.x} ${this.state.to.y} ${this.state.to.z}`} sync sync-transform />
                <a-entity id={`a-from-${animationId}`} ref={(el) => {this.from = el;}} position={`${this.state.from.x} ${this.state.from.y} ${this.state.from.z}`} sync sync-transform />
                {
                    React.cloneElement(React.Children.only(this.props.children),
                        {
                            ref:(el) => {this.el = el; React.Children.only(this.props.children).ref(el);}
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
        if(!this.observer){
            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    this.animate(
                        this.from.getAttribute("position"),
                        this.to.getAttribute("position")
                    );
                });
            });

            var config = { attributes: true, childList: false, characterData: false };

            // pass in the target node, as well as the observer options
            this.observer.observe(this.to, config);
            //this.observer.observe(this.refs.from, config);
        }
    }

    unwatch(){
        if(this.observer){
            this.observer.disconnect();
            this.observer = null;
        }
    }

    isMine(){
        return this.to && this.to.components.sync && this.to.components.sync.isMine;
    }

    shouldComponentUpdate(){
        if(this.to.components.sync.isMine){
            this.unwatch();
        }else{
            this.watch();
        }
        return this.to.components.sync.isMine || false;
    }

    componentDidUpdate(){
        this.animate(
            this.state.from,
            this.state.to
        );
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
