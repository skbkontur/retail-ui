// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Indicator from './Indicator';
import Tab from './Tab';

import styles from './Tabs.less';

import type { ReactNode } from '../internal/types';

type Props = {
  /**
   * Tab component should be child of Tabs component
   */
  children?: ReactNode,

  /**
   * Classname of indicator
   */
  indicatorClassName?: string,

  /**
   * Tabs change event
   */
  onChange?: (ev: { target: { value: string } }, value: string) => void,

  /**
   * Active tab identifier
   */
  value: string,

  /**
   * Vertical indicator
   */
  vertical: boolean
};

type State = {
  tabs: Array<{
    getNode: () => ?Element,
    id: string
  }>
};

/**
 * Tabs wrapper
 *
 * contains static property `Tab`
 */
class Tabs extends React.Component {
  static defaultProps = {
    vertical: false
  };

  static Tab = Tab;

  props: Props;

  state: State = {
    tabs: []
  };

  _tabUpdates = {
    on(cb: () => void) {
      const index = this._listeners.push(cb);
      return () => this._listeners.splice(index, 1);
    }
  };

  _listeners = [];

  getChildContext() {
    return {
      activeTab: this.props.value,
      addTab: this._addTab,
      notifyUpdate: this._notifyUpdate,
      removeTab: this._removeTab,
      switchTab: this._switchTab,
      vertical: this.props.vertical
    };
  }

  render() {
    const activeTab = this.state.tabs.find(x => x.id === this.props.value);
    return (
      <div className={styles.root}>
        {this.props.children}
        <Indicator
          className={this.props.indicatorClassName}
          getAnchorNode={activeTab ? activeTab.getNode : () => null}
          tabUpdates={this._tabUpdates}
          vertical={this.props.vertical}
        />
      </div>
    );
  }

  _notifyUpdate = () => {
    this._listeners.forEach(cb => cb());
  };

  _switchTab = (id: string) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this._createEvent(id), id);
    }
  };

  _addTab = (id: string, getNode: () => ?Element) => {
    this.setState(({ tabs }: State) => ({
      tabs: tabs.concat({ id, getNode })
    }));
  };

  _removeTab = (id: string) => {
    this.setState((state: State) => {
      const tabs = state.tabs.filter(tab => tab.id !== id);
      return { tabs };
    });
  };

  _createEvent(value) {
    return { target: { value } };
  }
}

const { string, func, bool, node } = PropTypes;

Tabs.propTypes = {
  children: node,
  indicatorClassName: string,
  value: string.isRequired,
  vertical: bool,
  onChange: func
};

Tabs.childContextTypes = {
  activeTab: string.isRequired,
  addTab: func.isRequired,
  notifyUpdate: func.isRequired,
  removeTab: func.isRequired,
  switchTab: func.isRequired,
  vertical: bool.isRequired
};

export default Tabs;
