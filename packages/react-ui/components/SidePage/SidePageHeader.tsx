import React from 'react';

import { Sticky } from '../Sticky';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { isFunction } from '../../lib/utils';
import { theme } from '../../lib/theming/decorators';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './SidePage.styles';
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
@theme
export class SidePageHeader extends React.Component<SidePageHeaderProps, SidePageHeaderState> {
  public static __KONTUR_REACT_UI__ = 'SidePageHeader';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;

  public state = {
    isReadyToFix: false,
  };

  private readonly theme!: Theme;
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
      <div className={cx(styles.header(this.theme), { [styles.headerFixed(this.theme)]: fixed })}>
        {this.renderClose()}
        <div className={cx(styles.title(this.theme), { [styles.titleFixed()]: fixed })}>
          {isFunction(this.props.children) ? this.props.children(fixed) : this.props.children}
        </div>
      </div>
    );
  };

  private renderCloseContent = (fixed: boolean) => (
    <SidePageContext.Consumer>
      {({ requestClose }) => (
        <a
          className={cx(styles.close(this.theme), {
            [styles.fixed(this.theme)]: fixed,
          })}
          onClick={requestClose}
          data-tid="SidePage__close"
        >
          <span
            className={cx(styles.closeIcon(this.theme), {
              [styles.fixed(this.theme)]: fixed,
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
      this.setState((state) => (state.isReadyToFix !== isReadyToFix ? { isReadyToFix } : state));
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };
}
