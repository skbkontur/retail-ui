import * as React from 'react';
import { isKeyEscape } from '../../lib/events/keyboard/identifiers';
import LayoutEvents from '../../lib/LayoutEvents';
import stopPropagation from '../../lib/events/stopPropagation';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll/HideBodyVerticalScroll';
import ModalStack from '../ModalStack';
import { ModalStackSubscription } from '../ModalStack/ModalStack';
import RenderContainer from '../RenderContainer/RenderContainer';
import RenderLayer from '../RenderLayer';
import ZIndex from '../ZIndex';
import { SidePageBodyWithContext, SidePageBodyProps } from './SidePageBody';
import SidePageContainer from './SidePageContainer';
import { SidePageContext } from './SidePageContext';
import { SidePageFooterWithContext, SidePageFooter, SidePageFooterProps } from './SidePageFooter';
import SidePageHeader from './SidePageHeader';
import { CSSTransition } from 'react-transition-group';
import styles from './SidePage.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './SidePage.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';

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

interface ZIndexPropsType {
  classes?: string;
  style?: React.CSSProperties;
}

/**
 * Сайдпейдж
 *
 * Содержит в себе три компоненты: **SidePage.Header**,
 * **SidePage.Body** и **SidePage.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 */
class SidePage extends React.Component<SidePageProps, SidePageState> {
  public static Header = SidePageHeader;
  public static Body: (props: SidePageBodyProps) => JSX.Element = SidePageBodyWithContext;
  public static Footer: (props: SidePageFooterProps) => JSX.Element = SidePageFooterWithContext;
  public static Container = SidePageContainer;
  public state: SidePageState = {};
  private theme!: ITheme;
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
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { disableAnimations } = this.props;

    return (
      <RenderContainer>
        <div>
          {this.renderShadow()}
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

  private getZIndexProps(): ZIndexPropsType {
    const { fromLeft, blockBackground } = this.props;
    return {
      classes: cx(styles.root, {
        [styles.leftSide]: !!fromLeft,
      }),
      style: blockBackground ? { width: '100%' } : undefined,
    };
  }

  private renderContainer(): JSX.Element {
    const { classes, style } = this.getZIndexProps();

    return (
      <ZIndex
        priority={'Sidepage'}
        className={classes}
        onScroll={LayoutEvents.emit}
        style={style}
        createStackingContext
      >
        <RenderLayer onClickOutside={this.handleClickOutside} active>
          <div
            className={cx(
              styles.container,
              jsStyles.container(this.theme),
              this.state.hasShadow && jsStyles.shadow(this.theme),
            )}
            style={this.getSidebarStyle()}
          >
            <div ref={_ => (this.layoutRef = _)}>
              <SidePageContext.Provider
                value={{
                  requestClose: this.requestClose,
                  getWidth: this.getWidth,
                  updateLayout: this.updateLayout,
                  footerRef: this.footerRef,
                }}
              >
                {/* React <= 15. SidePageContext.Provider can only receive a single child element. */}
                <div className={styles.layout}>{this.props.children}</div>
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
    const { classes, style } = this.getZIndexProps();
    const { blockBackground } = this.props;

    return (
      <ZIndex priority={'Sidepage'} className={classes} onScroll={LayoutEvents.emit} style={style}>
        {blockBackground && [
          <HideBodyVerticalScroll key="hbvs" />,
          <div key="overlay" className={cx(styles.background, this.state.hasBackground && styles.gray)} />,
        ]}
      </ZIndex>
    );
  }

  private getSidebarStyle(): React.CSSProperties {
    const sidePageStyle: React.CSSProperties = {
      width: this.props.width || (this.props.blockBackground ? 800 : 500),
    };

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
    const direction: 'right' | 'left' = this.props.fromLeft ? 'right' : 'left';
    const transitionEnter = cx(
      styles[('transition-enter-' + direction) as 'transition-enter-left' | 'transition-enter-right'],
    );
    const transitionAppear = cx(
      styles[('transition-appear-' + direction) as 'transition-appear-left' | 'transition-appear-right'],
    );

    return {
      enter: transitionEnter,
      enterActive: styles['transition-enter-active'],
      exit: styles['transition-leave'],
      exitActive: styles['transition-leave-active'],
      appear: transitionAppear,
      appearActive: styles['transition-appear-active'],
    };
  }

  private handleStackChange = (stack: ReadonlyArray<React.Component>) => {
    const sidePages = stack.filter(x => x instanceof SidePage);
    const currentSidePagePosition = sidePages.indexOf(this);
    const isSidePageOnStackTop = stack[0] instanceof SidePage;

    const hasMargin = sidePages.length > 1 && currentSidePagePosition === sidePages.length - 1;
    const hasShadow = sidePages.length < 3 || currentSidePagePosition > sidePages.length - 3;
    const hasBackground = currentSidePagePosition === sidePages.length - 1 && isSidePageOnStackTop;

    this.setState({
      stackPosition: stack.indexOf(this),
      hasMargin,
      hasShadow,
      hasBackground,
    });
  };

  private handleClickOutside = () => {
    if (this.state.stackPosition === 0 && !this.props.ignoreBackgroundClick) {
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

export default SidePage;
