import React from 'react';
import cn from 'classnames';

import { Sticky } from '../Sticky';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { isFunction } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './SidePage.styles';
import { SidePageContext } from './SidePageContext';

const REGULAR_HEADER_PADDING_TOP = 25;
const FIXED_HEADER_PADDING_TOP = 13;
const FONT_FAMILY_CORRECTION = 1;
const CLOSE_ELEMENT_OFFSET = REGULAR_HEADER_PADDING_TOP - FIXED_HEADER_PADDING_TOP - FONT_FAMILY_CORRECTION;
const FIXED_HEADER_HEIGHT = 50;

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

  public componentDidMount = () => {
    window.addEventListener('scroll', this.update, true);
  };

  public componentWillUnmount = () => {
    window.removeEventListener('scroll', this.update, true);
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
      <div className={cn(jsStyles.header(), { [jsStyles.headerFixed(this.theme)]: fixed })}>
        {this.renderClose()}
        <div className={cn(jsStyles.title(), { [jsStyles.titleFixed()]: fixed })}>
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
            [jsStyles.fixed()]: fixed,
          })}
          onClick={requestClose}
          data-tid="SidePage__close"
        >
          <span className={jsStyles.closeIcon()}>
            <CrossIcon />
          </span>
        </a>
      )}
    </SidePageContext.Consumer>
  );

  private renderClose = () => (
    <Sticky side="top" offset={CLOSE_ELEMENT_OFFSET}>
      {this.renderCloseContent}
    </Sticky>
  );

  private updateReadyToFix = () => {
    if (this.wrapper) {
      const wrapperScrolledUp = this.wrapper.getBoundingClientRect().top;
      const isReadyToFix = this.regularHeight + wrapperScrolledUp <= FIXED_HEADER_HEIGHT;
      this.setState(state => (state.isReadyToFix !== isReadyToFix ? { isReadyToFix } : state));
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };
}
