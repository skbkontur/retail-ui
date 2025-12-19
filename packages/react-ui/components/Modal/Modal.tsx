import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';
import FocusLock from 'react-focus-lock';
import throttle from 'lodash.throttle';
import { globalObject } from '@skbkontur/global-object';

import { isNonNullable } from '../../lib/utils';
import { isKeyEscape } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { RenderContainer } from '../../internal/RenderContainer';
import { ZIndex } from '../../internal/ZIndex';
import { stopPropagation } from '../../lib/events/stopPropagation';
import { HideBodyVerticalScroll } from '../../internal/HideBodyVerticalScroll';
import type { ModalStackSubscription } from '../../lib/ModalStack';
import { ModalStack } from '../../lib/ModalStack';
import { ResizeDetector } from '../../internal/ResizeDetector';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme, ThemeIn } from '../../lib/theming/Theme';
import { isIE11 } from '../../lib/client';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';
import { catchUnreachableWarning } from '../../lib/typeGuards';

import type { ModalContextProps } from './ModalContext';
import { ModalContext } from './ModalContext';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalClose } from './ModalClose';
import { styles } from './Modal.styles';
import { getModalTheme } from './getModalTheme';

let mountedModalsCount = 0;

export type MobileModalAppearance = 'auto' | 'top' | 'center' | 'bottom' | 'fullscreen-spacing' | 'fullscreen';

export interface ModalProps
  extends CommonProps,
    Pick<HTMLAttributes<unknown>, 'role'>,
    Pick<AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** Отключает событие `onClose` и блокирует кнопку закрытия модального окна. */
  disableClose?: boolean;

  /** Выравнивает модальное окно по верху страницы. */
  alignTop?: boolean;

  /** Оставляет модальное окно открытым, когда пользователь кликнул на фон вне модального окна. */
  ignoreBackgroundClick?: boolean;

  /** Скрывает крестик для закрытия модального окна. */
  noClose?: boolean;

  /** Ширина модального окна. */
  width?: number | string;

  /** Событие закрытия модального окна. Вызывается при клике на фон или крестик, и при нажатии Esc. */
  onClose?: () => void;

  /** Выключает ограничение на фокус. По умолчанию модальное окно не позволяет установить фокус за переделами своего содержимого.
   *
   * По умолчанию `"true"` для Internet Explorer 11. */
  disableFocusLock?: boolean;

  /** Объект с переменными темы. Он будет объединён с темой из `<ThemeContext>`.
   *
   * Общие переменные темы и переменные для модального окна (с префиксом modal) смотрите на странице [ThemePlayground](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_information-themeplayground--docs).
   */
  theme?: ThemeIn;

  /** Задаёт внешний вид модального окна в мобильном режиме. Работает с версией темы >= 5_2.
   *  - `"auto"` — если футера нет, модальное окно распологается в центре экрана, если есть — модальное окно растягивается на весь экран с отступами и закругленными краями.
   *  - `"top"` — модальное окно располагается сверху независимо от наличия футера.
   *  - `"center"` — модальное окно располагается в центре независимо от наличия футера.
   *  - `"bottom"` — модальное окно располагается снизу независимо от наличия футера.
   *  - `"fullscreen-spacing"` — модальное окно растягивается на весь экран с отступами и закругленными краями.
   *  - `"fullscreen"` — модальное окно растягивается на весь экран.
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

/** Модальное окно — это эмуляция диалогового окна браузера, оно появляется поверх страницы в ответ на действия пользователя и блокирует доступ к основному содержимому страницы.
 *
 * Составной компонент, включает в себя:
 * - «шапку» [Modal.Header](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-modal-modalheader--docs), состоящую из заголовка и крестика закрытия окна;
 * - контент-зону [Modal.Body](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-modal-modalbody--docs);
 * - футер [Modal.Footer](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-modal-modalfooter--docs).
 */
export class Modal extends React.Component<ModalProps, ModalState> {
  public static __KONTUR_REACT_UI__ = 'Modal';
  public static displayName = 'Modal';

  public static Header = ModalHeader;
  public static Body = ModalBody;
  public static Footer = ModalFooter;

  public static defaultProps: DefaultProps = {
    // NOTE: в ie нормально не работает
    disableFocusLock: isIE11,
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

  private theme!: Theme;
  private stackSubscription: ModalStackSubscription | null = null;
  private containerNode: HTMLDivElement | null = null;
  private mouseDownTarget: EventTarget | null = null;
  private mouseUpTarget: EventTarget | null = null;

  public componentDidMount() {
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);

    if (mountedModalsCount === 0) {
      globalObject.addEventListener?.('resize', this.throttledCheckHorizontalScroll);
    }

    mountedModalsCount++;
    globalObject.addEventListener?.('keydown', this.handleKeyDown);
    this.checkHorizontalScrollAppearance();

    if (this.containerNode) {
      this.containerNode.addEventListener('scroll', LayoutEvents.emit);
    }
  }

