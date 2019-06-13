import * as React from 'react';
import { SidePageContext, SidePageContextType } from './SidePageContext';
import styles from './SidePage.less';
import LayoutEvents from '../../lib/LayoutEvents';
import { withContext } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './SidePage.styles';
import { ThemeConsumer } from '../internal/ThemeContext';
import { ITheme } from '../../lib/theming/Theme';

export interface SidePageFooterProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
  context?: SidePageContextType;
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
}

/**
 * Футер модального окна.
 */

export class SidePageFooter extends React.Component<SidePageFooterProps> {
  public state = {
    fixed: false,
  };

  private theme!: ITheme;
  private content: HTMLElement | null = null;
  private wrapper: HTMLElement | null = null;
  private layoutSub: ReturnType<typeof LayoutEvents.addListener> | null = null;

  public componentDidMount() {
    const { context } = this.props;
    if (context) {
      context.footerRef(this);
    }
    this.update();
    this.layoutSub = LayoutEvents.addListener(this.update);
  }

  public componentWillUnmount() {
    const { context } = this.props;
    if (context) {
      context.footerRef(null);
    }
    if (this.layoutSub) {
      this.layoutSub.remove();
    }
  }

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

  public update = () => {
    this.setProperStyles();
  };

  private renderMain() {
    return (
      <div style={{ height: this.getContentHeight() }} ref={this.refWrapper}>
        <SidePageContext.Consumer>
          {({ getWidth }) => (
            <div
              className={styles.footer}
              style={{
                width: getWidth(),
              }}
            >
              <div
                className={cx(styles.footerContent, {
                  [styles.panel]: !!this.props.panel,
                  [jsStyles.panel(this.theme)]: !!this.props.panel,
                  [styles.fixed]: this.state.fixed,
                  [jsStyles.fixed(this.theme)]: this.state.fixed,
                })}
                ref={this.refContent}
              >
                {this.props.children}
              </div>
            </div>
          )}
        </SidePageContext.Consumer>
      </div>
    );
  }

  private refContent = (node: HTMLElement | null) => {
    this.content = node;
  };

  private refWrapper = (node: HTMLElement | null) => {
    this.wrapper = node;
  };

  private setProperStyles = () => {
    if (this.wrapper && this.content) {
      const wrapperRect = this.wrapper!.getBoundingClientRect();
      const contentRect = this.content!.getBoundingClientRect();
      const fixed = wrapperRect.top > contentRect.top;
      this.setState({ fixed });
    }
  };

  private getContentHeight() {
    if (!this.content) {
      return 'auto';
    }
    return this.content.getBoundingClientRect().height;
  }
}

export const SidePageFooterWithContext = withContext(SidePageContext.Consumer)(SidePageFooter);
export default SidePageFooterWithContext;
