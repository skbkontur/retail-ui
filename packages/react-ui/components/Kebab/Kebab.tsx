import React, { AriaAttributes, ReactElement, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { isElement } from 'react-is';
import { globalObject } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { isKonturIcon } from '../../lib/utils';
import { isKeyArrowVertical, isKeyEnter, isKeySpace, someKeys } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { keyListener } from '../../lib/events/keyListener';
import { PopupMenu, PopupMenuCaptionProps, PopupMenuProps } from '../../internal/PopupMenu';
import { Nullable } from '../../typings/utility-types';
import { PopupPositionsType } from '../../internal/Popup';
import { Theme } from '../../lib/theming/Theme';
import { isTestEnv } from '../../lib/currentEnvironment';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { SizeProp } from '../../lib/types/props';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './Kebab.styles';
import { KebabIcon } from './KebabIcon';

export interface KebabProps
  extends Pick<AriaAttributes, 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    Pick<PopupMenuProps, 'onOpen' | 'onClose' | 'popupMenuId' | 'preventIconsOffset'>,
    CommonProps {
  disabled?: boolean;
  size?: SizeProp;
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
  /**
   * Атрибут для указания id элемента(-ов), описывающих его
   */
  'aria-describedby'?: AriaAttributes['aria-describedby'];
}

export const KebabDataTids = {
  caption: 'Kebab__caption',
} as const;

export interface KebabState {
  anchor: Nullable<HTMLElement>;
  focusedByTab: boolean;
}

type DefaultProps = Required<Pick<KebabProps, 'onOpen' | 'onClose' | 'positions' | 'size' | 'disableAnimations'>>;

@rootNode
export class Kebab extends React.Component<KebabProps, KebabState> {
  public static __KONTUR_REACT_UI__ = 'Kebab';
  public static displayName = 'Kebab';

  public static propTypes = {};

  public static defaultProps: DefaultProps = {
    onOpen: () => undefined,
    onClose: () => undefined,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
    size: 'small',
    disableAnimations: isTestEnv,
  };

  private getProps = createPropsGetter(Kebab.defaultProps);

  public state: KebabState = {
    focusedByTab: false,
    anchor: null,
  };

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
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
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
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
        }}
      </EmotionConsumer>
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
    const { disabled, size } = this.getProps();
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
    const styles = this.styles;

    return (
      <span
        role="button"
        data-tid={KebabDataTids.caption}
        tabIndex={disabled ? -1 : 0}
        onClick={handleCaptionClick}
        onKeyDown={handleCaptionKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={this.emotion.cx(
          styles.kebab(this.theme),
          size === 'small' && styles.kebabSmall(this.theme),
          size === 'medium' && styles.kebabMedium(this.theme),
          size === 'large' && styles.kebabLarge(this.theme),
          captionProps.opened && styles.opened(this.theme),
          disabled && styles.disabled(),
          this.state.focusedByTab && styles.focused(this.theme),
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
      globalObject.requestAnimationFrame?.(() => {
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
    const { size, icon = <KebabIcon /> } = this.getProps();

    if (isElement(icon) && isKonturIcon(icon as ReactElement)) {
      const sizes: Record<SizeProp, number> = {
        small: parseInt(this.theme.kebabIconSizeSmall),
        medium: parseInt(this.theme.kebabIconSizeMedium),
        large: parseInt(this.theme.kebabIconSizeLarge),
      };

      return React.cloneElement(icon as ReactElement, {
        size: icon.props.size ?? sizes[size],
        color: icon.props.color ?? this.theme.kebabIconColor,
      });
    }

    return icon;
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
