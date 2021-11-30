import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import invariant from 'invariant';

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
import { isFunction, isNonNullable } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { ArrowChevronDownIcon } from '../../internal/icons/16px';
import { cx } from '../../lib/theming/Emotion';

import { Item } from './Item';
import { SelectLocale, SelectLocaleHelper } from './locale';
import { styles } from './Select.styles';
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
   * Cостояние валидации при ошибке.
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
  /**
   * Cостояние валидации при предупреждении.
   */
  warning?: boolean;
  use?: ButtonUse;
  size?: ButtonSize;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

export interface SelectState<TValue> {
  opened: boolean;
  searchPattern: string;
  value: Nullable<TValue>;
}

interface FocusableReactElement extends React.ReactElement<any> {
  focus: (event?: any) => void;
}

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

  private renderMain() {
    const { label, isPlaceholder } = this.renderLabel();

    const buttonParams: ButtonParams = {
      opened: this.state.opened,
      label,
      isPlaceholder,
      onClick: this.toggle,
      onKeyDown: this.handleKey,
    };

    const style = {
      width: this.props.width,
      maxWidth: this.props.maxWidth || undefined,
    };

    const button = this.getButton(buttonParams);

    return (
      <CommonWrapper {...this.props}>
        <RenderLayer onClickOutside={this.close} onFocusOutside={this.close} active={this.state.opened}>
          <span className={styles.root()} style={style}>
            {button}
            {!this.props.disabled && this.state.opened && this.renderMenu()}
          </span>
        </RenderLayer>
      </CommonWrapper>
    );
  }

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
      label: <span>{this.props.placeholder || this.locale.placeholder}</span>,
      isPlaceholder: true,
    };
  }

  private getLeftIconClass(size: ButtonSize | undefined) {
    if (this.props.use === 'link') {
      return styles.leftIconLink(this.theme);
    }

    switch (size) {
      case 'large':
        return styles.leftIconLarge(this.theme);
      case 'medium':
        return styles.leftIconMedium(this.theme);
      case 'small':
      default:
        return styles.leftIconSmall(this.theme);
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
      className: cx({
        [styles.label()]: this.props.use !== 'link',
        [styles.placeholder(this.theme)]: params.isPlaceholder,
        [styles.customUsePlaceholder()]: params.isPlaceholder && this.props.use !== 'default',
        [styles.placeholderDisabled(this.theme)]: params.isPlaceholder && this.props.disabled,
      }),
      style: {
        paddingRight: this.getSelectIconGap(),
      },
    };

    const useIsCustom = this.props.use !== 'default';

    return (
      <Button {...buttonProps}>
        <div className={styles.selectButtonContainer()}>
          {this.props._icon && <div className={this.getLeftIconClass(this.props.size)}>{this.props._icon}</div>}
          <span {...labelProps}>{params.label}</span>

          <div
            className={cx(styles.arrowWrap(this.theme), {
              [styles.arrowDisabled(this.theme)]: this.props.disabled,
              [styles.customUseArrow()]: useIsCustom,
            })}
          >
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
    const search = this.props.search ? (
      <div className={styles.search()}>
        <Input ref={this.focusInput} onValueChange={this.handleSearch} width="100%" />
      </div>
    ) : null;

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
          {this.mapItems(
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
                >
                  {this.getProps().renderItem(iValue, item)}
                </MenuItem>
              );
            },
          )}
        </Menu>
      </DropdownContainer>
    );
  }

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
    if (isNonNullable(this.props.value)) {
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
