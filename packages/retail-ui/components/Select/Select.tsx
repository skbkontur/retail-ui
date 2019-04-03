import { locale } from '../LocaleProvider/decorators';
import { ButtonUse, ButtonSize, ButtonProps } from '../Button/Button';

import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Button from '../Button';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import filterProps from '../filterProps';
import Input from '../Input';
import invariant from 'invariant';
import Link from '../Link';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import RenderLayer from '../RenderLayer';
import Item from './Item';
import { SelectLocale, SelectLocaleHelper } from './locale';

import styles from './Select.less';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { isFunction } from '../../lib/utils';

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

export interface SelectProps<TValue, TItem> {
  /** @ignore */
  _icon?: React.ReactElement<any>;
  /** @ignore */
  _renderButton?: (params: ButtonParams) => React.ReactNode;
  defaultValue?: TValue;
  /** @ignore */
  diadocLinkIcon?: React.ReactElement<any>;
  disablePortal?: boolean;
  disabled?: boolean;
  error?: boolean;
  filterItem?: (value: TValue, item: TItem, pattern: string) => boolean;
  items?: Array<[TValue, TItem] | TItem | React.ReactElement<any> | (() => React.ReactElement<any>)>;
  maxMenuHeight?: number;
  maxWidth?: React.CSSProperties['maxWidth'];
  menuAlign?: 'left' | 'right';
  menuWidth?: React.CSSProperties['width'];
  onChange?: (e: { target: { value: TValue } }, value: TValue) => void;
  onClose?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLElement>) => void;
  onOpen?: () => void;
  placeholder?: React.ReactNode;
  renderItem?: (value: TValue, item?: TItem) => React.ReactNode;
  renderValue?: (value: TValue, item?: TItem) => React.ReactNode;
  areValuesEqual?: (value1: TValue, value2: TValue) => boolean;
  search?: boolean;
  value?: TValue;
  width?: number | string;
  warning?: boolean;
  use?: ButtonUse;
  size?: ButtonSize;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

export interface SelectState<TValue> {
  opened: boolean;
  searchPattern?: string;
  value: Nullable<TValue>;
}

interface FocusableReactElement extends React.ReactElement<any> {
  focus: (event?: any) => void;
}

@locale('Select', SelectLocaleHelper)
class Select<TValue = {}, TItem = {}> extends React.Component<SelectProps<TValue, TItem>, SelectState<TValue>> {
  public static propTypes = {
    /**
     * Функция для сравнения `value` с элементом из `items`
     */
    areValuesEqual: PropTypes.func,

    defaultValue: PropTypes.any,

    /**
     * Отключает использование портала
     */
    disablePortal: PropTypes.bool,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    filterItem: PropTypes.func,

    /**
     * Набор значений. Поддерживаются любые перечисляемые типы, в том числе
     * `Array`, `Map`, `Immutable.Map`.
     *
     * Элементы воспринимаются следующим образом: если элемент — это массив, то
     * первый элемент является значением , второй — отображается в списке,
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
     * ```?
     */
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

    maxMenuHeight: PropTypes.number,

    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.node,

    /**
     * Функция для отрисовки элемента в выпадающем списке. Аргументы — *value*,
     * *item*.
     */
    renderItem: PropTypes.func,

    /**
     * Функция для отрисовки выбранного элемента. Аргументы — *value*, *item*.
     */
    renderValue: PropTypes.func,

    /**
     * Показывать строку поиска в списке.
     */
    search: PropTypes.bool,

    value: PropTypes.any,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,
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
  public static static = (element: React.ReactNode | (() => React.ReactNode)) => {
    invariant(
      React.isValidElement(element) || typeof element === 'function',
      'Select.static(element) expects element to be a valid react element.',
    );
    return element;
  };

  public state: SelectState<TValue> = {
    opened: false,
    value: this.props.defaultValue,
  };

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
      <RenderLayer onClickOutside={this.close} onFocusOutside={this.close} active={this.state.opened}>
        <span className={styles.root} style={style}>
          {button}
          {!this.props.disabled && this.state.opened && this.renderMenu()}
        </span>
      </RenderLayer>
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
      this.setState({ opened: false });

      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  /**
   * @public
   */
  public focus() {
    if (this.buttonElement && this.buttonElement.focus) {
      this.buttonElement.focus();
    }
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
      label: (
        <span
          className={classNames({
            [styles.customUsePlaceholder]: this.props.use !== 'default',
          })}
        >
          {this.props.placeholder || this.locale.placeholder}
        </span>
      ),
      isPlaceholder: true,
    };
  }

