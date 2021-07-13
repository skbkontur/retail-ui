import React from 'react';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';

import { isKeyEscape } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { RenderContainer } from '../../internal/RenderContainer';
import { ZIndex } from '../../internal/ZIndex';
import { stopPropagation } from '../../lib/events/stopPropagation';
import { HideBodyVerticalScroll } from '../../internal/HideBodyVerticalScroll';
import { ModalStack, ModalStackSubscription } from '../../lib/ModalStack';
import { ResizeDetector } from '../../internal/ResizeDetector';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { isIE11 } from '../../lib/client';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { ModalContext, ModalContextProps } from './ModalContext';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { isBody, isFooter, isHeader } from './helpers';
import { ModalBody } from './ModalBody';
import { ModalClose } from './ModalClose';
import { jsStyles } from './Modal.styles';

let mountedModalsCount = 0;

export interface ModalProps extends CommonProps {
  /**
   * Отключает событие onClose, также дизейблит кнопку закрытия модалки
   */
  disableClose?: boolean;

  /**
   * Выравнивание окна по верху страницы.
   */
  alignTop?: boolean;

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

  /**
   * Не использовать фокус-лок внутри модалки.
   * По умолчанию true для IE11.
   */
  disableFocusLock?: boolean;
}

export interface ModalState {
  stackPosition: number;
  hasBackground: boolean;
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
 *
 * Для отключения прилипания шапки и футера
 * в соответствующий компонет нужно передать
 * проп **sticky** со значением **false**
 * (по-умолчанию прилипание включено)
 */
export class Modal extends React.Component<ModalProps, ModalState> {
  public static __KONTUR_REACT_UI__ = 'Modal';

  public static Header = ModalHeader;
  public static Body = ModalBody;
  public static Footer = ModalFooter;

  public static propTypes = {
    children(props: ModalProps, propName: keyof ModalProps, componentName: string) {
      if (
        React.Children.toArray(props[propName]).some((child) => !isHeader(child) && !isBody(child) && !isFooter(child))
      ) {
        return new Error(
          `Only 'Header/Body/Footer' components are allowed for '${propName}' prop of '${componentName}' component`,
        );
      }
    },
  };

  public static defaultProps = {
    // NOTE: в ie нормально не работает
    disableFocusLock: isIE11,
  };

  public state: ModalState = {
    stackPosition: 0,
    hasBackground: true,
    horizontalScroll: false,
  };

  private theme!: Theme;
  private stackSubscription: ModalStackSubscription | null = null;
  private containerNode: HTMLDivElement | null = null;
  private mouseDownTarget: EventTarget | null = null;
  private mouseUpTarget: EventTarget | null = null;

  public componentDidMount() {
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);

    if (mountedModalsCount === 0) {
      window.addEventListener('resize', this.checkHorizontalScrollAppearance);
    }

    mountedModalsCount++;
    window.addEventListener('keydown', this.handleKeyDown);
    this.checkHorizontalScrollAppearance();

    if (this.containerNode) {
      this.containerNode.addEventListener('scroll', LayoutEvents.emit);
    }
  }

  public componentWillUnmount() {
    if (--mountedModalsCount === 0) {
      window.removeEventListener('resize', this.checkHorizontalScrollAppearance);
      LayoutEvents.emit();
    }

    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.stackSubscription != null) {
      this.stackSubscription.remove();
    }
    ModalStack.remove(this);

    if (this.containerNode) {
      this.containerNode.removeEventListener('scroll', LayoutEvents.emit);
    }
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    let hasHeader = false;
    let hasFooter = false;
    let hasPanel = false;

    React.Children.toArray(this.props.children).forEach((child) => {
      if (isHeader(child)) {
        hasHeader = true;
      }
      if (isFooter(child)) {
        hasFooter = true;
        if (child.props.panel) {
          hasPanel = true;
        }
      }
    });

