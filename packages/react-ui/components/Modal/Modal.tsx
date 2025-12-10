import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';
import FocusLock from 'react-focus-lock';
import throttle from 'lodash.throttle';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject.js';
import { isNonNullable } from '../../lib/utils.js';
import { isKeyEscape } from '../../lib/events/keyboard/identifiers.js';
import * as LayoutEvents from '../../lib/LayoutEvents.js';
import { RenderContainer } from '../../internal/RenderContainer/index.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import { HideBodyVerticalScroll } from '../../internal/HideBodyVerticalScroll/index.js';
import type { ModalStackSubscription } from '../../lib/ModalStack.js';
import { ModalStack } from '../../lib/ModalStack.js';
import { ResizeDetector } from '../../internal/ResizeDetector/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme, ThemeIn } from '../../lib/theming/Theme.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { ResponsiveLayout } from '../ResponsiveLayout/index.js';
import { catchUnreachableWarning } from '../../lib/typeGuards.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import type { ModalContextProps } from './ModalContext.js';
import { ModalContext } from './ModalContext.js';
import { ModalFooter } from './ModalFooter.js';
import { ModalHeader } from './ModalHeader.js';
import { ModalBody } from './ModalBody.js';
import { ModalClose } from './ModalClose.js';
import { getStyles } from './Modal.styles.js';
import { getModalTheme } from './getModalTheme.js';

let mountedModalsCount = 0;

export type MobileModalAppearance = 'auto' | 'top' | 'center' | 'bottom' | 'fullscreen-spacing' | 'fullscreen';

export interface ModalProps
  extends CommonProps,
    Pick<HTMLAttributes<unknown>, 'role'>,
    Pick<AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** Отключает событие `onClose` и дизейблит кнопку закрытия модалки. */
  disableClose?: boolean;

  /** Выравнивает окно по верху страницы. */
  alignTop?: boolean;

  /** Оставляет окно открытым при клике на фон. */
  ignoreBackgroundClick?: boolean;

  /** Убирает крестик для закрытия окна */
  noClose?: boolean;

  /** Задает ширину модалки. */
  width?: number | string;

  /** Задает функцию, которая вызывается, когда пользователь запросил закрытие окна (нажал на фон, на Escape или на крестик). */
  onClose?: () => void;

  /** Отключает фокус-лок внутри модалки. */
  disableFocusLock?: boolean;

  /** Задает объект с переменными темы. Он будет объединён с темой из контекста. */
  theme?: ThemeIn;

  /** Задает внешний вид модалки. Работает с версией темы >= 5_2.
   *  - `auto` — если футера нет, модалка распологается в центре экрана, если футер есть -- модалка растягивается на весь экран с отступами и закругленными краями
   *  - `top` — модалка располагается сверху независимо от наличия футера
   *  - `center` — модалка располагается в центре независимо от наличия футера
   *  - `bottom` — модалка располагается снизу независимо от наличия футера
   *  - `fullscreen-spacing` — модалка растягивается на весь экран с отступами и закругленными краями
   *  - `fullscreen` — модалка растягивается на весь экран
   *  @default auto
   */
  mobileAppearance?: MobileModalAppearance;
}

export interface ModalState {
  stackPosition: number;
  hasBackground: boolean;
  horizontalScroll: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  hasPanel: boolean;
}

export const ModalDataTids = {
  container: 'modal-container',
  content: 'modal-content',
  close: 'modal-close',
} as const;

export const ModalZIndexPriority = {
  Cross: 2,
  Content: 1,
} as const;

type DefaultProps = Required<Pick<ModalProps, 'disableFocusLock' | 'role' | 'mobileAppearance'>>;

/**
 * Модальное окно `Modal` — это эмуляция диалогового окна браузера, появляющегося поверх страницы в ответ на действия пользователя и блокирующего доступ к основному содержимому страницы.
 *
 * Состоит из 3-х компонентов: `Modal.Header`, `Modal.Body`, `Modal.Footer`.
 *
 * Для отображения серой плашки в футере в компонент `Footer` необходимо передать проп `panel`.
 *
 * Для отключения прилипания шапки и футера в соответствующий компонент нужно передать проп `sticky` со значением `false` (по-умолчанию прилипание включено).
 */
