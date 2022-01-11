import React from 'react';
import { findDOMNode } from 'react-dom';

import { isNonNullable } from '../../lib/utils';
import { DropdownContainer } from '../DropdownContainer';
import { Input, InputIconType, InputProps } from '../../components/Input';
import { InputLikeText } from '../InputLikeText';
import { Menu } from '../Menu';
import { MenuItemState } from '../../components/MenuItem';
import { RenderLayer } from '../RenderLayer';
import { Spinner } from '../../components/Spinner';
import { Nullable } from '../../typings/utility-types';
import { ArrowChevronDownIcon } from '../icons/16px';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { MobilePopup } from '../MobilePopup';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';

import { ComboBoxMenu } from './ComboBoxMenu';
import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import { styles } from './CustomComboBox.styles';

interface ComboBoxViewProps<T> extends CommonProps {
  align?: 'left' | 'center' | 'right';
  autoFocus?: boolean;
  borderless?: boolean;
  disablePortal?: boolean;
  disabled?: boolean;
  editing?: boolean;
  /**
   * Cостояние валидации при ошибке.
   */
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
  /**
   * Cостояние валидации при предупреждении.
   */
  warning?: boolean;
  width?: string | number;
  maxLength?: number;
  maxMenuHeight?: number | string;
  leftIcon?: InputIconType;
  rightIcon?: InputIconType;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];

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

interface ComboBoxViewState {
  isMobileOpened: boolean;
}

@responsiveLayout
export class ComboBoxView<T> extends React.Component<ComboBoxViewProps<T>, ComboBoxViewState> {
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
    width: 250,
  };

  private input: Nullable<Input>;
  private mobilePopup: Nullable<MobilePopup>;
  //@ts-ignore
  private theme!: Theme;
  private isMobileLayout!: boolean;

  public componentDidMount() {
    if (this.props.autoFocus && this.props.onFocus) {
      this.props.onFocus();
    }
  }

  public state: ComboBoxViewState = {
    isMobileOpened: false,
  };

  public componentDidUpdate(prevProps: ComboBoxViewProps<T>) {
    const { input, props } = this;

    if (props.editing && !prevProps.editing && input) {
      input.focus();
    }
  }

  public render() {
    const { onClickOutside, onFocusOutside, onMouseEnter, onMouseLeave, onMouseOver, opened, width } = this.props;

    const isMobile = this.isMobileLayout;

    const input = this.renderInput();

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;

          return (
            <CommonWrapper {...this.props}>
              <RenderLayer onClickOutside={onClickOutside} onFocusOutside={onFocusOutside} active={opened}>
                <span
                  style={{ width }}
                  className={styles.root()}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onMouseOver={onMouseOver}
                >
                  {input}
                  {isMobile ? this.renderMobileMenu() : this.renderMenu()}
                </span>
              </RenderLayer>
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private getComboBoxMenu = () => {
    const {
      items,
      loading,
      opened,
      refMenu,
      maxMenuHeight,
      renderTotalCount,
      renderItem,
      renderNotFound,
      repeatRequest,
      requestStatus,
      totalCount,
    } = this.props;

    return (
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
        isMobile={this.isMobileLayout}
      />
    );
  };

  private renderMenu = () => {
    const { menuAlign, opened } = this.props;

    return (
      opened && (
        <DropdownContainer
          align={menuAlign}
          getParent={() => findDOMNode(this)}
          offsetY={1}
          disablePortal={this.props.disablePortal}
        >
          {this.getComboBoxMenu()}
        </DropdownContainer>
      )
    );
  };

  private renderMobileMenu = () => {
    if (!this.state.isMobileOpened) {
      return null;
    }

    let rightIcon = null;

    const { loading, items } = this.props;
    if (loading && items && !!items.length) {
      rightIcon = this.renderSpinner();
    }

    const inputProps: InputProps = {
      autoFocus: true,
      width: '100%',
      onFocus: this.props.onFocus,
      onValueChange: this.props.onInputValueChange,
      value: this.props.textValue,
      placeholder: this.props.placeholder,
      rightIcon,
    };

    return (
      <MobilePopup
        headerChildComponent={<Input {...inputProps} />}
        useFullHeight
        onClose={this.handleCloseMobile}
        ref={this.refMobilePopup}
      >
        {this.getComboBoxMenu()}
      </MobilePopup>
    );
  };

  private handleCloseMobile = () => {
    this.setState({
      isMobileOpened: false,
    });

    if (this.props.onInputBlur) {
      this.props.onInputBlur();
    }
  };

  private renderAddButton = (): React.ReactNode => {
    return this.props.renderAddButton(this.props.textValue);
  };

  private renderInput(): React.ReactNode {
    const isMobile = this.isMobileLayout;

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
      inputMode,
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
          onBlur={isMobile ? undefined : onInputBlur}
          onValueChange={onInputValueChange}
          onFocus={isMobile ? this.handleFocusMobile : onInputFocus}
          onClick={isMobile ? this.handleFocusMobile : onInputClick}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          value={textValue || ''}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
          width="100%"
          size={size}
          ref={this.refInput}
          warning={warning}
          inputMode={inputMode}
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
        {isNonNullable(value) && renderValue ? renderValue(value) : null}
      </InputLikeText>
    );
  }

  private handleFocusMobile = () => {
    this.setState({
      isMobileOpened: true,
    });
  };

  private handleItemSelect = (item: T) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(item);
    }

    if (this.isMobileLayout) {
      this.mobilePopup?.close();
    }
  };

  private refInput = (input: Nullable<Input>) => {
    if (this.props.refInput) {
      this.props.refInput(input);
    }
    this.input = input;
  };

  private refMobilePopup = (mobilePopup: MobilePopup | null) => {
    this.mobilePopup = mobilePopup;
  };

  private renderSpinner = () => (
    <span className={styles.spinnerWrapper()}>
      <Spinner type="mini" caption="" dimmed />
    </span>
  );

  private getRightIcon = () => {
    const { loading, items, drawArrow, rightIcon } = this.props;

    if (loading && items && !!items.length) {
      return this.renderSpinner();
    }

    if (rightIcon || drawArrow) {
      return <span className={styles.rightIconWrapper()}>{rightIcon ?? <ArrowChevronDownIcon />}</span>;
    }

    return null;
  };
}
