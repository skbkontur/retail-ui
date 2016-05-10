import React, {PropTypes} from 'react';

import filterProps from '../filterProps';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
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
    const items = React.Children.map(this.props.children, item => item);

    return (
      <Select
        {...filterProps(this.props, PASS_PROPS)}
        value={this.props.caption}
        items={items}
        renderValue={renderValue}
      />
    );
  }
}

function renderValue(value) {
  return value;
}

Dropdown.MenuItem = MenuItem;
Dropdown.Separator = MenuSeparator;
