import * as React from 'react';

import * as PropTypes from 'prop-types';

import filterProps from '../filterProps';
import MenuHeader from '../MenuHeader/MenuHeader';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import Select from '../Select';
import { IconProps } from '../Icon/20px';
import { Nullable } from '../../typings/utility-types';

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

export interface DropdownProps {
  caption: React.ReactNode;
  icon?: IconProps['name'];
  width?: React.CSSProperties['width'];
  _renderButton?: (params: any) => JSX.Element;
}

export type DropdownSelectType = Select;

/**
 * Выпадающее меню.
 */
export default class Dropdown extends React.Component<DropdownProps> {
  public static Header = MenuHeader;
  public static MenuItem = MenuItem;
  public static Separator = MenuSeparator;

  public static propTypes = {
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

  private _select: Nullable<DropdownSelectType> = null;

  public render() {
    const items = React.Children.map(this.props.children, item => item);

    return (
      <Select
        // TODO: разобраться с типом для рефа
        // @ts-ignore
        ref={this._refSelect}
        {...filterProps(this.props, PASS_PROPS)}
        value={this.props.caption}
        items={items}
        _icon={this.props.icon}
        renderValue={renderValue}
      />
    );
  }

  public open() {
    if (this._select) {
      this._select.open();
    }
  }

  public close() {
    if (this._select) {
      this._select.close();
    }
  }

  private _refSelect = (element: DropdownSelectType) => {
    this._select = element;
  };
}

function renderValue(value: any) {
  return value;
}
