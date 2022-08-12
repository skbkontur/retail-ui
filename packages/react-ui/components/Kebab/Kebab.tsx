import React from 'react';
import PropTypes from 'prop-types';

import { isKeyArrowVertical, isKeyEnter, isKeySpace, someKeys } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { keyListener } from '../../lib/events/keyListener';
import { PopupMenu, PopupMenuCaptionProps, PopupMenuProps } from '../../internal/PopupMenu';
import { Nullable } from '../../typings/utility-types';
import { PopupPositionsType } from '../../internal/Popup';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { MenuKebabIcon } from '../../internal/icons/16px';
import { isTestEnv } from '../../lib/currentEnvironment';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { styles } from './Kebab.styles';

export interface KebabProps extends CommonProps, Pick<PopupMenuProps, 'onOpen' | 'onClose'> {
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  /**
   * Список позиций доступных для расположения выпадашки.
   *
   * Если во всех позициях выпадашка вылезает за пределы `viewport`, будет использована первая из этого списка.
   *
   * **Возможные значения**: `top left`, `top center`, `top right`, `right top`, `right middle`, `right bottom`, `bottom left`, `bottom center`, `bottom right`, `left top`, `left middle`, `left bottom`
   * @default ['bottom left', 'bottom right', 'top left', 'top right']
   */
  positions?: PopupPositionsType[];
  menuMaxHeight?: number | string;
  /**
   * Не показывать анимацию
   */
  disableAnimations?: boolean;
  /**
   * Кастомная иконка
   */
  icon?: React.ReactNode;
}

export interface KebabState {
  anchor: Nullable<HTMLElement>;
  focusedByTab: boolean;
}

type DefaultProps = Required<
  Pick<KebabProps, 'onOpen' | 'onClose' | 'positions' | 'size' | 'disableAnimations' | 'icon'>
>;

@rootNode
export class Kebab extends React.Component<KebabProps, KebabState> {
  public static __KONTUR_REACT_UI__ = 'Kebab';

  public static propTypes = {};

  public static defaultProps: DefaultProps = {
    onOpen: () => undefined,
    onClose: () => undefined,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
    size: 'small',
    disableAnimations: isTestEnv,
    icon: <MenuKebabIcon />,
  };

  private getProps = createPropsGetter(Kebab.defaultProps);

  public state: KebabState = {
    focusedByTab: false,
    anchor: null,
  };

  private theme!: Theme;
  private setRootNode!: TSetRootNode;

  private listener: {
    remove: () => void;
  } = {
    remove: () => undefined,
  };

  public componentDidMount() {
    /** addListener'у нужен колбэк в аргумент */
    this.listener = LayoutEvents.addListener(() => undefined);
  }

  public componentWillUnmount() {
    this.listener.remove();
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupPinOffset: theme.kebabPinOffset,
                  popupMargin: theme.kebabMargin,
                  popupPinSize: theme.kebabPinSize,
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
  }

  private renderMain() {
    const { disabled } = this.props;
    const { positions, disableAnimations, onOpen, onClose } = this.getProps();
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <PopupMenu
          popupHasPin
          positions={positions}
          onChangeMenuState={this.handleChangeMenuState}
          caption={this.renderCaption}
          disableAnimations={disableAnimations}
          menuMaxHeight={this.props.menuMaxHeight}
          onOpen={onOpen}
          onClose={onClose}
        >
          {!disabled && this.props.children}
        </PopupMenu>
      </CommonWrapper>
    );
  }

  private renderCaption = (captionProps: PopupMenuCaptionProps) => {
    const { disabled } = this.props;
    const handleCaptionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disabled) {
        this.handleCaptionKeyDown(event, captionProps.openMenu);
      }
    };

    const handleCaptionClick = () => {
      if (!disabled) {
        captionProps.toggleMenu();
      }
    };

    return (
      <span
        tabIndex={disabled ? -1 : 0}
        onClick={handleCaptionClick}
        onKeyDown={handleCaptionKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={cx({
          [styles.kebab(this.theme)]: true,
          [styles.opened(this.theme)]: captionProps.opened,
          [styles.disabled()]: disabled,
          [styles.focused(this.theme)]: this.state.focusedByTab,
        })}
      >
        {this.renderIcon()}
      </span>
    );
  };

  private handleCaptionKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    openMenu: PopupMenuCaptionProps['openMenu'],
  ) => {
    if (someKeys(isKeyEnter, isKeySpace, isKeyArrowVertical)(e)) {
      e.preventDefault();
      openMenu(true);
    }
  };

  private handleChangeMenuState = (isOpened: boolean, restoreFocus: boolean): void => {
    this.setState({
      focusedByTab: !isOpened && restoreFocus,
    });
  };

  private handleFocus = () => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
        if (keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
    }
  };

  private handleBlur = () => {
    this.setState({
      focusedByTab: false,
    });
  };

  private renderIcon() {
    const { size, icon } = this.getProps();
    return (
      <div
        className={cx({
          [styles.icon()]: true,
          [styles.iconsmall()]: size === 'small',
          [styles.iconmedium()]: size === 'medium',
          [styles.iconlarge()]: size === 'large',
        })}
      >
        {icon}
      </div>
    );
  }
}

Kebab.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  menuMaxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Размер кебаба small 14px | large 20px
   */
  size: PropTypes.string,

  /**
   * Коллбек, вызывающийся перед закрытием кебаба
   */
  onClose: PropTypes.func,

  /**
   * Коллбек, вызывающийся перед открытием кебаба
   */
  onOpen: PropTypes.func,
};
