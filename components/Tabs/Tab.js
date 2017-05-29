// @flow
import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

import styles from './Tab.less';

type Props = {
  label: string,
  id: string,
  children?: any
};

type Context = {
  injectTab: (id: string, label: string) => void,
  ejectTab: (id: string) => void,
  activeTab: string
};

class Tab extends React.Component {
  props: Props;

  context: Context;

  componentWillMount() {
    invariant(
      typeof this.context.injectTab === 'function',
      'Tab should be placed inside Tabs component'
    );
  }

  componentDidMount() {
    console.log(this.props.id);
    this._injectTab();
  }

  componentWillUnmount() {
    this._ejectTab();
  }

  render() {
    if (this.context.activeTab !== this.props.id) {
      return null;
    }
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }

  _injectTab() {
    const { id, label } = this.props;
    this.context.injectTab(id, label);
  }

  _ejectTab() {
    const { id } = this.props;
    this.context.ejectTab(id);
  }
}

const { func, string, node } = PropTypes;

Tab.propTypes = {
  children: node,
  id: string.isRequired,
  label: string.isRequired
};

Tab.contextTypes = {
  injectTab: func.isRequired,
  ejectTab: func.isRequired,
  activeTab: string
};

export default Tab;
