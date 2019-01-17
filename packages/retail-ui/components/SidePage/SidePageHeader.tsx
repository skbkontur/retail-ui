import * as React from 'react';
import classNames from 'classnames';

import Sticky from '../Sticky';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';

export interface SidePageHeaderProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export interface SidePageHeaderState {
  isReadyToFix: boolean;
  headerHeight?: number | null;
}

export default class SidePageHeader extends React.Component<
  SidePageHeaderProps
> {
  public state = {
    isReadyToFix: false,
    headerHeight: null
  };

  private wrapper: HTMLElement | null = null;
  private normalHeader: HTMLElement | null = null;
  private fixedHeader: HTMLElement | null = null;

  public componentDidMount() {
    window.addEventListener('scroll', this.onScroll, true);
    this.onScroll();
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, true);
  }

  public componentDidUpdate() {
    this.onScroll();
    if (this.state.headerHeight !== this.normalHeaderHeight) {
      this.setState({
        headerHeight: this.normalHeaderHeight
      });
    }
  }

  public get scrollTop() {
    return this.wrapper ? -this.wrapper.getBoundingClientRect().top : 0;
  }

  public get normalHeaderHeight() {
    return this.normalHeader
      ? this.normalHeader.getBoundingClientRect().height
      : 0;
  }

  public get fixedHeaderHeight() {
    return this.fixedHeader
      ? this.fixedHeader.getBoundingClientRect().height
      : 0;
  }

  public get closeOffset() {
    if (!this.fixedHeader) {
      return 0;
    }
    const closeElement = this.fixedHeader.getElementsByClassName(
      styles.close
    )[0];
    return closeElement
      ? closeElement.getBoundingClientRect().top -
          this.fixedHeader.getBoundingClientRect().top
      : 0;
  }

  public render(): JSX.Element {
    const { isReadyToFix, headerHeight } = this.state;
    return (
      <div ref={this.wrapperRef}>
        {this.renderHiddenHeader({ fixed: false, ref: this.normalHeaderRef })}
        {this.renderHiddenHeader({ fixed: true, ref: this.fixedHeaderRef })}
        {isReadyToFix ? (
          <Sticky side="top" height={headerHeight}>
            {fixed => this.renderHeader({ fixed })}
          </Sticky>
        ) : (
          this.renderHeader({ fixed: false })
        )}
      </div>
    );
  }

  private renderHeader({
    fixed,
    hidden
  }: {
    fixed?: boolean;
    hidden?: boolean;
  }) {
    const closeOffset = !fixed ? this.closeOffset : 0;
    return (
      <div
        className={classNames({
          [styles.header]: true,
          [styles.fixed]: fixed,
          [styles.hidden]: hidden
        })}
      >
        {!hidden ? (
          <Sticky side="top" offset={closeOffset}>
            {this.renderClose()}
          </Sticky>
        ) : (
          this.renderClose()
        )}
        <div className={classNames(styles.title, fixed && styles.fixed)}>
          {typeof this.props.children === 'function'
            ? this.props.children(Boolean(fixed))
            : this.props.children}
        </div>
      </div>
    );
  }

  private renderClose() {
    return (
      <SidePageContext.Consumer>
        {({ requestClose }) => (
          <a href="javascript:" className={styles.close} onClick={requestClose}>
            <span>×</span>
          </a>
        )}
      </SidePageContext.Consumer>
    );
  }

  /**
   * Render hidden headers to calc their heights
   */
  private renderHiddenHeader(options: {
    fixed?: boolean;
    ref?: (el: HTMLElement | null) => void;
  }) {
    const { fixed, ref } = options;
    return React.cloneElement(this.renderHeader({ fixed, hidden: true }), {
      ref
    });
  }

  private onScroll = () => {
    const { scrollTop, normalHeaderHeight, fixedHeaderHeight } = this;
    const isReadyToFix = scrollTop > normalHeaderHeight - fixedHeaderHeight;
    if (this.state.isReadyToFix !== isReadyToFix) {
      this.setState({
        isReadyToFix
      });
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    if (el) {
      this.wrapper = el;
    }
  };

  private normalHeaderRef = (el: HTMLElement | null) => {
    if (el) {
      this.normalHeader = el;
    }
  };

  private fixedHeaderRef = (el: HTMLElement | null) => {
    if (el) {
      this.fixedHeader = el;
    }
  };
}
