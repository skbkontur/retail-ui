
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../filterProps';

import debounce from 'lodash.debounce';

import RenderLayer from '../RenderLayer';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText/InputLikeText';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import type { MenuItemState } from '../MenuItem/MenuItem';

import styles from './ComboBoxRenderer.less';

const INPUT_PASS_PROPS = {
  borderless: true,
  error: true,
  warning: true,
  width: true,
  disabled: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true
};

export type Value = any;
export type Info = any;

type SourceResult = {
  values: Array<Value | React.Element<any> | (() => React.Element<any>)>,
  infos?: Array<Info>,
  total?: number
};

type RecoverResult = {
  value: Value,
  info?: Info
};

type ErrorKind = null | 'not_recovered';

type RecoverFunc = (searchString: string) => RecoverResult;

export type BaseProps = {
  autoFocus?: boolean,
  borderless?: boolean,
  disabled?: boolean,
  error?: boolean,
  info?: Info | ((v: Value) => Promise<Info>),
  menuAlign: 'left' | 'right',
  disablePortal?: boolean,
  debounceInterval?: number,
  openButton?: boolean,
  placeholder: string,
  recover?: RecoverFunc | boolean,
  renderItem: (value: Value, info: Info, state: MenuItemState) => React.Node,
  renderValue: (value: Value, info: ?Info) => React.Element<any>,
  renderNotFound?:
    | string
    | ((searchText: string) => React.Element<any> | string),
  renderTotalCount?: (f: number, total: number) => React.Element<any> | string,
  source: (searchText: string) => Promise<SourceResult>,
  warning?: boolean,
  value: Value | null,
  valueToString?: (value: Value, info: ?Info) => string,
  width: number | string,

  onBlur?: () => void,
  onChange?: (event: { target: { value: Value } }, value: Value) => void,
  onClose?: () => void,
  onError?: (kind: ErrorKind) => void,
  onFocus?: () => void,
  onOpen?: () => void,
  onInputChange?: (value: string) => ?string,
  onInputKeyDown?: (e: SyntheticKeyboardEvent<>) => void,

  alkoValueToText?: (value: Value) => string,
  onAlkoFocus?: () => void,
  onAlkoBlur?: () => void,

  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void
};

type Props = BaseProps & {
  info: Info
};

type State = {
  opened: boolean,
  searchText: string,
  isEditing: boolean,
  result: ?SourceResult,
  selected: number
};

class ComboBoxRenderer extends React.Component<Props, State> {
  // eslint-disable-next-line react/no-multi-comp
  static Item = class Item extends React.Component<{ children?: React.Node }> {
    render() {
      return <MenuItem>{this.props.children}</MenuItem>;
    }
  };

  static static(element: (() => React.Element<any>) | React.Element<any>) {
    return element;
  }

  static defaultProps = {
    renderItem,
    renderValue,
    placeholder: '',
    width: (250: number | string),
    menuAlign: 'left',
    debounceInterval: 0
  };

