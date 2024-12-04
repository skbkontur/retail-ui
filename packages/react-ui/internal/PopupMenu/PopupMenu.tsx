import React, { AriaAttributes, HTMLAttributes } from 'react';
import { globalObject } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { EmotionConsumer } from '../../lib/theming/Emotion';
import { getRandomID } from '../../lib/utils';
import { HTMLProps } from '../../typings/html';
import {
  isKeyArrowVertical,
  isKeyEnter,
  isKeyEscape,
  isKeySpace,
  someKeys,
} from '../../lib/events/keyboard/identifiers';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Popup, PopupIds, PopupPositionsType } from '../Popup';
import { RenderLayer } from '../RenderLayer';
import { Nullable } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../CommonWrapper';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Menu, MenuProps } from '../Menu';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { isValidPositions } from './validatePositions';
import { getStyles } from './PopupMenu.styles';

export interface PopupMenuCaptionProps {
  opened: boolean;
  openMenu: (firstItemShouldBeSelected?: boolean) => void;
  closeMenu: (restoreFocus?: boolean) => void;
  toggleMenu: () => void;
}

export interface PopupMenuProps
  extends CommonProps,
    Pick<MenuProps, 'preventIconsOffset'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    Pick<AriaAttributes, 'aria-label'> {
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
  /**
   * Позволяет задать `id` выпадающему меню.
   *
   * Это может пригодиться при реализации a11y. Например, для того, чтобы связать `aria-controls` с выпадающим меню.
   */
  popupMenuId?: HTMLProps['id'];
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
  public static displayName = 'PopupMenu';

  private isMobileLayout!: boolean;
  private rootId = PopupIds.root + getRandomID();

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
  private menu: Nullable<Menu> = null;
  private setRootNode!: TSetRootNode;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;

  public render(): JSX.Element {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                return (
                  <ThemeContext.Provider
                    value={ThemeFactory.create(
                      {
                        menuOffsetY: theme.popupMenuMenuOffsetY,
                      },
                      theme,
                    )}
                  >
                    {this.renderMain()}
                  </ThemeContext.Provider>
                );
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private renderMain() {
    const { popupHasPin, disableAnimations } = this.getProps();
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <RenderLayer
          onClickOutside={this.hideMenuWithoutFocusing}
          onFocusOutside={this.hideMenuWithoutFocusing}
          active={this.state.menuVisible}
        >
          <div
            data-tid={PopupMenuDataTids.root}
            className={this.styles.container()}
            style={{ width: this.props.width }}
          >
            {this.renderCaption()}
            {this.captionWrapper && this.props.children && (
              <Popup
                id={this.props.popupMenuId ?? this.rootId}
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
                <Menu
                  maxHeight={this.isMobileLayout ? 'none' : this.props.menuMaxHeight || 'none'}
                  onKeyDown={this.handleKeyDown}
                  onItemClick={this.handleItemSelection}
                  preventIconsOffset={this.props.preventIconsOffset}
                  cyclicSelection={false}
                  ref={this.menuRef}
                  initialSelectedItemIndex={this.state.firstItemShouldBeSelected ? 0 : -1}
                  header={this.props.header}
                  footer={this.props.footer}
                >
                  {this.props.children}
                </Menu>
              </Popup>
            )}
          </div>
        </RenderLayer>
      </CommonWrapper>
    );
  }

  public open = (): void => this.showMenu();
  public close = (): void => this.hideMenu();

  private menuRef = (element: Nullable<Menu>) => (this.menu = element);

  private handleOpen = () => {
    if (this.menu) {
      this.menu.focus();
    }
  };

  private passPropsToCaption = (caption: React.ReactNode) => {
    if (typeof caption === 'string' || typeof caption === 'number') {
      return caption;
    }

    return React.cloneElement(caption as React.ReactElement, {
      id: this.props.id,
      'aria-controls': this.props.popupMenuId ?? this.rootId,
      'aria-expanded': this.state.menuVisible ? 'true' : 'false',
      'aria-label': this.props['aria-label'],
    });
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
          className={this.styles.caption()}
          ref={(element) => (this.captionWrapper = element)}
        >
          {this.passPropsToCaption(caption)}
        </span>
      );
    }

    return (
      <span
        data-tid={PopupMenuDataTids.caption}
        onClick={this.handleCaptionClick}
        onKeyDown={this.handleCaptionKeyDown}
        ref={(element) => (this.captionWrapper = element)}
        className={this.styles.caption()}
      >
        {this.passPropsToCaption(this.props.caption)}
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
    if (globalObject.document) {
      this.savedFocusableElement = globalObject.document.activeElement as HTMLElement;
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
