import React, { AriaAttributes, HTMLAttributes } from 'react';
import { CSSTransition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import { globalObject } from '@skbkontur/global-object';

import { isNonNullable } from '../../lib/utils';
import { isKeyEscape } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { stopPropagation } from '../../lib/events/stopPropagation';
import { HideBodyVerticalScroll } from '../../internal/HideBodyVerticalScroll';
import { ModalStack, ModalStackSubscription } from '../../lib/ModalStack';
import { RenderContainer } from '../../internal/RenderContainer';
import { RenderLayer } from '../../internal/RenderLayer';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { isTestEnv } from '../../lib/currentEnvironment';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isInstanceOf } from '../../lib/isInstanceOf';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';

import { SidePageBody } from './SidePageBody';
import { SidePageContainer } from './SidePageContainer';
import { SidePageContext, SidePageContextType } from './SidePageContext';
import { SidePageFooter } from './SidePageFooter';
import { SidePageHeader } from './SidePageHeader';
import { styles } from './SidePage.styles';

export interface SidePageProps
  extends CommonProps,
    Pick<HTMLAttributes<unknown>, 'role'>,
    Pick<AriaAttributes, 'aria-label'> {
  /** Добавляет блокирующий фон, когда сайдпейдж открыт. */
  blockBackground?: boolean;

  /** Отключает событие onClose, также дизейблит кнопку закрытия сайдпейджа. */
  disableClose?: boolean;

  /** Оставляет окно открытым при клике на фон. */
  ignoreBackgroundClick?: boolean;

  /** Задает ширину сайдпейджа. */
  width?: number | string;

  /** Задает ширину сайдпейджаю на мобилке. По умолчанию ширина во весь экран. */
  mobileWidth?: number | string;

  /** Задает функцию, которая вызывается при запросе закрытия сайдпейджа пользователем (нажал на фон, на Escape или на крестик). */
  onClose?: () => void;

  /** Задает функцию, которая вызывается при завершении анимации открытия сайдпейджа. */
  onOpened?: () => void;

  /** Отображает сайдпэйдж слева. */
  fromLeft?: boolean;

  /** Отключает анимацию. */
  disableAnimations?: boolean;

  /** Отключает фокус-лок внутри сайдпейджа.
   * Работает только при заблокированном фоне: `blockBackground = true`.*/
  disableFocusLock?: boolean;

  /** Задает отступ от края экрана. */
  offset?: number | string;
}

export interface SidePageState {
  stackPosition?: number;
  hasMargin?: boolean;
  hasShadow?: boolean;
  hasBackground?: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  hasPanel: boolean;
}

export const SidePageDataTids = {
  root: 'SidePage__root',
  container: 'SidePage__container',
} as const;

type DefaultProps = Required<Pick<SidePageProps, 'disableAnimations' | 'offset' | 'role'>>;

const TRANSITION_TIMEOUT = 200;

/**
 * `SidePage` — это модальное окно, которое открывается поверх основной страницы и занимает всю высоту окна браузера.
 *
 * Используйте его, когда нужно сохранить контекст и показать большое количество данных.
 *
 * Содержит в себе три компоненты: `SidePage.Header`, `SidePage.Body` и `SidePage.Footer`.
 *
 * Для отображения серой плашки в футере в компонент `Footer` необходимо передать пропс `panel`.
 */
export class SidePage extends React.Component<SidePageProps, SidePageState> {
  public static __KONTUR_REACT_UI__ = 'SidePage';
  public static displayName = 'SidePage';

