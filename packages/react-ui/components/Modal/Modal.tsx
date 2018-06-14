import * as React from 'react';
import * as events from 'add-event-listener';
import * as ReactDOM from 'react-dom';
import LayoutEvents from '../../lib/LayoutEvents';
import RenderContainer from '../RenderContainer';
import ZIndex from '../ZIndex';
import stopPropagation from '../../lib/events/stopPropagation';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';
import ModalStack from '../ModalStack';
import { EventSubscription } from 'fbemitter';

import styles = require('./Modal.less');
import { ModalContext, ModalContextProps } from './ModalContext';
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
  public static Header: typeof Header;
  public static Body: typeof Body;
  public static Footer: typeof Footer;

  public state: ModalState = {
    stackPosition: 0,
    horizontalScroll: false
  };

  private stackSubscription: EventSubscription | null = null;
  private centerDOM: Element | null = null;

  public componentDidMount() {
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);

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
    if (this.stackSubscription != null) {
      this.stackSubscription.remove();
    }
    ModalStack.remove(this);
  }

  public render() {
    const hasHeader = React.Children.toArray(this.props.children).some(
      child => (child as React.ReactElement<{}>).type === Header
    );

    const modalContextProps: ModalContextProps = {
      horizontalScroll: this.state.horizontalScroll
    };
    if (hasHeader && !this.props.noClose) {
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
                  <div>
                    {' '}
                    {/* <ModalContext.Provider can only receive a single child element. */}
                    {this.props.children}
                  </div>
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
    if (this.centerDOM != null) {
      events.removeEventListener(this.centerDOM, 'scroll', LayoutEvents.emit);
    }

    this.centerDOM = null;
    if (center != null) {
      this.centerDOM = ReactDOM.findDOMNode(center) as HTMLElement;
      events.addEventListener(this.centerDOM, 'scroll', LayoutEvents.emit);
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

    if (this.centerDOM) {
      const containerClientWidth = this.centerDOM.clientWidth;
      const containerScrollWidth = this.centerDOM.scrollWidth;
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
