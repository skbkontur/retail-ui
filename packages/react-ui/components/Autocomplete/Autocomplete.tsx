import React, { AriaAttributes, KeyboardEvent } from 'react';
import PropTypes from 'prop-types';

import { MenuMessage } from '../../internal/MenuMessage';
import { locale } from '../../lib/locale/decorators';
import { getRandomID, isNullable } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { isKeyArrowDown, isKeyArrowUp, isKeyEnter, isKeyEscape } from '../../lib/events/keyboard/identifiers';
import { Input, InputProps } from '../Input';
import { Menu } from '../../internal/Menu';
import { MenuItem } from '../MenuItem';
import { RenderLayer } from '../../internal/RenderLayer';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable, Override } from '../../typings/utility-types';
import { fixClickFocusIE } from '../../lib/events/fixClickFocusIE';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { MobilePopup } from '../../internal/MobilePopup';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { SizeProp } from '../../lib/types/props';
import { Popup } from '../../internal/Popup';
import { getMenuPositions } from '../../lib/getMenuPositions';
import { ZIndex } from '../../internal/ZIndex';

import { styles } from './Autocomplete.styles';
import { AutocompleteLocale, AutocompleteLocaleHelper } from './locale';
import { getAutocompleteTheme } from './getAutocompleteTheme';

function match(pattern: string, items: string[]) {
  if (!pattern || !items) {
    return Promise.resolve([]);
  }

  const lowerCasedPattern = pattern.toLowerCase();
  const itemsMatchingPattern = items.filter((item) => {
    return item.toLowerCase().includes(lowerCasedPattern);
  });

  return Promise.resolve(itemsMatchingPattern);
}

function renderItem(item: any) {
  return item;
}

export interface AutocompleteProps
  extends CommonProps,
    Pick<AriaAttributes, 'aria-label'>,
    Override<
      InputProps,
      {
        /** Функция отрисовки элемента меню */
        renderItem?: (item: string) => React.ReactNode;
        /** Промис, резолвящий элементы меню */
        source?: string[] | ((patter: string) => Promise<string[]>);
        /** Отключает использование портала */
        disablePortal?: boolean;
        /** Отрисовка тени у выпадающего меню */
        hasShadow?: boolean;
        /** Выравнивание выпадающего меню */
        menuAlign?: 'left' | 'right';
        /** Максимальная высота меню */
        menuMaxHeight?: number | string;
        /** Ширина меню */
        menuWidth?: number | string;
        /** Отключить скролл окна, когда меню открыто */
        preventWindowScroll?: boolean;
        /** Вызывается при изменении `value` */
        onValueChange: (value: string) => void;
        /** Размер инпута */
        size?: SizeProp;
        /** value */
        value: string;
        /**
         * Текст заголовка выпадающего меню в мобильной версии
         */
        mobileMenuHeaderText?: string;
      }
    > {
  /**
   * Позволяет вручную задать текущую позицию выпадающего окна
   */
  menuPos?: 'top' | 'bottom';
}

export interface AutocompleteState {
  items: Nullable<string[]>;
  selected: number;
  focused: boolean;
  isMobileOpened: boolean;
}

export const AutocompleteDataTids = {
  root: 'Autocomplete__root',
  menu: 'Autocomplete__menu',
} as const;

export const AutocompleteIds = {
  menu: AutocompleteDataTids.menu,
} as const;

type DefaultProps = Required<
  Pick<
    AutocompleteProps,
    'renderItem' | 'size' | 'disablePortal' | 'hasShadow' | 'menuMaxHeight' | 'preventWindowScroll'
  >
>;

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
@responsiveLayout
@rootNode
@locale('Autocomplete', AutocompleteLocaleHelper)
export class Autocomplete extends React.Component<AutocompleteProps, AutocompleteState> {
  public static __KONTUR_REACT_UI__ = 'Autocomplete';
  public static displayName = 'Autocomplete';

  public static propTypes = {
    /**
     * Функция для отрисовки элемента в выпадающем списке. Единственный аргумент
     * — *item*.
     */
    renderItem: PropTypes.func,

    /**
     * Если передан массив, то совпадения ищутся по этому массиву.
     *
     * Если передается функция, то она должна возвращать thenable, который
     * резолвится уже отфильтрованным массивом. Возвращенный thenable может
     * иметь метод cancel, который будет вызван при отмене поиска (пользователь
     * изменил строку поиска, автокомплит потерял фокус).
     * ```
     * function(pattern) {
     *   return service.findAll(pattern);
     * }
     * ```
     */
    source: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  };