  private renderDefaultButton(params: ButtonParams) {
    if (this.props.diadocLinkIcon) {
      return this.renderLinkButton(params);
    }

    const buttonProps: ButtonProps = {
      ...filterProps(this.props, PASS_BUTTON_PROPS),
      align: 'left' as React.CSSProperties['textAlign'],
      disabled: this.props.disabled,
      _noPadding: true,
      width: '100%',
      onClick: params.onClick,
      onKeyDown: params.onKeyDown,
      active: params.opened,
    };

    if (this.props._icon) {
      Object.assign(buttonProps, {
        _noPadding: false,
        _noRightPadding: true,
        icon: this.props._icon,
      });
    }

    const labelProps = {
      className: classNames({
        [styles.label]: this.props.use !== 'link',
        [styles.labelWithLeftIcon]: !!this.props._icon,
        [styles.placeholder]: params.isPlaceholder,
        [styles.customUsePlaceholder]: params.isPlaceholder && this.props.use !== 'default',
      }),
      style: {
        paddingRight: (buttonProps.size === 'large' ? 31 : 28) + (!!this.props._icon ? 10 : 0),
      },
    };

    const useIsCustom = this.props.use !== 'default';

    return (
      <Button {...buttonProps}>
        <span {...labelProps}>
          <span className={styles.labelText}>{params.label}</span>
        </span>
        <div className={styles.arrowWrap}>
          <div className={classNames(styles.arrow, useIsCustom && styles.customUseArrow)} />
        </div>
      </Button>
    );
  }

  private renderLinkButton(params: ButtonParams): React.ReactNode {
    const linkProps = {
      disabled: params.disabled,
      icon: this.props.diadocLinkIcon,
      _button: true,
      _buttonOpened: params.opened,

      onClick: params.onClick,
      onKeyDown: params.onKeyDown,
    };

    return <Link {...linkProps}>{params.label}</Link>;
  }

  private renderMenu(): React.ReactNode {
    const search = this.props.search ? (
      <div className={styles.search}>
        <Input ref={this.focusInput} onChange={this.handleSearch} />
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
    if (input) {
      input.focus();
    }
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

  private handleKey = (event: React.KeyboardEvent<HTMLElement>) => {
    const key = event.key;
    if (!this.state.opened) {
      if (key === ' ' || key === 'ArrowUp' || key === 'ArrowDown') {
        event.preventDefault();
        this.open();
      }
    } else {
      if (key === 'Escape') {
        this.setState({ opened: false }, this.focus);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (this.menu) {
          this.menu.up();
        }
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (this.menu) {
          this.menu.down();
        }
      } else if (event.key === 'Enter') {
        event.preventDefault(); // To prevent form submission.
        if (this.menu) {
          this.menu.enter(event);
        }
      }
    }
  };

  private handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchPattern: event.target.value });
  };

  private select(value: TValue) {
    this.setState(
      {
        opened: false,
        value,
      },
      () => {
        setTimeout(this.focus, 0);
      },
    );

    if (this.props.onChange && !this.getProps().areValuesEqual(this.getValue(), value)) {
      this.props.onChange({ target: { value } }, value);
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

    return React.cloneElement(buttonElement, {
      ref: (element: FocusableReactElement) => {
        this.buttonRef(element);
      },
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
    });
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
  return item.toLowerCase().indexOf(pattern) !== -1;
}

export default Select;
