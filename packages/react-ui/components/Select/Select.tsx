import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import cn from 'classnames';

import {
  isKeyArrowDown,
  isKeyArrowUp,
  isKeyArrowVertical,
  isKeyEnter,
  isKeyEscape,
  isKeySpace,
} from '../../lib/events/keyboard/identifiers';
import { locale } from '../../lib/locale/decorators';
import { reactGetTextContent } from '../../lib/reactGetTextContent';
import { Button, ButtonProps, ButtonSize, ButtonUse } from '../Button';
import { DropdownContainer } from '../../internal/DropdownContainer';
import { filterProps } from '../../lib/filterProps';
import { Input } from '../Input';
import { Menu } from '../../internal/Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { RenderLayer } from '../../internal/RenderLayer';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { isFunction } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { ArrowChevronDownIcon } from '../../internal/icons/16px';
import { MobileLayoutState, LayoutMode, mobileLayout } from '../MobileLayout';
import { MobileMenu } from '../../internal/MobileMenu';
import { cx } from '../../lib/theming/Emotion';

import { Item } from './Item';
import { SelectLocale, SelectLocaleHelper } from './locale';
import { jsStyles } from './Select.styles';
import { getSelectTheme } from './selectTheme';

export interface ButtonParams {
  disabled?: boolean;
  label: React.ReactNode;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  opened: boolean;
  isPlaceholder: boolean;
}

const PASS_BUTTON_PROPS = {
  disabled: true,
  error: true,
  use: true,
  size: true,
  warning: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true,
};

export interface SelectProps<TValue, TItem> extends CommonProps {
  /** @ignore */
  _icon?: React.ReactNode;
  /** @ignore */
  _renderButton?: (params: ButtonParams) => React.ReactNode;
  defaultValue?: TValue;
  /**
   * Отключает использование портала
   */
  disablePortal?: boolean;
  disabled?: boolean;
  /**
   * Визуально показать наличие ошибки.
   */
  error?: boolean;
  filterItem?: (value: TValue, item: TItem, pattern: string) => boolean;
  /**
   * Набор значений. Поддерживаются любые перечисляемые типы, в том числе
   * `Array`, `Map`, `Immutable.Map`.
   *
   * Элементы воспринимаются следующим образом: если элемент — это массив, то
   * первый элемент является значением, второй — отображается в списке,
   * а третий – комментарий;
   * если элемент не является массивом, то он используется и для отображения,
   * и для значения.
   *
   * Для вставки разделителя можно использовать `Select.SEP`.
   *
   * Вставить невыделяемый элемент со своей разметкой можно так:
   * ```
   * <Select ...
   *   items={[Select.static(() => <div>My Element</div>)]}
   * />
   * ```
   *
   * Чтобы добавить стандартный отступ для статического элемента:
   * ```
   * <Select.Item>My Element</Select.Item>
   * ```
   */
  items?: Array<[TValue, TItem, React.ReactNode?] | TItem | React.ReactElement | (() => React.ReactElement)>;
  maxMenuHeight?: number;
  maxMobileMenuHeight?: number;
  maxWidth?: React.CSSProperties['maxWidth'];
  menuAlign?: 'left' | 'right';
  menuWidth?: React.CSSProperties['width'];
  onValueChange?: (value: TValue) => void;
  onClose?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  onOpen?: () => void;
  placeholder?: React.ReactNode;
  /**
   * Функция для отрисовки элемента в выпадающем списке. Аргументы — *value*,
   * *item*.
   */
  renderItem?: (value: TValue, item?: TItem) => React.ReactNode;
  /**
   * Функция для отрисовки выбранного элемента. Аргументы — *value*, *item*.
   */
  renderValue?: (value: TValue, item?: TItem) => React.ReactNode;
  /**
   * Функция для сравнения `value` с элементом из `items`
   */
  areValuesEqual?: (value1: TValue, value2: TValue) => boolean;
  /**
   * Показывать строку поиска в списке.
   */
  search?: boolean;
  value?: TValue;
  width?: number | string;
  warning?: boolean;
  use?: ButtonUse;
  size?: ButtonSize;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /**
   * Текст заголовка выпдающего меню в мобильной версии
   */
  mobileMenuHeaderText?: string;
}

