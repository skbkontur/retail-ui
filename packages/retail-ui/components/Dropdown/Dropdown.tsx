import * as React from 'react';
import * as PropTypes from 'prop-types';

import filterProps from '../filterProps';
import MenuHeader from '../MenuHeader/MenuHeader';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import Select from '../Select';
import { Nullable } from '../../typings/utility-types';
import { ButtonUse, ButtonSize } from '../Button';

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
  diadocLinkIcon: true,
};

export interface DropdownProps {
  /**
   * Подпись на кнопке.
   */
  caption: React.ReactNode;
  /**
   * Иконка слева от текста кнопки
   */
  icon?: React.ReactElement<any>;
  width?: React.CSSProperties['width'];

  /** @ignore */
  _renderButton?: (params: any) => JSX.Element;

  /**
   * Отключает использование портала
   */
  disablePortal?: boolean;

  /**
   * Визуально отключает Dropdown
   */
  disabled?: boolean;

  /**
   * Визуально показать наличие ошибки.
   */
  error?: boolean;
  /**
   * Визуально показать наличие предупреждения.
   */
  warning?: boolean;
  maxMenuHeight?: number;
  menuAlign?: 'left' | 'right';
  menuWidth?: number | string;
  size?: ButtonSize;

  /**
   * Смотри Button.
   */
  use?: ButtonUse;

  /**
   * Вызывается при закрытии меню.
   */
  onClose?: () => void;
  /**
   * Вызывается при открытии меню.
   */
  onOpen?: () => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
}

type DropdownSelectType = Select<React.ReactNode, React.ReactChild>;

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
    icon: PropTypes.node,

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
    onOpen: PropTypes.func,
  };

  private _select: Nullable<DropdownSelectType>;

  public render() {
    const items = React.Children.map(this.props.children, item => item);

    return (
      <Select<React.ReactNode, React.ReactChild>
        ref={this._refSelect}
        {...filterProps(this.props, PASS_PROPS)}
        value={this.props.caption}
        items={items}
        _icon={this.props.icon}
        renderValue={renderValue}
      />
    );
  }

  /**
   * @public
   */
  public open() {
    if (this._select) {
      this._select.open();
    }
  }

  /**
   * @public
   */
  public close() {
    if (this._select) {
      this._select.close();
    }
  }

  private _refSelect = (element: DropdownSelectType): void => {
    this._select = element;
  };
}

function renderValue(value: any) {
  return value;
}
