import * as React from 'react';
import PopupMenu from '../internal/PopupMenu';
import { MenuItemProps } from '../MenuItem';
import { ClickableProps } from '../internal/Clickable';

export interface DropdownMenuProps {
  children?: React.ReactElement<MenuItemProps> | Array<React.ReactElement<MenuItemProps>>;
  /** Максимальная высота меню */
  menuMaxHeight?: number | string;
  /** Ширина меню */
  menuWidth?: number | string;
  /** Элемент (обязательный), раскрывающий меню */
  caption: React.ReactElement<ClickableProps>;
  disabled?: boolean;
}

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент
 */
export default class DropdownMenu extends React.Component<DropdownMenuProps> {
  constructor(props: DropdownMenuProps) {
    super(props);

    if (!props.caption) {
      throw new Error('Prop "caption" is required!!!');
    }
  }

  public render() {
    if (!this.props.caption) {
      return null;
    }
    return (
      <PopupMenu
        renderCaption={this.renderCaption}
        menuMaxHeight={this.props.menuMaxHeight}
        menuWidth={this.props.menuWidth}
        popupHasPin={false}
        popupMargin={0}
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </PopupMenu>
    );
  }

  private renderCaption = (showMenu: () => void) => {
    return React.cloneElement(this.props.caption, {
      onClick: showMenu
    });
  };
}
