import * as React from 'react';
import * as classNames from 'classnames';
import * as events from 'add-event-listener';
import * as ReactDOM from 'react-dom';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import LayoutEvents from '../../lib/LayoutEvents';
import RenderContainer from '../RenderContainer';
import ZIndex from '../ZIndex';
import stopPropagation from '../../lib/events/stopPropagation';
import Sticky from '../Sticky';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';
import ModalStack from '../ModalStack';
import { EventSubscription } from 'fbemitter';
import createReactContext = require('create-react-context');

import styles = require('./Modal.less');
import { CloseProps, ModalContext, ModalContextProps } from './ModalContext';
import { Footer } from './ModalFooter';
import { Header } from './ModalHeader';
import { Body } from './ModalBody';
import { Close } from './ModalClose';

let mountedModalsCount = 0;

export interface ModalProps {
  /**
   * Отключает событие onClose, также дизейблит кнопку закрытия модалки
   */
  disableClose?: boolean;

  /**
   * Не закрывать окно при клике на фон.
   */
  ignoreBackgroundClick?: boolean;

  /**
   * Не показывать крестик для закрытия окна.
   */
  noClose?: boolean;
  width?: number | string;

  /**
   * Вызывается, когда пользователь запросил закрытие окна (нажал на фон, на
   * Escape или на крестик).
   */
  onClose?: () => void;
}

export interface ModalState {
  stackPosition: number;
  horizontalScroll: boolean;
}

/**
 * Модальное окно
 *
 * Содержит в себе три компоненты: **Modal.Header**,
 * **Modal.Body** и **Modal.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 */
class Modal extends React.Component<ModalProps, ModalState> {
  static Header: typeof Header;
  static Body: typeof Body;
  static Footer: typeof Footer;

  state: ModalState = {
    stackPosition: 0,
    horizontalScroll: false
  };

  _stackSubscription: EventSubscription | null = null;
  _centerDOM: Element | null = null;

  public componentDidMount() {
    this._stackSubscription = ModalStack.add(this, this.handleStackChange);

    if (mountedModalsCount === 0) {
      events.addEventListener(
        window,
        'resize',
        this.checkHorizontalScrollAppearance
      );
    }

    mountedModalsCount++;
    events.addEventListener(window, 'keydown', this.handleKeyDown);
    this.checkHorizontalScrollAppearance();
  }

  public componentWillUnmount() {
    if (--mountedModalsCount === 0) {
      events.removeEventListener(
        window,
        'resize',
        this.checkHorizontalScrollAppearance
      );
      LayoutEvents.emit();
    }

    events.removeEventListener(window, 'keydown', this.handleKeyDown);
    if (this._stackSubscription != null) {
      this._stackSubscription.remove();
    }
    ModalStack.remove(this);
  }

  render() {
    const hasHeader = React.Children.toArray(this.props.children).some(
      child => (child as React.ReactElement<{}>).type === Header
    );

    const modalContextProps: ModalContextProps = {
      horizontalScroll: this.state.horizontalScroll
    };
    if (hasHeader) {
      modalContextProps.close = {
        disableClose: this.props.disableClose,
        requestClose: this.requestClose
      };
    }

    const style: { width?: number | string } = {};
    const containerStyle: { width?: number | string } = {};
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
            ref={this.refCenter}
            className={styles.container}
            onClick={this.handleContainerClick}
          >
            <div
              className={styles.centerContainer}
              onClick={this.handleContainerClick}
              style={containerStyle}
            >
              <div className={styles.window} style={style}>
                {!hasHeader && !this.props.noClose ? (
                  <Close
                    requestClose={this.requestClose}
                    disableClose={this.props.disableClose}
                  />
                ) : null}
                <ModalContext.Provider value={modalContextProps}>
                  {this.props.children}
                </ModalContext.Provider>
              </div>
            </div>
          </div>
        </ZIndex>
      </RenderContainer>
    );
  }

  // публичное, потому что используется в Modal.adapter.js
  public requestClose = () => {
    if (this.props.disableClose) {
      return;
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  private refCenter = (center: HTMLElement | null) => {
    if (this._centerDOM != null) {
      events.removeEventListener(this._centerDOM, 'scroll', LayoutEvents.emit);
    }

    this._centerDOM = null;
    if (center != null) {
      this._centerDOM = ReactDOM.findDOMNode(center);
      events.addEventListener(this._centerDOM, 'scroll', LayoutEvents.emit);
    }
  };

  private handleStackChange = (stack: ReadonlyArray<React.Component>) => {
    this.setState({ stackPosition: stack.indexOf(this) });
  };

  private handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target === event.currentTarget &&
      !this.props.ignoreBackgroundClick
    ) {
      this.requestClose();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.state.stackPosition !== 0) {
      return;
    }
    if (event.keyCode === 27) {
      stopPropagation(event);
      this.requestClose();
    }
  };

  private checkHorizontalScrollAppearance = () => {
    let hasScroll = false;

    if (this._centerDOM) {
      const containerClientWidth = this._centerDOM.clientWidth;
      const containerScrollWidth = this._centerDOM.scrollWidth;
      hasScroll = containerClientWidth < containerScrollWidth;
    }
    if (hasScroll && !this.state.horizontalScroll) {
      this.setState({ horizontalScroll: true });
    } else if (this.state.horizontalScroll) {
      this.setState({ horizontalScroll: false });
    }
  };
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
