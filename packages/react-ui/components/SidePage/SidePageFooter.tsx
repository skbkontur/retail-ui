import React from 'react';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout';

import { styles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageFooterProps extends CommonProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
  sticky?: boolean;
}

/**
 * Футер сайдпейджа.
 *
 * @visibleName SidePage.Footer
 */
@responsiveLayout
export class SidePageFooter extends React.Component<SidePageFooterProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageFooter';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;
  private isMobileLayout!: boolean;

  public state = {
    fixed: false,
  };

  private isSticky = true;

  private theme!: Theme;
  private content: HTMLElement | null = null;
  private wrapper: HTMLElement | null = null;
  private layoutSub: ReturnType<typeof LayoutEvents.addListener> | null = null;

  public componentDidMount() {
    if (this.isMobileLayout) {
      this.isSticky = false;
    }

    if (typeof this.props.sticky !== 'undefined') {
      this.isSticky = this.props.sticky;
    }

    this.context.footerRef(this);
    this.update();
    this.layoutSub = LayoutEvents.addListener(this.update);
    this.context.setHasFooter?.();
    this.context.setHasPanel?.(this.props.panel);
  }

  public componentDidUpdate(prevProps: Readonly<SidePageFooterProps>) {
    this.props.panel !== prevProps.panel && this.context.setHasPanel?.(this.props.panel);
  }

  public componentWillUnmount() {
    this.context.footerRef(null);
    if (this.layoutSub) {
      this.layoutSub.remove();
    }
    this.context.setHasFooter?.(false);
    this.context.setHasPanel?.(false);
  }

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

  public update = () => {
    this.setProperStyles();
  };

  private renderMain() {
    return (
      <CommonWrapper {...this.props}>
        <div style={{ height: this.getContentHeight() }} className={styles.footerWrapper()} ref={this.refWrapper}>
          <SidePageContext.Consumer>
            {({ getWidth }) => (
              <div
                className={cx(styles.footer(), { [styles.positionStatic()]: !this.isSticky })}
                style={{
                  width: getWidth(),
                }}
              >
                <div
                  className={cx(styles.footerContent(this.theme), {
                    [styles.footerFixed(this.theme)]: this.state.fixed,
                    [styles.panel(this.theme)]: !!this.props.panel,
                    [styles.mobileFooterContent(this.theme)]: this.isMobileLayout,
                  })}
                  ref={this.refContent}
                >
                  {this.props.children}
                </div>
              </div>
            )}
          </SidePageContext.Consumer>
        </div>
      </CommonWrapper>
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
      const wrapperRect = this.wrapper.getBoundingClientRect();
      const contentRect = this.content.getBoundingClientRect();
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
