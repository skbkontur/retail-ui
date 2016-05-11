/* @flow */

import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../filterProps';
import Upgrades from '../../lib/Upgrades';

import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import ScrollContainer from '../ScrollContainer';

import styles from './ComboBox.less';

const INPUT_PASS_PROPS = {
  error: true,
  warning: true,
  width: true,
};

const STATIC_ITEM = Symbol('static_item');

type StaticItem = {
  __type: typeof STATIC_ITEM,
  item: (() => React.Element) | React.Element,
};

type Value = any;
type Info = any;

type SourceResult = {
  values: Array<Value | StaticItem>,
  infos?: Array<Info>,
  total?: number,
};

type RecoverResult = {
  value: Value,
  info?: Info,
};

type RecoverFunc = (searchString: string) => RecoverResult;

type Props = {
  disabled?: bool,
  error?: bool,
  info?: Info | (v: Value) => Promise<Info>,
  menuAlign: 'left' | 'right',
  openButton?: bool,
  placeholder?: string,
  recover?: (RecoverFunc | bool),
  renderItem: (value: Value, info: Info) => React.Element,
  renderValue: (value: Value, info: ?Info) => React.Element,
  source: (searchText: string) => Promise<SourceResult>,
  warning?: bool,
  value: ?Value,
  width: (number | string),
  onChange: (event: {target: {value: Value}}, value: Value) => void,

  alkoValueToText: (value: Value) => string,
};

type State = {
  opened: bool,
  searchText: string,
  value: Value,
  info: Info,
  result: ?SourceResult,
  selected: number,
};

class ComboBox extends React.Component {
  static Item = class Item extends React.Component {
    render() {
      return <div className={styles.menuItem}>{this.props.children}</div>;
    }
  };

  static static(item: ((() => React.Element) | React.Element)) {
    return {
      __type: STATIC_ITEM,
      item,
    };
  }

  static propTypes = {
    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    /**
     * Данные, которые будут переданы в функции для отрисовки значений
     * (`renderValue` и `renderItem`).
     */
    info: PropTypes.oneOfType([
      PropTypes.any,
      PropTypes.func,
    ]),

    menuAlign: PropTypes.oneOf(['left', 'right']),

    /**
     * Показывать кнопку-треугольник для показа резаультатов.
     */
    openButton: PropTypes.bool,

    placeholder: PropTypes.string,

    /**
     * Функция для обработки неожиданного ввода. Если пользователь ввел что-то в
     * строку поиска и нажал Enter или ушел из поля, не выбрав значение, то
     * будет вызвана эта функция, которая может вернуть значение, которое будет
     * использовано как будто оно было выбрано.
     *
     * Возвращаемое значение может быть `null`, либо объектом такой формы:
     * `{value: any, info?: any}`.
     *
     * Если задать это поле в `true`, то будет использована такая функция:
     * `(searchText) => searchText`.
     */
    recover: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),

    renderItem: PropTypes.func,

    renderValue: PropTypes.func,

    source: PropTypes.func.isRequired,

    value: PropTypes.any,

