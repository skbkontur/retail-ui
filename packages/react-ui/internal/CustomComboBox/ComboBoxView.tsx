import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';

import { getRandomID, isNonNullable } from '../../lib/utils';
import type { InputIconType, InputProps, ShowClearIcon } from '../../components/Input';
import { Input } from '../../components/Input';
import { InputLikeText } from '../InputLikeText';
import type { Menu } from '../Menu';
import type { MenuItemState } from '../../components/MenuItem';
import { RenderLayer } from '../RenderLayer';
import { Spinner } from '../../components/Spinner';
import type { Nullable } from '../../typings/utility-types';
import type { CommonProps } from '../CommonWrapper';
import { CommonWrapper } from '../CommonWrapper';
import { MobilePopup } from '../MobilePopup';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode, getRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import { LoadingIcon } from '../icons2022/LoadingIcon';
import type { ComboBoxExtendedItem, ComboBoxViewMode } from '../../components/ComboBox';
import type { SizeProp } from '../../lib/types/props';
import { Popup } from '../Popup';
import { getMenuPositions } from '../../lib/getMenuPositions';
import { ZIndex } from '../ZIndex';
import type { MaskedInputOnBeforePasteValue, MaskedInputProps } from '../../components/MaskedInput';
import { MaskedInput } from '../../components/MaskedInput';
import { styles as MaskedInputStyles } from '../../components/MaskedInput/MaskedInput.styles';
import { cx } from '../../lib/theming/Emotion';
import { InternalTextareaWithLayout } from '../InternalTextareaWithLayout/InternalTextareaWithLayout';

import { ArrowDownIcon } from './ArrowDownIcon';
import { ComboBoxMenu } from './ComboBoxMenu';
import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import { styles } from './CustomComboBox.styles';
import { CustomComboBoxDataTids } from './CustomComboBox';
import { getComboBoxTheme } from './getComboBoxTheme';

