import type { Emotion } from '@emotion/css/create-instance';
import throttle from 'lodash.throttle';
import React from 'react';

import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import * as LayoutEvents from '../../lib/LayoutEvents.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Nullable } from '../../typings/utility-types.js';
import { getStyles } from './Indicator.styles.js';
import type { TabIndicators } from './Tab.js';
import { TabsDataTids } from './Tabs.js';
import { TabsContext } from './TabsContext.js';
import type { TabsContextType } from './TabsContext.js';

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

@withRenderEnvironment
@rootNode
export class Indicator extends React.Component<IndicatorProps, IndicatorState> {
  public static contextType = TabsContext;
  public context: TabsContextType = this.context;

  public state: IndicatorState = {
    styles: {},
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;

  private eventListener: Nullable<{
    remove: () => void;
  }> = null;

  private removeTabUpdatesListener: Nullable<() => void> = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    this.eventListener = LayoutEvents.addListener(this.reflow, this.globalObject);
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

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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
        data-tid={TabsDataTids.indicatorRoot}
        className={this.cx(
          this.styles.root(this.theme),
          indicators.primary && this.styles.primary(this.theme),
          indicators.success && this.styles.success(this.theme),
          indicators.warning && this.styles.warning(this.theme),
          indicators.error && this.styles.error(this.theme),
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

    if (isInstanceOf(htmlNode, this.globalObject.HTMLElement)) {
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
