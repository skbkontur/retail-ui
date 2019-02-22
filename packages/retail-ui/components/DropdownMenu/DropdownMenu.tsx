import * as React from 'react';
import PopupMenu, { PopupMenuProps } from '../internal/PopupMenu';
import { isProductionEnv } from '../internal/currentEnvironment';
import { ScrollContainerScrollState } from '../ScrollContainer/ScrollContainer';

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

  /**
   * Не показывать анимацию
   */
  disableAnimations: boolean;
  onScrollStateChange?: (scrollState: ScrollContainerScrollState) => void;
}

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент
 */
export default class DropdownMenu extends React.Component<DropdownMenuProps> {
  public static defaultProps = {
    disableAnimations: false
  };

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
        onChangeMenuState={this.handleChangeMenuState}
        popupHasPin={false}
        popupMargin={0}
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
        disableAnimations={this.props.disableAnimations}
        onScrollStateChange={this.props.onScrollStateChange}
      >
        {this.props.children}
      </PopupMenu>
    );
  }

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
