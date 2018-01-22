// @flow
/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import events from 'add-event-listener';
import { EventEmitter } from 'fbemitter';
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import addClass from '../../lib/dom/addClass';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import LayoutEvents from '../../lib/LayoutEvents';
import removeClass from '../../lib/dom/removeClass';
import RenderContainer from '../RenderContainer';
import ZIndex from '../ZIndex';
import stopPropagation from '../../lib/events/stopPropagation';
import Sticky from '../Sticky';

import styles from './Modal.less';

const stack = {
  emitter: new EventEmitter(),
  mounted: []
};

const KEY_CODE_ESCAPE = 27;

let mountedModalsCount = 0;
let prevMarginRight = '';

type ModalChild = React.Node;

type Props = {
  children?: ModalChild,
  disableClose?: boolean,
  ignoreBackgroundClick?: boolean,
  noClose?: boolean,
  width?: number | string,
  onClose?: () => void
};

type State = {
  shadowed: boolean,
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
    // Is shadowed by another modal that was rendered on top of this one.
    shadowed: false,
    horizontalScroll: false
  };

  _stackSubscribtion = null;
  _centerDOM: ?HTMLElement = null;
  _scrollbarWidth = getScrollWidth();

  constructor(props: Props, context: mixed) {
    super(props, context);

    stack.mounted.push(this);
    this._stackSubscribtion = stack.emitter.addListener(
      'change',
      this._handleStackChange
    );
  }

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
          {!this.state.shadowed && <div className={styles.bg} />}
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
    if (mountedModalsCount === 0) {
      const { documentElement } = document;
      if (documentElement) {
        // NOTE This not covered case if somebody change
        // style while modal is open
        prevMarginRight = documentElement.style.marginRight;
      }
      this._handleWindowResize();
      events.addEventListener(window, 'resize', this._handleWindowResize);
      LayoutEvents.emit();
    }
    mountedModalsCount++;
    events.addEventListener(window, 'keydown', this._handleKeyDown);
    stack.emitter.emit('change');
    this._checkHorizontalScrollAppearance();
  }

  componentWillUnmount() {
    if (--mountedModalsCount === 0) {
      const { documentElement } = document;
      if (documentElement) {
        documentElement.style.marginRight = prevMarginRight;
        removeClass(documentElement, styles.bodyClass);
      }
      events.removeEventListener(window, 'resize', this._handleWindowResize);
      LayoutEvents.emit();
    }

    this._stackSubscribtion && this._stackSubscribtion.remove();
    const inStackIndex = stack.mounted.findIndex(x => x === this);
    if (inStackIndex !== -1) {
      stack.mounted.splice(inStackIndex, 1);
    }
    stack.emitter.emit('change');
  }

  _handleWindowResize = () => {
    const docEl = document.documentElement;
    if (!docEl) {
      return;
    }
    const { clientHeight, scrollHeight, style } = docEl;

    if (clientHeight < scrollHeight) {
      docEl.style.marginRight = prevMarginRight;
      removeClass(docEl, styles.bodyClass);
      const marginRight = parseFloat(getComputedStyle(docEl).marginRight);
      addClass(docEl, styles.bodyClass);
      docEl.style.marginRight = `${marginRight + this._scrollbarWidth}px`;
    } else if (style.marginRight !== prevMarginRight) {
      style.marginRight = prevMarginRight;
    }

    this._checkHorizontalScrollAppearance();
  };

  _handleStackChange = () => {
    const shadowed = stack.mounted[stack.mounted.length - 1] !== this;
    if (this.state.shadowed !== shadowed) {
      this.setState({ shadowed });
    }
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
    if (stack.mounted[stack.mounted.length - 1] !== this) {
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
