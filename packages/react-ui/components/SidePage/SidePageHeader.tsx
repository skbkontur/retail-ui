import React, { type JSX } from 'react';
import throttle from 'lodash.throttle';
import type { Emotion } from '@emotion/css/create-instance';

import { Sticky } from '../Sticky/index.js';
import { isFunction } from '../../lib/utils.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { responsiveLayout } from '../ResponsiveLayout/decorator.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import { ModalSeparator } from '../Modal/ModalSeparator.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './SidePage.styles.js';
import type { SidePageContextType } from './SidePageContext.js';
import { SidePageContext } from './SidePageContext.js';
import { SidePageCloseButton } from './SidePageCloseButton.js';

export interface SidePageHeaderProps extends Omit<CommonProps, 'children'> {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
  /** Закрепляет хедер сверху сайдпейджа. */
  sticky?: boolean;

  /** Определяет, нужно ли показывать ModalSeparator. */
  hasSeparator?: boolean;

  /**
   * Обрезает длинный заголовок при «залипании» шапки.
   * @default false.
   */
  cutTitleOnStuck?: boolean;
}

export interface SidePageHeaderState {
  isNativeStuck: boolean;
  isReadyToStuck: boolean;
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
@withRenderEnvironment
@responsiveLayout
@rootNode
export class SidePageHeader extends React.Component<SidePageHeaderProps, SidePageHeaderState> {
  public static __KONTUR_REACT_UI__ = 'SidePageHeader';
  public static displayName = 'SidePageHeader';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;

  private isMobileLayout!: boolean;

  public state: SidePageHeaderState = {
    isNativeStuck: true,
    isReadyToStuck: false,
  };

  public static defaultProps: Partial<SidePageHeaderProps> = {
    hasSeparator: false,
  };

  private theme!: Theme;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private sticky: Sticky | null = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidMount = () => {
    getRootNode(this)?.parentNode?.addEventListener?.('scroll', this.throttleHandleScroll, true);
    this.context.setHasHeader?.();
    this.context.headerRef(this);
  };

  public componentWillUnmount = () => {
    getRootNode(this)?.parentNode?.removeEventListener?.('scroll', this.throttleHandleScroll, true);
    this.context.setHasHeader?.(false);
    this.context.headerRef(null);
  };

  private throttleHandleScroll = throttle((event: Event) => {
    const target = event.currentTarget as HTMLElement;
    if (target && typeof target.scrollTop === 'number') {
      this.setState({ isNativeStuck: target.scrollTop === 0 });
    }
    this.update();
  }, 5);

  public update = (): void => {
    this.sticky?.reflow();
  };

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public getStickyProp(): boolean {
    if (typeof this.props.sticky !== 'undefined') {
      return this.props.sticky;
    }

    if (this.isMobileLayout) {
      return false;
    }

    return true;
  }

  private renderMain() {
    const isStickyDesktop = !this.isMobileLayout && this.getStickyProp();
    const isStickyMobile = this.isMobileLayout && this.getStickyProp();

    const header = this.renderHeader;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div
          data-tid={SidePageHeaderDataTids.root}
          className={this.cx(this.styles.headerWrapper(), {
            [this.styles.headerNativeStuck(this.theme)]: this.state.isNativeStuck,
          })}
        >
          {!this.state.isNativeStuck && (isStickyDesktop || isStickyMobile) ? (
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
    const isDisplayed = this.props.hasSeparator || fixed;
    return (
      <div>
        <div
          className={this.cx(this.styles.header(this.theme), {
            [this.styles.headerFixed(this.theme)]: fixed,
            [this.styles.mobileHeader(this.theme)]: this.isMobileLayout,
          })}
        >
          {this.renderClose(fixed)}
          <div
            className={this.cx(this.styles.title(this.theme), {
              [this.styles.mobileTitle(this.theme)]: this.isMobileLayout,
              [this.styles.titleCut()]: fixed && this.props.cutTitleOnStuck,
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
    return (
      <div
        className={this.cx(this.styles.wrapperClose(this.theme), {
          [this.styles.wrapperCloseFixed(this.theme)]: fixed,
          [this.styles.mobileWrapperClose(this.theme)]: this.isMobileLayout,
        })}
      >
        {!this.isMobileLayout ? (
          <Sticky side="top" offset={stickyOffset}>
            <SidePageCloseButton isHeaderFixed={fixed} />
          </Sticky>
        ) : (
          <SidePageCloseButton isHeaderFixed={fixed} isMobile={this.isMobileLayout} />
        )}
      </div>
    );
  };

  private stickyRef = (el: Sticky | null) => {
    this.sticky = el;
  };
}
