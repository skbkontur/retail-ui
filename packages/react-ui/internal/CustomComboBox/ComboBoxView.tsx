import React from 'react';
import { findDOMNode } from 'react-dom';

import { DropdownContainer } from '../DropdownContainer';
import { Input, InputIconType } from '../../components/Input';
import { InputLikeText } from '../InputLikeText';
import { Menu } from '../Menu';
import { MenuItemState } from '../../components/MenuItem';
import { RenderLayer } from '../RenderLayer';
import { Spinner } from '../../components/Spinner';
import { Nullable } from '../../typings/utility-types';
import { ArrowTriangleDownIcon } from '../icons/16px';

import { ComboBoxMenu } from './ComboBoxMenu';
import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import { jsStyles } from './CustomComboBox.styles';

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
  drawArrow?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  textValue?: string;
  totalCount?: number;
  value?: Nullable<T>;
  warning?: boolean;
  width?: string | number;
  maxLength?: number;
  maxMenuHeight?: number | string;
  leftIcon?: InputIconType;

  onValueChange?: (value: T) => void;
  onClickOutside?: (e: Event) => void;
  onFocus?: () => void;
  onFocusOutside?: () => void;
  onInputBlur?: () => void;
  onInputValueChange?: (value: string) => void;
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
  renderAddButton: (query?: string) => React.ReactNode;
  repeatRequest?: () => void;
  requestStatus?: ComboBoxRequestStatus;
  refInput?: (input: Nullable<Input>) => void;
  refMenu?: (menu: Nullable<Menu>) => void;
  refInputLikeText?: (inputLikeText: Nullable<InputLikeText>) => void;
}

export class ComboBoxView<T> extends React.Component<ComboBoxViewProps<T>> {
  public static __KONTUR_REACT_UI__ = 'ComboBoxView';

  public static defaultProps = {
    renderItem: (item: any) => item,
    renderValue: (item: any) => item,
    renderAddButton: () => null,
    repeatRequest: () => undefined,
    requestStatus: ComboBoxRequestStatus.Unknown,
    onClickOutside: () => {
      /**/
    },
    onFocusOutside: () => {
      /**/
    },
    size: 'small',
    width: 250 as string | number,
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

  public render() {
    const {
      items,
      loading,
      menuAlign,
      onClickOutside,
      onFocusOutside,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      opened,
      refMenu,
      maxMenuHeight,
      renderTotalCount,
      renderItem,
      renderNotFound,
      repeatRequest,
      requestStatus,
      totalCount,
      size,
      width,
    } = this.props;

    const input = this.renderInput();

    const topOffsets = {
      spinner: 6,
      arrow: 15,
    };
    if (size === 'medium') {
      topOffsets.spinner += 4;
      topOffsets.arrow += 4;
    }
    if (size === 'large') {
      topOffsets.spinner += 6;
      topOffsets.arrow += 6;
    }

    return (
      <RenderLayer onClickOutside={onClickOutside} onFocusOutside={onFocusOutside} active={opened}>
        <span
          style={{ width }}
          className={jsStyles.root()}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseOver={onMouseOver}
        >
          {input}
          {opened && (
            <DropdownContainer
              align={menuAlign}
              getParent={() => findDOMNode(this)}
              offsetY={1}
              disablePortal={this.props.disablePortal}
            >
              <ComboBoxMenu
                items={items}
                loading={loading}
                maxMenuHeight={maxMenuHeight}
                onValueChange={this.handleItemSelect}
                opened={opened}
                refMenu={refMenu}
                renderTotalCount={renderTotalCount}
                renderItem={renderItem!}
                renderNotFound={renderNotFound}
                renderAddButton={this.renderAddButton}
                repeatRequest={repeatRequest}
                requestStatus={requestStatus}
                totalCount={totalCount}
              />
            </DropdownContainer>
          )}
        </span>
      </RenderLayer>
    );
  }

  private renderAddButton = (): React.ReactNode => {
    return this.props.renderAddButton(this.props.textValue);
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
      onInputValueChange,
      onInputFocus,
      onInputClick,
      onInputKeyDown,
      placeholder,
      renderValue,
      size,
      textValue,
      value,
      warning,
      refInputLikeText,
      leftIcon,
    } = this.props;

    const rightIcon = this.getRightIcon();

    if (editing) {
      return (
        <Input
          align={align}
          borderless={borderless}
          disabled={disabled}
          error={error}
          maxLength={this.props.maxLength}
          onBlur={onInputBlur}
          onValueChange={onInputValueChange}
          onFocus={onInputFocus}
          onClick={onInputClick}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
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
        leftIcon={leftIcon}
        rightIcon={rightIcon}
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

  private handleItemSelect = (item: T) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(item);
    }
  };

  private refInput = (input: Nullable<Input>) => {
    if (this.props.refInput) {
      this.props.refInput(input);
    }
    this.input = input;
  };

  private renderSpinner = () => (
    <span className={jsStyles.spinnerWrapper()}>
      <Spinner type="mini" caption="" dimmed />
    </span>
  );

  private getRightIcon = () => {
    const { loading, items, drawArrow } = this.props;

    if (loading && items && !!items.length) {
      return this.renderSpinner();
    }

    if (drawArrow) {
      return (
        <span className={jsStyles.arrowWrapper()}>
          <ArrowTriangleDownIcon />
        </span>
      );
    }

    return null;
  };
}
