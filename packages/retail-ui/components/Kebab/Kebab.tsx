import * as React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';
import MenuKebabIcon from '@skbkontur/react-icons/MenuKebab';

import Icon20 from '../Icon/20px';
import LayoutEvents from '../../lib/LayoutEvents';
import tabListener from '../../lib/events/tabListener';
import PopupMenu from '../internal/PopupMenu';
import { Nullable } from '../../typings/utility-types';
import { PopupMenuCaptionProps } from '../internal/PopupMenu/PopupMenu';

import styles from './Kebab.less';
import { PopupPosition } from '../Popup';

export interface KebabProps {
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
}

export interface KebabState {
  anchor: Nullable<HTMLElement>;
  focusedByTab: boolean;
  opened: boolean;
}

export default class Kebab extends React.Component<KebabProps, KebabState> {
  public static propTypes = {};
  public static defaultProps = {
    onOpen: () => undefined,
    onClose: () => undefined,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
    size: 'small',
    disableAnimations: false,
  };

  public state = {
    opened: false,
    focusedByTab: false,
    anchor: null,
  };

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
      <PopupMenu
        popupMargin={5}
        popupPinOffset={15}
        popupHasPin
        positions={positions}
        onChangeMenuState={this.handleChangeMenuState}
        caption={this.renderCaption}
        disableAnimations={this.props.disableAnimations}
      >
        {!disabled && this.props.children}
      </PopupMenu>
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
        className={cn(
          styles.kebab,
          captionProps.opened && styles.opened,
          disabled && styles.disabled,
          this.state.focusedByTab && styles.focused,
        )}
      >
        {this.renderIcon()}
      </span>
    );
  };

  private handleCaptionKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    openMenu: PopupMenuCaptionProps['openMenu'],
  ) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        openMenu(true);
        break;

      default:
        break;
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
      process.nextTick(() => {
        if (tabListener.isTabPressed) {
          this.setState({ focusedByTab: true });
          tabListener.isTabPressed = false;
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
    switch (this.props.size) {
      case 'small':
        return (
          <div className={styles.iconsmall}>
            <MenuKebabIcon size="14px" color="#757575" />
          </div>
        );
      case 'medium':
        return (
          <div className={styles.iconmedium}>
            <MenuKebabIcon size="18px" color="#757575" />
          </div>
        );
      case 'large':
        return (
          <div className={styles.iconlarge}>
            <Icon20 name="kebab" color="#757575" />
          </div>
        );
      default:
        throw new Error(`Unexpected size '${this.props.size}'`);
    }
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
