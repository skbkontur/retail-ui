import type { AriaAttributes, HTMLAttributes, JSX } from 'react';
import React from 'react';
import { isElement } from 'react-is';
import type { Emotion } from '@emotion/css/types/create-instance';

import type { GlobalObject } from '../../lib/globalObject';
import { isKonturIcon } from '../../lib/utils';
import { isKeyArrowVertical, isKeyEnter, isKeySpace, someKeys } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { KeyListener } from '../../lib/events/keyListener';
import type { PopupMenuCaptionProps, PopupMenuProps } from '../../internal/PopupMenu';
import { PopupMenu } from '../../internal/PopupMenu';
import type { Nullable } from '../../typings/utility-types';
import type { PopupPositionsType } from '../../internal/Popup';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import { isTestEnv } from '../../lib/currentEnvironment';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { SizeProp } from '../../lib/types/props';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import { withSize } from '../../lib/size/SizeDecorator';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

import { getStyles } from './Kebab.styles';
import { KebabIcon } from './KebabIcon';

export interface KebabProps
  extends Pick<AriaAttributes, 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    Pick<PopupMenuProps, 'onOpen' | 'onClose' | 'popupMenuId' | 'preventIconsOffset'>,
    CommonProps {
  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Задает размер контрола. */
  size?: SizeProp;

  /** Определяет список позиций, доступных для расположения выпадашки относительно `kebab`.
   * Если во всех позициях выпадашка вылезает за пределы `viewport`, будет использована первая из этого списка.
   * @default ['bottom left', 'bottom right', 'top left', 'top right']. */
  positions?: PopupPositionsType[];
  positions2?: string;

  /** Задает максимальную высоту меню. */
  menuMaxHeight?: number | string;

  /** Отключает анимацию. */
  disableAnimations?: boolean;

  /** Добавляет иконку слева. */
  icon?: React.ReactNode;

  /** @ignore */
  'aria-describedby'?: AriaAttributes['aria-describedby'];
}

export const KebabDataTids = {
  caption: 'Kebab__caption',
} as const;

export interface KebabState {
  anchor: Nullable<HTMLElement>;
  focusedByTab: boolean;
}

type DefaultProps = Required<Pick<KebabProps, 'onOpen' | 'onClose' | 'positions' | 'disableAnimations'>>;

/**
 * Кебаб-меню `Kebab` содержит действия с объектом.
 */
@withRenderEnvironment
@rootNode
@withSize
export class Kebab extends React.Component<KebabProps, KebabState> {
  public static __KONTUR_REACT_UI__ = 'Kebab';
  public static displayName = 'Kebab';

  public static defaultProps: DefaultProps = {
    onOpen: () => undefined,
    onClose: () => undefined,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
    disableAnimations: isTestEnv,
  };

  private getProps = createPropsGetter(Kebab.defaultProps);

  public state: KebabState = {
    focusedByTab: false,
    anchor: null,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private size!: SizeProp;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private keyListener!: KeyListener;

  private listener: {
    remove: () => void;
  } = {
    remove: () => undefined,
  };

  public componentDidMount() {
    this.keyListener = new KeyListener(this.globalObject);
    /** addListener'у нужен колбэк в аргумент */
    this.listener = LayoutEvents.addListener(() => undefined, this.globalObject);
  }

  public componentWillUnmount() {
    this.listener.remove();
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupMargin: theme.kebabMargin,
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
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props} {...getVisualStateDataAttributes({ disabled })}>
        <PopupMenu
          id={this.props.id}
          popupHasPin={false}
          preventIconsOffset={this.props.preventIconsOffset}
          positions={positions}
          onChangeMenuState={this.handleChangeMenuState}
          caption={this.renderCaption}
          disableAnimations={disableAnimations}
          menuMaxHeight={this.props.menuMaxHeight}
          onOpen={onOpen}
          onClose={onClose}
          popupMenuId={this.props.popupMenuId}
          aria-label={this.props['aria-label']}
        >
          {!disabled && this.props.children}
        </PopupMenu>
      </CommonWrapper>
    );
  }

  private renderCaption = (captionProps: PopupMenuCaptionProps) => {
    const { disabled } = this.getProps();
    const size = this.size;
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
        role="button"
        data-tid={KebabDataTids.caption}
        tabIndex={disabled ? -1 : 0}
        onClick={handleCaptionClick}
        onKeyDown={handleCaptionKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={this.cx(
          this.styles.kebab(this.theme),
          size === 'small' && this.styles.kebabSmall(this.theme),
          size === 'medium' && this.styles.kebabMedium(this.theme),
          size === 'large' && this.styles.kebabLarge(this.theme),
          captionProps.opened && this.styles.opened(this.theme),
          disabled && this.styles.disabled(),
          this.state.focusedByTab && this.styles.focused(this.theme),
        )}
        aria-describedby={this.props['aria-describedby']}
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
      this.globalObject.requestAnimationFrame?.(() => {
        if (this.keyListener.isTabPressed) {
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
    const { icon = <KebabIcon /> } = this.getProps();

    if (isElement(icon) && isKonturIcon(icon)) {
      const sizes: Record<SizeProp, number> = {
        small: parseInt(this.theme.kebabIconSizeSmall),
        medium: parseInt(this.theme.kebabIconSizeMedium),
        large: parseInt(this.theme.kebabIconSizeLarge),
      };

      return React.cloneElement(icon, {
        size: icon.props.size ?? sizes[this.size],
        color: icon.props.color ?? this.theme.kebabIconColor,
      });
    }

    return icon;
  }
}
