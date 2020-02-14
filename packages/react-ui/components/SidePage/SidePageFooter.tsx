import React from 'react';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './SidePage.styles';
import styles from './SidePage.module.less';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageFooterProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
}

/**
 * Футер сайдпейджа.
 *
 * @visibleName SidePage.Footer
 */

export class SidePageFooter extends React.Component<SidePageFooterProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageFooter';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;

  public state = {
    fixed: false,
  };

  private theme!: Theme;
  private content: HTMLElement | null = null;
  private wrapper: HTMLElement | null = null;
  private layoutSub: ReturnType<typeof LayoutEvents.addListener> | null = null;

  public componentDidMount() {
    this.context.footerRef(this);
    this.update();
    this.layoutSub = LayoutEvents.addListener(this.update);
  }

  public componentWillUnmount() {
    this.context.footerRef(null);
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
