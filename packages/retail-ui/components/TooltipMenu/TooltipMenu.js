
import * as React from 'react';
import PopupMenu from '../internal/PopupMenu';
import type MenuItem from '../MenuItem/MenuItem';
import { isProductionEnv } from '../internal/currentEnvironment';

type Props = {
  children?: React.ChildrenArray<React.Element<Class<MenuItem>>>,
  /** Максимальная высота меню */
  menuMaxHeight?: number | string,
  /** Ширина меню */
  menuWidth?: number | string,
  /** Элемент (обязательный), раскрывающий меню */
  caption: React.Element<*>,
  /**  Массив разрешенных положений меню относительно caption'а. */
  positions: Array<string>
};

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент.
 * Положение зависит от переданного массива ```positions``` и работает так:
 * первое значаение в массиве - дефолтная позиция, меню раскрывается так, если ничего не мешает ему раскрыться,
 * если раскрыться в данной позиции не получается - берется следующие значение, и так далее.
 * Если меню должно раскрываться только в одну сторону - передаем в ```positions``` массив с одним элементом.
 * Если ```positions``` передан или передан пустой массив, используются все возможные положения.
 */
export default class TooltipMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    if (!props.caption && !isProductionEnv) {
      throw new Error('Prop "caption" is required!!!');
    }
  }

  render() {
    if (!this.props.caption) {
      return null;
    }

    return (
      <PopupMenu
        menuMaxHeight={this.props.menuMaxHeight}
        menuWidth={this.props.menuWidth}
        caption={this.props.caption}
        positions={this.props.positions}
        popupHasPin={true}
        popupMargin={10}
        popupPinOffset={15}
      >
        {this.props.children}
      </PopupMenu>
    );
  }
}
