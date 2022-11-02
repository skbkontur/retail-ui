import React from 'react';
import throttle from 'lodash.throttle';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';

import { styles } from './Indicator.styles';
import { TabsContext, TabsContextType } from './TabsContext';
import { TabIndicators } from './Tab';

export interface IndicatorProps {
  className?: string;
  tabUpdates: {
    on: (x0: () => void) => () => void;
  };
  vertical: boolean;
}

export interface IndicatorState {
  styles: React.CSSProperties;
}

@rootNode
export class Indicator extends React.Component<IndicatorProps, IndicatorState> {
  public static contextType = TabsContext;
  public context: TabsContextType = this.context;

  public state: IndicatorState = {
    styles: {},
  };

  private theme!: Theme;

  private eventListener: Nullable<{
    remove: () => void;
  }> = null;

  private removeTabUpdatesListener: Nullable<() => void> = null;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    this.eventListener = LayoutEvents.addListener(this.reflow);
    this.removeTabUpdatesListener = this.props.tabUpdates.on(this.reflow);
    this.reflow();
  }

  public componentWillUnmount() {
    this.reflow.cancel();

    if (this.eventListener) {
      this.eventListener.remove();
    }
    if (this.removeTabUpdatesListener) {
      this.removeTabUpdatesListener();
    }
  }

  public componentDidUpdate() {
    this.reflow();
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { getTab, activeTab } = this.context;
    const node = getTab(activeTab);
    const indicators: TabIndicators = (node && node.getIndicators && node.getIndicators()) || {
      error: false,
      warning: false,
      success: false,
      primary: false,
      disabled: false,
    };
    return (
      <div
        className={cx(
          styles.root(this.theme),
          indicators.primary && styles.primary(this.theme),
          indicators.success && styles.success(this.theme),
          indicators.warning && styles.warning(this.theme),
          indicators.error && styles.error(this.theme),
          this.props.className,
        )}
        style={this.state.styles}
        ref={this.setRootNode}
      />
    );
  }

  private reflow = throttle(() => {
    const { getTab, activeTab } = this.context;
    const node = getTab(activeTab);
    const nodeStyles = this.getStyles(node);
    const stylesUpdated = ['left', 'top', 'width', 'height'].some(
      (prop) => nodeStyles[prop as keyof React.CSSProperties] !== this.state.styles[prop as keyof React.CSSProperties],
    );
    if (stylesUpdated) {
      this.setState({ styles: nodeStyles });
    }
  }, 100);

  private getStyles(node: any): React.CSSProperties {
    const htmlNode = getRootNode(node);

    if (htmlNode && htmlNode instanceof HTMLElement) {
      const rect = getDOMRect(htmlNode);
      if (this.props.vertical) {
        return {
          width: this.theme.tabBorderWidth,
          left: htmlNode.offsetLeft,
          top: htmlNode.offsetTop,
          height: rect.bottom - rect.top,
        };
      }

      const tabBorderWidth = parseInt(this.theme.tabBorderWidth, 10) || 0;
      return {
        left: htmlNode.offsetLeft,
        top: htmlNode.offsetHeight + htmlNode.offsetTop - tabBorderWidth,
        width: rect.right - rect.left,
      };
    }

    return {};
  }
}
