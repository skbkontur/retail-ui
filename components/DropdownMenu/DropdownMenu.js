// @flow
import * as React from 'react';
import PopupMenu from '../internal/PopupMenu';
import type MenuItem from '../MenuItem/MenuItem';
import { isProduction } from '../internal/currentEnvironment';

type Props = {
  children?: React.ChildrenArray<React.Element<Class<MenuItem>>>,
  /** Максимальная высота меню */
  menuMaxHeight?: number | string,
  /** Ширина меню */
  menuWidth?: number | string,
  /** Элемент (обязательный), раскрывающий меню */
  caption: React.Element<*>
};

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент
 */
export default class DropdownMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    if (!props.caption && !isProduction) {
      throw new Error('Prop "caption" is required!!!');
    }
  }
  render() {
    if (!this.props.caption) {
      return null;
    }
    return (
      <PopupMenu
        caption={this.props.caption}
        menuMaxHeight={this.props.menuMaxHeight}
        menuWidth={this.props.menuWidth}
        type="dropdown"
      >
        {this.props.children}
      </PopupMenu>
    );
  }
}
