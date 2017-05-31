// @flow

import React, { Component } from 'react';
import PopupContainer from '../PopupContainer';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  getSelfCoordinates(e) {
    let { top, right, bottom, left } = e.target.getBoundingClientRect();

    this.setState({
      top, right, bottom, left
    });
  }

  handleClick(e) {
    this.getSelfCoordinates(e);

    this.togleVisibility();
  }

  handleHover(e) {
    this.getSelfCoordinates(e);

    this.setState({
      visible: true
    });
  }

  handleBlur() {
    this.setState({
      visible: false
    });
  }

  togleVisibility() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    let { children, trigger, enableCloseButton, ...props } = this.props;

    return (
    <PopupContainer
      top={this.state.top}
      right={this.state.right}
      bottom={this.state.bottom}
      left={this.state.left}
      visible={this.state.visible}
      enableCloseButton={enableCloseButton}
      togleVisibility={this.togleVisibility.bind(this)}
      {...props}
    >
        <div
          onClick={trigger === 'click' ? e => this.handleClick(e) : null}
          onMouseOver={trigger === 'hover' ? e => this.handleHover(e) : null}
          onMouseLeave={trigger === 'hover' ? e => this.handleBlur() : null}
        >
            {children}
        </div>
    </PopupContainer>);
  }
}
