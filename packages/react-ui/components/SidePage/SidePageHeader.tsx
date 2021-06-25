import React from 'react';
import cn from 'classnames';

import { Sticky } from '../Sticky';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { isFunction } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageHeaderProps extends CommonProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export interface SidePageHeaderState {
  isReadyToFix: boolean;
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
        {theme => {
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
        <div ref={this.wrapperRef}>
          {isReadyToFix ? <Sticky side="top">{this.renderHeader}</Sticky> : this.renderHeader()}
        </div>
      </CommonWrapper>
    );
  }

  private renderHeader = (fixed = false) => {
    return (
      <div className={cn(jsStyles.header(this.theme), { [jsStyles.headerFixed(this.theme)]: fixed })}>
        {this.renderClose()}
        <div className={cn(jsStyles.title(this.theme), { [jsStyles.titleFixed()]: fixed })}>
          {isFunction(this.props.children) ? this.props.children(fixed) : this.props.children}
        </div>
      </div>
    );
  };

  private renderCloseContent = (fixed: boolean) => (
    <SidePageContext.Consumer>
      {({ requestClose }) => (
        <a
          className={cn(jsStyles.close(this.theme), {
            [jsStyles.fixed(this.theme)]: fixed,
          })}
          onClick={requestClose}
          data-tid="SidePage__close"
        >
          <span
            className={cn(jsStyles.closeIcon(this.theme), {
              [jsStyles.fixed(this.theme)]: fixed,
            })}
          >
            <CrossIcon />
          </span>
        </a>
      )}
    </SidePageContext.Consumer>
  );

  private renderClose = () => {
    const stickyOffset = parseInt(this.theme.sidePageHeaderStickyOffset);

    return (
      <Sticky side="top" offset={stickyOffset}>
        {this.renderCloseContent}
      </Sticky>
    );
  };

  private updateReadyToFix = () => {
    if (this.wrapper) {
      const wrapperScrolledUp = this.wrapper.getBoundingClientRect().top;
      const isReadyToFix = this.regularHeight + wrapperScrolledUp <= this.fixedHeaderHeight;
      this.setState(state => (state.isReadyToFix !== isReadyToFix ? { isReadyToFix } : state));
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };
}
