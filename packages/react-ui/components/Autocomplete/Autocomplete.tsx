import type { Emotion } from '@emotion/css/create-instance';
import type { AriaAttributes, KeyboardEvent } from 'react';
import React from 'react';

import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { Menu } from '../../internal/Menu/index.js';
import { MenuMessage } from '../../internal/MenuMessage/index.js';
import { MobilePopup } from '../../internal/MobilePopup/index.js';
import { Popup } from '../../internal/Popup/index.js';
import { RenderLayer } from '../../internal/RenderLayer/index.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import { isKeyArrowDown, isKeyArrowUp, isKeyEnter, isKeyEscape } from '../../lib/events/keyboard/identifiers.js';
import { getMenuPositions } from '../../lib/getMenuPositions.js';
import { locale } from '../../lib/locale/decorators.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { getRandomID, isNullable } from '../../lib/utils.js';
import type { Nullable, Override } from '../../typings/utility-types.js';
import { Input } from '../Input/index.js';
import type { InputProps } from '../Input/index.js';
import { MaskedInput, type MaskedProps, getSafeMaskInputType } from '../MaskedInput/index.js';
import { MenuItem } from '../MenuItem/index.js';
import { responsiveLayout } from '../ResponsiveLayout/decorator.js';
import { getStyles } from './Autocomplete.styles.js';
import { getAutocompleteTheme } from './getAutocompleteTheme.js';
import type { AutocompleteLocale } from './locale/index.js';
import { AutocompleteLocaleHelper } from './locale/index.js';

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
  extends
    CommonProps,
    Pick<AriaAttributes, 'aria-label'>,
    Pick<Partial<MaskedProps>, 'alwaysShowMask' | 'mask' | 'maskChar'>,
    Override<
      Omit<InputProps, 'alwaysShowMask' | 'mask' | 'maskChar'>,
      {
        /** Отрисовывает элементы результата поиска. */
        renderItem?: (item: string) => React.ReactNode;

        /** Задаёт функцию поиска элементов, которая должна возвращать Promise с массивом значений. */
        source?: string[] | ((patter: string) => Promise<string[]>);

        /**  По умолчанию выпадающий список рендерится через [паттерн Portal](https://react.dev/reference/react-dom/createPortal). Проп отключает использование Portal и список рендерится как обычный блок с абсолютным позиционированием внутри компонента. */
        disablePortal?: boolean;

        /** Определяет, нужно ли показывать тень у выпадающего списка. */
        hasShadow?: boolean;

        /** Выравнивание выпадающего списка. */
        menuAlign?: 'left' | 'right';

        /** Максимальная высота выпадающего списка. */
        menuMaxHeight?: number | string;

        /** Ширина выпадающего списка. */
        menuWidth?: number | string;

        /** Отключает скролл окна, когда выпадающий список раскрыт. */
        preventWindowScroll?: boolean;

        /** Событие изменения `value`. */
        onValueChange: (value: string) => void;

        /** Событие потери автокомплитом фокуса. */
        onBlur?: () => void;

        /** Размер автокомплита. */
        size?: SizeProp;

        /** Значение автокомплита. */
        value: string;

        /** Текст заголовка выпадающего списка в мобильной версии. */
        mobileMenuHeaderText?: string;
      }
    > {
  /** Расположение выпадающего списка — над или под полем. */
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
  Pick<AutocompleteProps, 'renderItem' | 'disablePortal' | 'hasShadow' | 'menuMaxHeight' | 'preventWindowScroll'>
>;

/**
 * Автокомплит — поле ввода с выпадающим списком подсказок. Подсказки отображаются пользователю, когда он начинает вводить значение в поле. */
@withRenderEnvironment
@responsiveLayout
@rootNode
@locale('Autocomplete', AutocompleteLocaleHelper)
@withSize
export class Autocomplete extends React.Component<AutocompleteProps, AutocompleteState> {
  public static __KONTUR_REACT_UI__ = 'Autocomplete';
  public static displayName = 'Autocomplete';

  public static defaultProps: DefaultProps = {
    renderItem,
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

  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private size!: SizeProp;
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
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  /** Программно устанавливает фокус на автокомплит.
   * @public
   * @example
   * <Autocomplete ref={autocompleteRef} />
   * <button onClick={() => autocompleteRef.current?.focus()}>Focus</button>
   */
  public focus(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  /** Программно снимает фокус с автокомплита.
   * @public
   * @example
   * <Autocomplete ref={autocompleteRef} />
   * <button onClick={() => autocompleteRef.current?.blur()}>Blur</button>
   */
  public blur(): void {
    this.handleBlur();
  }

  public componentDidUpdate(prevProps: AutocompleteProps) {
    if (prevProps.value !== this.props.value) {
      this.updateItems(this.props.value || '');
    }
  }

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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
  public renderMain = (props: CommonWrapperRestProps<AutocompleteProps>): React.JSX.Element => {
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
      type,
      ...rest
    } = props;

    const inputProps = {
      ...rest,
      width: '100%',
      autoComplete: 'off',
      'aria-controls': this.menuId,
      onValueChange: this.handleValueChange,
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus,
      ref: this.refInput,
    };

    return (
      <RenderLayer onFocusOutside={this.handleBlur} onClickOutside={this.handleClickOutside} active={focused}>
        <span
          data-tid={AutocompleteDataTids.root}
          className={this.cx(this.styles.root(this.theme), {
            [this.styles.noPortal()]: disablePortal,
          })}
          style={{ width }}
          ref={this.refRootSpan}
        >
          {this.getInput(inputProps)}

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
    const calculatedMenuWidth = menuWidth ? '100%' : width && getDOMRect(this.rootSpan).width;
    const menuProps = {
      ref: this.refMenu,
      maxHeight: menuMaxHeight,
      hasShadow: false,
      hasMargin: false,
      width: calculatedMenuWidth,
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

  private getInput = (inputProps: InputProps) => {
    return this.props.mask ? (
      <MaskedInput
        {...inputProps}
        type={getSafeMaskInputType(this.props.type)}
        mask={this.props.mask}
        maskChar={this.props.maskChar}
      />
    ) : (
      <Input {...inputProps} />
    );
  };

  private renderMobileMenu = () => {
    const inputProps: InputProps = {
      autoComplete: 'off',
      autoFocus: true,
      width: '100%',
      onValueChange: this.handleValueChange,
      onKeyPress: this.handleKeyPressMobile,
      value: this.props.value,
      placeholder: this.locale.enterValue,
      type: this.props.type,
      inputMode: this.props.inputMode,
      'aria-label': this.props['aria-label'],
      'aria-controls': this.menuId,
    };

    const items = this.state.items;

    return (
      <MobilePopup
        id={this.menuId}
        headerChildComponent={this.getInput(inputProps)}
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
            <MenuItem onClick={this.handleMenuItemClick(i)} key={i} isMobile={isMobile} size={this.size}>
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

  private handleClickOutside = () => {
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

    // NOTE: этот таймаут - костыль. Проблема в старом ReactInputMask, он сеттит пустой value при потере фокуса.
    // Можно будет убрать после полного перехода на MaskedInput
    setTimeout(() => {
      this.blur();
    }, 0);
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