@withRenderEnvironment
export class Modal extends React.Component<ModalProps, ModalState> {
  public static __KONTUR_REACT_UI__ = 'Modal';
  public static displayName = 'Modal';

  public static Header = ModalHeader;
  public static Body = ModalBody;
  public static Footer = ModalFooter;

  public static defaultProps: DefaultProps = {
    disableFocusLock: false,
    role: 'dialog',
    mobileAppearance: 'auto',
  };

  private getProps = createPropsGetter(Modal.defaultProps);

  public state: ModalState = {
    stackPosition: 0,
    hasBackground: true,
    horizontalScroll: false,
    hasHeader: false,
    hasFooter: false,
    hasPanel: false,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private stackSubscription: ModalStackSubscription | null = null;
  private containerNode: HTMLDivElement | null = null;
  private mouseDownTarget: EventTarget | null = null;
  private mouseUpTarget: EventTarget | null = null;

  public componentDidMount() {
    this.stackSubscription = ModalStack.add(this, this.handleStackChange, this.globalObject);

    if (mountedModalsCount === 0) {
      this.globalObject.addEventListener?.('resize', this.throttledCheckHorizontalScroll);
    }

    mountedModalsCount++;
    this.globalObject.addEventListener?.('keydown', this.handleKeyDown);
    this.checkHorizontalScrollAppearance();

    if (this.containerNode) {
      this.containerNode.addEventListener('scroll', LayoutEvents.emit);
    }
  }

  public componentWillUnmount() {
    if (--mountedModalsCount === 0) {
      this.globalObject.removeEventListener?.('resize', this.throttledCheckHorizontalScroll);
      LayoutEvents.emit();
    }

    this.globalObject.removeEventListener?.('keydown', this.handleKeyDown);
    if (isNonNullable(this.stackSubscription)) {
      this.stackSubscription.remove();
    }
    ModalStack.remove(this, this.globalObject);

    if (this.containerNode) {
      this.containerNode.removeEventListener('scroll', LayoutEvents.emit);
    }
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getModalTheme(theme, this.props.theme);
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private getMobileContainerClassName = () => {
    const mobileAppearance = this.getProps().mobileAppearance;
    switch (mobileAppearance) {
      case 'fullscreen-spacing':
        return;
      case 'auto':
        if (this.state.hasFooter) {
          return;
        }
        return [this.styles.mobileContainerSmall5_2()];
      case 'fullscreen':
        return [this.styles.mobileContainerFullscreen5_2()];
      case 'center':
        return [this.styles.mobileContainerSmall5_2()];
      case 'bottom':
        return [this.styles.mobileContainerSmall5_2(), this.styles.mobileContainerSmallBottom5_2()];
      case 'top':
        return [this.styles.mobileContainerSmall5_2(), this.styles.mobileContainerSmallTop5_2()];
      default:
        return catchUnreachableWarning(mobileAppearance, false);
    }
  };

  private renderMain() {
    const {
      noClose,
      disableClose,
      width,
      mobileAppearance,
      alignTop,
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
    } = this.props;
    const { hasHeader, hasFooter, hasPanel } = this.state;
    const { role, disableFocusLock } = this.getProps();

    const modalContextProps: ModalContextProps = {
      hasHeader,
      horizontalScroll: this.state.horizontalScroll,
      setHasHeader: this.setHasHeader,
      setHasFooter: this.setHasFooter,
      setHasPanel: this.setHasPanel,
      mobileOnFullScreen: this.props.mobileAppearance === 'fullscreen',
    };
    if (!noClose) {
      modalContextProps.close = {
        disableClose,
        requestClose: this.requestClose,
      };
    }
    if (!hasFooter || hasPanel) {
      modalContextProps.additionalPadding = true;
    }

    const style: { width?: number | string } = {};
    const containerStyle: { width?: number | string } = {};

    if (width) {
      style.width = width;
    } else {
      containerStyle.width = 'auto';
    }

    const getMobileCenterContainerClassNames = () => {
      return this.cx(this.styles.mobileCenterContainer(this.theme), {
        [this.styles.mobileCenterContainerBig(this.theme)]:
          mobileAppearance === 'fullscreen-spacing' || (mobileAppearance === 'auto' && hasFooter),
        [this.styles.mobileCenterContainerFullscreen()]: mobileAppearance === 'fullscreen',
      });
    };

    return (
      <RenderContainer>
        <CommonWrapper {...this.props}>
          <ZIndex priority={'Modal'} className={this.styles.root()}>
            <HideBodyVerticalScroll />
            {this.state.hasBackground && (
              <div
                onMouseDown={this.handleContainerMouseDown}
                onMouseUp={this.handleContainerMouseUp}
                onClick={this.handleContainerClick}
                className={this.styles.bg(this.theme)}
              />
            )}
            <ResponsiveLayout>
              {({ isMobile }) => (
                <div
                  aria-labelledby={ariaLabelledby}
                  ref={this.refContainer}
                  className={this.cx(
                    this.styles.container(),
                    !isMobile && this.styles.containerDesktop(),
                    isMobile && this.getMobileContainerClassName(),
                  )}
                  onMouseDown={this.handleContainerMouseDown}
                  onMouseUp={this.handleContainerMouseUp}
                  onClick={this.handleContainerClick}
                  data-tid={ModalDataTids.container}
                >
                  <div
                    aria-modal
                    aria-label={ariaLabel}
                    role={role}
                    className={this.cx({
                      [this.styles.centerContainer()]: true,
                      [getMobileCenterContainerClassNames()]: isMobile,
                      [this.styles.alignTop()]: Boolean(alignTop),
                    })}
                    style={isMobile ? undefined : containerStyle}
                    data-tid={ModalDataTids.content}
                  >
                    <div
                      className={this.cx({
                        [this.styles.window(this.theme)]: true,
                        [this.styles.mobileWindow()]: isMobile,
                        [this.styles.mobileWindowFullscreen()]: isMobile && mobileAppearance === 'fullscreen',
                      })}
                      style={isMobile ? undefined : style}
                    >
                      <ResizeDetector onResize={this.handleResize} fullHeight={isMobile}>
                        {/* @ts-expect-error: bad cjs-package types */}
                        <FocusLock
                          disabled={disableFocusLock}
                          autoFocus={false}
                          className={this.cx({ [this.styles.columnFlexContainer()]: isMobile }, 'focus-lock-container')}
                        >
                          {!hasHeader && !noClose && (
                            <ZIndex
                              priority={ModalZIndexPriority.Cross}
                              className={this.cx({
                                [this.styles.closeWrapper(this.theme)]: true,
                                [this.styles.mobileCloseWrapper(this.theme)]: isMobile,
                              })}
                            >
                              <ModalClose
                                className={this.cx({
                                  [this.styles.mobileCloseWithoutHeader(this.theme)]: isMobile && !this.state.hasHeader,
                                })}
                                requestClose={this.requestClose}
                                disableClose={disableClose}
                              />
                            </ZIndex>
                          )}
                          <ModalContext.Provider value={modalContextProps}>{children}</ModalContext.Provider>
                        </FocusLock>
                      </ResizeDetector>
                    </div>
                  </div>
                </div>
              )}
            </ResponsiveLayout>
          </ZIndex>
        </CommonWrapper>
      </RenderContainer>
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

  private handleStackChange = (stack: readonly React.Component[]) => {
    this.setState({
      stackPosition: stack.indexOf(this),
      hasBackground: ModalStack.isBlocking(this, this.globalObject),
    });
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
      e.stopPropagation();
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

  private throttledCheckHorizontalScroll = throttle(this.checkHorizontalScrollAppearance, 100);

  private handleResize = () => {
    LayoutEvents.emit();
  };

  private setHasHeader = (hasHeader: boolean) => {
    this.setState({ hasHeader });
  };

  private setHasFooter = (hasFooter: boolean) => {
    this.setState({ hasFooter });
  };

  private setHasPanel = (hasPanel: boolean) => {
    this.setState({ hasPanel });
  };
}
