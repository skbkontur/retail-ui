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

  componentWillMount() {
    invariant(
      typeof this.context.switchTab === 'function',
      'Menu should be placed inside Tabs component'
    );
  }

  render() {
    const { tabs, activeTab, switchTab } = this.context;
    const border = this._renderBorder();
    return (
      <ul className={styles.root} ref="root">
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

  _renderBorder() {
    const rootNode = this.refs.root;
    if (!rootNode || !(rootNode instanceof Node)) {
      return null;
    }

    const rootRect = rootNode.getBoundingClientRect();

    const { activeTab } = this.context;
    const labelNode = this.refs[activeTab];
    if (!labelNode || !(labelNode instanceof Node)) {
      return null;
    }

    const { left, right } = labelNode.getBoundingClientRect();

    return (
      <div
        className={styles.border}
        style={{
          left: left - rootRect.left,
          width: right - left
        }}
      />
    );
  }
}

const { func, string, array } = PropTypes;

Menu.contextTypes = {
  activeTab: string,
  tabs: array.isRequired,
  switchTab: func.isRequired
};

export default Menu;
