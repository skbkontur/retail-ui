import React from 'react';
import throttle from 'lodash.throttle';

import { Sticky } from '../Sticky';
import { isFunction } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { getRootNode, rootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { ModalSeparator } from '../Modal/ModalSeparator';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';
import type { ReactUIFeatureFlags } from '../../lib/featureFlagsContext';
import { getFullReactUIFlagsContext, ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext';

import { styles } from './SidePage.styles';
import type { SidePageContextType } from './SidePageContext';
import { SidePageContext } from './SidePageContext';
import { SidePageCloseButton } from './SidePageCloseButton';

export interface SidePageHeaderProps extends Omit<CommonProps, 'children'> {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
  /** Закрепляет хедер сверху сайдпейджа. */
  sticky?: boolean;

  /** Определяет, нужно ли показывать ModalSeparator. */
  hasSeparator?: boolean;

  /**
   * Обрезает длинный заголовок при «залипании» шапки.
   * @default true. Если включить флаг sidePageNotCutTitleOnStuckByDefault, дефолтное значение - false
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
  private wrapper: HTMLElement | null = null;
  private sticky: Sticky | null = null;
  private lastRegularHeight = 0;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private featureFlags!: ReactUIFeatureFlags;
  public get regularHeight(): number {
    const { isReadyToStuck } = this.state;
    if (!this.wrapper) {
      return 0;
    }
    if (!isReadyToStuck) {
      this.lastRegularHeight = getDOMRect(this.wrapper).height;
    }
    return this.lastRegularHeight;
  }

  public get fixedHeaderHeight(): number {
    const { theme } = this;
    return parseInt(theme.sidePageHeaderFixedLineHeight) + parseInt(theme.sidePageHeaderFixedPaddingY) * 2;
  }

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

  public update = () => {
    this.sticky?.reflow();
    if (!this.featureFlags.sidePageDisableHeaderShrink) {
      this.updateReadyToStuck();
    }
  };

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
    const { isReadyToStuck } = this.state;

    let isStickyDesktop = !this.isMobileLayout && this.getStickyProp();
    const isStickyMobile = this.isMobileLayout && this.getStickyProp();

    const header = this.renderHeader;

    return (
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullReactUIFlagsContext(flags);
          if (!this.featureFlags.sidePageDisableHeaderShrink) {
            isStickyDesktop = isStickyDesktop && isReadyToStuck;
          }

          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              <div
                data-tid={SidePageHeaderDataTids.root}
                ref={this.wrapperRef}
                className={cx(styles.headerWrapper(), {
                  [styles.headerNativeStuck(this.theme)]: this.state.isNativeStuck,
                })}
              >
                <ReactUIFeatureFlagsContext.Provider value={{ stickyReduceLayoutEvents: true }}>
                  {!this.state.isNativeStuck && (isStickyDesktop || isStickyMobile) ? (
                    <Sticky ref={this.stickyRef} side="top">
                      {header}
                    </Sticky>
                  ) : (
                    header()
                  )}
                </ReactUIFeatureFlagsContext.Provider>
              </div>
            </CommonWrapper>
          );
        }}
      </ReactUIFeatureFlagsContext.Consumer>
    );
  }

  private renderHeader = (fixed = false) => {
    const isDisplayed = this.props.hasSeparator || fixed;
    return (
      <div>
        <div
          className={cx(styles.header(this.theme), {
            [styles.headerFixed(this.theme)]: fixed,
            [styles.headerShrink(this.theme)]: fixed && !this.featureFlags.sidePageDisableHeaderShrink,
            [styles.mobileHeader(this.theme)]: this.isMobileLayout,
          })}
        >
          {this.renderClose(fixed)}
          <div
            className={cx(styles.title(this.theme), {
              [styles.title5_1(this.theme)]: isThemeGTE(this.theme, '5.1'),
              [styles.mobileTitle(this.theme)]: this.isMobileLayout,
              [styles.titleCut()]:
                fixed && (this.props.cutTitleOnStuck ?? !this.featureFlags.sidePageNotCutTitleOnStuckByDefault),
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
    return (
      <div
        className={cx(styles.wrapperClose(this.theme), {
          [styles.wrapperClose5_1(this.theme)]: versionGTE5_1,
          [styles.wrapperCloseFixed(this.theme)]: fixed && !this.featureFlags.sidePageDisableHeaderShrink,
          [styles.wrapperCloseFixed5_1(this.theme)]:
            fixed && versionGTE5_1 && !this.featureFlags.sidePageDisableHeaderShrink,
          [styles.mobileWrapperClose(this.theme)]: this.isMobileLayout,
          [styles.mobileWrapperClose5_1(this.theme)]: this.isMobileLayout && versionGTE5_1,
        })}
      >
        {!(this.isMobileLayout || this.featureFlags.sidePageDisableHeaderShrink) ? (
          <Sticky side="top" offset={stickyOffset}>
            <SidePageCloseButton isHeaderFixed={fixed} />
          </Sticky>
        ) : (
          <SidePageCloseButton isHeaderFixed={fixed} isMobile={this.isMobileLayout} />
        )}
      </div>
    );
  };

  private updateReadyToStuck = () => {
    if (this.wrapper) {
      const wrapperScrolledUp = getDOMRect(this.wrapper).top;
      const isReadyToStuck = this.regularHeight + wrapperScrolledUp <= this.fixedHeaderHeight;
      this.setState((state) => (state.isReadyToStuck !== isReadyToStuck ? { ...state, isReadyToStuck } : state));
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };

  private stickyRef = (el: Sticky | null) => {
    this.sticky = el;
  };
}
