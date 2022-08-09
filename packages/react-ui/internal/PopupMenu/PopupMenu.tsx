import React from 'react';

import {
  isKeyArrowVertical,
  isKeyEnter,
  isKeyEscape,
  isKeySpace,
  someKeys,
} from '../../lib/events/keyboard/identifiers';
import { InternalMenu } from '../InternalMenu';
import { Popup, PopupPositionsType } from '../Popup';
import { RenderLayer } from '../RenderLayer';
import { Nullable } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';

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
  positions?: PopupPositionsType[];
  /** Колбэк, вызываемый после открытия/закрытия меню */
  onChangeMenuState?: (isOpened: boolean, restoreFocus: boolean) => void;
  /** Пропсы, передающиеся в Popup */
  popupHasPin?: boolean;
  popupMargin?: number;
  popupPinOffset?: number;
  type?: 'dropdown' | 'tooltip';
  disableAnimations?: boolean;
  /** Действие при открытии меню */
  onOpen?: () => void;
  /** Действие при закрытии меню */
  onClose?: () => void;
}

interface PopupMenuState {
  menuVisible: boolean;
  firstItemShouldBeSelected?: boolean;
}

export const PopupMenuType = {
  Dropdown: 'dropdown',
  Tooltip: 'tooltip',
} as const;

export const PopupMenuDataTids = {
  root: 'PopupMenu__root',
  caption: 'PopupMenu__caption',
} as const;

const Positions: PopupPositionsType[] = [
  'top left',
  'top center',
  'top right',
  'right top',
  'right middle',
  'right bottom',
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left middle',
  'left bottom',
];

type DefaultProps = Required<Pick<PopupMenuProps, 'positions' | 'type' | 'popupHasPin' | 'disableAnimations'>>;

@rootNode
@responsiveLayout
export class PopupMenu extends React.Component<PopupMenuProps, PopupMenuState> {
  public static __KONTUR_REACT_UI__ = 'PopupMenu';

  private isMobileLayout!: boolean;

  public static defaultProps: DefaultProps = {
    positions: Positions,
    type: PopupMenuType.Tooltip,
    popupHasPin: true,
    disableAnimations: false,
  };

  private getProps = createPropsGetter(PopupMenu.defaultProps);

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
    const { popupHasPin, disableAnimations } = this.getProps();
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <RenderLayer
          onClickOutside={this.hideMenuWithoutFocusing}
          onFocusOutside={this.hideMenuWithoutFocusing}
          active={this.state.menuVisible}
        >
          <div data-tid={PopupMenuDataTids.root} className={styles.container()} style={{ width: this.props.width }}>
            {this.renderCaption()}
            {this.captionWrapper && this.props.children && (
              <Popup
                anchorElement={this.captionWrapper}
                opened={this.state.menuVisible}
                hasShadow
                margin={this.props.popupMargin}
                hasPin={popupHasPin}
                pinOffset={this.props.popupPinOffset}
                positions={this.getPositions()}
                disableAnimations={disableAnimations}
                onOpen={this.handleOpen}
                mobileOnCloseRequest={this.hideMenu}
                width={this.isMobileLayout ? 'auto' : this.props.menuWidth || 'auto'}
              >
                <InternalMenu
                  hasShadow={false}
                  maxHeight={this.isMobileLayout ? 'none' : this.props.menuMaxHeight || 'none'}
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
          data-tid={PopupMenuDataTids.caption}
          className={styles.caption()}
          ref={(element) => (this.captionWrapper = element)}
        >
          {caption}
        </span>
      );
    }

    return (
      <span
        data-tid={PopupMenuDataTids.caption}
        onClick={this.handleCaptionClick}
        onKeyDown={this.handleCaptionKeyDown}
        ref={(element) => (this.captionWrapper = element)}
        className={styles.caption()}
      >
        {this.props.caption}
      </span>
    );
  };

  private hideMenuWithoutFocusing = () => this.hideMenu();

  private getPositions(): Readonly<PopupPositionsType[]> {
    const positions = this.getProps().positions;
    if (positions && isValidPositions(positions)) {
      return positions;
    }

    return Positions;
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

    if (this.state.menuVisible && this.props.onOpen) {
      this.props.onOpen();
    }

    if (!this.state.menuVisible && this.props.onClose) {
      this.props.onClose();
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
