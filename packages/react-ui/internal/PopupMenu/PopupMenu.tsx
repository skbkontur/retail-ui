import React from 'react';

import {
  isKeyArrowVertical,
  isKeyEnter,
  isKeyEscape,
  isKeySpace,
  someKeys,
} from '../../lib/events/keyboard/identifiers';
import { InternalMenu } from '../InternalMenu';
import { Popup, PopupPosition } from '../Popup';
import { RenderLayer } from '../RenderLayer';
import { Nullable } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { PopupMenuPositions } from './PopupMenuPositions';
import { isValidPositions } from './validatePositions';
import { styles } from './PopupMenu.styles';

export interface PopupMenuCaptionProps {
  opened: boolean;
  openMenu: (firstItemShouldBeSelected?: boolean) => void;
  closeMenu: (restoreFocus?: boolean) => void;
  toggleMenu: () => void;
}

export interface PopupMenuProps extends CommonProps {
  children?: React.ReactNode;
  /** Максимальная высота меню */
  menuMaxHeight?: number | string;
  /** Ширина меню */
  menuWidth?: number | string;
  /** Ширина контейнера и caption */
  width?: React.CSSProperties['width'];

  /**
   * Элемент или функция возвращающая элемент,
   * если передана, используется вместо ```caption```,
   * в таком случае управлять открытием и закрытием меню
   * придется в этой функции
   */
  caption: React.ReactNode | ((props: PopupMenuCaptionProps) => React.ReactNode);

  header?: React.ReactNode;
  footer?: React.ReactNode;

  /**  Массив разрешенных положений меню относительно caption'а. */
  positions?: PopupPosition[];
  /** Колбэк, вызываемый после открытия/закрытия меню */
  onChangeMenuState?: (isOpened: boolean, restoreFocus: boolean) => void;
  /** Пропсы, передающиеся в Popup */
  popupHasPin?: boolean;
  popupMargin?: number;
  popupPinOffset?: number;
  type?: 'dropdown' | 'tooltip';
  disableAnimations: boolean;
}

interface PopupMenuState {
  menuVisible: boolean;
  firstItemShouldBeSelected?: boolean;
}

export const PopupMenuType = {
  Dropdown: 'dropdown',
  Tooltip: 'tooltip',
};

@rootNode
export class PopupMenu extends React.Component<PopupMenuProps, PopupMenuState> {
  public static __KONTUR_REACT_UI__ = 'PopupMenu';

  public static defaultProps = {
    positions: PopupMenuPositions,
    type: PopupMenuType.Tooltip,
    popupHasPin: true,
    disableAnimations: false,
  };

  public static Type = PopupMenuType;

  public state = {
    menuVisible: false,
    firstItemShouldBeSelected: false,
  };

  private captionWrapper: HTMLSpanElement | null = null;
  private savedFocusableElement: HTMLElement | null = null;
  private menu: Nullable<InternalMenu> = null;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <RenderLayer
          onClickOutside={this.hideMenuWithoutFocusing}
          onFocusOutside={this.hideMenuWithoutFocusing}
          active={this.state.menuVisible}
        >
          <div className={styles.container()} style={{ width: this.props.width }}>
            {this.renderCaption()}
            {this.captionWrapper && this.props.children && (
              <Popup
                anchorElement={this.captionWrapper}
                opened={this.state.menuVisible}
                hasShadow
                margin={this.props.popupMargin}
                hasPin={this.props.popupHasPin}
                pinOffset={this.props.popupPinOffset}
                positions={this.getPositions()}
                disableAnimations={this.props.disableAnimations}
                onOpen={this.handleOpen}
                width={this.props.menuWidth || 'auto'}
              >
                <InternalMenu
                  hasShadow={false}
                  maxHeight={this.props.menuMaxHeight || 'none'}
                  onKeyDown={this.handleKeyDown}
                  onItemClick={this.handleItemSelection}
                  cyclicSelection={false}
                  ref={this.refInternalMenu}
                  initialSelectedItemIndex={this.state.firstItemShouldBeSelected ? 0 : -1}
                  header={this.props.header}
                  footer={this.props.footer}
                >
                  {this.props.children}
                </InternalMenu>
              </Popup>
            )}
          </div>
        </RenderLayer>
      </CommonWrapper>
    );
  }

  public open = (): void => this.showMenu();
  public close = (): void => this.hideMenu();

  private refInternalMenu = (element: Nullable<InternalMenu>) => (this.menu = element);

  private handleOpen = () => {
    if (this.menu) {
      this.menu.focus();
    }
  };

  private renderCaption = () => {
    if (typeof this.props.caption === 'function') {
      const caption = this.props.caption({
        opened: this.state.menuVisible,
        openMenu: this.showMenu,
        closeMenu: this.hideMenu,
        toggleMenu: this.toggleMenu,
      });

      return (
        <span
          data-tid="PopupMenu__caption"
          className={styles.caption()}
          ref={(element: HTMLSpanElement | null) => (this.captionWrapper = element)}
        >
          {caption}
        </span>
      );
    }

    return (
      <span
        data-tid="PopupMenu__caption"
        onClick={this.handleCaptionClick}
        onKeyDown={this.handleCaptionKeyDown}
        ref={(element: HTMLSpanElement | null) => (this.captionWrapper = element)}
        className={styles.caption()}
      >
        {this.props.caption}
      </span>
    );
  };

  private hideMenuWithoutFocusing = () => this.hideMenu();

  private getPositions() {
    if (this.props.positions && isValidPositions(this.props.positions)) {
      return this.props.positions;
    }

    return PopupMenuPositions;
  }

  private showMenu = (firstItemShouldBeSelected?: boolean): void => {
    this.saveFocus();
    this.setState(
      {
        menuVisible: true,
        firstItemShouldBeSelected,
      },
      () => {
        this.handleChangeMenuVisible(false);
      },
    );
  };

  private hideMenu = (restoreFocus?: boolean): void => {
    this.setState(
      {
        menuVisible: false,
        firstItemShouldBeSelected: false,
      },
      () => {
        this.handleChangeMenuVisible(!!restoreFocus);
      },
    );
  };

  private toggleMenu = (): void => {
    this.state.menuVisible ? this.hideMenu() : this.showMenu();
  };

  private handleCaptionClick = (): void => {
    this.toggleMenu();
  };

  private handleCaptionKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (someKeys(isKeyEnter, isKeySpace, isKeyArrowVertical)(e)) {
      e.preventDefault();
      this.showMenu(true);
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isKeyEscape(e)) {
      const restoreFocus = true;
      this.hideMenu(restoreFocus);
    }
  };

  private saveFocus = (): void => {
    if (document) {
      this.savedFocusableElement = document.activeElement as HTMLElement;
    }
  };

  private restoreFocus = (): void => {
    if (this.savedFocusableElement) {
      this.savedFocusableElement.focus();
      this.savedFocusableElement = null;
    }
  };

  private handleChangeMenuVisible = (focusShouldBeRestored: boolean): void => {
    if (focusShouldBeRestored) {
      this.restoreFocus();
    }
    if (typeof this.props.onChangeMenuState === 'function') {
      this.props.onChangeMenuState(this.state.menuVisible, focusShouldBeRestored);
    }
  };

  private handleItemSelection = (event: React.SyntheticEvent<HTMLElement>): void => {
    if (event.isDefaultPrevented()) {
      return;
    }

    if (event.type === 'keydown') {
      event.preventDefault();
    }

    const restoreFocus = event.type === 'keydown';
    this.hideMenu(restoreFocus);
  };
}
