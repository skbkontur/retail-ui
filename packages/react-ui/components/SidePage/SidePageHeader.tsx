import React from 'react';

import { Sticky } from '../Sticky';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { isFunction } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';

import { styles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageHeaderProps extends CommonProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export interface SidePageHeaderState {
  isReadyToFix: boolean;
  focusedByTab: boolean;
}

/**
 * Шапка сайдпейджа
 *
 * @visibleName SidePage.Header
 */
export class SidePageHeader extends React.Component<SidePageHeaderProps, SidePageHeaderState> {
  public static __KONTUR_REACT_UI__ = 'SidePageHeader';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;

  public state = {
    isReadyToFix: false,
    focusedByTab: false,
  };

  private theme!: Theme;
  private wrapper: HTMLElement | null = null;
  private lastRegularHeight = 0;

  public get regularHeight(): number {
    const { isReadyToFix } = this.state;
    if (!this.wrapper) {
      return 0;
    }
    if (!isReadyToFix) {
      this.lastRegularHeight = this.wrapper.getBoundingClientRect().height;
    }
    return this.lastRegularHeight;
  }

  public get fixedHeaderHeight(): number {
    const { theme } = this;
    return parseInt(theme.sidePageHeaderFixedLineHeight) + parseInt(theme.sidePageHeaderFixedPaddingY) * 2;
  }

  public componentDidMount = () => {
    window.addEventListener('scroll', this.update, true);
    this.context.setHasHeader?.();
  };

  public componentWillUnmount = () => {
    window.removeEventListener('scroll', this.update, true);
    this.context.setHasHeader?.(false);
  };

  public update = () => {
    this.updateReadyToFix();
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

  private renderMain() {
    const { isReadyToFix } = this.state;
    return (
      <CommonWrapper {...this.props}>
        <div ref={this.wrapperRef} className={styles.headerWrapper()}>
          {isReadyToFix ? <Sticky side="top">{this.renderHeader}</Sticky> : this.renderHeader()}
        </div>
      </CommonWrapper>
    );
  }

  private renderHeader = (fixed = false) => {
    return (
      <div className={cx(styles.header(this.theme), { [styles.headerFixed(this.theme)]: fixed })}>
        {this.renderClose(fixed)}
        <div className={cx(styles.title(this.theme), { [styles.titleFixed()]: fixed })}>
          {isFunction(this.props.children) ? this.props.children(fixed) : this.props.children}
        </div>
      </div>
    );
  };

  private renderClose = (fixed: boolean) => {
    const stickyOffset = parseInt(this.theme.sidePageHeaderStickyOffset);

    return (
      <div className={cx(styles.wrapperClose(this.theme), fixed && styles.fixed(this.theme))}>
        <Sticky side="top" offset={stickyOffset}>
          <SidePageContext.Consumer>
            {({ requestClose }) => (
              <button
                className={cx(styles.close(this.theme), {
                  [styles.closeFocus(this.theme)]: this.state.focusedByTab,
                })}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onClick={requestClose}
                data-tid="SidePage__close"
                tabIndex={0}
              >
                <CrossIcon />
              </button>
            )}
          </SidePageContext.Consumer>
        </Sticky>
      </div>
    );
  };

  private updateReadyToFix = () => {
    if (this.wrapper) {
      const wrapperScrolledUp = this.wrapper.getBoundingClientRect().top;
      const isReadyToFix = this.regularHeight + wrapperScrolledUp <= this.fixedHeaderHeight;
      this.setState((state) => (state.isReadyToFix !== isReadyToFix ? { ...state, isReadyToFix } : state));
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };

  private handleFocus = () => {
    requestAnimationFrame(() => {
      if (keyListener.isTabPressed) {
        this.setState({ focusedByTab: true });
      }
    });
  };

  private handleBlur = () => {
    this.setState({ focusedByTab: false });
  };
}
