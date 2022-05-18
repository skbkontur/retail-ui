import React from 'react';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';

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

interface SidePageFooterState {
  fixed: boolean;
}

/**
 * Футер сайдпейджа.
 *
 * @visibleName SidePage.Footer
 */
@responsiveLayout
@rootNode
export class SidePageFooter extends React.Component<SidePageFooterProps, SidePageFooterState> {
  public static __KONTUR_REACT_UI__ = 'SidePageFooter';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;
  private isMobileLayout!: boolean;

  public state: SidePageFooterState = {
    fixed: false,
  };

  private theme!: Theme;
  private content: HTMLElement | null = null;
  private layoutSub: ReturnType<typeof LayoutEvents.addListener> | null = null;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
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

  public getSticky() {
    if (typeof this.props.sticky !== 'undefined') {
      return this.props.sticky;
    }

    if (this.isMobileLayout) {
      return false;
    }

    return true;
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
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div style={{ height: this.getContentHeight() }} className={styles.footerWrapper()}>
          <SidePageContext.Consumer>
            {({ getWidth }) => (
              <div
                className={cx(styles.footer(this.theme), {
                  [styles.positionStatic()]: !this.getSticky(),
                })}
                style={{
                  width: getWidth(),
                }}
              >
                <div
                  className={cx(styles.footerContent(this.theme), {
                    [styles.footerFixed(this.theme)]: this.state.fixed,
                    [styles.panel(this.theme)]: !!this.props.panel,
                    [styles.panelFixed(this.theme)]: !!this.props.panel && this.state.fixed,
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

  private setProperStyles = () => {
    const wrapper = getRootNode(this);
    if (wrapper && this.content) {
      const wrapperRect = getDOMRect(wrapper);
      const contentRect = getDOMRect(this.content);
      const fixed = wrapperRect.top > contentRect.top;
      this.setState({ fixed });
    }
  };

  private getContentHeight() {
    if (!this.content) {
      return 'auto';
    }
    return getDOMRect(this.content).height;
  }
}
