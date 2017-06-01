// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopupContainer from '../PopupContainer';
import CloseButton from '../CloseButton/';

import styles from './Popup.less';

type Props = {
  children: React.Element<any>,
  render: () => React.Element<any>,
  side: string,
  trigger: string,
  enableCloseButton: boolean,
  offset: number
}

type State = {
  className: string,
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

  constructor(props: Props) {
    super(props);

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
      },
      className: styles.popup
    };
  }


  render() {
    let { children, render, side, enableCloseButton, ...props } = this.props;

    let className = side ?
    `${this.state.className} ${styles.pin}`
     : this.state.className;

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
              {
                enableCloseButton &&
                <CloseButton onClick={e => this._handleClick(e)}/>
              }
              {render()}
            </div>
          </PopupContainer>
        }

      </div>
    );
  }

  passPositionToContainer() {
    //let { width = 0, height = 0 } = this.self.getBoundingClientRect();
/*
    switch (side[0]) {
      case 'top':
        style = {
          'top': top - height - MARGIN + 'px'
        };
        break;
      case 'bottom':
        style = {
          'top': top + height + MARGIN + 'px',
          'left': left + 'px' };

        break;
      case 'right':
        style = {
          'left': left + MARGIN  + 'px',
          'top': top + 'px' };

        break;
      case 'left':
        style = {
          'left': MARGIN  + 'px',
          'top': top + 'px' };

        break;
      default: console.warn('не указана позиция попапа');
    }

    switch (side[1]) {
      case 'middle':

        break;

      case 'center':
        style = { ...style,
          'left': left - width/2 + 'px'
        };
        break;

      case 'top':

        style = { ...style, 'top': top + 'px' };
        break;
      case 'bottom':

        style = { ...style, 'top': top + 'px' };
        break;
      case 'right':

        style = { ...style, 'left': left + 'px' };
        break;

      case 'left':
        style = { ...style, 'left': left   + 'px' };
        break;

      default: console.warn('не указана позиция пина');
    }
*/
    let { popupHeight, popupWidth } = this.state.popupContainer;
    let { width, height } = this.state.size;
    let { top, left } = this.state.position;
    let { side = 'top center', offset = 10 } = this.props;

    side = side.split(' ');

    switch (side[0]) {
      case 'top':
        top = top - popupHeight - offset;
        left = left - popupWidth/2 + width/2;
        break;
      case 'right':
        top = top - popupHeight/2 + height/2;
        left = left + width + offset;
        break;
      case 'bottom':
        top = top + height + offset;
        left = left - popupWidth/2 + width/2;
        break;
      case 'left':
        top = top - popupHeight/2 + height/2;
        left = left - popupWidth - offset;
        break;

      default: console.warn('не указана позиция попапа');
    }

    switch (side[1]) {
      case 'center':

        break;
      default: console.warn('не указана позиция пина');
    }
    return {
      left,
      top
    };
  }

  _handleClick(e: any) {//e: SyntheticMouseEvent?
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

    let body: HTMLBodyElement = document.body;
    let docEl: HTMLDocument = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

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

/*
Показывать ли крестик закрытия
*/
  enableCloseButton: PropTypes.bool,

/*
  Отступ попапа от вызывающего элемента
*/
  offset: PropTypes.number,

/*
Компонент, который рендерится внутри попапа
*/
  render: PropTypes.any,

/*
C какой стороны рендерить попап
*/
  side: PropTypes.string,

/*
По какому событию открыть попап
*/
  trigger: PropTypes.string


};





/*
type Props = {
  children: React.Element<any>,
  enableCloseButton?: boolean,
  trigger?: string
}

type State = {
  visible: boolean,
  top: ?any,
  right: ?any,
  bottom: ?any,
  left: ?any
}

export default class Popup extends Component {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      top: null,
      right: null,
      bottom: null,
      left: null
    };
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

  getSelfCoordinates(e: SyntheticEvent) {
    let { top, right, bottom, left } = e.target.getBoundingClientRect();

    this.setState({
      top, right, bottom, left
    });
  }

  handleClick(e: SyntheticMouseEvent) {
    this.getSelfCoordinates(e);

    this.togleVisibility();
  }

  handleHover(e: SyntheticMouseEvent) {
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
}

Popup.propTypes = {
  children: PropTypes.node,
  enableCloseButton: PropTypes.bool,
  trigger: PropTypes.string
};
*/

