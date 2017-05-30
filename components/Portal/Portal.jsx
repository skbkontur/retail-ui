import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Portal extends Component {
    constructor(props) {
        super(props);
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }
    
    render() {
        return null;
    }

    componentDidUpdate() {
        render(
            <div {...this.props} ref={ child => this.child = child}/>,
            this.node
        );
    }
  
    componentWillUnmout() {
        document.body.removeChild(this.node);
    }
}