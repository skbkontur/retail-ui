import React from 'react';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { PopupMenu, PopupMenuProps } from '../../internal/PopupMenu';
import { MenuItemProps } from '../MenuItem';
import { isProductionEnv, isTestEnv } from '../../lib/currentEnvironment';
import { MenuHeaderProps } from '../MenuHeader';
import { PopupPositionsType } from '../../internal/Popup';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

export type TooltipMenuChildType = React.ReactElement<MenuItemProps | {} | MenuHeaderProps>;

export interface TooltipMenuProps extends CommonProps {
  children?: TooltipMenuChildType | TooltipMenuChildType[];
  /** Максимальная высота меню */
  menuMaxHeight?: number | string;
  /** Ширина меню */
  menuWidth?: number | string;
  /**
   * Элемент или функция возвращающая элемент,
   * если передана, используется вместо `caption`,
   * в таком случае управлять открытием и закрытием меню
   * придется в этой функции
   */
  caption: PopupMenuProps['caption'];
  /**
   * Произвольный элемент, который будет отрендерен в шапке меню.
   *
   * _Примечание_: контрол [`MenuHeader`](#/Components/MenuHeader) передаётся только в `children` меню-контролов. Не стоит передавать `MenuHeader` в `header`.
   */
  header?: React.ReactNode;
  /**
   * Произвольный элемент, который будет отрендерен в подвале меню.
   *
   * Перед элементом переданным в `footer` будет отрендерен [`MenuSeparator`](#/Components/MenuSeparator).
   */
  footer?: React.ReactNode;
  /**  Список позиций доступных для расположения выпадашки относительно `caption`.
   *
   * Если во всех позициях выпадашка вылезает за пределы `viewport`, будет использована первая из этого списка.
   *
   * **Возможные значения**: `top left`, `top center`, `top right`, `right top`, `right middle`, `right bottom`, `bottom left`, `bottom center`, `bottom right`, `left top`, `left middle`, `left bottom`
   */
  positions?: PopupPositionsType[];
  /**
   * Не показывать анимацию
   */
  disableAnimations: boolean;
}

export const tooltipMenuDataTid = {
  origin: 'TooltipMenu',
  root: 'TooltipMenu__root',
};

/**
 * Меню, раскрывающееся по клику на переданный в `caption` элемент.
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
  private setRootNode!: TSetRootNode;

  public static defaultProps = {
    disableAnimations: isTestEnv,
  };
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
                  popupPinOffset: theme.tooltipMenuPinOffset,
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

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <PopupMenu
          data-tid={tooltipMenuDataTid.root}
          menuMaxHeight={this.props.menuMaxHeight}
          menuWidth={this.props.menuWidth}
          caption={this.props.caption}
          header={this.props.header}
          footer={this.props.footer}
          positions={this.props.positions}
          popupHasPin
          disableAnimations={this.props.disableAnimations}
        >
          {this.props.children}
        </PopupMenu>
      </CommonWrapper>
    );
  }
}
