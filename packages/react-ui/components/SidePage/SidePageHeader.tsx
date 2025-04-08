import React from 'react';
import { globalObject } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { Sticky } from '../Sticky';
import { isFunction } from '../../lib/utils';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { ModalSeparator } from '../Modal/ModalSeparator';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { SidePageContext, SidePageContextType } from './SidePageContext';
import { SidePageCloseButton } from './SidePageCloseButton';
import { getStyles } from './SidePage.styles';

export interface SidePageHeaderProps extends Omit<CommonProps, 'children'> {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
  /** Закрепляет хедер сверху сайдпейджа. */
  sticky?: boolean;

  /** Определяет, нужно ли показывать ModalSeparator. */
  hasSeparator?: boolean;
}

export interface SidePageHeaderState {
  isReadyToFix: boolean;
}

export const SidePageHeaderDataTids = {
  root: 'SidePageHeader__root',
  close: 'SidePage__close',
} as const;

/**
 * Шапка сайдпейджа
 *
 * @visibleName SidePage.Header
 */
@responsiveLayout
@rootNode
export class SidePageHeader extends React.Component<SidePageHeaderProps, SidePageHeaderState> {
  public static __KONTUR_REACT_UI__ = 'SidePageHeader';
  public static displayName = 'SidePageHeader';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;

  private isMobileLayout!: boolean;

  public state: SidePageHeaderState = {
    isReadyToFix: false,
  };

  public static defaultProps: Partial<SidePageHeaderProps> = {
    hasSeparator: false,
  };

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private wrapper: HTMLElement | null = null;
  private sticky: Sticky | null = null;
  private lastRegularHeight = 0;
  private setRootNode!: TSetRootNode;
  public get regularHeight(): number {
    const { isReadyToFix } = this.state;
    if (!this.wrapper) {
      return 0;
    }
    if (!isReadyToFix) {
      this.lastRegularHeight = getDOMRect(this.wrapper).height;
    }
    return this.lastRegularHeight;
  }

  public get fixedHeaderHeight(): number {
    const { theme } = this;
    return parseInt(theme.sidePageHeaderFixedLineHeight) + parseInt(theme.sidePageHeaderFixedPaddingY) * 2;
  }

  public componentDidMount = () => {
    globalObject.addEventListener?.('scroll', this.update, true);
    this.context.setHasHeader?.();
    this.context.headerRef(this);
  };

  public componentWillUnmount = () => {
    globalObject.removeEventListener?.('scroll', this.update, true);
    this.context.setHasHeader?.(false);
    this.context.headerRef(null);
  };

  public update = () => {
    this.sticky?.reflow();
    this.updateReadyToFix();
  };

  public render(): JSX.Element {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  public getStickyProp() {
    if (typeof this.props.sticky !== 'undefined') {
      return this.props.sticky;
    }

    if (this.isMobileLayout) {
      return false;
    }

    return true;
  }

  private renderMain() {
    const { isReadyToFix } = this.state;

    const isStickyDesktop = !this.isMobileLayout && this.getStickyProp() && isReadyToFix;
    const isStickyMobile = this.isMobileLayout && this.getStickyProp();

    const header = this.renderHeader;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={SidePageHeaderDataTids.root} ref={this.wrapperRef} className={this.styles.headerWrapper()}>
          {isStickyDesktop || isStickyMobile ? (
            <Sticky ref={this.stickyRef} side="top">
              {header}
            </Sticky>
          ) : (
            header()
          )}
        </div>
      </CommonWrapper>
    );
  }

  private renderHeader = (fixed = false) => {
    const styles = this.styles;
    const isDisplayed = this.props.hasSeparator || fixed;

    return (
      <div>
        <div
          className={this.emotion.cx(styles.header(this.theme), {
            [styles.headerFixed(this.theme)]: fixed,
            [styles.mobileHeader(this.theme)]: this.isMobileLayout,
          })}
        >
          {this.renderClose(fixed)}
          <div
            className={this.emotion.cx(styles.title(this.theme), {
              [styles.title5_1(this.theme)]: isThemeGTE(this.theme, '5.1'),
              [styles.mobileTitle(this.theme)]: this.isMobileLayout,
              [styles.titleFixed()]: fixed,
            })}
          >
            {isFunction(this.props.children) ? this.props.children(fixed) : this.props.children}
          </div>
        </div>
        {isDisplayed && <ModalSeparator fixed={fixed} />}
      </div>
    );
  };

  private renderClose = (fixed: boolean) => {
    const stickyOffset = parseInt(this.theme.sidePageHeaderStickyOffset);
    const versionGTE5_1 = isThemeGTE(this.theme, '5.1');
    const styles = this.styles;

    return (
      <div
        className={this.emotion.cx(styles.wrapperClose(this.theme), {
          [styles.wrapperClose5_1(this.theme)]: versionGTE5_1,
          [styles.wrapperCloseFixed(this.theme)]: fixed,
          [styles.wrapperCloseFixed5_1(this.theme)]: fixed && versionGTE5_1,
          [styles.mobileWrapperClose(this.theme)]: this.isMobileLayout,
          [styles.mobileWrapperClose5_1(this.theme)]: this.isMobileLayout && versionGTE5_1,
        })}
      >
        {this.isMobileLayout ? (
          <SidePageCloseButton isHeaderFixed={fixed} isMobile />
        ) : (
          <Sticky side="top" offset={stickyOffset}>
            <SidePageCloseButton isHeaderFixed={fixed} />
          </Sticky>
        )}
      </div>
    );
  };

  private updateReadyToFix = () => {
    if (this.wrapper) {
      const wrapperScrolledUp = getDOMRect(this.wrapper).top;
      const isReadyToFix = this.regularHeight + wrapperScrolledUp <= this.fixedHeaderHeight;
      this.setState((state) => (state.isReadyToFix !== isReadyToFix ? { ...state, isReadyToFix } : state));
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };

  private stickyRef = (el: Sticky | null) => {
    this.sticky = el;
  };
}
