// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RenderContainer from '../RenderContainer';

import styles from './PopupContainer.less';

type Props = {
  children: React.Element<any>,
  position: Object,
  reportSelfSize: (element: HTMLElement) => void,
}

type State = {

}

export default class PopupContainer extends Component {
  static defaultProps = {
    position: {}
  };

  props: Props;
  state: State;
  self: HTMLElement;

  componentDidMount() {
    setTimeout(() => {
      this.props.reportSelfSize(this.self);
      this.self.classList.toggle(styles.popupWrapperVisible);
    }, 0);

  }

  render() {
    let { position, children } = this.props;
    let { left, top } = position;

    let style = {
      'left': left + 'px',
      'top': top + 'px'
    };

    return (
      <div>
        <RenderContainer>
          <div
            ref={el => this.self = el}
            className={styles.popupWrapper}
            style={style}
          >
          {children}
          </div>
        </RenderContainer>
      </div>
    );
  }
}

PopupContainer.propTypes = {
  children: PropTypes.node,

/*
Позиция для попап контейнера
*/
  position: PropTypes.object,

  reportSelfSize: PropTypes.func
};


/*
type State = {
  offsetHeight: number,
  offsetWidth: number
}

type Props = {
      children?: any,
      visible?: boolean,
      pos?: Array<string>,
      top?: any,
      right?: any,
      bottom?: any,
      left?: any,
      render?: any,
      enableCloseButton?: boolean,
      togleVisibility?: any
};

const MARGIN = 15;

export default class PopupContainer extends Component {
  static PropTypes = {

    togleVisibility: PropTypes.func
  };

  props: Props;
  state: State = {
      offsetHeight: 0,
      offsetWidth: 0
    };

  componentDidMount() {
        //получаем размер эелемента, на котором вызывем модальное окно
    this.setState({
      offsetHeight: this.container.offsetHeight,
      offsetWidth: this.container.offsetWidth
    });
  }

  render() {
    let { children,
      visible,
      pos,
      top,
      right,
      bottom,
      left,
      render,
      enableCloseButton,
      togleVisibility } = this.props;

    if (this.portal && this.portal.child) {
      var modalHeight = this.portal.child.offsetHeight;
      var modalWidth = this.portal.child.offsetWidth;
    }

    if (!pos) {return null;}

    let position = pos.split(' ');

    let className = styles.popup;

    let style = {};

    switch (position[0]) {
      case 'top':
        style = {
          'top': top - modalHeight - MARGIN + 'px',
          'left': left + (right - left) / 2 - modalWidth / 2 + 'px' };
        className += ` ${styles.ontop}`;
        break;
      case 'bottom':
        style = {
          'top': bottom + MARGIN + 'px',
          'left': left + (right - left) / 2 - modalWidth / 2 + 'px' };
        className += ` ${styles.onbottom}`;
        break;
      case 'right':
        style = {
          'left': right + MARGIN  + 'px',
          'top': top + (bottom - top) / 2 - modalHeight / 2 + 'px' };
        className += ` ${styles.onright}`;
        break;
      case 'left':
        style = {
          'left': left - modalWidth - MARGIN  + 'px',
          'top': top + (bottom - top) / 2 - modalHeight / 2 + 'px' };
        className += ` ${styles.onleft}`;
        break;
      default: console.warn('не указана позиция попапа');
    }

    switch (position[1]) {
      case 'middle':
        className += ` ${styles.middle}`;
        break;
      case 'center':
        className += ` ${styles.center}`;
        break;
      case 'top':
        style = { ...style, 'top': top + 'px' };
        className += ` ${styles.top}`;
        break;
      case 'bottom':
        style = { ...style, 'top': bottom - modalHeight + 'px' };
        className += ` ${styles.bottom}`;
        break;
      case 'right':
        style = { ...style, 'left': right - modalWidth + 'px' };
        className += ` ${styles.right}`;
        break;
      case 'left':
        style = { ...style, 'left': left   + 'px' };
        className += ` ${styles.left}`;
        break;
      default: console.warn('не указана позиция пина');
    }

    return (
      <div ref={container => { this.container = container; }}>
          {children}
          <Portal
            className = {className}
            style = {{ 'visibility':visible?'visible':'hidden', ...style }}
            ref = {portal => this.portal = portal}
          >
          {
            enableCloseButton && <CloseButton handleClick={togleVisibility} />
          }
            {render()}
          </Portal>
      </div>
    );
  }
}

class Portal extends Component {
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
      <div {...this.props} ref={child => this.child = child} />,
      this.node
    );
  }

  componentWillUnmout() {
    document.body.removeChild(this.node);
  }
}
*/