    const modalContextProps: ModalContextProps = {
      hasHeader,
      horizontalScroll: this.state.horizontalScroll,
    };
    if (hasHeader && !this.props.noClose) {
      modalContextProps.close = {
        disableClose: this.props.disableClose,
        requestClose: this.requestClose,
      };
    }
    if (!hasFooter) {
      modalContextProps.additionalPadding = true;
    }
    if (hasFooter && hasPanel) {
      modalContextProps.additionalPadding = true;
    }

    const style: { width?: number | string } = {};
    const containerStyle: { width?: number | string } = {};

    if (this.props.width) {
      style.width = this.props.width;
    } else {
      containerStyle.width = 'auto';
    }

    return (
      <CommonWrapper {...this.props}>
        <RenderContainer>
          <ZIndex priority={'Modal'} className={jsStyles.root()}>
            <HideBodyVerticalScroll />
            {this.state.hasBackground && <div className={jsStyles.bg(this.theme)} />}
            <div
              ref={this.refContainer}
              className={jsStyles.container()}
              onMouseDown={this.handleContainerMouseDown}
              onMouseUp={this.handleContainerMouseUp}
              onClick={this.handleContainerClick}
              data-tid="modal-container"
            >
              <div
                className={cn({
                  [jsStyles.centerContainer(this.theme)]: true,
                  [jsStyles.alignTop(this.theme)]: Boolean(this.props.alignTop),
                })}
                style={containerStyle}
                data-tid="modal-content"
              >
                <div className={jsStyles.window(this.theme)} style={style}>
                  <ResizeDetector onResize={this.handleResize}>
                    <FocusLock disabled={this.props.disableFocusLock} autoFocus={false}>
                      {!hasHeader && !this.props.noClose ? (
                        <ZIndex priority={'ModalCross'} className={jsStyles.closeWrapper(this.theme)}>
                          <ModalClose requestClose={this.requestClose} disableClose={this.props.disableClose} />
                        </ZIndex>
                      ) : null}
                      <ModalContext.Provider value={modalContextProps}>{this.props.children}</ModalContext.Provider>
                    </FocusLock>
                  </ResizeDetector>
                </div>
              </div>
            </div>
          </ZIndex>
        </RenderContainer>
      </CommonWrapper>
    );
  }

  private requestClose = () => {
    if (this.props.disableClose) {
      return;
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  private refContainer = (center: HTMLDivElement | null) => {
    this.containerNode = center;
  };

  private handleStackChange = (stack: ReadonlyArray<React.Component>) => {
    this.setState({ stackPosition: stack.indexOf(this), hasBackground: ModalStack.isBlocking(this) });
  };

  private handleContainerMouseDown = (event: React.MouseEvent) => {
    this.mouseDownTarget = event.target;
  };

  private handleContainerMouseUp = (event: React.MouseEvent) => {
    this.mouseUpTarget = event.target;
  };

  private handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.ignoreBackgroundClick) {
      const { target, currentTarget } = event;
      if (target === currentTarget && this.mouseDownTarget === currentTarget && this.mouseUpTarget === currentTarget) {
        this.requestClose();
      }
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.state.stackPosition !== 0) {
      return;
    }
    if (isKeyEscape(e)) {
      stopPropagation(e);
      this.requestClose();
    }
  };

  private checkHorizontalScrollAppearance = () => {
    let hasScroll = false;

    if (this.containerNode) {
      const containerClientWidth = this.containerNode.clientWidth;
      const containerScrollWidth = this.containerNode.scrollWidth;
      hasScroll = containerClientWidth < containerScrollWidth;
    }
    if (hasScroll && !this.state.horizontalScroll) {
      this.setState({ horizontalScroll: true });
    } else if (this.state.horizontalScroll) {
      this.setState({ horizontalScroll: false });
    }
  };

  private handleResize = (event: UIEvent) => {
    LayoutEvents.emit();
  };
}