  public static defaultProps: DefaultProps = {
    renderItem,
    size: 'small',
    disablePortal: false,
    hasShadow: true,
    menuMaxHeight: 300,
    preventWindowScroll: true,
  };

  public state: AutocompleteState = {
    items: null,
    selected: -1,
    focused: false,
    isMobileOpened: false,
  };

  private theme!: Theme;
  private readonly locale!: AutocompleteLocale;
  private isMobileLayout!: boolean;
  private opened = false;
  private input: Nullable<Input> = null;
  private menu: Nullable<Menu>;
  private menuId = AutocompleteIds.menu + getRandomID();
  private rootSpan: Nullable<HTMLSpanElement>;
  private mobilePopup: Nullable<MobilePopup>;

  private requestId = 0;

  private getProps = createPropsGetter(Autocomplete.defaultProps);
  private setRootNode!: TSetRootNode;

  /**
   * @public
   */
  public focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    this.input?.blur();
  }

  public componentDidUpdate(prevProps: AutocompleteProps) {
    if (prevProps.value !== this.props.value) {
      this.updateItems(this.props.value || '');
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getAutocompleteTheme(theme);
          return (
            <ThemeContext.Provider value={this.theme}>
              <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
                {this.renderMain}
              </CommonWrapper>
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
  public renderMain = (props: CommonWrapperRestProps<AutocompleteProps>) => {
    const { focused } = this.state;

    const isMobile = this.isMobileLayout;

    const {
      onValueChange,
      onKeyDown,
      onFocus,
      onBlur,
      renderItem: _renderItem,
      disablePortal,
      hasShadow,
      menuAlign,
      menuMaxHeight,
      preventWindowScroll,
      source,
      menuPos,
      width = this.theme.inputWidth,
      mobileMenuHeaderText,
      'aria-label': ariaLabel,
      ...rest
    } = props;

    const inputProps = {
      ...rest,
      width: '100%',
      autoComplete: 'off',
      onValueChange: this.handleValueChange,
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus,
      onBlur: this.handleBlurInput,
      ref: this.refInput,
    };

    return (
      <RenderLayer onFocusOutside={this.handleBlurOutside} onClickOutside={this.handleClickOutside} active={focused}>
        <span
          data-tid={AutocompleteDataTids.root}
          className={cx(styles.root(this.theme), {
            [styles.noPortal()]: disablePortal,
          })}
          style={{ width }}
          ref={this.refRootSpan}
        >
          <Input aria-label={ariaLabel} aria-controls={this.menuId} {...inputProps} />
          {isMobile ? this.renderMobileMenu() : this.renderMenu()}
        </span>
      </RenderLayer>
    );
  };

  private renderHints(): React.ReactNode {
    const items = this.state.items;

    if (!this.props.value) {
      return <MenuMessage>{this.locale.enterValue}</MenuMessage>;
    }

    if (items?.length === 0 && this.props.value) {
      return <MenuMessage>{this.locale.notFound}</MenuMessage>;
    }

    if (isNullable(items) && this.props.value) {
      return <MenuMessage>{this.locale.updateValue}</MenuMessage>;
    }

    return null;
  }

  private renderMenu(): React.ReactNode {
    const items = this.state.items;
    const { menuPos, menuAlign, menuMaxHeight, hasShadow, menuWidth, width, preventWindowScroll, disablePortal } =
      this.getProps();
    const menuProps = {
      ref: this.refMenu,
      maxHeight: menuMaxHeight,
      hasShadow: false,
      hasMargin: false,
      width: menuWidth || (width && getDOMRect(this.rootSpan).width),
      preventWindowScroll,
    };
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <Popup
        opened
        hasShadow={hasShadow}
        id={this.menuId}
        priority={ZIndex.priorities.PopupMenu}
        data-tid={AutocompleteDataTids.menu}
        anchorElement={this.getAnchor()}
        disablePortal={disablePortal}
        width={menuWidth}
        minWidth={menuWidth === undefined ? '100%' : undefined}
        positions={getMenuPositions(menuPos, menuAlign)}
        margin={parseInt(this.theme.menuOffsetY) - 1}
      >
        <Menu {...menuProps}>{this.getItems()}</Menu>
      </Popup>
    );
  }

  private renderMobileMenu = () => {
    const inputProps: InputProps = {
      autoComplete: 'off',
      autoFocus: true,
      width: '100%',
      onValueChange: this.handleValueChange,
      onKeyPress: this.handleKeyPressMobile,
      value: this.props.value,
      placeholder: this.locale.enterValue,
    };

    const items = this.state.items;

    return (
      <MobilePopup
        id={this.menuId}
        headerChildComponent={<Input {...inputProps} />}
        caption={this.props.mobileMenuHeaderText}
        opened={this.state.isMobileOpened}
        onCloseRequest={this.handleCloseMobile}
        ref={this.refMobilePopup}
      >
        <Menu ref={this.refMenu} onItemClick={this.mobilePopup?.close} disableScrollContainer maxHeight={'auto'}>
          {items && items.length > 0 && this.getItems()}
          {this.renderHints()}
        </Menu>
      </MobilePopup>
    );
  };

  private getItems = () => {
    const items = this.state.items;
    const isMobile = this.isMobileLayout;

    return items
      ? items.map((item, i) => {
          return (
            <MenuItem onClick={this.handleMenuItemClick(i)} key={i} isMobile={isMobile} size={this.props.size}>
              {this.getProps().renderItem(item)}
            </MenuItem>
          );
        })
      : null;
  };

  private handleValueChange = (value: string) => {
    this.opened = true;

    this.fireChange(value);
  };

  private handleCloseMobile = () => {
    this.setState({
      isMobileOpened: false,
    });

    this.handleBlurOutside();
  };

  private handleKeyPressMobile = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.mobilePopup?.close();
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.isMobileLayout) {
      this.setState({ isMobileOpened: true });
    }

    if (this.state.focused) {
      return;
    }

    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlurOutside = () => {
    if (!this.state.focused) {
      return;
    }

    this.opened = false;
    this.setState({ items: null, focused: false });
  };

  private handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget) {
      this.handleBlurOutside();
    }
    this.props.onBlur?.(e);
  };

  private handleClickOutside = (e: Event) => {
    fixClickFocusIE(e);
    this.handleBlurOutside();
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
    switch (true) {
      case isKeyEscape(e):
        e.preventDefault();
        this.setState({ items: null });
        return;
      case isKeyArrowUp(e):
        e.preventDefault();
        if (this.menu) {
          this.menu.up();
        }
        return;
      case isKeyArrowDown(e):
        e.preventDefault();
        if (this.menu) {
          this.menu.down();
        }
        return;
      case isKeyEnter(e):
        e.preventDefault(); // To prevent form submission.
        if (this.menu) {
          this.menu.enter(e);
        }
        return;
    }
  };

  private handleMenuItemClick(i: number) {
    return (event: React.SyntheticEvent<HTMLElement>) => this.handleItemClick(event, i);
  }

  private getAnchor = () => {
    return getRootNode(this);
  };

  private handleItemClick(event: React.SyntheticEvent<HTMLElement> | React.MouseEvent<HTMLElement>, index: number) {
    if ((event as React.MouseEvent<HTMLElement>).button) {
      return;
    }

    event.preventDefault();
    this.choose(index);
  }

  private choose(index: number) {
    if (!this.state.items) {
      return;
    }

    const value = this.state.items[index];
    this.opened = false;
    this.setState({
      selected: -1,
      items: null,
    });

    this.fireChange(value);
    this.blur();
  }

  private updateItems(value: string) {
    if (!this.opened) {
      return;
    }
    const pattern = value.trim();
    const source = this.props.source;

    if (!source) {
      return;
    }

    let promise;
    this.requestId += 1;
    const expectingId = this.requestId;
    if (typeof source === 'function') {
      promise = source(pattern);
    } else {
      promise = match(pattern, source);
    }
    promise.then((items) => {
      if (this.opened && expectingId === this.requestId) {
        this.setState({
          items,
          selected: -1,
        });
      }
    });
  }

  private fireChange(value: string) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  private refInput = (el: Input | null) => {
    this.input = el;
  };

  private refMenu = (menu: Menu | null) => {
    this.menu = menu;
  };

  private refRootSpan = (span: HTMLSpanElement) => {
    this.rootSpan = span;
  };

  private refMobilePopup = (mobilePopup: MobilePopup | null) => {
    this.mobilePopup = mobilePopup;
  };
}
