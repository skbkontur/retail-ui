import * as React from 'react';
import { findDOMNode } from 'react-dom';

import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import Menu from '../Menu/Menu';
import { MenuItemState } from '../MenuItem';
import RenderLayer from '../RenderLayer';
import Spinner from '../Spinner';
import { Nullable } from '../../typings/utility-types';
import ComboBoxMenu from './ComboBoxMenu';

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

  onChange?: (item: T, e: React.SyntheticEvent) => void;
  onClickOutside?: () => void;
  onFocus?: () => void;
  onFocusOutside?: () => void;
  onInputBlur?: () => void;
  onInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  onInputFocus?: () => void;
  onInputClick?: () => void;
  onInputKeyDown?: (e: React.KeyboardEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseOver?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  renderItem?: (item: T, state: MenuItemState) => React.ReactNode;
  renderNotFound?: () => React.ReactNode;
  renderTotalCount?: (found: number, total: number) => React.ReactNode;
  renderValue?: (item: T) => React.ReactNode;
  refInput?: (input: Nullable<Input>) => void;
  refMenu?: (menu: Nullable<Menu>) => void;
  refInputLikeText?: (inputLikeText: Nullable<InputLikeText>) => void;
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
    }
  }

  public render(): JSX.Element {
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
      refMenu,
      maxMenuHeight,
      renderTotalCount,
      renderItem,
      renderNotFound,
      totalCount,
      size,
      width
    } = this.props;

    const input = this.renderInput();

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
              <ComboBoxMenu
                items={items}
                loading={loading}
                maxMenuHeight={maxMenuHeight}
                onChange={this.handleItemSelect}
                opened={opened}
                refMenu={refMenu}
                renderTotalCount={renderTotalCount}
                renderItem={renderItem!}
                renderNotFound={renderNotFound}
                totalCount={totalCount}
              />
            </DropdownContainer>
          )}
        </label>
      </RenderLayer>
    );
  }

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
      onInputClick,
      onInputKeyDown,
      openButton,
      placeholder,
      renderValue,
      size,
      textValue,
      value,
      warning,
      refInputLikeText
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
          onClick={onInputClick}
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
        ref={refInputLikeText}
      >
        {value ? renderValue!(value) : null}
      </InputLikeText>
    );
  }

  private handleItemSelect = (item: T, event: React.SyntheticEvent) => {
    event.persist();
    if (this.props.onChange) {
      this.props.onChange(item, event);
    }
  };

  private refInput = (input: Nullable<Input>) => {
    if (this.props.refInput) {
      this.props.refInput(input);
    }
    this.input = input;
  };
}

export default ComboBoxView;
