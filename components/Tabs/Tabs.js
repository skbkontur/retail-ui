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
  value: string
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
  static Tab = Tab;

  props: Props;

  state: State = {
    tabs: []
  };

  getChildContext() {
    return {
      addTab: this._addTab,
      removeTab: this._removeTab,
      activeTab: this.props.value,
      switchTab: this._switchTab
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
        />
      </div>
    );
  }

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

const { string, func } = PropTypes;

Tabs.propTypes = {
  value: string.isRequired,
  onChange: func
};

Tabs.childContextTypes = {
  addTab: func.isRequired,
  removeTab: func.isRequired,
  activeTab: string.isRequired,
  switchTab: func.isRequired
};

export default Tabs;