  public static Header = SidePageHeader;
  public static Body = SidePageBody;
  public static Footer = SidePageFooter;
  public static Container = SidePageContainer;
  public state: SidePageState = {
    hasHeader: false,
    hasFooter: false,
    hasPanel: false,
  };
  private theme!: Theme;
  private stackSubscription: ModalStackSubscription | null = null;
  private layout: HTMLElement | null = null;
  private header: SidePageHeader | null = null;
  private footer: SidePageFooter | null = null;
  private rootRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    globalObject.addEventListener?.('keydown', this.handleKeyDown);
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);
  }

  public componentDidUpdate(prevProps: SidePageProps) {
    if (prevProps.blockBackground !== this.props.blockBackground) {
      ModalStack.rerender();
      this.setState({
        hasBackground: ModalStack.isBlocking(this),
      });
    }
  }

  public componentWillUnmount() {
    globalObject.removeEventListener?.('keydown', this.handleKeyDown);
    if (isNonNullable(this.stackSubscription)) {
      this.stackSubscription.remove();
    }
    ModalStack.remove(this);
  }

  /**
   * Обновляет разметку компонента.
   * @public
   */
  public updateLayout = (): void => {
    this.header?.update();
    this.footer?.update();
  };

  public static defaultProps: DefaultProps = {
    disableAnimations: isTestEnv,
    offset: 0,
    role: 'dialog',
  };

  private getProps = createPropsGetter(SidePage.defaultProps);

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
    const { blockBackground, onOpened } = this.props;
    const disableAnimations = this.getProps().disableAnimations;
    const versionGTE5_2 = isThemeGTE(this.theme, '5.2');
    return (
      <ResponsiveLayout>
        {({ isMobile }) => (
          <RenderContainer>
            <CommonWrapper {...this.props}>
              <ZIndex
                priority={'Sidepage'}
                onScroll={LayoutEvents.emit}
                createStackingContext
                wrapperRef={this.rootRef}
                style={{ position: 'absolute' }}
              >
                {blockBackground && (versionGTE5_2 || !isMobile) && this.renderShadow()}
                <CSSTransition
                  in
                  classNames={this.getTransitionNames()}
                  appear={!disableAnimations}
                  enter={!disableAnimations}
                  exit={false}
                  timeout={{
                    enter: TRANSITION_TIMEOUT,
                    exit: TRANSITION_TIMEOUT,
                  }}
                  nodeRef={this.rootRef}
                  onEntered={onOpened}
                >
                  {this.renderContainer(isMobile)}
                </CSSTransition>
                {isMobile && <HideBodyVerticalScroll />}
              </ZIndex>
            </CommonWrapper>
          </RenderContainer>
        )}
      </ResponsiveLayout>
    );
  }

  private get isFocusLockDisabled() {
    const { disableFocusLock } = this.getProps();
    const { blockBackground } = this.props;
    if (!blockBackground) {
      return true;
    }
    if (disableFocusLock !== undefined) {
      return disableFocusLock;
    }
    return false;
  }

  private renderContainer(isMobile: boolean): JSX.Element {
    const { width, mobileWidth, blockBackground, fromLeft, 'aria-label': ariaLabel } = this.props;
    const { offset, role } = this.getProps();

    const getWidth = isMobile ? mobileWidth || '100%' : width || (blockBackground ? 800 : 500);

    return (
      <div
        aria-modal
        role={role}
        aria-label={ariaLabel}
        data-tid={SidePageDataTids.root}
        className={cx({
          [styles.root()]: true,
        })}
        onScroll={LayoutEvents.emit}
        style={
          isMobile && !isThemeGTE(this.theme, '5.2')
            ? undefined
            : {
                width: getWidth,
                right: fromLeft ? 'auto' : offset,
                left: fromLeft ? offset : 'auto',
              }
        }
      >
        <FocusLock disabled={this.isFocusLockDisabled} autoFocus={false} className={styles.focusLock()}>
          <RenderLayer onClickOutside={this.handleClickOutside} active>
            <div
              data-tid={SidePageDataTids.container}
              className={cx(styles.wrapper(this.theme), {
                [styles.wrapperLeft()]: fromLeft,
                [styles.wrapperMarginLeft()]: this.state.hasMargin && fromLeft,
                [styles.wrapperMarginRight()]: this.state.hasMargin && !fromLeft,
                [styles.shadow(this.theme)]: this.state.hasShadow,
              })}
              ref={this.layoutRef}
            >
              <SidePageContext.Provider value={this.getSidePageContextProps()}>
                {this.props.children}
              </SidePageContext.Provider>
            </div>
          </RenderLayer>
        </FocusLock>
      </div>
    );
  }

  private getSidePageContextProps = (): SidePageContextType => {
    return {
      hasHeader: this.state.hasHeader,
      hasFooter: this.state.hasFooter,
      hasPanel: this.state.hasPanel,
      requestClose: this.requestClose,
      getWidth: this.getWidth,
      updateLayout: this.updateLayout,
      headerRef: this.headerRef,
      footerRef: this.footerRef,
      setHasHeader: this.setHasHeader,
      setHasFooter: this.setHasFooter,
      setHasPanel: this.setHasPanel,
    };
  };

  private getWidth = () => {
    if (!this.layout) {
      return 'auto';
    }
    return this.layout.clientWidth;
  };

  private renderShadow(): JSX.Element {
    return (
      <div className={styles.overlay()} onScroll={LayoutEvents.emit}>
        <HideBodyVerticalScroll key="hbvs" />
        <div
          key="overlay"
          className={cx({
            [styles.background()]: true,
            [styles.backgroundGray(this.theme)]: this.state.hasBackground,
          })}
        />
      </div>
    );
  }

  private getTransitionNames(): Record<string, string> {
    const transition = this.props.fromLeft ? styles.transitionRight : styles.transitionLeft;

    return {
      enter: transition(),
      enterActive: styles.transitionActive(),
      exit: styles.transitionLeave(),
      exitActive: styles.transitionLeaveActive(),
      appear: transition(),
      appearActive: styles.transitionActive(),
    };
  }

  private handleStackChange = (stack: readonly React.Component[]) => {
    const sidePages = stack.filter((x) => x instanceof SidePage && x.props.fromLeft === this.props.fromLeft);
    const currentSidePagePosition = sidePages.indexOf(this);

    const hasMargin = sidePages.length > 1 && currentSidePagePosition === sidePages.length - 1;
    const hasShadow = sidePages.length < 3 || currentSidePagePosition > sidePages.length - 3;
    const hasBackground = ModalStack.isBlocking(this);

    this.setState({
      stackPosition: stack.indexOf(this),
      hasMargin,
      hasShadow,
      hasBackground,
    });
  };

  private handleClickOutside = (e: Event) => {
    if (this.state.stackPosition === 0 && !this.props.ignoreBackgroundClick) {
      // ignore mousedown on window scrollbar
      if (
        isInstanceOf(e, globalObject.MouseEvent) &&
        globalObject.document &&
        e.clientX > globalObject.document.documentElement.clientWidth
      ) {
        return;
      }
      this.requestClose();
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

  private requestClose = () => {
    if (this.props.disableClose) {
      return;
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  private headerRef = (ref: SidePageHeader | null) => {
    this.header = ref;
  };

  private footerRef = (ref: SidePageFooter | null) => {
    this.footer = ref;
  };

  private layoutRef = (ref: HTMLDivElement | null) => {
    this.layout = ref;
  };

  private setHasHeader = (hasHeader = true) => {
    this.state.hasHeader !== hasHeader && this.setState({ hasHeader });
  };

  private setHasFooter = (hasFooter = true) => {
    this.state.hasFooter !== hasFooter && this.setState({ hasFooter });
  };

  private setHasPanel = (hasPanel = false) => {
    this.state.hasPanel !== hasPanel && this.setState({ hasPanel });
  };
}
