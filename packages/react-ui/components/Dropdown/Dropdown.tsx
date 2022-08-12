import React from 'react';
import PropTypes from 'prop-types';

import { filterProps } from '../../lib/filterProps';
import { MenuHeader } from '../MenuHeader';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { Select } from '../Select';
import { Nullable } from '../../typings/utility-types';
import { ButtonSize, ButtonUse } from '../Button';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

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
};

export interface DropdownProps extends CommonProps {
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
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Состояние валидации при предупреждении.
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

type DropdownSelectType = Select<React.ReactNode, React.ReactNode>;

export const DropdownDataTids = {
  root: 'Dropdown__root',
} as const;

/**
 * Выпадающее меню.
 *
 */
@rootNode
export class Dropdown extends React.Component<DropdownProps> {
  public static __KONTUR_REACT_UI__ = 'Dropdown';

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

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

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
  private setRootNode!: TSetRootNode;
  private theme!: Theme;

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {this.renderMain}
      </CommonWrapper>
    );
  }

  public renderMain = ({ caption, icon, ...props }: CommonWrapperRestProps<DropdownProps>) => {
    const items = React.Children.map(this.props.children, (item) => item) || [];

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  btnDefaultBg: this.theme.dropdownDefaultBg,
                },
                this.theme,
              )}
            >
              <Select<React.ReactNode, React.ReactNode>
                data-tid={this.props['data-tid'] || DropdownDataTids.root}
                ref={this._refSelect}
                {...filterProps(props, PASS_PROPS)}
                value={caption}
                items={items}
                _icon={icon}
                renderValue={renderValue}
              />
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  };

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
