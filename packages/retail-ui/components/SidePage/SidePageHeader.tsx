import * as React from 'react';
import Sticky from '../Sticky';
import CrossIcon from '../internal/icons/CrossIcon';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.module.less';
import { isFunction } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './SidePage.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';

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

/**
 * Шапка сайдпейдж
 *
 * @visibleName SidePage.Header
 */
export default class SidePageHeader extends React.Component<SidePageHeaderProps, SidePageHeaderState> {
  public state = {
    isReadyToFix: false,
  };

  private theme!: ITheme;
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
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { isReadyToFix } = this.state;
    return (
      <div ref={this.wrapperRef}>
        {isReadyToFix ? <Sticky side="top">{this.renderHeader}</Sticky> : this.renderHeader()}
      </div>
    );
  }

  private renderHeader = (fixed: boolean = false) => {
    return (
      <div className={cx(styles.header, { [styles.fixed]: fixed, [jsStyles.fixed(this.theme)]: fixed })}>
        {this.renderClose()}
        <div className={cx(styles.title, { [styles.fixed]: fixed, [jsStyles.fixed(this.theme)]: fixed })}>
          {isFunction(this.props.children) ? this.props.children(fixed) : this.props.children}
        </div>
      </div>
    );
  };

  private renderCloseContent = (fixed: boolean) => (
    <SidePageContext.Consumer>
      {({ requestClose }) => (
        <a
          className={cx(styles.close, jsStyles.close(this.theme), {
            [styles.fixed]: fixed,
            [jsStyles.fixed(this.theme)]: fixed,
          })}
          onClick={requestClose}
          data-tid="SidePage-Close"
        >
          <span className={styles.closeIcon}>
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
