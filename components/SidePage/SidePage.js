// @flow
/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import events from 'add-event-listener';
import { EventEmitter } from 'fbemitter';
import * as React from 'react';
import PropTypes from 'prop-types';

import addClass from '../../lib/dom/addClass';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import LayoutEvents from '../../lib/LayoutEvents';
import removeClass from '../../lib/dom/removeClass';
import RenderContainer from '../RenderContainer';
import ScrollContainer from '../ScrollContainer';
import RenderLayer from '../RenderLayer';
import Sticky from '../Sticky';
import ZIndex from '../ZIndex';

import styles from './SidePage.less';

const stack = {
  emitter: new EventEmitter(),
  mounted: []
};

let prevMarginRight = '';

type Props = {
  children?: React.Node,
  blockBackground?: boolean,
  disableClose?: boolean,
  ignoreBackgroundClick?: boolean,
  noClose?: boolean,
  width?: number,
  onClose?: () => void
};

type State = {
  stackPosition: number
};

/**
 * Сайдпейдж
 *
 * Содержит в себе три компоненты: **SidePage.Header**,
 * **SidePage.Body** и **SidePage.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 */
class SidePage extends React.Component<Props, State> {
  static propTypes = {
    /**
     * Отключает событие onClose, также дизейблит кнопку закрытия сайдпейджа
     */
    disableClose: PropTypes.bool,

    /**
     * Добавить блокирующий фон, когда сайдпейдж открыт
     */
    blockBackground: PropTypes.bool,

    /**
     * Не закрывать сайдпейдж при клике на фон.
     */
    ignoreBackgroundClick: PropTypes.bool,

    /**
     * Не показывать крестик для закрытия окна.
     */
    noClose: PropTypes.bool,

    /**
     * Задать ширину сайдпейджа
     */
    width: PropTypes.number,

    /**
     * Вызывается, когда пользователь запросил закрытие сайдпейджа (нажал на фон, на
     * Escape или на крестик).
     */
    onClose: PropTypes.func
  };

  static Header: Class<Header>;
  static Body: Class<Body>;
  static Footer: Class<Footer>;

  _stackSubscription = null;

  constructor(props: Props, context: mixed) {
    super(props, context);

    stack.mounted.push(this);
    this._stackSubscription = stack.emitter.addListener(
      'change',
      this._handleStackChange
    );
    this.state = {
      stackPosition: stack.mounted.length - 1
    };
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

    let hasHeader: boolean = false;
    const children = React.Children.map(this.props.children, child => {
      if (child) {
        switch (child.type) {
          case Header:
            hasHeader = true;
            // $FlowIssue child could be iterable
            return React.cloneElement(child, { close });
          default:
            return child;
        }
      }
    });

    const rootStyle = this.props.blockBackground ? { width: '100%' } : {};
    const sidePageStyle = {
      width: this.props.width || this.props.blockBackground ? 800 : 500,
      marginRight:
        this.state.stackPosition === 0 && stack.mounted.length > 1
          ? 20
          : undefined
    };

    return (
      <RenderLayer
        onClickOutside={this._handleClickOutside}
        onFocusOutside={this._handleFocusOutside}
        active={true}
      >
        <RenderContainer>
          <ZIndex
            delta={1000}
            className={styles.root}
            onScroll={LayoutEvents.emit}
            style={rootStyle}
          >
            {this.props.blockBackground && (
              <div
                className={classNames(
                  styles.background,
                  this.state.stackPosition === 0 && styles.gray
                )}
                onClick={this._handleBackgroundClick}
              />
            )}
            <div
              className={classNames(
                styles.container,
                this.state.stackPosition < 2 && styles.shadow
              )}
              style={sidePageStyle}
            >
              <ScrollContainer>
                {!hasHeader && close}
                {children}
              </ScrollContainer>
            </div>
          </ZIndex>
        </RenderContainer>
      </RenderLayer>
    );
  }

  componentDidMount() {
    if (this.state.stackPosition === 0) {
      const { documentElement } = document;
      if (documentElement) {
        prevMarginRight = documentElement.style.marginRight;
      }
      this._handleWindowResize();
      events.addEventListener(window, 'resize', this._handleWindowResize);
      LayoutEvents.emit();
    }
    stack.emitter.emit('change');
  }

  componentWillUnmount() {
    if (this.state.stackPosition === 0) {
      const { documentElement } = document;
      if (documentElement) {
        documentElement.style.marginRight = prevMarginRight;
        removeClass(documentElement, styles.bodyClass);
      }
      events.removeEventListener(window, 'resize', this._handleWindowResize);
      LayoutEvents.emit();
    }

    this._stackSubscription && this._stackSubscription.remove();
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
      const scrollbarWidth = getScrollWidth();
      docEl.style.marginRight = prevMarginRight;
      removeClass(docEl, styles.bodyClass);
      const marginRight = parseFloat(getComputedStyle(docEl).marginRight);
      addClass(docEl, styles.bodyClass);
      docEl.style.marginRight = `${marginRight + scrollbarWidth}px`;
    } else if (style.marginRight !== prevMarginRight) {
      style.marginRight = prevMarginRight;
    }
  };

  _handleStackChange = () => {
    const stackPosition = stack.mounted.findIndex(x => x === this);
    this.setState({ stackPosition });
  };

  _handleClickOutside = () => {
    if (
      this.state.stackPosition === stack.mounted.length - 1 &&
      !this.props.ignoreBackgroundClick
    ) {
      this._requestClose();
    }
  };

  _handleFocusOutside = () => {
    if (
      this.state.stackPosition === stack.mounted.length - 1 &&
      !this.props.ignoreBackgroundClick
    ) {
      this._requestClose();
    }
  };

  _handleBackgroundClick = event => {
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
      <Sticky side="bottom">
        {fixed => (
          <div className={classNames(names, fixed && styles.fixedFooter)}>
            {this.props.children}
          </div>
        )}
      </Sticky>
    );
  }
}

SidePage.Header = Header;
SidePage.Body = Body;
SidePage.Footer = Footer;

export default SidePage;
