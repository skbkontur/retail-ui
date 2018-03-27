// @flow
/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import events from 'add-event-listener';
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import getScrollWidth from '../../lib/dom/getScrollWidth';
import LayoutEvents from '../../lib/LayoutEvents';
import RenderContainer from '../RenderContainer';
import ZIndex from '../ZIndex';
import stopPropagation from '../../lib/events/stopPropagation';
import Sticky from '../Sticky';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';
import ModalStack from '../ModalStack';

import styles from './Modal.less';

const KEY_CODE_ESCAPE = 27;

let mountedModalsCount = 0;

type Props = {
  children?: React.Node,
  disableClose?: boolean,
  ignoreBackgroundClick?: boolean,
  noClose?: boolean,
  width?: number | string,
  onClose?: () => void
};

type State = {
  stackPosition: number,
  horizontalScroll: boolean
};

/**
 * Модальное окно
 *
 * Содержит в себе три компоненты: **Modal.Header**,
 * **Modal.Body** и **Modal.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 */
class Modal extends React.Component<Props, State> {
  static propTypes = {
    /**
     * Отключает событие onClose, также дизейблит кнопку закрытия модалки
     */
    disableClose: PropTypes.bool,

    /**
     * Не закрывать окно при клике на фон.
     */
    ignoreBackgroundClick: PropTypes.bool,

    /**
     * Не показывать крестик для закрытия окна.
     */
    noClose: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Вызывается, когда пользователь запросил закрытие окна (нажал на фон, на
     * Escape или на крестик).
     */
    onClose: PropTypes.func
  };

  static Header: Class<Header>;
  static Body: Class<Body>;
  static Footer: Class<Footer>;

  state = {
    stackPosition: 0,
    horizontalScroll: false
  };

  _stackSubscription = null;
  _centerDOM: ?HTMLElement = null;

  renderClose() {
    return (
      <a
        href="javascript:"
        className={classNames(
          styles.close,
          this.props.disableClose && styles.disabled
        )}
        onClick={this._requestClose}
      >
        ×
      </a>
    );
  }

  render() {
    const close: React.Node = !this.props.noClose ? this.renderClose() : null;

    let hasHeader = false;
    const children = React.Children.map(this.props.children, child => {
      if (child) {
        switch (child.type) {
          case Header:
            hasHeader = true;
            // $FlowIssue child could be iterable
            return React.cloneElement(child, { close });
          case Footer:
            return React.cloneElement(child, {
              horizontalScroll: this.state.horizontalScroll
            });
          default:
            return child;
        }
      }
      return child;
    });

    const style = {};
    const containerStyle = {};
    if (this.props.width) {
      style.width = this.props.width;
    } else {
      containerStyle.width = 'auto';
    }
    return (
      <RenderContainer>
        <ZIndex delta={1000} className={styles.root}>
          <HideBodyVerticalScroll />
          {this.state.stackPosition === 0 && <div className={styles.bg} />}
          <div
            ref={this._refCenter}
            className={styles.container}
            onClick={this._handleContainerClick}
          >
            <div
              className={styles.centerContainer}
              onClick={this._handleContainerClick}
              style={containerStyle}
            >
              <div className={styles.window} style={style}>
                {!hasHeader && close}
                {children}
              </div>
            </div>
          </div>
        </ZIndex>
      </RenderContainer>
    );
  }

  _refCenter = (center: ?HTMLElement) => {
    if (this._centerDOM) {
      events.removeEventListener(this._centerDOM, 'scroll', LayoutEvents.emit);
    }
    this._centerDOM = null;
    if (center) {
      const dom = ReactDOM.findDOMNode(center);
      // should check if dom instanceof HTMLElement
      // but it would break ie8
      // $FlowIssue
      this._centerDOM = dom;
      events.addEventListener(this._centerDOM, 'scroll', LayoutEvents.emit);
    }
  };

  componentDidMount() {
    this._stackSubscription = ModalStack.add(this, this._handleStackChange);
    if (mountedModalsCount === 0) {
      events.addEventListener(
        window,
        'resize',
        this._checkHorizontalScrollAppearance
      );
    }
    mountedModalsCount++;
    events.addEventListener(window, 'keydown', this._handleKeyDown);
    this._checkHorizontalScrollAppearance();
  }

  componentWillUnmount() {
    if (--mountedModalsCount === 0) {
      events.removeEventListener(
        window,
        'resize',
        this._checkHorizontalScrollAppearance
      );
      LayoutEvents.emit();
    }

    events.removeEventListener(window, 'keydown', this._handleKeyDown);
    this._stackSubscription && this._stackSubscription.remove();
    ModalStack.remove(this);
  }

  _handleStackChange = (stack: React.ComponentType<*>[]) => {
    this.setState({ stackPosition: stack.indexOf(this) });
  };

  _handleContainerClick = event => {
    if (
      event.target === event.currentTarget &&
      !this.props.ignoreBackgroundClick
    ) {
      this._requestClose();
    }
  };

  _requestClose = () => {
    if (this.props.disableClose) {
      return;
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  _handleKeyDown = event => {
    if (this.state.stackPosition !== 0) {
      return;
    }
    if (event.keyCode === KEY_CODE_ESCAPE) {
      stopPropagation(event);
      this._requestClose();
    }
  };

  _checkHorizontalScrollAppearance = () => {
    let containerClientWidth;
    let containerScrollWidth;
    let hasScroll;

    if (this._centerDOM) {
      containerClientWidth = this._centerDOM.clientWidth;
      containerScrollWidth = this._centerDOM.scrollWidth;
      hasScroll = containerClientWidth < containerScrollWidth;
    }

    if (hasScroll) {
      !this.state.horizontalScroll && this.setState({ horizontalScroll: true });
    } else {
      this.state.horizontalScroll && this.setState({ horizontalScroll: false });
    }
  };
}

type HeaderProps = {
  children?: React.Node,
  close?: boolean
};

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <Sticky side="top">
        {fixed => (
          <div
            className={classNames(styles.header, fixed && styles.fixedHeader)}
          >
            {this.props.close && (
              <div className={styles.absoluteClose}>{this.props.close}</div>
            )}
            {this.props.children}
          </div>
        )}
      </Sticky>
    );
  }
}

type BodyProps = {
  children?: React.Node
};

class Body extends React.Component<BodyProps> {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}

type FooterProps = {
  children?: React.Node,
  panel?: boolean
};

/**
 * Футер модального окна.
 */
class Footer extends React.Component<FooterProps> {
  static propTypes = {
    /** Включает серый цвет в футере */
    panel: PropTypes.bool
  };

  _scrollbarWidth = getScrollWidth();

  render() {
    const names = classNames({
      [styles.footer]: true,
      [styles.panel]: this.props.panel
    });

    return (
      <Sticky
        side="bottom"
        offset={this.props.horizontalScroll ? this._scrollbarWidth : 0}
      >
        {fixed => (
          <div className={classNames(names, fixed && styles.fixedFooter)}>
            {this.props.children}
          </div>
        )}
      </Sticky>
    );
  }
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
