import React, { Component } from 'react';
import PopupContainer from '../PopupContainer';

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    
    getSelfSize(e) {
        let { top, right, bottom, left } = e.target.getBoundingClientRect();
        
        this.setState({
            top, right, bottom, left
        });  
    }
    
    clickHandler(e) {
        this.getSelfSize(e);
        
        this.setState({
            visible: !this.state.visible
        }); 
    }
    
    hoverHandler(e) {
        this.getSelfSize(e);
        
        this.setState({
            visible: true
        });
    }
    
    blurHandler() {
        this.setState({
            visible: false
        });
    }
    
    render() {
        let { children, trigger, ...props } = this.props;

        return (
            <PopupContainer
                top    = {this.state.top}
                right  = {this.state.right}
                bottom = {this.state.bottom}
                left   = {this.state.left}
                visible= {this.state.visible}
                {...props}>
                <div
                    onClick = { trigger == 'click' ? e => this.clickHandler(e) : null}
                    onMouseOver = { trigger == 'hover' ? e => this.hoverHandler(e) : null}
                    onMouseLeave = { trigger == 'hover' ? e => this.blurHandler(e) : null}>
                    {children}
                </div>
            </PopupContainer>);
    }
}