interface ComboBoxViewProps<T>
  extends Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    CommonProps,
    Partial<Pick<MaskedInputProps, 'mask' | 'maskChar' | 'formatChars'>> {
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
  items?: Nullable<Array<ComboBoxExtendedItem<T>>>;
  loading?: boolean;
  /**
   * Позволяет вручную задать текущую позицию выпадающего окна
   */
  menuPos?: 'top' | 'bottom';
  menuAlign?: 'left' | 'right';
  opened?: boolean;
  drawArrow?: boolean;
  placeholder?: string;
  size?: SizeProp;
  textValue?: string;
  totalCount?: number;
  value?: Nullable<T>;
  showClearIcon?: ShowClearIcon;
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

  onBeforePasteInMask?: MaskedInputOnBeforePasteValue;
  onValueChange?: (value: T) => void;
  onClickOutside?: (e: Event) => void;
  onFocus?: () => void;
  onMobileClose?: () => void;
  onFocusOutside?: () => void;
  onInputBlur?: () => void;
  onInputValueChange?: (value: string) => void;
  onInputFocus?: () => void;
  onInputClick?: () => void;
  onClearCrossClick?: () => void;
  onInputKeyDown?: (e: React.KeyboardEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseOver?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  renderItem?: (item: T, state: MenuItemState) => React.ReactNode;
  itemWrapper?: (item: T) => React.ComponentType;
  renderNotFound?: () => React.ReactNode;
  renderTotalCount?: (found: number, total: number) => React.ReactNode;
  renderValue?: (item: T) => React.ReactNode;
  renderAddButton?: (query?: string) => React.ReactNode;
  repeatRequest?: () => void;
  requestStatus?: ComboBoxRequestStatus;
  refInput?: (input: Nullable<Input | InternalTextareaWithLayout>) => void;
  refMenu?: (menu: Nullable<Menu>) => void;
  refInputLikeText?: (inputLikeText: Nullable<InputLikeText>) => void;
  viewMode?: ComboBoxViewMode;
  maxRows?: number;
}

type DefaultProps<T> = Required<
  Pick<
    ComboBoxViewProps<T>,
    | 'renderItem'
    | 'renderValue'
    | 'renderAddButton'
    | 'repeatRequest'
    | 'requestStatus'
    | 'onClickOutside'
    | 'onFocusOutside'
    | 'size'
    | 'width'
    | 'showClearIcon'
  >
>;

export const ComboBoxViewIds = {
  menu: 'ComboBoxView__menu',
};

interface ComboBoxViewState {
  anchorElement: Nullable<Element>;
  clearCrossShowed: boolean;
}

@responsiveLayout
@rootNode
export class ComboBoxView<T> extends React.Component<ComboBoxViewProps<T>, ComboBoxViewState> {
  public static __KONTUR_REACT_UI__ = 'ComboBoxView';
  public static displayName = 'ComboBoxView';

  public static defaultProps: DefaultProps<unknown> = {
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
    showClearIcon: 'never',
  };

  private getProps = createPropsGetter(ComboBoxView.defaultProps);

  public getRootNode!: TGetRootNode;
  private input: Nullable<Input | InternalTextareaWithLayout>;
  private setRootNode!: TSetRootNode;
  private mobileInput: Nullable<Input> = null;
  private isMobileLayout!: boolean;
  private dropdownContainerRef = React.createRef<Popup>();
  private theme!: Theme;
  private menuId = ComboBoxViewIds.menu + getRandomID();

  public state = {
    anchorElement: null,
    clearCrossShowed: this.props.showClearIcon === 'always' && !!this.props.value?.toString(),
  };

  public componentDidMount() {
    this.updateAnchorElement();

    if (this.props.autoFocus && this.props.onFocus) {
      this.props.onFocus();
    }
  }

  updateAnchorElement() {
    const parent = this.getParent();
    const anchorElement = this.state.anchorElement;

    if (anchorElement !== parent) {
      this.setState({
        anchorElement: parent,
      });
    }
  }

  public componentDidUpdate(prevProps: ComboBoxViewProps<T>) {
    const { input, props } = this;

    this.updateAnchorElement();

    if (props.editing && !prevProps.editing && input) {
      input.focus();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getComboBoxTheme(theme, this.props.viewMode);
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain() {
    const { onMouseEnter, onMouseLeave, onMouseOver, opened } = this.props;
    const { onClickOutside, onFocusOutside, width } = this.getProps();

    const isMobile = this.isMobileLayout;

    const input = this.renderInput();

    return (
      <CommonWrapper {...this.props}>
        <RenderLayer onClickOutside={onClickOutside} onFocusOutside={onFocusOutside} active={opened}>
          <span
            data-tid={CustomComboBoxDataTids.comboBoxView}
            style={{ width }}
            className={styles.root()}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            ref={this.setRootNode}
          >
            {input}
            {isMobile ? this.renderMobileMenu() : this.renderMenu()}
          </span>
        </RenderLayer>
      </CommonWrapper>
    );
  }

  private getComboBoxMenu = () => {
    const { items, loading, opened, refMenu, maxMenuHeight, renderTotalCount, renderNotFound, totalCount, size } =
      this.props;

    const { repeatRequest, requestStatus, renderItem, itemWrapper } = this.getProps();
    return (
      <ComboBoxMenu
        hasMargin={false}
        menuId={this.menuId}
        items={items}
        loading={loading}
        maxMenuHeight={maxMenuHeight}
        onValueChange={this.handleItemSelect}
        opened={opened}
        refMenu={refMenu}
        renderTotalCount={renderTotalCount}
        renderItem={renderItem}
        renderNotFound={renderNotFound}
        itemWrapper={itemWrapper}
        renderAddButton={this.renderAddButton}
        repeatRequest={repeatRequest}
        requestStatus={requestStatus}
        totalCount={totalCount}
        isMobile={this.isMobileLayout}
        size={size}
      />
    );
  };

  private renderMenu = () => {
    const { opened, menuPos, menuAlign } = this.getProps();
    const { anchorElement } = this.state;

    return (
      opened &&
      anchorElement && (
        <Popup
          opened
          hasShadow
          minWidth="100%"
          anchorElement={anchorElement}
          priority={ZIndex.priorities.PopupMenu}
          positions={getMenuPositions(menuPos, menuAlign)}
          disablePortal={this.props.disablePortal}
          margin={parseInt(this.theme.menuOffsetY) - 1}
          ref={this.dropdownContainerRef}
        >
          {this.getComboBoxMenu()}
        </Popup>
      )
    );
  };

  private renderMobileMenu = () => {
    let rightIcon = null;

    const { loading, items, opened, onFocus, onInputValueChange, onInputKeyDown, placeholder, textValue } = this.props;
    if (loading && items && !!items.length) {
      rightIcon = this.renderSpinner();
    }

    const inputProps: InputProps = {
      autoComplete: 'off',
      autoFocus: true,
      width: '100%',
      onFocus,
      onValueChange: onInputValueChange,
      onKeyDown: onInputKeyDown,
      value: textValue,
      placeholder,
      rightIcon,
    };

    return (
      opened && (
        <MobilePopup
          headerChildComponent={<Input ref={this.refMobileInput} {...inputProps} />}
          onCloseRequest={this.props.onMobileClose}
          opened
        >
          {this.getComboBoxMenu()}
        </MobilePopup>
      )
    );
  };

  private getParent = () => {
    return getRootNode(this);
  };

  private renderAddButton = (): React.ReactNode => {
    return this.getProps().renderAddButton(this.props.textValue);
  };

  private renderInput(): React.ReactNode {
    const isMobile = this.isMobileLayout;

    const {
      id,
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
      textValue,
      value,
      warning,
      refInputLikeText,
      leftIcon,
      inputMode,
      size,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      showClearIcon,
      mask,
      maskChar,
      formatChars,
      onBeforePasteInMask,
    } = this.props;

    const rightIcon = this.getRightIcon();

    const inputProps = {
      id,
      align,
      borderless,
      disabled,
      error,
      maxLength: this.props.maxLength,
      onBlur: isMobile ? undefined : onInputBlur,
      onValueChange: onInputValueChange,
      onFocus: onInputFocus,
      onClick: isMobile ? this.handleMobileFocus : onInputClick,
      leftIcon,
      rightIcon,
      value: textValue || '',
      onKeyDown: onInputKeyDown,
      placeholder,
      width: '100%',
      size,
      ref: this.refInput,
      warning,
      inputMode,
      autoComplete: 'off',
      'aria-describedby': ariaDescribedby,
      'aria-controls': this.menuId,
      'aria-label': ariaLabel,
      showClearIcon,
    };

    const multilineTextareaProps = {
      autoResize: true,
      rows: 1,
      extraRow: false,
      maxRows: this.props.maxRows,
    };

    if (this.props.viewMode === 'multiline' && !mask) {
      return <InternalTextareaWithLayout {...inputProps} {...multilineTextareaProps} />;
    }

    if (editing) {
      if (mask) {
        return (
          <MaskedInput
            {...inputProps}
            type="text"
            mask={mask}
            maskChar={maskChar}
            formatChars={formatChars}
            onBeforePasteValue={onBeforePasteInMask}
          />
        );
      }

      if (this.props.viewMode === 'multiline-editing') {
        return <InternalTextareaWithLayout {...inputProps} {...multilineTextareaProps} />;
      }

      return <Input {...inputProps} />;
    }

    const { renderValue } = this.getProps();
    return (
      <InputLikeText
        id={id}
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
        aria-describedby={ariaDescribedby}
        aria-controls={this.menuId}
        showClearIcon={showClearIcon}
        className={cx(mask && MaskedInputStyles.root(this.theme))}
        onClearCrossClick={this.props.onClearCrossClick}
      >
        {isNonNullable(value) && renderValue ? renderValue(value) : null}
      </InputLikeText>
    );
  }

  private handleMobileFocus = () => {
    this.props.onInputClick?.();

    this.mobileInput?.focus();
  };

  private handleItemSelect = (item: T) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(item);
    }

    if (this.isMobileLayout) {
      this.props.onMobileClose?.();
    }
  };

  private refInput = (input: Nullable<Input | InternalTextareaWithLayout>) => {
    if (this.props.refInput) {
      this.props.refInput(input);
    }
    this.input = input;
  };

  private renderSpinner = () => (
    <span className={styles.spinnerWrapper()}>
      <Spinner type="mini" caption="" dimmed />
    </span>
  );

  private getRightIcon = () => {
    const { loading, items, drawArrow, rightIcon, size } = this.props;

    if (loading && items && !!items.length) {
      return <LoadingIcon size={size} />;
    }

    if (rightIcon || drawArrow) {
      return rightIcon || <ArrowDownIcon size={size} />;
    }

    return null;
  };

  private refMobileInput = (input: Nullable<Input>) => {
    this.mobileInput = input;
  };
}
