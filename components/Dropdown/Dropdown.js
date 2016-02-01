import React, {PropTypes} from 'react';

import Select from '../Select';

/**
 * **DRAFT**
 */
export default class Dropdown extends React.Component {
  static propTypes = {
    /**
     * Подпись на кнопке.
     */
    caption: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const items = [];
    React.Children.forEach(this.props.children, (child) => {
      if (child.type === Separator) {
        items.push(Select.SEP);
      } else {
        items.push(child);
      }
    });

    return (
      <Select value={this.props.caption} items={items} renderValue={renderValue}
        renderItem={renderItem} onChange={this._handleChange}
      />
    );
  }

  _handleChange = (event, value) => {
    if (value.props.onClick) {
      value.props.onClick();
    }
  };
}

function renderValue(value) {
  return value;
}

function renderItem(value) {
  return value.props.children;
}

class MenuItem extends React.Component {
  render() {
    return null;
  }
}

class Separator extends React.Component {
  render() {
    return null;
  }
}

Dropdown.MenuItem = MenuItem;
Dropdown.Separator = Separator;
