import * as React from 'react';
import classNames from 'classnames';
import Sticky from '../Sticky';
import { SVGCross } from '../internal/cross';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';

export interface SidePageHeaderProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export interface SidePageHeaderState {
  isReadyToFix: boolean;
}

export default class SidePageHeader extends React.Component<SidePageHeaderProps, SidePageHeaderState> {
  public static FIXED_HEIGHT = 50;

  public state = {
    isReadyToFix: false,
  };

  private wrapper: HTMLElement | null = null;
  private lastRegularHeight: number = 0;

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

  public get fixedHeight(): number {
    return SidePageHeader.FIXED_HEIGHT;
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

  public render = (): JSX.Element => {
    const { isReadyToFix } = this.state;
    return (
      <div ref={this.wrapperRef}>
        {isReadyToFix ? <Sticky side="top">{fixed => this.renderHeader(fixed)}</Sticky> : this.renderHeader()}
      </div>
    );
  };

  private renderHeader = (fixed: boolean = false) => {
    return (
      <div className={classNames(styles.header, { [styles.fixed]: fixed })}>
        {this.renderClose()}
        <div className={classNames(styles.title, { [styles.fixed]: fixed })}>
          {typeof this.props.children === 'function' ? this.props.children(fixed) : this.props.children}
        </div>
      </div>
    );
  };

  private renderClose = () => {
    const HEADER_PADDING_TOP = 25;
    const FIXED_HEADER_PADDING_TOP = 13;
    const FONT_FAMILY_CORRECTION = 1;
    // The difference between offsetTop of the ".close" element in the regular and fixed modes.
    // It's used for the smooth ".close" element transition.
    const diffOffset = HEADER_PADDING_TOP - FIXED_HEADER_PADDING_TOP - FONT_FAMILY_CORRECTION;
    return (
      <Sticky side="top" offset={diffOffset}>
        {fixed => (
          <SidePageContext.Consumer>
            {({ requestClose }) => (
              <a
                href="javascript:"
                className={classNames(styles.close, { [styles.fixed]: fixed })}
                onClick={requestClose}
                data-tid="SidePage-Close"
              >
                <SVGCross className={styles.closeIcon} />
              </a>
            )}
          </SidePageContext.Consumer>
        )}
      </Sticky>
    );
  };

  private updateReadyToFix = () => {
    if (this.wrapper) {
      const wrapperScrolledUp = -this.wrapper.getBoundingClientRect().top;
      const isReadyToFix = this.regularHeight - wrapperScrolledUp <= this.fixedHeight;
      if (this.state.isReadyToFix !== isReadyToFix) {
        this.setState({
          isReadyToFix,
        });
      }
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };
}
