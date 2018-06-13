import React from 'react';

import PropTypes from 'prop-types';

import filterProps from '../filterProps';
import MenuHeader from '../MenuHeader/MenuHeader';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import Select from '../Select';

const PASS_PROPS = {
  _renderButton: true,
  error: true,
  disabled: true,
  disablePortal: true,
  menuAlign: true,
  menuWidth: true,
  maxMenuHeight: true,
  use: true,
  size: true,
  warning: true,
  width: true,
  onOpen: true,
  onClose: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true,

  diadocLink: true,
  diadocLinkIcon: true
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
     * Отключает использование портала
     */
    disablePortal: PropTypes.bool,

    /**
     * Визуально отключает Dropdown
     */
    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    /**
     * Иконка слева от текста кнопки
     */
    icon: PropTypes.string,

    maxMenuHeight: PropTypes.number,

    menuAlign: PropTypes.oneOf(['left', 'right']),

    menuWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

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

    /**
     * Вызывается при закрытии меню.
     */
    onClose: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,

    /**
     * Вызывается при открытии меню.
     */
    onOpen: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    const items = React.Children.map(this.props.children, item => item);

    return (
      <Select
        ref={this._refSelect}
        {...filterProps(this.props, PASS_PROPS)}
        value={this.props.caption}
        items={items}
        _icon={this.props.icon}
        renderValue={renderValue}
      />
    );
  }

  _refSelect = select => {
    this._select = select;
  };

  /**
   * @public
   */
  open() {
    this._select.open();
  }

  /**
   * @public
   */
  close() {
    this._select.close();
  }
}

function renderValue(value) {
  return value;
}

Dropdown.Header = MenuHeader;
Dropdown.MenuItem = MenuItem;
Dropdown.Separator = MenuSeparator;
