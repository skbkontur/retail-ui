// @flow

import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './Tab.less';

type Props = {
  id: string,
  children?: any
};

type Context = {
  injectTab: (id: string, getNode: () => ?Element) => void,
  ejectTab: (id: string) => void,
  activeTab: string,
  switchTab: (id: string) => void
};

class Tab extends React.Component {
  props: Props;

  context: Context;

  _node: ?Element;

  componentWillMount() {
    invariant(
      typeof this.context.injectTab === 'function',
      'Tab should be placed inside Tabs component'
    );
  }

  componentDidMount() {
    this._injectTab();
  }

  componentWillUnmount() {
    this._ejectTab();
  }

  render() {
    const isActive = this.context.activeTab === this.props.id;
    return (
      <div
        className={cn(styles.root, isActive && styles.active)}
        onClick={this._switchTab}
        ref={this._refNode}
      >
        {this.props.children}
      </div>
    );
  }

  _refNode = el => {
    this._node = el;
  };

  _getNode = () => this._node;

  _switchTab = () => {
    this.context.switchTab(this.props.id);
  };

  _injectTab() {
    this.context.injectTab(this.props.id, this._getNode);
  }

  _ejectTab() {
    this.context.ejectTab(this.props.id);
  }
}

const { string, node, func } = PropTypes;

Tab.propTypes = {
  children: node,
  id: string.isRequired
};

Tab.contextTypes = {
  injectTab: func.isRequired,
  ejectTab: func.isRequired,
  activeTab: string.isRequired,
  switchTab: func.isRequired
};

export default Tab;
