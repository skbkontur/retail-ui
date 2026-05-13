import type { AriaAttributes } from 'react';
import React from 'react';
import warning from 'warning';

import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { CommonProps } from '../../internal/CommonWrapper/types.js';
import type { PopupPositionsType } from '../../internal/Popup/index.js';
import { PopupMenu } from '../../internal/PopupMenu/index.js';
import type { PopupMenuProps } from '../../internal/PopupMenu/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode//rootNodeDecorator.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { MenuHeaderProps } from '../MenuHeader/index.js';
import type { MenuItemProps } from '../MenuItem/index.js';

export type TooltipMenuChildType = React.ReactElement<MenuItemProps | unknown | MenuHeaderProps>;

export interface TooltipMenuProps
  extends
    Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Pick<PopupMenuProps, 'onOpen' | 'onClose' | 'preventIconsOffset'> {
  /** Элемент или функция, которая возвращает кнопку-меню.
   * Примечание: при использовании функции, нее необходимо управлять открытием и закрытием меню. */
  caption: PopupMenuProps['caption'];
  /** @ignore */
  children?: TooltipMenuChildType | TooltipMenuChildType[];
  /** Максимальная высота меню. */
  menuMaxHeight?: number | string;
  /** Ширина меню. */
  menuWidth?: number | string;
  /** Элемент, который будет отрендерен в шапке меню.
   * Примечание: не поддерживается компонент MenuHeader, который ожидается только в `children` меню. */
  header?: React.ReactNode;
  /** Элемент, который будет отрендерен в подвале меню.
   * Перед элементом переданным в `footer` будет отрендерен `MenuSeparator`. */
  footer?: React.ReactNode;
  /** Список позиций для расположения выпадашки относительно caption.
   * Если во всех позициях выпадашка вылезает за пределы viewport, будет использована первая. */
  positions?: PopupPositionsType[];
  /** Отключает анимацию. */
  disableAnimations?: boolean;
}

export const TooltipMenuDataTids = {
  root: 'TooltipMenu__root',
} as const;

type DefaultProps = Required<Pick<TooltipMenuProps, 'disableAnimations'>>;

/**
 * Выпадающее меню в тултипе `TooltipMenu`. Раскрывается по клику на переданный в `caption` элемент.
 *
 * Поддерживает настройку `header`, `footer`, позиций открытия `positions` и другие настройки внешнего вида.
 */
@rootNode
export class TooltipMenu extends React.Component<TooltipMenuProps> {
  public static __KONTUR_REACT_UI__ = 'TooltipMenu';
  public static displayName = 'TooltipMenu';

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public static defaultProps: DefaultProps = {
    disableAnimations: isTestEnv,
  };

  private getProps = createPropsGetter(TooltipMenu.defaultProps);

  constructor(props: TooltipMenuProps) {
    super(props);

    if (!props.caption) {
      warning(false, 'Prop "caption" is required!!!');
    }
  }

  public render(): React.JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupPinOffsetX: theme.tooltipMenuPinOffsetX,
                  popupPinOffsetY: theme.tooltipMenuPinOffsetY,
                  popupMargin: theme.tooltipMenuMargin,
                  popupPinSize: theme.tooltipMenuPinSize,
                },
                theme,
              )}
            >
              {this.renderMain()}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain(): React.JSX.Element | null {
    if (!this.props.caption) {
      return null;
    }

    const { disableAnimations } = this.getProps();

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <PopupMenu
          aria-label={this.props['aria-label']}
          data-tid={TooltipMenuDataTids.root}
          menuMaxHeight={this.props.menuMaxHeight}
          menuWidth={this.props.menuWidth}
          caption={this.props.caption}
          header={this.props.header}
          footer={this.props.footer}
          preventIconsOffset={this.props.preventIconsOffset}
          positions={this.props.positions}
          onOpen={this.props.onOpen}
          onClose={this.props.onClose}
          popupHasPin
          disableAnimations={disableAnimations}
        >
          {this.props.children}
        </PopupMenu>
      </CommonWrapper>
    );
  }
}