  public componentWillUnmount() {
    if (--mountedModalsCount === 0) {
      globalObject.removeEventListener?.('resize', this.throttledCheckHorizontalScroll);
      LayoutEvents.emit();
    }

    globalObject.removeEventListener?.('keydown', this.handleKeyDown);
    if (isNonNullable(this.stackSubscription)) {
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
        return [styles.mobileContainerSmall5_2()];
      case 'fullscreen':
        return [styles.mobileContainerFullscreen5_2()];
      case 'center':
        return [styles.mobileContainerSmall5_2()];
      case 'bottom':
        return [styles.mobileContainerSmall5_2(), styles.mobileContainerSmallBottom5_2()];
      case 'top':
        return [styles.mobileContainerSmall5_2(), styles.mobileContainerSmallTop5_2()];
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

    const versionGTE5_2 = isThemeGTE(this.theme, '5.2');

    const style: { width?: number | string } = {};
    const containerStyle: { width?: number | string } = {};

    if (width) {
      style.width = width;
    } else {
      containerStyle.width = 'auto';
    }

    const getMobileCenterContainerClassNames = () => {
      if (versionGTE5_2) {
        return cx(styles.mobileCenterContainer5_2(this.theme), {
          [styles.mobileCenterContainerBig5_2(this.theme)]:
            mobileAppearance === 'fullscreen-spacing' || (mobileAppearance === 'auto' && hasFooter),
          [styles.mobileCenterContainerFullscreen5_2()]: mobileAppearance === 'fullscreen',
        });
      }
      return cx(styles.mobileCenterContainer());
    };

    return (
      <RenderContainer>
        <CommonWrapper {...this.props}>
          <ZIndex priority={'Modal'} className={styles.root()}>
            <HideBodyVerticalScroll />
            {this.state.hasBackground && (
              <div
                onMouseDown={this.handleContainerMouseDown}
                onMouseUp={this.handleContainerMouseUp}
                onClick={this.handleContainerClick}
                className={styles.bg(this.theme)}
              />
            )}
            <ResponsiveLayout>
              {({ isMobile }) => (
                <div
                  aria-labelledby={ariaLabelledby}
                  ref={this.refContainer}
                  className={cx(
                    styles.container(),
                    versionGTE5_2 && styles.container5_2(),
                    (!versionGTE5_2 || !isMobile) && styles.containerDesktop(),
                    !versionGTE5_2 && isMobile && styles.containerMobile(this.theme),
                    versionGTE5_2 && isMobile && this.getMobileContainerClassName(),
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
                    className={cx({
                      [styles.centerContainer()]: true,
                      [getMobileCenterContainerClassNames()]: isMobile,
                      [styles.alignTop()]: Boolean(alignTop),
                    })}
                    style={isMobile ? undefined : containerStyle}
                    data-tid={ModalDataTids.content}
                  >
                    <div
                      className={cx({
                        [styles.window(this.theme)]: true,
                        [styles.mobileWindow()]: isMobile,
                        [styles.mobileWindowFullscreen5_2()]:
                          versionGTE5_2 && isMobile && mobileAppearance === 'fullscreen',
                      })}
                      style={isMobile ? undefined : style}
                    >
                      <ResizeDetector onResize={this.handleResize} fullHeight={isMobile}>
                        <FocusLock
                          disabled={disableFocusLock}
                          autoFocus={false}
                          className={cx({ [styles.columnFlexContainer()]: isMobile }, 'focus-lock-container')}
                        >
                          {!hasHeader && !noClose && (
                            <ZIndex
                              priority={ModalZIndexPriority.Cross}
                              className={cx({
                                [styles.closeWrapper(this.theme)]: true,
                                [styles.mobileCloseWrapper(this.theme)]: isMobile,
                                [styles.mobileCloseWrapper5_2(this.theme)]: versionGTE5_2 && isMobile,
                              })}
                            >
                              <ModalClose
                                className={cx({
                                  [styles.mobileCloseWithoutHeader()]: isMobile && !this.state.hasHeader,
                                  [styles.mobileCloseWithoutHeader5_2(this.theme)]:
                                    versionGTE5_2 && isMobile && !this.state.hasHeader,
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
