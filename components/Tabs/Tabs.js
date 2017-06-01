// @flow

import React from 'react';
import PropTypes from 'prop-types';

import Indicator from './Indicator';

import styles from './Tabs.less';

type Props = {
  value: string,
  onChange: (ev: { target: { value: string } }, value: string) => void,
  children?: any
};

type Tab = {
  id: string,
  getNode: () => ?Element
};

type State = {
  tabs: Tab[]
};

class Tabs extends React.Component {
  props: Props;

  state: State = {
    tabs: []
  };

  getChildContext() {
    return {
      injectTab: this._injectTab,
      ejectTab: this._ejectTab,
      activeTab: this.props.value,
      switchTab: this._switchTab
    };
  }

  render() {
    const activeTab = this.state.tabs.find(x => x.id === this.props.value);
    return (
      <div className={styles.root}>
        {this.props.children}
        <Indicator getAnchorNode={activeTab ? activeTab.getNode : () => null} />
      </div>
    );
  }

  _switchTab = (id: string) => {
    this.props.onChange(this._createEvent(id), id);
  };

  _injectTab = (id: string, getNode: () => ?Element) => {
    this.setState(({ tabs }: State) => ({
      tabs: tabs.concat({ id, getNode })
    }));
  };

  _ejectTab = (id: string) => {
    this.setState(
      (state: State) => {
        const tabs = state.tabs.filter(tab => tab !== id);
        return { tabs };
      },
      () => {
        const { tabs } = this.state;
        if (id === this.props.value && tabs.length) {
          this.props.onChange(this._createEvent(tabs[0].id), tabs[0].id);
        }
      }
    );
  };

  _createEvent(value) {
    return { target: { value } };
  }
}

const { string, func } = PropTypes;

Tabs.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired
};

Tabs.childContextTypes = {
  injectTab: func.isRequired,
  ejectTab: func.isRequired,
  activeTab: string.isRequired,
  switchTab: func.isRequired
};

export default Tabs;
