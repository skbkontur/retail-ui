import * as React from 'react';

import { PopupMenu, PopupMenuProps } from '../internal/PopupMenu';
import { MenuItemProps } from '../MenuItem';
import { isProductionEnv } from '../internal/currentEnvironment';
import { MenuHeaderProps } from '../MenuHeader';
import { PopupPosition } from '../Popup';

export type TooltipMenuChildType = React.ReactElement<MenuItemProps | {} | MenuHeaderProps>;

export interface TooltipMenuProps {
  children?: TooltipMenuChildType | TooltipMenuChildType[];
  /** Максимальная высота меню */
  menuMaxHeight?: number | string;
  /** Ширина меню */
  menuWidth?: number | string;
  /**
   * Элемент или функция возвращающая элемент,
   * если передана, используется вместо ```caption```,
   * в таком случае управлять открытием и закрытием меню
   * придется в этой функции
   */
  caption: PopupMenuProps['caption'];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  /**  Массив разрешенных положений меню относительно caption'а. */
  positions?: PopupPosition[];
  /**
   * Не показывать анимацию
   */
  disableAnimations: boolean;
}

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент.
 * Положение зависит от переданного массива ```positions``` и работает так:
 * первое значаение в массиве - дефолтная позиция, меню раскрывается так, если ничего не мешает ему раскрыться,
 * если раскрыться в данной позиции не получается - берется следующие значение, и так далее.
 * Если меню должно раскрываться только в одну сторону - передаем в ```positions``` массив с одним элементом.
 * Если ```positions``` передан или передан пустой массив, используются все возможные положения.
 */
export class TooltipMenu extends React.Component<TooltipMenuProps> {
  public static defaultProps = {
    disableAnimations: Boolean(process.env.enableReactTesting),
  };
  constructor(props: TooltipMenuProps) {
    super(props);

    if (!props.caption && !isProductionEnv) {
      throw new Error('Prop "caption" is required!!!');
    }
  }

  public render() {
    if (!this.props.caption) {
      return null;
    }

    return (
      <PopupMenu
        menuMaxHeight={this.props.menuMaxHeight}
        menuWidth={this.props.menuWidth}
        caption={this.props.caption}
        header={this.props.header}
        footer={this.props.footer}
        positions={this.props.positions}
        popupHasPin={true}
        popupMargin={10}
        popupPinOffset={15}
        disableAnimations={this.props.disableAnimations}
      >
        {this.props.children}
      </PopupMenu>
    );
  }
}
