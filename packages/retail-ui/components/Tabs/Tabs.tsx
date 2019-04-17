import cn from 'classnames';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';

import Indicator from './Indicator';
import { TabsContext } from './TabsContext';
import { TabProps, TabWithContext, Tab } from './Tab';

import styles from './Tabs.less';

export interface TabsProps {
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
  onChange?: (ev: { target: { value: string } }, value: string) => void;

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
class Tabs extends React.Component<TabsProps> {
  public static propTypes = {
    children: PropTypes.node,
    indicatorClassName: PropTypes.string,
    value: PropTypes.string.isRequired,
    vertical: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  };
  public static defaultProps = {
    vertical: false,
  };

  public static Tab: (props: TabProps) => JSX.Element = TabWithContext;

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

    return (
      <div className={cn(styles.root, vertical && styles.vertical)} style={{ width }}>
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
          <div>
            {/* React <= 15. TabsContext.Provider can only receive a single child element. */}
            {children}
            <Indicator className={indicatorClassName} tabUpdates={this.tabUpdates} vertical={vertical} />
          </div>
        </TabsContext.Provider>
      </div>
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

    if (htmlNode && htmlNode instanceof HTMLElement && htmlNode.hasOwnProperty('focus')) {
      htmlNode.focus();
    }
  };

  private notifyUpdate = () => {
    this.listeners.forEach(cb => cb());
  };

  private switchTab = (id: string) => {
    const { onChange, value } = this.props;
    if (id !== value && onChange) {
      onChange(this.createEvent(id), id);
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

  private createEvent(value: string) {
    return { target: { value } };
  }
}

export default Tabs;
