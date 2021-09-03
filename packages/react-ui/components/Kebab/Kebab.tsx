import React from 'react';
import PropTypes from 'prop-types';

import { isKeyArrowVertical, isKeyEnter, isKeySpace, someKeys } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { tabListener } from '../../lib/events/tabListener';
import { PopupMenu, PopupMenuCaptionProps } from '../../internal/PopupMenu';
import { Nullable } from '../../typings/utility-types';
import { PopupPosition } from '../../internal/Popup';
import { theme } from '../../lib/theming/decorators';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { MenuKebabIcon } from '../../internal/icons/16px';
import { isTestEnv } from '../../lib/currentEnvironment';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Kebab.styles';

export interface KebabProps extends CommonProps {
  disabled?: boolean;
  /**
   * Функция вызываемая при закрытии выпадашки
   * @default () => undefined
   */
  onClose: () => void;
  /**
   * Функция вызываемая при открытии выпадашки
   * @default () => undefined
   */
  onOpen: () => void;
  size: 'small' | 'medium' | 'large';
  /**
   * Список позиций доступных для расположения выпадашки
   * Если во всех позициях выпадашка вылезает за пределы `viewport`, будет использоваться первая из этого списка
   * @default ['bottom left', 'bottom right', 'top left', 'top right']
   */
  positions: PopupPosition[];
  menuMaxHeight?: number | string;
  /**
   * Не показывать анимацию
   */
  disableAnimations: boolean;
  /**
   * Кастомная иконка
   */
  icon?: React.ReactNode;
}

export interface KebabState {
  anchor: Nullable<HTMLElement>;
  focusedByTab: boolean;
  opened: boolean;
}

@theme
export class Kebab extends React.Component<KebabProps, KebabState> {
  public static __KONTUR_REACT_UI__ = 'Kebab';

  public static propTypes = {};

  public static defaultProps = {
    onOpen: () => undefined,
    onClose: () => undefined,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
    size: 'small',
    disableAnimations: isTestEnv,
    icon: <MenuKebabIcon />,
  };

  public state = {
    opened: false,
    focusedByTab: false,
    anchor: null,
  };

  private readonly theme!: Theme;

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
    const { disabled, positions } = this.props;
    return (
      <ThemeContext.Provider
        value={ThemeFactory.create(
          {
            popupPinOffset: this.theme.kebabPinOffset,
            popupMargin: this.theme.kebabMargin,
            popupPinSize: this.theme.kebabPinSize,
          },
          this.theme,
        )}
      >
        <CommonWrapper {...this.props}>
          <PopupMenu
            popupHasPin
            positions={positions}
            onChangeMenuState={this.handleChangeMenuState}
            caption={this.renderCaption}
            disableAnimations={this.props.disableAnimations}
          >
            {!disabled && this.props.children}
          </PopupMenu>
        </CommonWrapper>
      </ThemeContext.Provider>
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
    this.setState(
      {
        opened: isOpened,
        focusedByTab: !isOpened && restoreFocus,
      },
      () => {
        if (this.props.disabled) {
          return;
        }

        if (this.state.opened) {
          this.props.onOpen();
        } else {
          this.props.onClose();
        }
      },
    );
  };

  private handleFocus = () => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
        if (tabListener.isTabPressed) {
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
    return (
      <div
        className={cx({
          [styles.icon()]: true,
          [styles.iconsmall()]: this.props.size === 'small',
          [styles.iconmedium()]: this.props.size === 'medium',
          [styles.iconlarge()]: this.props.size === 'large',
        })}
      >
        {this.props.icon}
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
