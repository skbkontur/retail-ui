import events from 'add-event-listener';
import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import filterProps from '../filterProps';
import Input from '../Input';
import invariant from 'invariant';
import Link from '../Link';
import listenFocusOutside from '../../lib/listenFocusOutside';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';

import styles from './Select.less';

export type ButtonParams = {
  opened: bool;
  label: React.Element;
  onClick: () => void;
  onKeyDown: (event: SyntheticKeyboardEvent) => void;
};

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

class Select extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.any,

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
     * ```
     */
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

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

  static defaultProps = {
    placeholder: 'ничего не выбрано',
    renderValue,
    renderItem,
    filterItem,
  };

  static static(element) {
    invariant(
      React.isValidElement(element) || typeof element === 'function',
      'Select.static(element) expects element to be a valid react element.'
    );

    return element;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: false,
      value: props.defaultValue,
    };

    this._focusSubscribtion = null;
  }

  render() {
    var value = this._getValue();

    var label;
    if (value != null) {
      label = this.props.renderValue(
        value,
        getItemByValue(this.props.items, value)
      );
    } else {
      label = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    }

    const buttonParams = {
      opened: this.state.opened,
      label,
      onClick: this._toggle,
      onKeyDown: this.handleKey,
    };

    const style = {
      width: this.props.width,
    };
    if (this.props.maxWidth) {
      style.maxWidth = this.props.maxWidth;
    }

    return (
      <span className={styles.root} style={style}>
        {this.props._renderButton
          ? this.props._renderButton(buttonParams)
          : this.renderDefaultButton(buttonParams)}
        {!this.props.disabled && this.state.opened && this.renderMenu()}
      </span>
    );
  }

  renderDefaultButton(params: ButtonParams) {
    if (this.props.diadocLink) {
      return this.renderLinkButton(params);
    }

    const buttonProps = {
      ...filterProps(this.props, PASS_BUTTON_PROPS),

      align: 'left',
      disabled: this.props.disabled,
      _noPadding: true,
      width: '100%',
      onClick: params.onClick,
      onKeyDown: params.onKeyDown,
    };
    if (params.opened) {
      buttonProps.active = true;
    }

    if (this.props._icon) {
      Object.assign(buttonProps, {
        _noPadding: false,
        _noRightPadding: true,
        icon: this.props._icon,
      });
    }

    var labelProps = {
      className: classNames({
        [styles.label]: true,
        [styles.labelWithLeftIcon]: !!this.props._icon,
        [styles.labelIsOpened]: params.opened,
      }),
      style: {
        paddingRight: buttonProps.size === 'large'? '41px': '38px',
      },
    };

    return (
      <Button {...buttonProps}>
        <span {...labelProps}>
          <span className={styles.labelText}>{params.label}</span>
          <div className={styles.arrowWrap}>
            <div className={styles.arrow} />
          </div>
        </span>
      </Button>
    );
  }

  renderLinkButton(params: ButtonParams) {
    const linkProps = {
      disabled: params.disabled,
      icon: this.props.diadocLinkIcon,
      _button: true,
      _buttonOpened: params.opened,

      onClick: params.onClick,
      onKeyDown: params.onKeyDown,
    };

    return (
      <Link {...linkProps}>{params.label}</Link>
    );
  }

  renderMenu() {
    var search = null;
    if (this.props.search) {
      search = (
        <div className={styles.search}>
          <Input ref={(c) => c && ReactDOM.findDOMNode(c).focus()}
            onChange={this.handleSearch}
          />
        </div>
      );
    }

    var value = this._getValue();

    return (
      <DropdownContainer
        getParent={() => ReactDOM.findDOMNode(this)}
        offsetY={-1}
        ref={this._refMenuContainer}
        align={this.props.menuAlign}
      >
        <Menu
          ref={this._refMenu}
          width={this.props.menuWidth}
          onItemClick={this._close}
        >
          {search}
          {this.mapItems((iValue, item, i, comment) => {
            if (
              typeof item === 'function' ||
              React.isValidElement(item)
            ) {
              return React.cloneElement(
                typeof item === 'function' ? item() : item,
                {key: i},
              );
            }

            return (
              <MenuItem key={i}
                state={iValue === value ? 'selected' : null}
                onClick={this._select.bind(this, iValue)}
                comment={comment}
              >
                {this.props.renderItem(iValue, item)}
              </MenuItem>
            );
          })}
        </Menu>
      </DropdownContainer>
    );
  }

  _refMenuContainer = (el) => {
    if (this._focusSubscribtion) {
      this._focusSubscribtion.remove();
      this._focusSubscribtion = null;

      events.removeEventListener(
        document, 'mousedown', this._handleNativeDocClick
      );
    }

    if (el) {
      this._focusSubscribtion = listenFocusOutside(
        [ReactDOM.findDOMNode(this)], this._close
      );

      events.addEventListener(
        document, 'mousedown', this._handleNativeDocClick
      );

      events.addEventListener(window, 'popstate', this._close);
    }
  };

  _refMenu = (menu) => {
    this._menu = menu;
  };

  /**
   * @api
   */
  open() {
    this._open();
  }

  _handleNativeDocClick = (event) => {
    const target = event.target || event.srcElement;
    if (!ReactDOM.findDOMNode(this).contains(target)) {
      this._close();
    }
  };

  _toggle = () => {
    if (this.state.opened) {
      this._close();
    } else {
      this._open();
    }
  };

  _open = () => {
    if (!this.state.opened) {
      this.setState({opened: true});

      const {onOpen} = this.props;
      onOpen && onOpen();
    }
  };

  _close = () => {
    if (this.state.opened) {
      this.setState({opened: false});
    }

    events.removeEventListener(window, 'popstate', this._close);
  };

  handleKey = (e) => {
    var key = e.key;
    if (!this.state.opened) {
      if (key === ' ' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        this._open();
      }
    } else {
      if (key === 'Escape') {
        this.setState({opened: false}, () => {
          ReactDOM.findDOMNode(this).focus();
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._menu && this._menu.up();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._menu && this._menu.down();
      } else if (e.key === 'Enter') {
        e.preventDefault(); // To prevent form submission.
        this._menu && this._menu.enter();
      }
    }
  };

  handleSearch = event => {
    this.setState({searchPattern: event.target.value});
  };

  _select(value) {
    this.setState({
      opened: false,
      value,
    }, () => {
      setTimeout(() => {
        ReactDOM.findDOMNode(this).focus();
      }, 0);
    });
    if (this.props.onChange) {
      this.props.onChange({target: {value}}, value);
    }
  }

  _getValue() {
    if (this.props.value !== undefined) {
      return this.props.value;
    }
    return this.state.value;
  }

  mapItems(fn) {
    const pattern = this.state.searchPattern &&
      this.state.searchPattern.toLowerCase();

    const ret = [];
    let index = 0;
    for (const entry of this.props.items) {
      const [value, item, comment] = normalizeEntry(entry);
      if (!pattern || this.props.filterItem(value, item, pattern)) {
        ret.push(fn(value, item, index, comment));
        ++index;
      }
    }

    return ret;
  }
}

Select.SEP = () => <MenuSeparator />;

Select.Item = class Item extends React.Component {
  render() {
    return <MenuItem>{this.props.children}</MenuItem>;
  }
};

function renderValue(value, item) {
  return item;
}

function renderItem(value, item) {
  return item;
}

function getItemByValue(items, value) {
  for (let entry of items) {
    entry = normalizeEntry(entry);
    if (entry[0] === value) {
      return entry[1];
    }
  }
  return null;
}

function normalizeEntry(entry) {
  if (Array.isArray(entry)) {
    return entry;
  } else {
    return [entry, entry];
  }
}

function filterItem(value, item, pattern) {
  return item.toLowerCase().indexOf(pattern) !== -1;
}

export default Select;
