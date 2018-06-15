import * as React from 'react';
import { findDOMNode } from 'react-dom';

import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import RenderLayer from '../RenderLayer';
import Spinner from '../Spinner';

interface ComboBoxViewProps<T> {
  align?: 'left' | 'center' | 'right';
  autoFocus?: boolean;
  borderless?: boolean;
  disablePortal?: boolean;
  disabled?: boolean;
  editing?: boolean;
  error?: boolean;
  items?: Nullable<T[]>;
  loading?: boolean;
  menuAlign?: 'left' | 'right';
  opened?: boolean;
  openButton?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  textValue?: string;
  totalCount?: number;
  value?: Nullable<T>;
  warning?: boolean;
  width?: string | number;
  maxLength?: number;
  maxMenuHeight?: number | string;

  onChange?: (x0: T) => any;
  onClickOutside?: () => void;
  onFocus?: () => void;
  onFocusOutside?: () => void;
  onInputBlur?: () => void;
  onInputChange?: (x0: React.ChangeEvent<HTMLInputElement>, x1: string) => void;
  onInputFocus?: () => void;
  onInputKeyDown?: (e: React.KeyboardEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseOver?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  renderItem?: (item: T) => React.ReactNode;
  renderNotFound?: () => React.ReactNode;
  renderTotalCount?: (found: number, total: number) => React.ReactNode;
  renderValue?: (item: T) => React.ReactNode;
  refInput?: (input: Nullable<Input>) => void;
  refMenu?: (menu: Nullable<Menu>) => void;
}

class ComboBoxView<T> extends React.Component<ComboBoxViewProps<T>> {
  public static defaultProps = {
    renderItem: (item: any) => item,
    renderNotFound: () => 'Не найдено',
    renderValue: (item: any) => item,
    onClickOutside: () => {
      /**/
    },
    onFocusOutside: () => {
      /**/
    },
    onChange: (item: any) => {
      /**/
    },
    size: 'small',
    width: 250 as string | number
  };

  private input: Nullable<Input>;

  public componentDidMount() {
    if (this.props.autoFocus && this.props.onFocus) {
      this.props.onFocus();
    }
  }

  public componentDidUpdate(prevProps: ComboBoxViewProps<T>) {
    const { input, props } = this;
    if (props.editing && !prevProps.editing && input) {
      input.focus();
      input.setSelectionRange(0, (props.textValue || '').length);
    }
  }

  public render(): React.ReactNode {
    const {
      items,
      loading,
      menuAlign,
      onClickOutside,
      onFocusOutside,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      openButton,
      opened,
      size,
      width
    } = this.props;

    const input = this.renderInput();
    const menu = this.renderMenu();

    const topOffsets = {
      spinner: 6,
      arrow: 15
    };
    if (size === 'medium') {
      topOffsets.spinner += 4;
      topOffsets.arrow += 4;
    }
    if (size === 'large') {
      topOffsets.spinner += 6;
      topOffsets.arrow += 6;
    }

    const spinner: React.ReactNode = (
      <span
        style={{
          position: 'absolute',
          top: topOffsets.spinner,
          right: 5,
          zIndex: 10
        }}
      >
        <Spinner type="mini" caption="" dimmed />
      </span>
    );

    const arrow: React.ReactNode = (
      <span
        style={{
          border: '4px solid transparent',
          borderBottomWidth: 0,
          borderTopColor: '#aaa',
          position: 'absolute',
          right: 10,
          top: topOffsets.arrow,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
    );

    const spinnerIsShown = loading && items && !!items.length;
    const arrowIsShown = !spinnerIsShown && openButton;

    return (
      <RenderLayer
        onClickOutside={onClickOutside}
        onFocusOutside={onFocusOutside}
        active={opened}
      >
        <label
          style={{ width, display: 'inline-block', position: 'relative' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseOver={onMouseOver}
        >
          {input}
          {spinnerIsShown && spinner}
          {arrowIsShown && arrow}
          {opened && (
            <DropdownContainer
              align={menuAlign}
              // tslint:disable-next-line:jsx-no-lambda
              getParent={() => findDOMNode(this)}
              offsetY={1}
              disablePortal={this.props.disablePortal}
            >
              {menu}
            </DropdownContainer>
          )}
        </label>
      </RenderLayer>
    );
  }

  private renderMenu(): React.ReactNode {
    const {
      opened,
      items,
      totalCount,
      loading,
      refMenu,
      renderNotFound,
      renderTotalCount,
      maxMenuHeight
    } = this.props;

    if (!opened) {
      return null;
    }

    if (loading && (!items || !items.length)) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>
            <div style={{ margin: '-2px 0 -1px' }}>
              <Spinner type="mini" dimmed />
            </div>
          </MenuItem>
        </Menu>
      );
    }

    if ((items == null || items.length === 0) && renderNotFound) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>{renderNotFound()}</MenuItem>
        </Menu>
      );
    }

    let total = null;
    if (items && renderTotalCount && totalCount && items.length < totalCount) {
      total = (
        <MenuItem disabled>
          <div style={{ fontSize: 12 }}>
            {renderTotalCount(items.length, totalCount)}
          </div>
        </MenuItem>
      );
    }

    return (
      <Menu ref={refMenu} maxHeight={maxMenuHeight}>
        {items && items.map(this.renderItem)}
        {total}
      </Menu>
    );
  }

  private renderItem = (item: T, index: number): React.ReactNode => {
    // NOTE this is undesireable feature, better
    // to remove it from further versions
    if (typeof item === 'function' || React.isValidElement(item)) {
      // @ts-ignore
      const element = typeof item === 'function' ? item() : item;
      const props = Object.assign(
        {
          key: index,
          onClick: () => this.props.onChange!(element.props)
        },
        element.props
      );
      return React.cloneElement(element, props);
    }
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <MenuItem onClick={() => this.props.onChange!(item)} key={index}>
        {this.props.renderItem!(item)}
      </MenuItem>
    );
  };

  private renderInput(): React.ReactNode {
    const {
      align,
      borderless,
      disabled,
      editing,
      error,
      onFocus,
      onInputBlur,
      onInputChange,
      onInputFocus,
      onInputKeyDown,
      openButton,
      placeholder,
      renderValue,
      size,
      textValue,
      value,
      warning
    } = this.props;

    if (editing) {
      return (
        <Input
          align={align}
          borderless={borderless}
          disabled={disabled}
          error={error}
          maxLength={this.props.maxLength}
          onBlur={onInputBlur}
          onChange={onInputChange}
          onFocus={onInputFocus}
          rightIcon={openButton ? <span /> : null}
          value={textValue || ''}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
          width="100%"
          size={size}
          ref={this.refInput}
          warning={warning}
        />
      );
    }

    return (
      <InputLikeText
        align={align}
        borderless={borderless}
        error={error}
        onFocus={onFocus}
        padRight={openButton}
        disabled={disabled}
        warning={warning}
        placeholder={placeholder}
        size={size}
        width="100%"
      >
        {value ? renderValue!(value) : null}
      </InputLikeText>
    );
  }

  private refInput = (input: Nullable<Input>) => {
    if (this.props.refInput) {
      this.props.refInput(input);
    }
    this.input = input;
  };
}

export default ComboBoxView;
