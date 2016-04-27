import React, {PropTypes} from 'react';

import filterProps from '../filterProps';
import Select from '../Select';

const PASS_PROPS = {
  error: true,
  use: true,
  size: true,
  warning: true,
  width: true,
};

/**
 * Выпадающее меню.
 */
export default class Dropdown extends React.Component {
  static propTypes = {
    /**
     * Подпись на кнопке.
     */
    caption: PropTypes.node.isRequired,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    size: PropTypes.oneOf(['small', 'medium', 'large']),

    /**
     * Смотри Button.
     */
    use: PropTypes.any,

    /**
     * Визуально показать наличие предупреждения.
     */
    warning: PropTypes.bool,

    width: PropTypes.number,
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
      <Select
        {...filterProps(this.props, PASS_PROPS)}
        value={this.props.caption} items={items} renderValue={renderValue}
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
