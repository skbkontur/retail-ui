// @flow
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tabs.less';

type Props = {
  /**
   * Активная вкладка
   */
  activeTab?: string,
  /**
   * Если нужен неконтроллируемые табы, то
   * defaultTab задает изначально активный таб
   */
  defaultTab?: string,
  /**
   * Событие при изменении вкладки
   */
  onTabChange?: string => void,

  children?: any
};

type TabType = { id: string, label: string };

type State = {
  tabs: TabType[],
  activeTab: ?string
};

class Tabs extends React.Component {
  props: Props;

  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      tabs: [],
      activeTab: props.defaultTab
    };
  }

  getChildContext() {
    return {
      injectTab: this._injectTab,
      ejectTab: this._ejectTab,
      activeTab: this._getActiveTab(),
      tabs: this.state.tabs,
      switchTab: this._switchTab
    };
  }

  render() {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }

  _getActiveTab = () => this.props.activeTab || this.state.activeTab;

  _switchTab = (id: string) => {
    const { onTabChange } = this.props;
    const activeTab = this._getActiveTab();
    if (onTabChange && id !== activeTab) {
      onTabChange(id);
    }
    this.setState({ activeTab: id });
  };

  _injectTab = (id: string, label: string) => {
    this.setState(({ tabs, activeTab }: State) => ({
      tabs: tabs.concat({ id, label }),
      activeTab: activeTab || id
    }));
  };

  _ejectTab = (id: string) => {
    this.setState((state: State) => {
      const tabs = state.tabs.filter(tab => tab.id !== id);
      let { activeTab } = state;
      if (tabs.length && id === activeTab) {
        activeTab = tabs[0].label;
      }
      return { tabs, activeTab };
    });
  };
}

const { func, string, array, node } = PropTypes;

Tabs.propTypes = {
  activeTab: string,
  children: node,
  defaultTab: string,
  onTabChange: func
};

Tabs.childContextTypes = {
  injectTab: func.isRequired,
  ejectTab: func.isRequired,
  activeTab: string,
  tabs: array.isRequired,
  switchTab: func.isRequired
};

export default Tabs;
