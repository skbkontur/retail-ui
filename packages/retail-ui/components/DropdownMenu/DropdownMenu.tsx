import * as React from 'react';
import { Nullable } from '../../typings/utility-types';
import PopupMenu, { PopupMenuProps } from '../internal/PopupMenu';
import { isProductionEnv } from '../internal/currentEnvironment';
import { PopupPosition } from '../Popup';

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

  header?: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Массив разрешенных положений меню относительно caption'а.
   * @default ['bottom left', 'bottom right', 'top left', 'top right']
   */
  positions?: PopupPosition[];

  onOpen?: () => void;
  onClose?: () => void;

  /**
   * Не показывать анимацию
   */
  disableAnimations: boolean;
}

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент
 */
export default class DropdownMenu extends React.Component<DropdownMenuProps> {
  public static defaultProps = {
    disableAnimations: false,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
  };

  private popupMenu: Nullable<PopupMenu> = null;

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
        ref={this.refPopupMenu}
        caption={this.props.caption}
        menuMaxHeight={this.props.menuMaxHeight}
        menuWidth={this.props.menuWidth}
        onChangeMenuState={this.handleChangeMenuState}
        popupHasPin={false}
        popupMargin={0}
        positions={this.props.positions}
        disableAnimations={this.props.disableAnimations}
        header={this.props.header}
        footer={this.props.footer}
      >
        {this.props.children}
      </PopupMenu>
    );
  }

  public open = (): void => {
    if (this.popupMenu) {
      this.popupMenu.open();
    }
  };

  public close = (): void => {
    if (this.popupMenu) {
      this.popupMenu.close();
    }
  };

  private refPopupMenu = (ref: Nullable<PopupMenu>) => (this.popupMenu = ref);

  private handleChangeMenuState = (menuVisible: boolean) => {
    if (menuVisible && this.props.onOpen) {
      this.props.onOpen();
      return;
    }

    if (!menuVisible && this.props.onClose) {
      this.props.onClose();
      return;
    }
  };
}
