import * as React from 'react';
import PopupMenu, { PopupMenuProps } from '../internal/PopupMenu';
import { isProductionEnv } from '../internal/currentEnvironment';

export interface DropdownMenuProps {
  /** Максимальная высота меню */
  menuMaxHeight?: React.CSSProperties['maxWidth'];
  /** Ширина меню */
  menuWidth?: React.CSSProperties['width'];
  /**
   * Элемент или функция возвращающая элемент,
   * если передана, используется вместо ```caption```,
   * в таком случае управлять открытием и закрытием меню
   * придется в этой функции
   */
  caption: PopupMenuProps['caption'];

  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент
 */
export default class DropdownMenu extends React.Component<DropdownMenuProps> {
  constructor(props: DropdownMenuProps) {
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
        caption={this.props.caption}
        menuMaxHeight={this.props.menuMaxHeight}
        menuWidth={this.props.menuWidth}
        onChangeMenuState={this.onChangeMenuState}
        popupHasPin={false}
        popupMargin={0}
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
      >
        {this.props.children}
      </PopupMenu>
    );
  }

  private onChangeMenuState = (x0: boolean, x1: boolean) => {
    if (x0 && this.props.onOpen) {
      this.props.onOpen();
    } else if (!x0 && this.props.onClose) {
      this.props.onClose();
    }
  };
}
