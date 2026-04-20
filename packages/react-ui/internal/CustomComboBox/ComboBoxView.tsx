import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { getRandomID, isNonNullable } from '../../lib/utils.js';
import type { InputIconType, InputProps, ShowClearIcon } from '../../components/Input/index.js';
import { Input } from '../../components/Input/index.js';
import { InputLikeText } from '../InputLikeText/index.js';
import type { Menu } from '../Menu/index.js';
import type { MenuItemState } from '../../components/MenuItem/index.js';
import { RenderLayer } from '../RenderLayer/index.js';
import { Spinner } from '../../components/Spinner/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { CommonProps } from '../CommonWrapper/index.js';
import { CommonWrapper } from '../CommonWrapper/index.js';
import { MobilePopup } from '../MobilePopup/index.js';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode, getRootNode } from '../../lib/rootNode/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { LoadingIcon } from '../icons2022/LoadingIcon.js';
import type { ComboBoxExtendedItem, ComboBoxViewMode } from '../../components/ComboBox/index.js';
import type { SizeProp } from '../../lib/types/props.js';
import { Popup } from '../Popup/index.js';
import { getMenuPositions } from '../../lib/getMenuPositions.js';
import { ZIndex } from '../ZIndex/index.js';
import type { MaskedInputOnBeforePasteValue, MaskedInputProps } from '../../components/MaskedInput/index.js';
import { MaskedInput } from '../../components/MaskedInput/index.js';
import { getStyles as getMaskedInputStyles } from '../../components/MaskedInput/MaskedInput.styles.js';
import { InternalTextareaWithLayout } from '../InternalTextareaWithLayout/InternalTextareaWithLayout.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { ArrowDownIcon } from './ArrowDownIcon.js';
import { ComboBoxMenu } from './ComboBoxMenu.js';
import { ComboBoxRequestStatus } from './CustomComboBoxTypes.js';
import { getStyles } from './CustomComboBox.styles.js';
import { CustomComboBoxDataTids } from './CustomComboBox.js';
import { getComboBoxTheme } from './getComboBoxTheme.js';

interface ComboBoxViewProps<T>
  extends
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
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

@withRenderEnvironment
@responsiveLayout
@rootNode
@withSize
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
  private styles!: ReturnType<typeof getStyles>;
  private maskedInputStyles!: ReturnType<typeof getMaskedInputStyles>;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private theme!: Theme;
  private size!: SizeProp;
  private menuId = ComboBoxViewIds.menu + getRandomID();

  public state: ComboBoxViewState = {
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
    this.styles = getStyles(this.emotion);
    this.maskedInputStyles = getMaskedInputStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getComboBoxTheme(theme);
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
            className={this.styles.root()}
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
    const { items, loading, opened, refMenu, maxMenuHeight, renderTotalCount, renderNotFound, totalCount } = this.props;

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
        size={this.size}
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
          tryBestFallbackPosition
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
      ref: this.refInput,
      warning,
      inputMode,
      autoComplete: 'off',
      'aria-describedby': ariaDescribedby,
      'aria-controls': this.menuId,
      'aria-label': ariaLabel,
      showClearIcon,
      size: this.size,
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
        size={this.size}
        width="100%"
        ref={refInputLikeText}
        aria-describedby={ariaDescribedby}
        aria-controls={this.menuId}
        showClearIcon={showClearIcon}
        className={this.cx(mask && this.maskedInputStyles.root(this.theme))}
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
    <span className={this.styles.spinnerWrapper()}>
      <Spinner type="mini" caption="" dimmed />
    </span>
  );

  private getRightIcon = () => {
    const { loading, items, drawArrow, rightIcon } = this.props;
    const size = this.size;

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