export interface SelectState<TValue> extends MobileLayoutState {
  opened: boolean;
  searchPattern: string;
  value: Nullable<TValue>;
}

interface FocusableReactElement extends React.ReactElement<any> {
  focus: (event?: any) => void;
}

@mobileLayout
@locale('Select', SelectLocaleHelper)
export class Select<TValue = {}, TItem = {}> extends React.Component<SelectProps<TValue, TItem>, SelectState<TValue>> {
  public static __KONTUR_REACT_UI__ = 'Select';

  public static propTypes = {
    areValuesEqual: PropTypes.func,
    defaultValue: PropTypes.any,
    disablePortal: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    filterItem: PropTypes.func,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    maxMenuHeight: PropTypes.number,
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    placeholder: PropTypes.node,
    renderItem: PropTypes.func,
    renderValue: PropTypes.func,
    search: PropTypes.bool,
    value: PropTypes.any,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  public static defaultProps = {
    renderValue,
    renderItem,
    areValuesEqual,
    filterItem,
    use: 'default',
  };

  public static Item = Item;
  public static SEP = () => <MenuSeparator />;

  public static static = (element: React.ReactElement | (() => React.ReactElement)) => {
    invariant(
      React.isValidElement(element) || typeof element === 'function',
      'Select.static(element) expects element to be a valid react element.',
    );
    return element;
  };

  public state: SelectState<TValue> = {
    opened: false,
    value: this.props.defaultValue,
    searchPattern: '',
  };

  private theme!: Theme;
  private readonly locale!: SelectLocale;
  private menu: Nullable<Menu>;
  private buttonElement: FocusableReactElement | null = null;
  private getProps = createPropsGetter(Select.defaultProps);

  public componentDidUpdate(_prevProps: SelectProps<TValue, TItem>, prevState: SelectState<TValue>) {
    if (!prevState.opened && this.state.opened) {
      window.addEventListener('popstate', this.close);
    }
    if (prevState.opened && !this.state.opened) {
      window.removeEventListener('popstate', this.close);
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider value={getSelectTheme(theme, this.props)}>{this.renderMain()}</ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * @public
   */
  public open = () => {
    if (!this.state.opened) {
      this.setState({ opened: true });

      if (this.props.onOpen) {
        this.props.onOpen();
      }
    }
  };

  /**
   * @public
   */
  public close = () => {
    if (this.state.opened) {
      this.setState({ opened: false, searchPattern: '' });

      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  /**
   * @public
   */
  public focus = () => {
    if (this.buttonElement && this.buttonElement.focus) {
      this.buttonElement.focus();
    }
  };

  private getMenuRenderer() {
    if (this.isMobile()) {
      return this.renderMobileMenu();
    }

    return this.renderMenu();
  }

  private renderMain() {
    const buttonParams = this.getDefaultButtonParams();
    const button = this.getButton(buttonParams);

    const isMobile = this.isMobile();

    const style = {
      width: this.props.width,
      maxWidth: this.props.maxWidth || undefined,
    };

    const openButton = (
      <span className={cx({ [jsStyles.root()]: true, [jsStyles.rootMobile(this.theme)]: isMobile })} style={style}>
        {button}
        {!this.props.disabled && this.state.opened && this.getMenuRenderer()}
      </span>
    );

    return (
      <CommonWrapper {...this.props}>
        {isMobile ? (
          openButton
        ) : (
          <RenderLayer onClickOutside={this.close} onFocusOutside={this.close} active={this.state.opened}>
            {openButton}
          </RenderLayer>
        )}
      </CommonWrapper>
    );
  }

  private getDefaultButtonParams = (): ButtonParams => {
    const { label, isPlaceholder } = this.renderLabel();

    const buttonParams: ButtonParams = {
      opened: this.state.opened,
      label,
      isPlaceholder,
      onClick: this.toggle,
      onKeyDown: this.handleKey,
    };

    return buttonParams;
  };

  private renderLabel() {
    const value = this.getValue();
    const item = this.getItemByValue(value);

    if (item != null || value != null) {
      return {
        label: this.getProps().renderValue(value, item),
        isPlaceholder: false,
      };
    }

    return {
      label: <span>{this.props.placeholder || this.locale?.placeholder}</span>,
      isPlaceholder: true,
    };
  }

  private getLeftIconClass(size: ButtonSize | undefined) {
    if (this.props.use === 'link') {
      return jsStyles.leftIconLink(this.theme);
    }

    switch (size) {
      case 'large':
        return jsStyles.leftIconLarge(this.theme);
      case 'medium':
        return jsStyles.leftIconMedium(this.theme);
      case 'small':
      default:
        return jsStyles.leftIconSmall(this.theme);
    }
  }

  private renderDefaultButton(params: ButtonParams) {
    const buttonProps: ButtonProps = {
      ...filterProps(this.props, PASS_BUTTON_PROPS),
      align: 'left' as React.CSSProperties['textAlign'],
      disabled: this.props.disabled,
      width: '100%',
      onClick: params.onClick,
      onKeyDown: params.onKeyDown,
      active: params.opened,
    };

    const labelProps = {
      className: cn({
        [jsStyles.label()]: this.props.use !== 'link',
        [jsStyles.placeholder(this.theme)]: params.isPlaceholder,
        [jsStyles.placeholderDisabled(this.theme)]: params.isPlaceholder && this.props.disabled,
        [jsStyles.customUsePlaceholder()]: params.isPlaceholder && this.props.use !== 'default',
      }),
      style: {
        paddingRight: this.getSelectIconGap(),
      },
    };

    const useIsCustom = this.props.use !== 'default';

    return (
      <Button {...buttonProps}>
        <div className={jsStyles.selectButtonContainer()}>
          {this.props._icon && <div className={this.getLeftIconClass(this.props.size)}>{this.props._icon}</div>}
          <span {...labelProps}>{params.label}</span>

          <div className={cn(jsStyles.arrowWrap(this.theme), useIsCustom && jsStyles.customUseArrow())}>
            <ArrowChevronDownIcon />
          </div>
        </div>
      </Button>
    );
  }

  private getSelectIconGap(): number {
    const getArrowPadding = () => {
      switch (this.props.size) {
        case 'large':
          return this.theme.selectIconGapLarge;
        case 'medium':
          return this.theme.selectIconGapMedium;
        case 'small':
        default:
          return this.theme.selectIconGapSmall;
      }
    };
    const arrowLeftPadding = parseFloat(getArrowPadding()) || 0;

    return arrowLeftPadding;
  }

  private renderMenu(): React.ReactNode {
    const search = this.props.search ? this.getSearch() : null;

    const value = this.getValue();

    return (
      <DropdownContainer
        getParent={this.dropdownContainerGetParent}
        offsetY={-1}
        align={this.props.menuAlign}
        disablePortal={this.props.disablePortal}
      >
        <Menu
          ref={this.refMenu}
          width={this.props.menuWidth}
          onItemClick={this.close}
          maxHeight={this.props.maxMenuHeight}
        >
          {search}
          {this.getMenuItems(value)}
        </Menu>
      </DropdownContainer>
    );
  }

  private renderMobileMenu(): React.ReactNode {
    const search = this.props.search ? this.getSearch(true) : null;
    const value = this.getValue();

    const isWithSearch = Boolean(search);

    return (
      <MobileMenu
        onClose={this.close}
        headerChildComponent={search}
        caption={this.props.mobileMenuHeaderText}
        useFullHeight={isWithSearch}
        maxMenuHeight={this.props.maxMobileMenuHeight}
      >
        <Menu onItemClick={this.close} renderOnlyItems>
          {this.getMenuItems(value)}
        </Menu>
      </MobileMenu>
    );
  }

  private getSearch = (withoutWrappper?: boolean) => {
    const input = <Input ref={this.focusInput} onValueChange={this.handleSearch} width="100%" />;

    if (withoutWrappper) {
      return input;
    }

    return <div className={jsStyles.search()}>{input}</div>;
  };

  private getMenuItems = (value: Nullable<TValue>) => {
    const isMobile = this.isMobile();

    return this.mapItems(
      (iValue: TValue, item: TItem | (() => React.ReactNode), i: number, comment: Nullable<React.ReactNode>) => {
        if (isFunction(item)) {
          const element = item();

          if (React.isValidElement(element)) {
            return React.cloneElement(element, { key: i });
          }

          return null;
        }

        if (React.isValidElement(item)) {
          return React.cloneElement(item, { key: i });
        }

        return (
          <MenuItem
            key={i}
            state={this.getProps().areValuesEqual(iValue, value) ? 'selected' : null}
            onClick={this.select.bind(this, iValue)}
            comment={comment}
            isMobile={isMobile}
          >
            {this.getProps().renderItem(iValue, item)}
          </MenuItem>
        );
      },
    );
  };

  private isMobile = () => {
    const { layout } = this.state;
    return layout === LayoutMode.Mobile;
  };

  private dropdownContainerGetParent = () => {
    return ReactDOM.findDOMNode(this);
  };

  private focusInput = (input: Input) => {
    // fix cases when an Input is rendered in portal
    setTimeout(() => input?.focus(), 0);
  };

  private refMenu = (menu: Menu) => {
    this.menu = menu;
  };

  private toggle = () => {
    if (this.state.opened) {
      this.close();
    } else {
      this.open();
    }
  };

  private handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!this.state.opened) {
      if (isKeySpace(e) || isKeyArrowVertical(e)) {
        e.preventDefault();
        this.open();
      }
    } else {
      switch (true) {
        case isKeyEscape(e):
          this.focus();
          this.close();
          break;
        case isKeyArrowUp(e):
          e.preventDefault();
          if (this.menu) {
            this.menu.up();
          }
          break;
        case isKeyArrowDown(e):
          e.preventDefault();
          if (this.menu) {
            this.menu.down();
          }
          break;
        case isKeyEnter(e):
          e.preventDefault(); // To prevent form submission.
          if (this.menu) {
            this.menu.enter(e);
          }
          break;
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  private handleSearch = (value: string) => {
    this.setState({ searchPattern: value });
  };

  private select(value: TValue) {
    this.focus();
    this.setState({ opened: false, value });

    if (this.props.onValueChange && !this.getProps().areValuesEqual(this.getValue(), value)) {
      this.props.onValueChange(value);
    }
  }

  private getValue() {
    if (this.props.value !== undefined) {
      return this.props.value;
    }
    return this.state.value;
  }

  private mapItems(fn: (value: TValue, item: TItem, index: number, comment?: string) => React.ReactNode) {
    const { items } = this.props;
    if (!items) {
      return [];
    }
    const pattern = this.state.searchPattern && this.state.searchPattern.toLowerCase();

    const result: React.ReactNodeArray = [];
    let index = 0;
    for (const entry of items) {
      const [value, item, comment] = normalizeEntry(entry as TItem);

      if (!pattern || this.getProps().filterItem(value, item, pattern)) {
        result.push(fn(value, item, index, comment));
        ++index;
      }
    }

    return result;
  }

  private getItemByValue(value?: Nullable<TValue>) {
    if (value === null || value === undefined) {
      return null;
    }

    const items = this.props.items || [];

    for (const entry of items) {
      const [itemValue, item] = normalizeEntry(entry);

      if (this.getProps().areValuesEqual(itemValue, value)) {
        return item;
      }
    }
    return null;
  }

  private buttonRef = (element: FocusableReactElement | null) => {
    this.buttonElement = element;
  };

  private getButton = (buttonParams: ButtonParams) => {
    const button = this.props._renderButton
      ? this.props._renderButton(buttonParams)
      : this.renderDefaultButton(buttonParams);

    const buttonElement = React.Children.only(button);

    return React.isValidElement(buttonElement)
      ? React.cloneElement(buttonElement as React.ReactElement, {
          ref: this.buttonRef,
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur,
        })
      : buttonElement;
  };
}

function renderValue(value: any, item: any) {
  return item;
}

function renderItem(value: any, item: any) {
  return item;
}

function areValuesEqual(value1: any, value2: any) {
  return value1 === value2;
}

function normalizeEntry(entry: any) {
  if (Array.isArray(entry)) {
    return entry;
  } else {
    return [entry, entry, undefined];
  }
}

function filterItem(value: any, item: any, pattern: string) {
  if (item === Select.SEP) {
    return false;
  }
  if (React.isValidElement(item) || (isFunction(item) && React.isValidElement((item = item())))) {
    item = reactGetTextContent(item);
  }
  if (typeof item === 'number') {
    item = item.toString(10);
  }
  if (typeof item !== 'string') {
    return false;
  }
  return item.toLowerCase().indexOf(pattern) !== -1;
}
