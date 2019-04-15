import * as React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import LayoutEvents from '../../lib/LayoutEvents';
import throttle from 'lodash.throttle';
import { TabIndicators } from './Tab';

import styles from './Indicator.less';
import { Nullable } from '../../typings/utility-types';
import { withContext } from '../../lib/utils';
import { TabsContext, TabsContextType } from './TabsContext';

export interface IndicatorProps {
  className?: string;
  tabUpdates: {
    on: (x0: () => void) => () => void;
  };
  vertical: boolean;
  context?: TabsContextType;
}

export interface IndicatorState {
  styles: React.CSSProperties;
}

export class Indicator extends React.Component<IndicatorProps, IndicatorState> {
  public state: IndicatorState = {
    styles: {},
  };

  private eventListener: Nullable<{
    remove: () => void;
  }> = null;
  private removeTabUpdatesListener: Nullable<() => void> = null;

  public componentDidMount() {
    this.eventListener = LayoutEvents.addListener(this.throttledReflow);
    this.removeTabUpdatesListener = this.props.tabUpdates.on(this.reflow);
    this.reflow();
  }

  public componentWillUnmount() {
    this.throttledReflow.cancel();

    if (this.eventListener) {
      this.eventListener.remove();
    }
    if (this.removeTabUpdatesListener) {
      this.removeTabUpdatesListener();
    }
  }

  public componentDidUpdate(_: IndicatorProps, prevState: IndicatorState) {
    this.reflow();
  }

  public render() {
    const { context } = this.props;
    const node = context ? context.getTab(context.activeTab) : null;
    const indicators: TabIndicators = (node && node.getIndicators && node.getIndicators()) || {
      error: false,
      warning: false,
      success: false,
      primary: false,
      disabled: false,
    };
    return (
      <div
        className={cn(
          styles.root,
          indicators.primary && styles.primary,
          indicators.success && styles.success,
          indicators.warning && styles.warning,
          indicators.error && styles.error,
          this.props.className,
        )}
        style={this.state.styles}
      />
    );
  }

  private reflow = () => {
    const { context } = this.props;
    const node = context ? context.getTab(context.activeTab) : null;
    const nodeStyles = this.getStyles(node);
    const stylesUpdated = ['left', 'top', 'width', 'height'].some(
      prop => nodeStyles[prop as keyof React.CSSProperties] !== this.state.styles[prop as keyof React.CSSProperties],
    );
    if (stylesUpdated) {
      this.setState({ styles: nodeStyles });
    }
  };

  // tslint:disable-next-line:member-ordering
  private throttledReflow = throttle(this.reflow, 100);

  private getStyles(node: any): React.CSSProperties {
    if (node instanceof React.Component) {
      node = findDOMNode(node);
    }

    if (node instanceof HTMLElement) {
      const rect = node.getBoundingClientRect();
      if (this.props.vertical) {
        return {
          width: 3,
          left: node.offsetLeft,
          top: node.offsetTop,
          height: rect.bottom - rect.top,
        };
      }

      return {
        left: node.offsetLeft,
        top: node.offsetHeight + node.offsetTop - 3,
        width: rect.right - rect.left,
      };
    }

    return {};
  }
}

export const IndicatorWithContext = withContext(TabsContext.Consumer)(Indicator);

export default IndicatorWithContext;
