// @flow
import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './Menu.less';

type Props = {};

type Context = {
  activeTab: string,
  tabs: { id: string, label: string }[],
  switchTab: (id: string) => void
};

class Menu extends React.Component {
  props: Props;

  context: Context;

  state: {
    border: ?{
      left: number,
      width: number
    }
  } = {
    border: null
  };

  componentWillMount() {
    invariant(
      typeof this.context.switchTab === 'function',
      'Menu should be placed inside Tabs component'
    );
  }

  componentDidMount() {
    this._reflow();
  }

  componentDidUpdate() {
    if (this._lastActiveTab !== this.context.activeTab) {
      this._reflow();
    }
  }

  render() {
    const { tabs, activeTab, switchTab } = this.context;
    const border = this._renderBorder();
    return (
      <ul className={styles.root} ref={el => (this._root = el)}>
        {tabs.map(({ id, label }) => (
          <li
            key={id}
            ref={id}
            className={cn({
              [styles.label]: true,
              [styles.active]: id === activeTab
            })}
            onClick={() => switchTab(id)}
          >
            {label}
          </li>
        ))}
        {border}
      </ul>
    );
  }

  _root: ?HTMLElement = null;
  _lastActiveTab: ?string = null;

  _renderBorder() {
    if (!this.state.border) {
      return null;
    }

    return (
      <div
        className={styles.border}
        style={{
          left: this.state.border.left,
          width: this.state.border.width
        }}
      />
    );
  }

  _reflow() {
    if (!this._root) {
      return;
    }

    const rootRect = this._root.getBoundingClientRect();

    const { activeTab } = this.context;

    const labelNode = this.refs[activeTab];

    if (!labelNode || !(labelNode instanceof Node)) {
      return;
    }

    this._lastActiveTab = activeTab;

    const { left, right } = labelNode.getBoundingClientRect();

    this.setState({
      border: {
        left: left - rootRect.left,
        width: right - left
      }
    });
  }
}

const { func, string, array } = PropTypes;

Menu.contextTypes = {
  activeTab: string,
  tabs: array.isRequired,
  switchTab: func.isRequired
};

export default Menu;
