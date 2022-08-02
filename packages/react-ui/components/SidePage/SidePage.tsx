import React from 'react';
import { CSSTransition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';

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

import { SidePageBody } from './SidePageBody';
import { SidePageContainer } from './SidePageContainer';
import { SidePageContext, SidePageContextType } from './SidePageContext';
import { SidePageFooter } from './SidePageFooter';
import { SidePageHeader } from './SidePageHeader';
import { styles } from './SidePage.styles';

export interface SidePageProps extends CommonProps {
  /**
   * Добавить блокирующий фон, когда сайдпейдж открыт
   */
  blockBackground?: boolean;

  /**
   * Отключает событие onClose, также дизейблит кнопку закрытия сайдпейджа
   */
  disableClose?: boolean;

  /**
   * Не закрывать сайдпейдж при клике на фон.
   */
  ignoreBackgroundClick?: boolean;

  /**
   * Задать ширину сайдпейджа
   */
  width?: number | string;

  /**
   * Вызывается, когда пользователь запросил закрытие сайдпейджа (нажал на фон, на
   * Escape или на крестик).
   */
  onClose?: () => void;

  /**
   * Показывать сайдпэйдж слева
   *
   */
  fromLeft?: boolean;

  /**
   * Отключить анимации
   *
   */
  disableAnimations?: boolean;

  /**
   * Работает только при заблокированном фоне: `blockBackground = true`
   */
  disableFocusLock?: boolean;

  /**
   * задает отступ от края экрана
   */
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

type DefaultProps = Required<Pick<SidePageProps, 'disableAnimations' | 'disableFocusLock' | 'offset'>>;

const TRANSITION_TIMEOUT = 200;

/**
 * Сайдпейдж
 *
 * Содержит в себе три компоненты: **SidePage.Header**,
 * **SidePage.Body** и **SidePage.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 */
export class SidePage extends React.Component<SidePageProps, SidePageState> {
  public static __KONTUR_REACT_UI__ = 'SidePage';

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
    window.addEventListener('keydown', this.handleKeyDown);
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
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
    disableFocusLock: true,
    offset: 0,
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
    const { blockBackground } = this.props;
    const disableAnimations = this.getProps().disableAnimations;

    return (
      <RenderContainer>
        <CommonWrapper {...this.props}>
          <div>
            <ResponsiveLayout>
              {({ isMobile }) => {
                return (
                  <>
                    {blockBackground && this.renderShadow()}
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
                    >
                      {this.renderContainer(isMobile)}
                    </CSSTransition>
                    {isMobile && <HideBodyVerticalScroll />}
                  </>
                );
              }}
            </ResponsiveLayout>
          </div>
        </CommonWrapper>
      </RenderContainer>
    );
  }

  private renderContainer(isMobile: boolean): JSX.Element {
    const { width, blockBackground, fromLeft } = this.props;
    const { disableFocusLock, offset } = this.getProps();

    return (
      <ZIndex
        priority={'Sidepage'}
        data-tid={SidePageDataTids.root}
        className={cx({
          [styles.root()]: true,
          [styles.mobileRoot()]: isMobile,
        })}
        onScroll={LayoutEvents.emit}
        createStackingContext
        style={
          isMobile
            ? undefined
            : {
                width: width || (blockBackground ? 800 : 500),
                right: fromLeft ? 'auto' : offset,
                left: fromLeft ? offset : 'auto',
              }
        }
        wrapperRef={this.rootRef}
      >
        <FocusLock disabled={disableFocusLock || !blockBackground} autoFocus={false} className={styles.focusLock()}>
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
      </ZIndex>
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
      <ZIndex priority={'Sidepage'} className={styles.overlay()} onScroll={LayoutEvents.emit}>
        <HideBodyVerticalScroll key="hbvs" />
        <div
          key="overlay"
          className={cx({
            [styles.background()]: true,
            [styles.backgroundGray(this.theme)]: this.state.hasBackground,
          })}
        />
      </ZIndex>
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
      if (e instanceof MouseEvent && e.clientX > document.documentElement.clientWidth) {
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
