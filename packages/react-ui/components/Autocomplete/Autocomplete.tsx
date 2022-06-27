// TODO: поправить после перехода на функциональные компоненты
// eslint-disable @typescript-eslint/no-non-null-assertion
import React, { KeyboardEvent } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { isKeyArrowDown, isKeyArrowUp, isKeyEnter, isKeyEscape } from '../../lib/events/keyboard/identifiers';
import { Input, InputProps } from '../Input';
import { DropdownContainer } from '../../internal/DropdownContainer';
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

import { styles } from './Autocomplete.styles';

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
        /** onBlur */
        onBlur?: () => void;
        /** Размер инпута */
        size?: InputProps['size'];
        /** value */
        value: string;
        /**
         * Текст заголовка выпадающего меню в мобильной версии
         */
        mobileMenuHeaderText?: string;
      }
    > {}

export interface AutocompleteState {
  items: Nullable<string[]>;
  selected: number;
  focused: boolean;
  isMobileOpened: boolean;
}

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
@responsiveLayout
@rootNode
export class Autocomplete extends React.Component<AutocompleteProps, AutocompleteState> {
  public static __KONTUR_REACT_UI__ = 'Autocomplete';

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

  public static defaultProps: Partial<AutocompleteProps> = {
    renderItem,
    size: 'small',
    disablePortal: false,
    hasShadow: true,
    menuMaxHeight: 300,
    menuAlign: 'left',
    preventWindowScroll: true,
  };

  public state: AutocompleteState = {
    items: null,
    selected: -1,
    focused: false,
    isMobileOpened: false,
  };

  private theme!: Theme;
  private isMobileLayout!: boolean;
  private opened = false;
  private input: Nullable<Input> = null;
  private menu: Nullable<Menu>;
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
    this.handleBlur();
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
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain}
            </CommonWrapper>
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
      width = this.theme.inputWidth,
      mobileMenuHeaderText,
      ...rest
    } = props;

    const inputProps = {
      ...rest,
      width: '100%',
      onValueChange: this.handleValueChange,
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus,
      ref: this.refInput,
    };

    return (
      <RenderLayer onFocusOutside={this.handleBlur} onClickOutside={this.handleClickOutside} active={focused}>
        <span className={styles.root(this.theme)} style={{ width }} ref={this.refRootSpan}>
          <Input {...inputProps} />
          {isMobile ? this.renderMobileMenu() : this.renderMenu()}
        </span>
      </RenderLayer>
    );
  };

  private renderMenu(): React.ReactNode {
    const items = this.state.items;
    const menuProps = {
      ref: this.refMenu,
      maxHeight: this.props.menuMaxHeight,
      hasShadow: this.props.hasShadow,
      width: this.props.menuWidth || (this.props.width && getDOMRect(this.rootSpan).width),
      preventWindowScroll: this.props.preventWindowScroll,
    };
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <DropdownContainer
        offsetY={1}
        getParent={this.getAnchor}
        align={this.props.menuAlign}
        disablePortal={this.props.disablePortal}
      >
        <Menu {...menuProps}>{this.getItems()}</Menu>
      </DropdownContainer>
    );
  }

  private renderMobileMenu = () => {
    const inputProps: InputProps = {
      autoFocus: true,
      width: '100%',
      onValueChange: this.handleValueChange,
      onKeyPress: this.handleKeyPressMobile,
      value: this.props.value,
      placeholder: 'Начните вводить',
    };

    const items = this.state.items;

    return (
      <MobilePopup
        headerChildComponent={<Input {...inputProps} />}
        caption={this.props.mobileMenuHeaderText}
        useFullHeight
        opened={this.state.isMobileOpened}
        onCloseRequest={this.handleCloseMobile}
        ref={this.refMobilePopup}
      >
        <Menu ref={this.refMenu} onItemClick={this.mobilePopup?.close} disableScrollContainer maxHeight={'auto'}>
          {items && items.length > 0 && this.getItems()}
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
            <MenuItem onClick={this.handleMenuItemClick(i)} key={i} isMobile={isMobile}>
              {this.getProps().renderItem!(item)}
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

    this.handleBlur();
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

  private handleBlur = () => {
    if (!this.state.focused) {
      return;
    }

    this.opened = false;
    this.setState({ items: null, focused: false });

    if (this.input) {
      this.input.blur();
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private handleClickOutside = (e: Event) => {
    fixClickFocusIE(e);
    this.handleBlur();
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
