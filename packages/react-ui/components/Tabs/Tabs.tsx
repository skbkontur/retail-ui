import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

import { Indicator } from './Indicator';
import { jsStyles } from './Tabs.styles';
import { TabsContext } from './TabsContext';
import { Tab } from './Tab';

export interface TabsProps extends CommonProps {
  /**
   * Tab component should be child of Tabs component
   */
  children?: React.ReactNode;

  /**
   * Classname of indicator
   */
  indicatorClassName?: string;

  /**
   * Tabs change event
   */
  onValueChange?: (value: string) => void;

  /**
   * Active tab identifier
   */
  value: string;

  /**
   * Vertical indicator
   * @default false
   */
  vertical: boolean;

  /**
   * Width of tabs container
   */
  width?: number | string;
}

/**
 * Tabs wrapper
 *
 * contains static property `Tab`
 */
export class Tabs extends React.Component<TabsProps> {
  public static __KONTUR_REACT_UI__ = 'Tabs';

  public static propTypes = {
    children: PropTypes.node,
    indicatorClassName: PropTypes.string,
    value: PropTypes.string.isRequired,
    vertical: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onValueChange: PropTypes.func,
  };
  public static defaultProps = {
    vertical: false,
  };

  public static Tab = Tab;

  private theme!: Theme;

  private tabs: Array<{
    getNode: () => Tab | null;
    id: string;
  }> = [];

  private tabUpdates = {
    on: (cb: () => void) => {
      const index = this.listeners.push(cb);
      return () => {
        this.listeners.splice(index, 1);
      };
    },
  };

  private listeners: Array<() => void> = [];

  public render(): JSX.Element {
    const { vertical, value, width, children, indicatorClassName } = this.props;
    const [{ className, style, ...commonProps }] = extractCommonProps(this.props);
    const wrapperProps = {
      ...commonProps,
      style: {
        ...style,
        width: width ?? style?.width,
      },
    };

    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return (
            <div
              {...wrapperProps}
              className={cn(className, jsStyles.root(this.theme), vertical && jsStyles.vertical(this.theme))}
            >
              <TabsContext.Provider
                value={{
                  vertical,
                  activeTab: value,
                  getTab: this.getTab,
                  addTab: this.addTab,
                  removeTab: this.removeTab,
                  notifyUpdate: this.notifyUpdate,
                  shiftFocus: this.shiftFocus,
                  switchTab: this.switchTab,
                }}
              >
                {children}
                <Indicator className={indicatorClassName} tabUpdates={this.tabUpdates} vertical={vertical} />
              </TabsContext.Provider>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private shiftFocus = (fromTab: string, delta: number) => {
    const { tabs } = this;
    const index = tabs.findIndex(x => x.id === fromTab);
    const newIndex = Math.max(0, Math.min(index + delta, tabs.length - 1));
    const tab = tabs[newIndex];

    const tabNode = tab.getNode();
    let htmlNode = null;
    if (tabNode instanceof React.Component) {
      htmlNode = findDOMNode(tabNode);
    }

    if (htmlNode && htmlNode instanceof HTMLElement && typeof htmlNode.focus === 'function') {
      htmlNode.focus();
    }
  };

  private notifyUpdate = () => {
    this.listeners.forEach(cb => cb());
  };

  private switchTab = (id: string) => {
    const { onValueChange, value } = this.props;
    if (id !== value && onValueChange) {
      onValueChange(id);
    }
  };

  private getTab = (id: string): Tab | null => {
    const { getNode = null } = this.tabs.find(x => x.id === id) || {};
    return getNode && getNode();
  };

  private addTab = (id: string, getNode: () => any) => {
    this.tabs = this.tabs.concat({ id, getNode });
  };

  private removeTab = (id: string) => {
    this.tabs = this.tabs.filter(tab => tab.id !== id);
  };
}
