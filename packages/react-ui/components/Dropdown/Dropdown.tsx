import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';

import { filterProps } from '../../lib/filterProps';
import { MenuHeader } from '../MenuHeader';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { Select } from '../Select';
import type { Nullable } from '../../typings/utility-types';
import type { ButtonUse } from '../Button';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { SizeProp } from '../../lib/types/props';

import { getDropdownTheme } from './getDropdownTheme';

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
  menuPos: true,
  corners: true,
  id: true,
  'aria-describedby': true,
  'aria-label': true,
};

export interface DropdownProps
  extends Pick<AriaAttributes, 'aria-label' | 'aria-describedby'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    CommonProps {
  /** Задает подпись на кнопке. */
  caption: React.ReactNode;

  /** Добавляет иконку слева от текста кнопки. */
  icon?: React.ReactElement<any>;

  /** Задает ширину выпадающего меню. */
  width?: React.CSSProperties['width'];

  /** @ignore */
  _renderButton?: (params: any) => JSX.Element;

  /** Отключает использование портала. */
  disablePortal?: boolean;

  /** Делает компонент недоступным.*/
  disabled?: boolean;

  /** Переводит контрол в состояние валидации "ошибка". */
  error?: boolean;

  /** Переводит контрол в состояние валидации "предупреждение". */
  warning?: boolean;

  /** Задает максимальную высоту меню. */
  maxMenuHeight?: number;

  /** Задает текущую позицию выпадающего окна вручную.
   */
  menuPos?: 'top' | 'bottom';

  /** Задает выравнивание выпадающего меню. */
  menuAlign?: 'left' | 'right';

  /** Задает длину меню. */
  menuWidth?: number | string;

  /** Задает размер контрола. */
  size?: SizeProp;

  /** Задаёт стиль кнопки. */
  use?: ButtonUse;

  /** @ignore */
  corners?: React.CSSProperties;

  /** Задает функцию, которая вызывается при закрытии меню. */
  onClose?: () => void;

  /** Задает функцию, которая вызывается при открытии меню. */
  onOpen?: () => void;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). См разницу с onMouseOver в [документации](https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave)  */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Задает функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseover`). */
  onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
}

type DropdownSelectType = Select<React.ReactNode, React.ReactNode>;

export const DropdownDataTids = {
  root: 'Dropdown__root',
} as const;

/**
 * Выпадающее меню `Dropdown`. Содержит несколько команд, объединенных по смыслу.
 *
 * Используйте кнопку-меню:
 * * когда не хватает места для нескольких кнопок.
 * * когда названия действий очень длинные.
 * * когда действия редко используются или объединены по смыслу.
 *
 * Не используйте `Dropdown` для выбора значения из набора вариантов. В таком случае воспользуйтесь компонентом Select.
 */
@rootNode
export class Dropdown extends React.Component<DropdownProps> {
  public static __KONTUR_REACT_UI__ = 'Dropdown';
  public static displayName = 'Dropdown';

  public static Header = MenuHeader;
  public static MenuItem = MenuItem;
  public static Separator = MenuSeparator;

  private _select: Nullable<DropdownSelectType>;
  private setRootNode!: TSetRootNode;
  private theme!: Theme;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getDropdownTheme(theme);
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain = () => {
    const { caption, icon, ...rest } = this.props;
    const items = React.Children.map(this.props.children, (item) => item) || [];

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...rest}>
        <Select<React.ReactNode, React.ReactNode>
          data-tid={DropdownDataTids.root}
          ref={this._refSelect}
          {...filterProps(rest, PASS_PROPS)}
          value={caption}
          items={items}
          _icon={icon}
          renderValue={renderValue}
        />
      </CommonWrapper>
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
