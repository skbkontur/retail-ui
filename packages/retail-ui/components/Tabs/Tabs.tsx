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
  public static propTypes = {};
  public static childContextTypes = {};
  public static defaultProps = {
    vertical: false,
  };

  public static Tab = Tab;

  public state: TabsState = {
    tabs: [],
  };

  private _tabUpdates = {
    on: (cb: () => void) => {
      const index = this._listeners.push(cb);
      return () => {
        this._listeners.splice(index, 1);
      };
    },
  };

  private getProps = createPropsGetter(Tabs.defaultProps);
  private _listeners: Array<() => void> = [];

  public getChildContext() {
    return {
      activeTab: this.props.value,
      addTab: this._addTab,
      notifyUpdate: this._notifyUpdate,
      removeTab: this._removeTab,
      shiftFocus: this._shiftFocus,
      switchTab: this._switchTab,
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
          tabUpdates={this._tabUpdates}
          vertical={vertical}
        />
      </div>
    );
  }

  private _shiftFocus = (fromTab: string, delta: number) => {
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

  private _notifyUpdate = () => {
    this._listeners.forEach(cb => cb());
  };

  private _switchTab = (id: string) => {
    const { onChange, value } = this.props;
    if (id !== value && onChange) {
      onChange(this._createEvent(id), id);
    }
  };

  private _addTab = (id: string, getNode: () => any) => {
    this.setState(({ tabs }: TabsState) => ({
      tabs: tabs.concat({ id, getNode }),
    }));
  };

  private _removeTab = (id: string) => {
    this.setState((state: TabsState) => {
      const tabs = state.tabs.filter(tab => tab.id !== id);
      return { tabs };
    });
  };

  private _createEvent(value: string) {
    return { target: { value } };
  }
}

const { string, func, bool, node, oneOfType, number } = PropTypes;

Tabs.propTypes = {
  children: node,
  indicatorClassName: string,
  value: string.isRequired,
  vertical: bool,
  width: oneOfType([string, number]),
  onChange: func,
};

Tabs.childContextTypes = {
  activeTab: string.isRequired,
  addTab: func.isRequired,
  notifyUpdate: func.isRequired,
  removeTab: func.isRequired,
  shiftFocus: func.isRequired,
  switchTab: func.isRequired,
  vertical: bool.isRequired,
};

export default Tabs;