  _mounted = false;
  _focusable = null;
  _menu: ?Menu = null;
  _focusSubscribtion: ?{ remove: () => void } = null;
  _lastError: ErrorKind = null;
  _error: ErrorKind = null;
  _ignoreRecover = true;
  _ignoreBlur = true;
  _fetchingId = 0;
  _debouncedFetchList: Function;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      opened: false,
      searchText: '',
      result: null,
      isEditing: false,
      selected: -1
    };

    const { debounceInterval } = this.props;
    this._debouncedFetchList =
      debounceInterval && debounceInterval > 0
        ? debounce(this._fetchList, debounceInterval)
        : this._fetchList;
  }

  render() {
    return (
      <RenderLayer
        onFocusOutside={this._handleBlur}
        onClickOutside={this._handleBlur}
        active={this.state.opened}
      >
        <label className={styles.root} style={{ width: this.props.width }}>
          {this.state.isEditing ? this.renderInput() : this.renderValue()}
          {this.state.opened && this.renderMenu()}
          {this.props.openButton && (
            <div
              className={styles.arrow}
              onClick={this._handleArrowClick}
              onMouseDown={this._handleArrowMouseDown}
            />
          )}
        </label>
      </RenderLayer>
    );
  }

  renderInput() {
    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);
    return (
      <div className={styles.input}>
        <Input
          ref={this._refFocusable}
          {...inputProps}
          value={this.state.searchText}
          rightIcon={this.props.openButton && <span />}
          onChange={this._handleInputChange}
          onKeyDown={this._handleInputKey}
        />
      </div>
    );
  }

  renderValue() {
    const inputProps = filterProps(this.props, INPUT_PASS_PROPS);

    const value = this.props.value ? (
      this.props.renderValue(this.props.value, this.props.info)
    ) : (
      <span className={styles.placeholder}>{this.props.placeholder}</span>
    );

    const isNotRecovered = !!this._error;

    return (
      <InputLikeText
        ref={this._refFocusable}
        {...inputProps}
        padRight={this.props.openButton}
        onClick={this._handleValueClick}
        onFocus={this._handleValueClick}
        error={isNotRecovered || this.props.error}
      >
        {isNotRecovered ? this.state.searchText : value}
      </InputLikeText>
    );
  }

  renderMenu() {
    const { result } = this.state;
    if (!result) {
      return null;
    }

    const isEmptyResults = result.values.length === 0;

    return (
      <DropdownContainer
        getParent={() => ReactDOM.findDOMNode(this)}
        align={this.props.menuAlign}
        disablePortal={this.props.disablePortal}
        offsetY={1}
      >
        <Menu ref={this._refMenu} maxHeight={200}>
          {isEmptyResults
            ? this.renderEmptyResults()
            : this.renderResults(result)}
          {this.renderTotalCount(result)}
        </Menu>
      </DropdownContainer>
    );
  }

  renderResults(result: SourceResult): Array<?React.Element<Class<MenuItem>>> {
    return mapResult(result, (value, info, i) => {
      if (typeof value === 'function' || React.isValidElement(value)) {
        const element = typeof value === 'function' ? value() : value;
        return React.cloneElement(element, {
          key: i,
          onClick: event => this._handleItemClick(event, element.props)
        });
      }
      return (
        <MenuItem
          key={i}
          onClick={(event: SyntheticEvent<*>) => {
            this._handleItemClick(event, { value, info });
          }}
        >
          {state => this.props.renderItem(value, info, state)}
        </MenuItem>
      );
    });
  }

  renderEmptyResults(): ?React.Element<typeof MenuItem> {
    const { renderNotFound } = this.props;

    if (!renderNotFound) {
      return null;
    }

    const { searchText } = this.state;

    return (
      <MenuItem disabled={!isFunction(renderNotFound)}>
        {isFunction(renderNotFound)
          ? renderNotFound(searchText)
          : renderNotFound}
      </MenuItem>
    );
  }

  renderTotalCount(result: SourceResult) {
    const { renderTotalCount } = this.props;

    if (!renderTotalCount || !result || !result.values || !result.total) {
      return null;
    }

    if (result.values.length === result.total) {
      return null;
    }

    return (
      <MenuItem disabled>
        <div className={styles.totalCount}>
          {renderTotalCount(result.values.length, result.total)}
        </div>
      </MenuItem>
    );
  }

  componentDidMount() {
    this._mounted = true;
    if (this.props.autoFocus) {
      this._focus();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _refFocusable = (el: Input | InputLikeText | null) => {
    this._focusable = el && (el.focus ? el : (ReactDOM.findDOMNode(el): any));
  };

  _refMenu = (menu: ?Menu) => {
    this._menu = menu;
  };

  _handleInputChange = (
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string
  ) => {
    let newInputValue = value;

    const inputValueChanged = this.state.searchText !== newInputValue;
    if (inputValueChanged && this.props.onInputChange) {
      let nextState = this.props.onInputChange(newInputValue);

      if (nextState != null && typeof nextState !== 'object') {
        newInputValue = '' + nextState;
      }
    }

    this.setState(() => ({
      searchText: newInputValue,
      opened: true
    }));
    this._debouncedFetchList(newInputValue);
    this._ignoreRecover = false;
  };

  _handleInputKey = (event: SyntheticKeyboardEvent<>) => {
    if (typeof this.props.onInputKeyDown === 'function') {
      this.props.onInputKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();

        if (!this.state.opened) {
          this.setState({ opened: true });
          safelyCall(this.props.onOpen);
        }

        this._menu && this._menu.up();
        break;
      case 'ArrowDown':
        event.preventDefault();

        if (!this.state.opened) {
          this.setState({ opened: true });
          safelyCall(this.props.onOpen);
        }

        this._menu && this._menu.down();
        break;
      case 'Enter':
        event.preventDefault();
        const handled = this._menu && this._menu.enter(event);
        if (!handled) {
          this._tryRecover();

          // Close ComboBox only if Enter wasn't handled by the Menu.
          this._handleBlur();
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (!this.state.opened) {
          return;
        }
        this._close();
        break;
    }
  };

  _handleValueClick = () => {
    this._setCurrentSearchText(this.props.value, this.props.info);
    this._fetchList('');
    this._handleFocus();
  };

  _handleItemClick(
    event: SyntheticEvent<*>,
    options: { value?: Value, info?: Info, onClick?: () => void }
  ) {
    this.setState({ searchText: '', opened: false, isEditing: false });
    this._change(options.value, options.info);

    safelyCall(options.onClick);
    this._handleBlur();
  }

  _handleArrowMouseDown = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
  };

  _handleArrowClick = (event: SyntheticMouseEvent<>) => {
    if (!this.state.opened) {
      this._handleValueClick();
    }
  };

  _handleFocus = () => {
    /* Allow blur happen only if focus occured */
    this._ignoreBlur = false;

    this.setState({ isEditing: true, opened: true });
    safelyCall(this.props.onOpen);

    if (!safelyCall(this.props.onFocus)) {
      safelyCall(this.props.onAlkoFocus);
    }
  };

  _handleBlur = () => {
    if (this._ignoreBlur) {
      return;
    }

    this._close(true);
    this._tryRecover();

    if (!safelyCall(this.props.onBlur)) {
      safelyCall(this.props.onAlkoBlur);
    }

    /* Blur should occure only once */
    this._ignoreBlur = true;
  };

  _close = (endEdit?: boolean) => {
    this.setState(() => ({ isEditing: !endEdit, opened: false, result: null }));
    safelyCall(this.props.onClose);
  };

  _fetchList = (pattern: string) => {
    const expectingId = ++this._fetchingId;
    this.props.source(pattern).then(result => {
      if (!this._mounted) {
        return;
      }

      if (expectingId === this._fetchingId && this.state.opened) {
        this._menu && this._menu.reset();
        this.setState(() => ({ result }));
      }
    });
  };

  _focus = () => {
    if (this._focusable && this._focusable.setSelectionRange) {
      // $FlowIgnore
      this._focusable.setSelectionRange(0, this.state.searchText.length);
    } else if (this._focusable) {
      this._focusable.focus();
    }
  };

  _tryRecover() {
    if (this._ignoreRecover) {
      return;
    }
    this._ignoreRecover = true;

    if (!this.props.recover) {
      this._change(null);
      this.setState({ searchText: '' });
      return;
    }

    const searchText = this.state.searchText;
    let recovered: ?RecoverResult = null;

    if (typeof this.props.recover === 'function') {
      recovered = this.props.recover(searchText);
    } else if (this.props.recover === true) {
      recovered = { value: searchText };
    }

    if (recovered) {
      this._change(recovered.value, recovered.info);
    } else {
      this._change(null);
      this._setError(this.state.searchText ? 'not_recovered' : null);
    }
  }

  _setError(error: ErrorKind) {
    this._error = error;
    if (this._lastError !== error) {
      this._lastError = error;
      safelyCall(this.props.onError, error);
    }
  }

  _change(value: Value, info?: Info) {
    safelyCall(this.props.onChange, { target: { value } }, value, info);
    this._setError(null);

    /* No need in recovers after value changes */
    this._ignoreRecover = true;
  }

  _setCurrentSearchText(value: Value, info: ?Info) {
    const valueToString = this.props.valueToString;

    if (valueToString) {
      const searchText = value
        ? valueToString(value, info)
        : this.state.searchText;

      return this.setState({ searchText }, this._focus);
    }

    return this.setState({ searchText: '' }, this._focus);
  }
}

function safelyCall(fn: ?Function, ...args: any[]) {
  if (fn) {
    fn(...args);
    return true;
  }
  return false;
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

function renderValue(value: *, info: *) {
  return info;
}

function renderItem(value: *, info: *, state: *) {
  return info;
}

function isFunction(fn) /*: boolean %checks */ {
  return typeof fn === 'function';
}

export default ComboBoxRenderer;
