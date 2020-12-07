import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { DropdownContainer } from '../DropdownContainer';
import { Input, InputProps } from '../../components/Input';
import { InputLikeText } from '../InputLikeText';
import { Menu } from '../Menu';
import { RenderLayer } from '../RenderLayer';
import { Spinner } from '../../components/Spinner';
import { Nullable } from '../../typings/utility-types';
import { ArrowTriangleDownIcon } from '../icons/16px';

import { CustomComboBoxProps } from './CustomComboBox';
import { ComboBoxMenu } from './ComboBoxMenu';
import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import { jsStyles } from './CustomComboBox.styles';

interface ComboBoxViewProps<T> extends Omit<CustomComboBoxProps<T>, 'getItems' | 'itemToValue' | 'valueToString'> {
  editing?: boolean;
  items?: Nullable<T[]>;
  loading?: boolean;
  opened?: boolean;
  textValue?: string;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: () => void;
  onInputBlur?: () => void;
  onInputValueChange?: (value: string) => void;
  onInputFocus?: () => void;
  onInputClick?: () => void;
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

  // public componentDidMount() {
  //   if (this.props.autoFocus && this.props.onFocus) {
  //     this.props.onFocus();
  //   }
  // }

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
      onValueChange,
      value,
      opened,
      refMenu,
      maxMenuHeight,
      renderTotalCount,
      renderItem,
      renderNotFound,
      repeatRequest,
      requestStatus,
      totalCount,
      width,
      className,
      style,
      ...rest
    } = this.props;

    const [inputProps, wrapperProps] = Input.extractProps(rest);

    const input = this.renderInput(inputProps);

    const topOffsets = {
      spinner: 6,
      arrow: 15,
    };
    if (this.props.size === 'medium') {
      topOffsets.spinner += 4;
      topOffsets.arrow += 4;
    }
    if (this.props.size === 'large') {
      topOffsets.spinner += 6;
      topOffsets.arrow += 6;
    }

    return (
      <RenderLayer onClickOutside={onClickOutside} onFocusOutside={onFocusOutside} active={opened}>
        <span {...wrapperProps} style={{ width, ...style }} className={cn(className, jsStyles.root())}>
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
    return this.props.renderAddButton?.(this.props.textValue);
  };

  private renderInput(props: InputProps): React.ReactNode {
    const {
      editing,
      onInputBlur,
      onInputValueChange,
      onInputFocus,
      onInputClick,
      onInputKeyDown,
      renderValue,
      textValue,
      value,
      refInputLikeText,
    } = this.props;

    const rightIcon = this.getRightIcon();

    const inputProps: InputProps = {
      ...props,
      rightIcon,
      width: '100%',
    };

    if (editing) {
      return (
        <Input
          {...inputProps}
          onBlur={onInputBlur}
          onValueChange={onInputValueChange}
          onFocus={onInputFocus}
          onClick={onInputClick}
          value={textValue || ''}
          onKeyDown={onInputKeyDown}
          ref={this.refInput}
        />
      );
    }

    return (
      <InputLikeText {...inputProps} ref={refInputLikeText}>
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
