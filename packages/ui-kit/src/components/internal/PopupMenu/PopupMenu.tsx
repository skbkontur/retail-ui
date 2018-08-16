import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../Popup';
import RenderLayer from '../RenderLayer';
import PopupMenuPositions, { PopupMenuPosition } from './PopupMenuPositions';
import { PopupMenuCaption, PopupMenuWrapper } from './PopupMenuView';
import isValidPostions from './validatePositions';
import { InternalMenuWrapper } from '../InternalMenu/InternalMenuView';
import { ClickableProps } from '../Clickable';

export interface PopupMenuCaptionProps {
  showMenu: () => void;
  hideMenu: () => void;
  menuVisible: boolean;
}

export interface PopupMenuProps {
  /** Максимальная высота меню */
  menuMaxHeight?: number | string;
  /** Ширина меню */
  menuWidth?: number | string;
  /** Элемент (обязательный), раскрывающий меню */
  renderCaption: (props: PopupMenuCaptionProps) => React.ReactElement<ClickableProps>;
  /**  Массив разрешенных положений меню относительно caption'а. */
  positions: PopupMenuPosition[];
  /** Колбэк, вызываемый после открытия/закрытия меню */
  onChangeMenuState?: (isVisibleMenu: boolean, focusShouldBeRestored: boolean) => void;
  /** Пропсы, передающиеся в Popup */
  popupHasPin: boolean;
  popupMargin: number;
  popupPinOffset?: number;
  disabled?: boolean;
  captionTrigger?: 'click' | 'none';
}

export interface PopupMenuState {
  menuVisible: boolean;
  firstItemShouldBeSelected?: boolean;
}

export const PopupMenuType = {
  Dropdown: 'dropdown',
  Tooltip: 'tooltip'
};

export default class PopupMenu extends React.Component<PopupMenuProps, PopupMenuState> {
  public static defaultProps = {
    positions: PopupMenuPositions,
    type: PopupMenuType.Tooltip,
    popupHasPin: true
  };

  public static Type = PopupMenuType;

  public state = {
    menuVisible: false,
    firstItemShouldBeSelected: false
  };

  private captionWrapper: HTMLSpanElement | null = null;
  private savedFocusableElement: HTMLElement | null = null;

  public render() {
    return (
      <RenderLayer
        onClickOutside={this.handleLoseFocus}
        onFocusOutside={this.handleLoseFocus}
        active={this.state.menuVisible}
      >
        <PopupMenuWrapper>
          <PopupMenuCaption innerRef={this.captionRef}>
            {this.props.renderCaption({
              menuVisible: this.state.menuVisible,
              showMenu: this.showMenu,
              hideMenu: this.hideMenu
            })}
          </PopupMenuCaption>
          {this.captionWrapper &&
            this.props.children && (
              <Popup
                anchorElement={this.captionWrapper}
                opened={this.state.menuVisible}
                hasShadow
                margin={this.props.popupMargin}
                hasPin={this.props.popupHasPin}
                pinOffset={this.props.popupPinOffset}
                positions={this.getPositions()}
              >
                <InternalMenu
                  hasShadow={false}
                  maxHeight={this.props.menuMaxHeight || 'none'}
                  onKeyDown={this.handleKeyDown}
                  width={this.props.menuWidth || 'auto'}
                  onItemClick={this.handleItemSelection}
                  cyclicSelection={false}
                  highlightedIndex={this.state.firstItemShouldBeSelected ? 0 : -1}
                  innerRef={this.internalMenuRef}
                >
                  {this.props.children}
                </InternalMenu>
              </Popup>
            )}
        </PopupMenuWrapper>
      </RenderLayer>
    );
  }

  public toggleMenu = (): void => {
    this.state.menuVisible ? this.hideMenu() : this.showMenu();
  };

  public showMenu = (firstItemShouldBeSelected?: boolean): void => {
    if (this.props.disabled) {
      return;
    }
    this.saveFocus();
    this.setState(
      {
        menuVisible: true,
        firstItemShouldBeSelected
      },
      () => {
        this.handleChangeMenuVisible(false);
      }
    );
  };

  public hideMenu = (restoreFocus?: boolean): void => {
    this.setState(
      {
        menuVisible: false,
        firstItemShouldBeSelected: false
      },
      () => {
        this.handleChangeMenuVisible(!!restoreFocus);
      }
    );
  };

  private internalMenuRef = (element: InternalMenuWrapper) => {
    if (element) {
      element.focus();
    }
  };

  private captionRef = (element: HTMLSpanElement) => {
    this.captionWrapper = element;
  };

  private handleLoseFocus = () => {
    this.hideMenu();
  };

  private getPositions() {
    if (isValidPostions(this.props.positions)) {
      return this.props.positions;
    }

    return PopupMenuPositions;
  }

  // private handleCaptionClick = (): void => {
  //   if (this.props.captionTrigger === "click") {
  //     this.toggleMenu();
  //   }
  // };

  // private handleCaptionKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
  //   switch (event.key) {
  //     case "Enter":
  //     case " ":
  //     case "ArrowUp":
  //     case "ArrowDown":
  //       event.preventDefault();
  //       this.showMenu(true);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    switch (event.key) {
      case 'Escape':
        const restoreFocus = true;
        this.hideMenu(restoreFocus);
        break;

      default:
        break;
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

  private handleItemSelection = (eventType: string): void => {
    const restoreFocus = eventType === 'keydown';
    this.hideMenu(restoreFocus);
  };
}
