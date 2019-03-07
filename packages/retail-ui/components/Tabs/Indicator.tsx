import * as React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import LayoutEvents from '../../lib/LayoutEvents';
import throttle from 'lodash.throttle';
import Tab, { TabIndicators } from './Tab';

import styles = require('./Indicator.less');
import { Nullable } from '../../typings/utility-types';

export interface IndicatorProps {
  className?: string;
  getAnchorNode: () => Tab | null;
  tabUpdates: {
    on: (x0: () => void) => () => void;
  };
  vertical: boolean;
}

export interface IndicatorState {
  styles: React.CSSProperties;
}

class Indicator extends React.Component<IndicatorProps, IndicatorState> {
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
    const node = this.props.getAnchorNode();
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
    const node = this.props.getAnchorNode();
    const underlyingNode = node && node.getUnderlyingNode();
    const nodeStyles = this.getStyles(underlyingNode);
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

export default Indicator;
