// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopupContainer from '../PopupContainer';

import styles from './Popup.less';

type Props = {
  children: React.Element<any>,
  render: () => React.Element<any>,
  side: string,
  trigger: string,
  offset: number
}

type State = {
  position: {
    left: number,
    top: number
  },
  size: {
    height: number,
    width: number
  },
  visible: boolean,
  popupContainer: {
    popupHeight: number,
    popupWidth: number
  }
}

export default class Popup extends Component {
  props: Props;
  state: State;
  popupContainer: HTMLElement;
  popupClasses: Array<string>;

  constructor(props: Props) {
    super(props);

    this.popupClasses = [];

    this.state = {
      visible: false,
      position: {
        top: 0,
        left: 0
      },
      size: {
        height: 0,
        width: 0
      },
      popupContainer: {
        popupHeight: 0,
        popupWidth: 0
      }
    };
  }

  render() {
    let { children, render, side, ...props } = this.props;

    let className = side ? `${styles.popup} ${styles.pin}` : styles.popup;
    className += ` ${this.popupClasses.join(' ')}`;

    return (
      <div onClick={e => this._handleClick(e)}
        onMouseOver={e => this._handleHover(e)}
        onMouseLeave={e => this._handleBlur()}
      >
        {children}
        {
          this.state.visible &&
          <PopupContainer
            reportSelfSize={this.reportSelfSize.bind(this)}
            ref={el => this.popupContainer = el}
            position={this.passPositionToContainer()}
            {...props}
          >
            <div className={className}>
              {render()}
            </div>
          </PopupContainer>
        }
      </div>
    );
  }

  passPositionToContainer() {
    let { popupHeight, popupWidth } = this.state.popupContainer;
    let { width, height } = this.state.size;
    let { top, left } = this.state.position;
    let { side = 'top center', offset = 10 } = this.props;

    side = side.split(' ');

    switch (side[0]) {
      case 'top':
        top = top - popupHeight - offset;
        left = left - popupWidth/2 + width/2;

        this.popupClasses = Array.from(new Set([
          styles.ontop,
          ...this.popupClasses])
        );
        break;
      case 'right':
        top = top - popupHeight/2 + height/2;
        left = left + width + offset;

        this.popupClasses = Array.from(new Set([
          styles.onright,
          ...this.popupClasses])
        );
        break;
      case 'bottom':
        top = top + height + offset;
        left = left - popupWidth/2 + width/2;

        this.popupClasses = Array.from(new Set([
          styles.onbottom,
          ...this.popupClasses])
        );
        break;
      case 'left':
        top = top - popupHeight/2 + height/2;
        left = left - popupWidth - offset;

        this.popupClasses = Array.from(new Set([
          styles.onleft,
          ...this.popupClasses])
        );
        break;

      default: console.warn('не указана позиция попапа');
    }

    switch (side[1]) {
      case 'center':
        this.popupClasses = Array.from(new Set([
          styles.center,
          ...this.popupClasses])
        );
        break;
      case 'middle':
        this.popupClasses = Array.from(new Set([
          styles.middle,
          ...this.popupClasses])
        );
        break;
      case 'top':
        top += (popupHeight/2 + height/2 - height);

        this.popupClasses = Array.from(new Set([
          styles.top,
          ...this.popupClasses])
        );
        break;
      case 'right':
        left += (popupWidth/2 + width/2 - popupWidth);

        this.popupClasses = Array.from(new Set([
          styles.right,
          ...this.popupClasses])
        );
        break;
      case 'bottom':
        top += (popupHeight/2 + height/2 - popupHeight);

        this.popupClasses = Array.from(new Set([
          styles.bottom,
          ...this.popupClasses])
        );
        break;
      case 'left':
        left = left + popupWidth/2 - width/2;

        this.popupClasses = Array.from(new Set([
          styles.left,
          ...this.popupClasses])
        );
        break;
      default: console.warn('не указана позиция пина');
    }

    return {
      left,
      top
    };
  }

  _handleClick(e: any) {
    if (this.props.trigger !== 'click') {return;}

    let { width, height } = e.target.getBoundingClientRect();
    let { top, left } = this.getCoords(e.target);

    this.setState({
      position: { top, left },
      size: { width, height },
      visible: !this.state.visible
    });
  }

  _handleHover(e: any) {
    if (this.props.trigger !== 'hover') {return;}

    let { width, height } = e.target.getBoundingClientRect();
    let { top, left } = this.getCoords(e.target);

    this.setState({
      position: { top, left },
      size: { width, height },
      visible: true
    });
  }

  _handleBlur(e: any) {
    if (this.props.trigger !== 'hover') {return;}

    this.setState({
      visible: false
    });
  }

  reportSelfSize(element: any) {
    let { height, width } = element.getBoundingClientRect();

    this.setState({
      popupContainer: {
        popupHeight: height,
        popupWidth: width
      }
    });
  }

  getCoords(elem: HTMLElement) {
    let box = elem.getBoundingClientRect();

    let element = document.documentElement || document.body;

    let scrollTop = window.pageYOffset || element && element.scrollTop || 0;
    let scrollLeft = window.pageXOffset || element && element.scrollLeft || 0;

    let clientTop = element && element.clientTop || 0;
    let clientLeft = element && element.clientLeft || 0;

    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    return {
      top,
      left
    };
  }

}

Popup.propTypes = {
  children: PropTypes.node,

/**
 * Отступ попапа от вызывающего элемента
 */
  offset: PropTypes.number,

/**
 * Компонент, который рендерится внутри попапа
 */
  render: PropTypes.any,

/**
 * C какой стороны рендерить попап
 */
  side: PropTypes.string,

/**
 * По какому событию открыть попап
 */
  trigger: PropTypes.string
};
