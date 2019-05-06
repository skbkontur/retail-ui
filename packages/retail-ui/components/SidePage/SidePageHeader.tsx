import * as React from 'react';
import Sticky from '../Sticky';
import { SVGCross } from '../internal/cross';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';
import { isFunction } from '../../lib/utils';
import { cx as classNames } from 'emotion';
import jsStyles from './SidePage.styles';
import ThemeFactory from '../../lib/theming/ThemeFactory';

const theme = ThemeFactory.getDefaultTheme();

const REGULAR_HEADER_PADDING_TOP = 25;
const FIXED_HEADER_PADDING_TOP = 13;
const FONT_FAMILY_CORRECTION = 1;
const CLOSE_ELEMENT_OFFSET = REGULAR_HEADER_PADDING_TOP - FIXED_HEADER_PADDING_TOP - FONT_FAMILY_CORRECTION;
const FIXED_HEADER_HEIGHT = 50;

export interface SidePageHeaderProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export interface SidePageHeaderState {
  isReadyToFix: boolean;
}

export default class SidePageHeader extends React.Component<SidePageHeaderProps, SidePageHeaderState> {
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
    const { isReadyToFix } = this.state;
    return (
      <div ref={this.wrapperRef}>
        {isReadyToFix ? <Sticky side="top">{this.renderHeader}</Sticky> : this.renderHeader()}
      </div>
    );
  }

  private renderHeader = (fixed: boolean = false) => {
    return (
      <div className={classNames(styles.header, { [styles.fixed]: fixed, [jsStyles.fixed(theme)]: fixed })}>
        {this.renderClose()}
        <div className={classNames(styles.title, { [styles.fixed]: fixed, [jsStyles.fixed(theme)]: fixed })}>
          {isFunction(this.props.children) ? this.props.children(fixed) : this.props.children}
        </div>
      </div>
    );
  };

  private renderClose = () => {
    return (
      <Sticky side="top" offset={CLOSE_ELEMENT_OFFSET}>
        {fixed => (
          <SidePageContext.Consumer>
            {({ requestClose }) => (
              <a
                href="javascript:"
                className={classNames(styles.close, jsStyles.close(theme), {
                  [styles.fixed]: fixed,
                  [jsStyles.fixed(theme)]: fixed,
                })}
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
      const wrapperScrolledUp = this.wrapper.getBoundingClientRect().top;
      const isReadyToFix = this.regularHeight + wrapperScrolledUp <= FIXED_HEADER_HEIGHT;
      this.setState(state => (state.isReadyToFix !== isReadyToFix ? { isReadyToFix } : state));
    }
  };

  private wrapperRef = (el: HTMLElement | null) => {
    this.wrapper = el;
  };
}