    /**
     * Визуально показать наличие предупреждения.
     */
    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,
  };

  static defaultProps = {
    renderItem,
    renderValue,
    placeholder: 'Пусто',
    width: 250,
    menuAlign: 'left',
  };

  props: Props;
  state: State;

  _focusable: ?HTMLInputElement;
  _scroll: ?ScrollContainer;
  _itemNodes: {[_: number]: HTMLElement};
  _recoverResult: ?RecoverResult;

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      opened: false,
      searchText: '',
      value: props.value !== undefined ? props.value : null,
      info: null,
      result: null,
      selected: -1,
    };
    this._focusable = null;
    this._scroll = null;
    this._itemNodes = {};
    this._recoverResult = null;
  }

  render() {
    const className = classNames({
      [styles.root]: true,
      [styles.deprecated_oldSize]: !Upgrades.__height34,
    });

    let valueEl;
    if (this.state.opened) {
      valueEl = this.renderOpenedValue();
    } else {
      valueEl = this.renderClosedValue();
    }

    return (
      <label className={className} style={{width: this.props.width}}>
        {valueEl}
        {this.state.opened && this.renderMenu()}
        {this.props.openButton && (
          <div className={styles.arrow} onMouseDown={this._handleArrowMouseDown}
            onClick={this._handleArrowClick}
          />
        )}
      </label>
    );
  }

  renderOpenedValue() {
    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);
    return (
      <div className={styles.input}>
        <Input ref={this._refFocusable} {...inputProps}
          value={this.state.searchText} rightIcon={<span />}
          disabled={this.props.disabled} onChange={this._handleInputChange}
          onKeyDown={this._handleInputKey} onBlur={this._handleInputBlur}
        />
      </div>
    );
  }

  renderClosedValue() {
    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);

    let value;
    if (this.state.value == null) {
      value = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    } else if (this.props.info) {
      if (this.state.info) {
        value = this.props.renderValue(this.state.value, this.state.info);
      } else {
        value = <i>Загрузка</i>;
      }
    } else {
      value = this.props.renderValue(this.state.value, null);
    }

    return (
      <InputLikeText ref={this._refFocusable} {...inputProps}
        onClick={this._handleValueClick} onKeyDown={this._handleValueKey}
        onKeyPress={this._handleValueKeyPress}
      >
        {value}
      </InputLikeText>
    );
  }

  renderMenu() {
    const {result} = this.state;
    if (!result) {
      return null;
    }
    const menuClassName = classNames({
      [styles.menu]: true,
      [styles.menuAlignRight]: this.props.menuAlign === 'right',
    });
    return (
      <div className={styles.menuHolder}>
        <div className={menuClassName}>
          <ScrollContainer ref={this._refScroll} maxHeight={200}>
            {mapResult(result, (value, info, i) => {
              if (value && value.__type === STATIC_ITEM) {
                const item: StaticItem = value;
                return React.cloneElement(
                  typeof item.item === 'function' ? item.item() : item.item,
                  {key: i},
                );
              }
              const className = classNames({
                [styles.menuItem]: true,
                [styles.menuItemSelected]: this.state.selected === i,
              });
              return (
                <div key={i} ref={(el) => this._refItem(el, i)}
                  className={className}
                  onMouseDown={(e) => this._handleItemClick(e, value, info)}
                  onMouseEnter={(e) => this.setState({selected: i})}
                  onMouseLeave={(e) => this.setState({selected: -1})}
                >
                  {this.props.renderItem(value, info)}
                </div>
              );
            })}
          </ScrollContainer>
        </div>
      </div>
    );
  }

  focus() {
    if (this._focusable) {
      this._focusable.focus();
    }
  }

  componentWillMount() {
    if (this.state.value != null) {
      this._loadItem(this.state.value);
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.value !== undefined) {
      this.setState({value: newProps.value});
      this._resetItem(newProps.value);
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  // $FlowIssue 850
  _refFocusable = (el: ?HTMLInputElement) => {
    this._focusable = el && (el.focus ? el : ReactDOM.findDOMNode(el));
  };

  // $FlowIssue 850
  _refScroll = (el: ?ScrollContainer) => {
    this._scroll = el;
  };

  _refItem(el: ?HTMLElement, index: number) {
    if (el) {
      this._itemNodes[index] = el;
    } else {
      delete this._itemNodes[index];
    }
  }

  // $FlowIssue 850
  _handleInputChange = (event: any) => {
    const pattern = event.target.value;
    this.setState({
      opened: true,
      searchText: pattern,
    });
    this._fetchList(pattern);
  };

  // $FlowIssue 850
  _handleInputKey = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this._moveSelection(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._moveSelection(1);
        break;
      case 'Enter':
        event.preventDefault();
        this._close(() => {
          this._focus();
        });

        const {result, selected} = this.state;
        const value = result && result.values[selected];
        const info = result && result.infos && result.infos[selected];
        if (value) {
          this._change(value, info);
        } else {
          this._tryRecover();
        }
        break;
      case 'Escape':
        this._close(() => {
          this._focus();
        });
        break;
    }
  };

  // $FlowIssue 850
  _handleInputBlur = () => {
    const {result, searchText} = this.state;
    const value = result && result.values.find((v) => v === searchText);
    this.setState({opened: false});
    if (value) {
      this._change(value);
    } else {
      this._tryRecover();
    }
  };

  // $FlowIssue 850
  _handleValueClick = () => {
    this.setState({
      opened: true,
      searchText: '',
      result: null,
    });
    this._alkoSetCurrentSearchText(this.state.value);
    this._focusAsync();
    this._fetchList('');
  };

  // $FlowIssue 850
  _handleValueKeyPress = (event) => {
    // Prevent current char from being appended to the input element (chrome).
    event.preventDefault();
    const str = String.fromCharCode(event.charCode);
    this.setState(
      {
        opened: true,
        searchText: str,
      },
      () => {
        if (this._focusable) {
          this._focusable.setSelectionRange(1, 1);
        }
      }
    );
  };

  // $FlowIssue 850
  _handleValueKey = (event) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.setState({
          opened: true,
          searchText: '',
        }, () => {
          this._focus();
        });
        this._alkoSetCurrentSearchText(this.state.value);
        this._fetchList('');
        break;
    }
  };

  _handleItemClick(event: MouseEvent, value: Value, info: Info) {
    if (event.button !== 0) {
      return;
    }

    this._close();
    this._change(value, info);
    this._focusAsync();
  }

  // $FlowIssue 850
  _handleArrowMouseDown = (event) => {
    event.preventDefault();
  };

  // $FlowIssue 850
  _handleArrowClick = (event) => {
    if (!this.state.opened) {
      this._handleValueClick();
    }
  };

  _resetItem(value: Value) {
    if (this.state.value === value) {
      return;
    }

    let info;
    if (this._recoverResult && this._recoverResult.value === value) {
      info = this._recoverResult.info;
    } else {
      info = this._findInfoByValue(value);
    }
    this.setState({info});
    if (!info && typeof this.props.info) {
      this._loadItem(value);
    }
  }

  _loadItem(value: any) {
    if (typeof this.props.info === 'function') {
      this.props.info(value).then((info) => {
        if (value === this.state.value) {
          this.setState({info});
        }
      });
    }
  }

  _fetchList(pattern: string) {
    this.props.source(pattern).then((result) => {
      if (this.state.searchText === pattern) {
        this.setState({
          selected: -1,
          result,
        });
      }
    });
  }

  // $FlowIssue 850
  _focus = () => {
    if (this._focusable) {
      this._focusable.focus();
    }
  };

  _focusAsync() {
    process.nextTick(this._focus);
  }

  _moveSelection(step: number) {
    if (!this.state.result) {
      return;
    }

    let selected = this.state.selected;
    do {
      selected += step;
      if (selected < 0) {
        selected = this.state.result.values.length - 1;
      }
      if (selected >= this.state.result.values.length) {
        selected = 0;
      }
      const value = this.state.result.values[selected];
      if (value && value.__type !== STATIC_ITEM) {
        break;
      }
    } while (selected !== this.state.selected);
    this.setState({selected}, this._scrollToSelected);
  }

  // $FlowIssue 850
  _scrollToSelected = () => {
    if (this._scroll) {
      this._scroll.scrollTo(this._itemNodes[this.state.selected]);
    }
  };

  _tryRecover() {
    const searchText = this.state.searchText;
    let recovered: ?RecoverResult = null;
    if (typeof this.props.recover === 'function') {
      recovered = this.props.recover(searchText);
    } else if (this.props.recover === true) {
      recovered = {value: searchText};
    }

    this._recoverResult = recovered;
    if (recovered) {
      this._change(recovered.value);
    }
  }

  _change(value: Value, info?: Info) {
    if (this.props.value === undefined) {
      this.setState({value});
      this._resetItem(value);
    }
    if (this.props.onChange) {
      this.props.onChange({target: {value}}, value, info);
    }
  }

  _close(callback: any) {
    this.setState({
      opened: false,
      result: null,
    }, callback);
  }

  _findInfoByValue(value: Value): ?Info {
    const {result} = this.state;
    if (result) {
      const index = result.values.findIndex((v) => v === value);
      return result.infos && result.infos[index];
    }

    return null;
  }

  _alkoSetCurrentSearchText(value: Value) {
    if (this.props.alkoValueToText && value) {
      const searchText = this.props.alkoValueToText(value);
      this.setState(
        {searchText},
        () => {
          if (this._focusable && this._focusable.setSelectionRange) {
            this._focusable.setSelectionRange(0, searchText.length);
          }
        },
      );
    }
  }
}

function mapResult(
  result: SourceResult,
  fn: (v: Value, d: Info, i: number) => any
): Array<any> {
  return result.values.map((value, i) => {
    const info = result.infos && result.infos[i];
    return fn(value, info, i);
  });
}

function renderValue(value, info) {
  return info;
}

function renderItem(value, info) {
  return info;
}

export default ComboBox;
