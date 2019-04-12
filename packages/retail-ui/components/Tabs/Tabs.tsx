import cn from 'classnames';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';

import Indicator from './Indicator';
import Tab from './Tab';

import styles from './Tabs.less';
import { createPropsGetter } from '../internal/createPropsGetter';

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
   */
  vertical?: boolean;

  /**
   * Width of tabs container
   */
  width?: number | string;
}

export interface TabsState {
  tabs: Array<{
    getNode: () => Tab | null;
    id: string;
  }>;
}

/**
 * Tabs wrapper
 *
 * contains static property `Tab`
 */
class Tabs extends React.Component<TabsProps, TabsState> {
  public static propTypes = {
    children: PropTypes.node,
    indicatorClassName: PropTypes.string,
    value: PropTypes.string.isRequired,
    vertical: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  };
  public static childContextTypes = {
    activeTab: PropTypes.string.isRequired,
    addTab: PropTypes.func.isRequired,
    notifyUpdate: PropTypes.func.isRequired,
    removeTab: PropTypes.func.isRequired,
    shiftFocus: PropTypes.func.isRequired,
    switchTab: PropTypes.func.isRequired,
    vertical: PropTypes.bool.isRequired,
  };
  public static defaultProps = {
    vertical: false,
  };

  public static Tab = Tab;

  public state: TabsState = {
    tabs: [],
  };

  private tabUpdates = {
    on: (cb: () => void) => {
      const index = this.listeners.push(cb);
      return () => {
        this.listeners.splice(index, 1);
      };
    },
  };

  private getProps = createPropsGetter(Tabs.defaultProps);
  private listeners: Array<() => void> = [];

  public getChildContext() {
    return {
      activeTab: this.props.value,
      addTab: this.addTab,
      notifyUpdate: this.notifyUpdate,
      removeTab: this.removeTab,
      shiftFocus: this.shiftFocus,
      switchTab: this.switchTab,
      vertical: this.props.vertical,
    };
  }

  public render(): JSX.Element {
    const activeTab = this.state.tabs.find(x => x.id === this.props.value);
    const { vertical } = this.getProps<TabsProps, Tabs>();

    return (
      <div className={cn(styles.root, vertical && styles.vertical)} style={{ width: this.props.width }}>
        {this.props.children}
        <Indicator
          className={this.props.indicatorClassName}
          getAnchorNode={activeTab ? activeTab.getNode : () => null}
          tabUpdates={this.tabUpdates}
          vertical={vertical}
        />
      </div>
    );
  }

  private shiftFocus = (fromTab: string, delta: number) => {
    const { tabs } = this.state;
    const index = tabs.findIndex(x => x.id === fromTab);
    const newIndex = Math.max(0, Math.min(index + delta, tabs.length - 1));
    const tab = tabs[newIndex];

    const tabNode = tab.getNode();
    let htmlNode;
    if (tabNode instanceof React.Component) {
      htmlNode = findDOMNode(tabNode) as HTMLElement;
    }

    if (htmlNode && htmlNode.hasOwnProperty('focus')) {
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

  private addTab = (id: string, getNode: () => any) => {
    this.setState(({ tabs }: TabsState) => ({
      tabs: tabs.concat({ id, getNode }),
    }));
  };

  private removeTab = (id: string) => {
    this.setState((state: TabsState) => {
      const tabs = state.tabs.filter(tab => tab.id !== id);
      return { tabs };
    });
  };

  private createEvent(value: string) {
    return { target: { value } };
  }
}

export default Tabs;
