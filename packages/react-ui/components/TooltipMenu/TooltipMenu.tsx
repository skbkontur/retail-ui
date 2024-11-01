import type { AriaAttributes } from 'react';
import React from 'react';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { PopupMenuProps } from '../../internal/PopupMenu';
import { PopupMenu } from '../../internal/PopupMenu';
import type { MenuItemProps } from '../MenuItem';
import { isProductionEnv, isTestEnv } from '../../lib/currentEnvironment';
import type { MenuHeaderProps } from '../MenuHeader';
import type { PopupPositionsType } from '../../internal/Popup';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';

export type TooltipMenuChildType = React.ReactElement<MenuItemProps | unknown | MenuHeaderProps>;

export interface TooltipMenuProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Pick<PopupMenuProps, 'onOpen' | 'onClose' | 'preventIconsOffset'> {
  /** @ignore */
  children?: TooltipMenuChildType | TooltipMenuChildType[];
  /** Задает максимальную высоту меню. */
  menuMaxHeight?: number | string;
  /** Задает ширину меню. */
  menuWidth?: number | string;
  /** Задает элемент или функцию возвращающую элемент, которые используется вместо `caption`.
   * В случае функции, внутри нее необходимо управлять открытием и закрытием меню. */
  caption: PopupMenuProps['caption'];
  /** Задает элемент, который будет отрендерен в шапке меню.
   * _Примечание_: контрол [MenuHeader](#/Components/MenuHeader) передаётся только в `children` меню-контролов. Не стоит передавать `MenuHeader` в `header`. */
  header?: React.ReactNode;
  /** Задает элемент, который будет отрендерен в подвале меню.
   * Перед элементом переданным в `footer` будет отрендерен [MenuSeparator](#/Components/MenuSeparator). */
  footer?: React.ReactNode;
  /** Определяет список позиций, доступных для расположения выпадашки относительно caption.
   * Если во всех позициях выпадашка вылезает за пределы `viewport`, будет использована первая из этого списка. */
  positions?: PopupPositionsType[];
  /** Отключает анимацию. */
  disableAnimations?: boolean;
}

export const TooltipMenuDataTids = {
  root: 'TooltipMenu__root',
} as const;

type DefaultProps = Required<Pick<TooltipMenuProps, 'disableAnimations'>>;

/**
 * Меню `TooltipMenu` раскрывается по клику на переданный в `caption` элемент.
 *
 * Положение меню задаётся с помощью массива `positions` и работает так:
 * первое значение в массиве - дефолтная позиция, меню раскроется на этой позиции, если оно не будет выходить за пределы `viewport`,
 * если раскрыться в дефолтной позиции не получится - будет использована следующая позиция, и так далее, пока не будет достигнут конец массива. Если все положения из списка будут выходить за пределы `viewport`, в качестве положения будет использовано первое значение в массиве.
 *
 * Если меню должно раскрываться только в одну сторону - массив `positions` должен содержать только один элемент: сторону, в которую должно открываться меню.
 *
 * Если массив `positions` не передан (или передан пустой массив), будут использованы всевозможные значения.
 */
@rootNode
export class TooltipMenu extends React.Component<TooltipMenuProps> {
  public static __KONTUR_REACT_UI__ = 'TooltipMenu';
  public static displayName = 'TooltipMenu';

  private setRootNode!: TSetRootNode;

  public static defaultProps: DefaultProps = {
    disableAnimations: isTestEnv,
  };

  private getProps = createPropsGetter(TooltipMenu.defaultProps);

  constructor(props: TooltipMenuProps) {
    super(props);

    if (!props.caption && !isProductionEnv) {
      throw new Error('Prop "caption" is required!!!');
    }
  }

  public render() {
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

  public renderMain() {
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
