import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

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

import { SidePageBody } from './SidePageBody';
import { SidePageContainer } from './SidePageContainer';
import { SidePageContext } from './SidePageContext';
import { SidePageFooter } from './SidePageFooter';
import { SidePageHeader } from './SidePageHeader';
import { jsStyles } from './SidePage.styles';

export interface SidePageProps {
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
}

export interface SidePageState {
  stackPosition?: number;
  hasMargin?: boolean;
  hasShadow?: boolean;
  hasBackground?: boolean;
}

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
  public state: SidePageState = {};
  private theme!: Theme;
  private stackSubscription: ModalStackSubscription | null = null;
  private layoutRef: HTMLElement | null = null;
  private footer: SidePageFooter | null = null;

  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.stackSubscription != null) {
      this.stackSubscription.remove();
    }
    ModalStack.remove(this);
  }

  /**
   * Обновляет разметку компонента.
   * @public
   */
  public updateLayout = (): void => {
    if (this.footer) {
      this.footer.update();
    }
  };

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { blockBackground, disableAnimations } = this.props;

    return (
      <RenderContainer>
        <div>
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
          >
            {this.renderContainer()}
          </CSSTransition>
        </div>
      </RenderContainer>
    );
  }

  private renderContainer(): JSX.Element {
    const { width, blockBackground, fromLeft } = this.props;

    return (
      <ZIndex
        priority={'Sidepage'}
        data-tid="SidePage__root"
        className={cn({
          [jsStyles.root()]: true,
          [jsStyles.leftSide(this.theme)]: Boolean(fromLeft),
        })}
        onScroll={LayoutEvents.emit}
        createStackingContext
        style={{ width: width || (blockBackground ? 800 : 500) }}
      >
        <RenderLayer onClickOutside={this.handleClickOutside} active>
          <div
            data-tid="SidePage__container"
            className={cn(jsStyles.container(this.theme), this.state.hasShadow && jsStyles.shadow(this.theme))}
            style={this.getSidebarStyle()}
          >
            <div ref={_ => (this.layoutRef = _)} className={jsStyles.layout()}>
              <SidePageContext.Provider
                value={{
                  requestClose: this.requestClose,
                  getWidth: this.getWidth,
                  updateLayout: this.updateLayout,
                  footerRef: this.footerRef,
                }}
              >
                {this.props.children}
              </SidePageContext.Provider>
            </div>
          </div>
        </RenderLayer>
      </ZIndex>
    );
  }

  private getWidth = () => {
    if (!this.layoutRef) {
      return 'auto';
    }
    return this.layoutRef.getBoundingClientRect().width;
  };

  private renderShadow(): JSX.Element {
    return (
      <ZIndex priority={'Sidepage'} className={jsStyles.overlay()} onScroll={LayoutEvents.emit}>
        <HideBodyVerticalScroll key="hbvs" />
        <div
          key="overlay"
          className={cn({
            [jsStyles.background()]: true,
            [jsStyles.backgroundGray()]: this.state.hasBackground,
          })}
        />
      </ZIndex>
    );
  }

  private getSidebarStyle(): React.CSSProperties {
    const sidePageStyle: React.CSSProperties = {};

    if (this.state.hasMargin) {
      if (this.props.fromLeft) {
        sidePageStyle.marginLeft = 20;
      } else {
        sidePageStyle.marginRight = 20;
      }
    }

    return sidePageStyle;
  }

  private getTransitionNames(): Record<string, string> {
    const transition = this.props.fromLeft ? jsStyles.transitionRight : jsStyles.transitionLeft;

    return {
      enter: transition(),
      enterActive: jsStyles.transitionActive(),
      exit: jsStyles.transitionLeave(),
      exitActive: jsStyles.transitionLeaveActive(),
      appear: transition(),
      appearActive: jsStyles.transitionActive(),
    };
  }

  private handleStackChange = (stack: ReadonlyArray<React.Component>) => {
    const sidePages = stack.filter(x => x instanceof SidePage);
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

  private footerRef = (ref: SidePageFooter | null) => {
    this.footer = ref;
  };
}
