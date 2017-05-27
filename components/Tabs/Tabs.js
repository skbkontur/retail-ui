// @flow
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Tabs.less';

type Props = {
  activeTab?: string,
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
      activeTab: props.activeTab
    };
  }

  getChildContext() {
    return {
      injectTab: this._injectTab,
      ejectTab: this._ejectTab,
      activeTab: this._getActiveTab()
    };
  }

  render() {
    return (
      <div className={styles.root}>
        {this._renderNav()}
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

  _getActiveTab = () => {
    return this.props.onTabChange ? this.props.activeTab : this.state.activeTab;
  };

  _renderNav() {
    const { tabs } = this.state;
    const activeTab = this._getActiveTab();
    return (
      <ul className={styles.nav}>
        {tabs.map(({ id, label }) => (
          <li
            key={id}
            className={cn({
              [styles.label]: true,
              [styles.active]: id === activeTab
            })}
            onClick={() => this._switchTab(id)}
          >
            {label}
          </li>
        ))}
      </ul>
    );
  }

  _switchTab = id => {
    const { onTabChange, activeTab } = this.props;
    if (onTabChange && id !== activeTab) {
      onTabChange(id);
      return;
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
      let activeTab = state.activeTab;
      if (tabs.length && id === activeTab) {
        activeTab = tabs[0].label;
      }
      return {
        tabs,
        activeTab
      };
    });
  };
}

const { func, string } = PropTypes;

Tabs.childContextTypes = {
  injectTab: func.isRequired,
  ejectTab: func.isRequired,
  activeTab: string
};

export default Tabs;
