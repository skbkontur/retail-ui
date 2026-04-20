import type { AriaAttributes, HTMLAttributes, JSX } from 'react';
import React from 'react';

import { filterProps } from '../../lib/filterProps.js';
import { MenuHeader } from '../MenuHeader/index.js';
import { MenuItem } from '../MenuItem/index.js';
import { MenuSeparator } from '../MenuSeparator/index.js';
import { Select } from '../Select/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { ButtonUse } from '../Button/index.js';
import type { CommonProps } from '../../internal/CommonWrapper/types.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode//rootNodeDecorator.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { SizeProp } from '../../lib/types/props.js';

import { getDropdownTheme } from './getDropdownTheme.js';

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
  extends
    Pick<AriaAttributes, 'aria-label' | 'aria-describedby'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    CommonProps {
  /** Текст кнопки-меню. */
  caption: React.ReactNode;

  /** Добавляет иконку слева от текста кнопки. */
  icon?: React.ReactElement;

  /** Ширина кнопки-меню. Если `menuWidth` не задан, такая же минимальная ширина применяется к раскрывающемуся меню. */
  width?: React.CSSProperties['width'];

  /** @ignore */
  _renderButton?: (params: any) => JSX.Element;

  /** Отключает использование портала. */
  disablePortal?: boolean;

  /** Блокирует компонент. */
  disabled?: boolean;

  /** Показывает состояние ошибки. */
  error?: boolean;

  /** Показывает состояние предупреждения. */
  warning?: boolean;

  /** Ограничивает максимальную высоту раскрывающегося меню. */
  maxMenuHeight?: number;

  /** Фиксирует положение раскрывающегося меню относительно кнопки-меню. */
  menuPos?: 'top' | 'bottom';

  /** Выравнивает раскрывающееся меню относительно кнопки-меню. */
  menuAlign?: 'left' | 'right';

  /** Ширина раскрывающегося меню. */
  menuWidth?: number | string;

  /** Размер кнопки-меню. */
  size?: SizeProp;

  /** Визуальный стиль кнопки-меню. */
  use?: ButtonUse;

  /** @ignore */
  corners?: React.CSSProperties;

  /** Вызывается при закрытии раскрывающегося меню. */
  onClose?: () => void;

  /** Вызывается при открытии раскрывающегося меню. */
  onOpen?: () => void;

  /** Вызывается при наведении курсора (событие `onmouseenter`). Разницу с `onMouseOver` смотрите в [документации](https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave). */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Вызывается при уходе курсора с элемента (событие `onmouseleave`). */
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Вызывается при движении курсора над элементом (событие `onmouseover`). */
  onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
}

type DropdownSelectType = Select<React.ReactNode, React.ReactNode>;

export const DropdownDataTids = {
  root: 'Dropdown__root',
} as const;

/**
 * Кнопка-меню `Dropdown` открывает раскрывающееся меню с командами, объединенными по смыслу.
 *
 * Используйте кнопку-меню:
 * * когда не хватает места для нескольких кнопок.
 * * когда названия действий очень длинные.
 * * когда действия редко используются или объединены по смыслу.
 *
 * Не используйте `Dropdown` для выбора значения из набора вариантов. В таком случае воспользуйтесь компонентом `Select`.
 */
@rootNode
export class Dropdown extends React.Component<DropdownProps> {
  public static __KONTUR_REACT_UI__ = 'Dropdown';
  public static displayName = 'Dropdown';

  public static Header = MenuHeader;
  public static MenuItem = MenuItem;
  public static Separator = MenuSeparator;

  private _select: Nullable<DropdownSelectType>;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private theme!: Theme;

  public render(): React.JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getDropdownTheme(theme);
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain = (): React.JSX.Element => {
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
  public open(): void {
    if (this._select) {
      this._select.open();
    }
  }

  /**
   * @public
   */
  public close(): void {
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
