import React, { HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import { globalObject } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { ConditionalHandler } from '../../lib/ConditionalHandler';
import { LENGTH_FULLDATE, MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';
import { InternalDateComponentType } from '../../lib/date/types';
import { Theme } from '../../lib/theming/Theme';
import { DatePickerLocale, DatePickerLocaleHelper } from '../DatePicker/locale';
import { InputLikeText } from '../../internal/InputLikeText';
import { locale } from '../../lib/locale/decorators';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { EmotionConsumer } from '../../lib/theming/Emotion';

import { CalendarIcon } from './CalendarIcon';
import { DateFragmentsView } from './DateFragmentsView';
import { getStyles } from './DateInput.styles';
import { Actions, extractAction } from './helpers/DateInputKeyboardActions';
import { InternalDateMediator } from './helpers/InternalDateMediator';

export interface DateInputState {
  selected: InternalDateComponentType | null;
  valueFormatted: string;
  inputMode: boolean;
  focused: boolean;
  dragged: boolean;
}

export const DateInputDataTids = {
  icon: 'DateInput__icon',
} as const;

export interface DateInputProps extends CommonProps, Pick<HTMLAttributes<HTMLElement>, 'id'> {
  autoFocus?: boolean;
  value?: string;
  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;
  disabled?: boolean;
  /**
   * Минимальная дата.
   * @default '01.01.1900'
   */
  minDate?: string;
  /**
   * Максимальная дата
   * @default '31.12.2099'
   */
  maxDate?: string;
  /**
   * Ширина поля
   * @default 125
   */
  width?: string | number;
  withIcon?: boolean;
  /**
   * Размер поля
   * @default 'small'
   */
  size?: SizeProp;
  onBlur?: (x0: React.FocusEvent<HTMLElement>) => void;
  onClick?: (x0: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (x0: React.FocusEvent<HTMLElement>) => void;
  /**
   * Вызывается при изменении `value`
   *
   * @param value - строка в формате `dd.mm.yyyy`.
   */
  onValueChange?: (value: string) => void;
  onKeyDown?: (x0: React.KeyboardEvent<HTMLElement>) => void;
}

type DefaultProps = Required<Pick<DateInputProps, 'value' | 'minDate' | 'maxDate' | 'size' | 'width'>>;

@rootNode
@locale('DatePicker', DatePickerLocaleHelper)
export class DateInput extends React.Component<DateInputProps, DateInputState> {
  public static __KONTUR_REACT_UI__ = 'DateInput';
  public static displayName = 'DateInput';

  public static defaultProps: DefaultProps = {
    value: '',
    minDate: MIN_FULLDATE,
    maxDate: MAX_FULLDATE,
    size: 'small',
    width: 125,
  };

  private getProps = createPropsGetter(DateInput.defaultProps);

  private iDateMediator: InternalDateMediator = new InternalDateMediator();
  private inputLikeText: InputLikeText | null = null;
  private dateFragmentsView: DateFragmentsView | null = null;
  private isMouseDown = false;
  private isMouseFocus = false;
  private ignoringDelimiter = false;
  private locale!: DatePickerLocale;
  private blurEvent: React.FocusEvent<HTMLElement> | null = null;
  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private setRootNode!: TSetRootNode;
  private conditionalHandler = new ConditionalHandler<Actions, [React.KeyboardEvent<HTMLElement>]>()
    .add(Actions.MoveSelectionLeft, () => this.shiftSelection(-1))
    .add(Actions.MoveSelectionRight, () => this.shiftSelection(1))
    .add(Actions.Separator, () => this.pressDelimiter())
    .add(Actions.MoveSelectionFirst, () => this.selectDateComponent(this.iDateMediator.getLeftmostType()))
    .add(Actions.MoveSelectionLast, () => this.selectDateComponent(this.iDateMediator.getRightmostType()))
    .add(Actions.Increment, () => this.shiftDateComponent(1))
    .add(Actions.Decrement, () => this.shiftDateComponent(-1))
    .add(Actions.Digit, (e) => this.inputValue(e))
    .add(Actions.ClearSelection, () => this.clearSelected())
    .add(Actions.ClearOneChar, () => this.clearOneChar())
    .add(Actions.FullSelection, () => this.fullSelection())
    .add(Actions.WrongInput, () => this.blink())
    .build();

  constructor(props: DateInputProps) {
    super(props);

    this.state = {
      valueFormatted: '',
      selected: null,
      inputMode: false,
      focused: false,
      dragged: false,
    };
  }

  public componentDidUpdate(prevProps: DateInputProps) {
    const { value, minDate, maxDate } = this.getProps();
    if (
      prevProps.value !== value ||
      prevProps.minDate !== minDate ||
      prevProps.maxDate !== maxDate ||
      this.iDateMediator.isChangedLocale(this.locale)
    ) {
      this.updateFromProps(false);
    }
    this.selectNode();
  }

  public selectNode = () => {
    const type = this.state.selected;
    const dateFragmentsView = this.dateFragmentsView && this.dateFragmentsView.getRootNode();
    if (type === null || !this.inputLikeText || !dateFragmentsView) {
      return;
    }
    if (type === InternalDateComponentType.All) {
      this.inputLikeText.selectInnerNode(dateFragmentsView, 0, 5);
      return;
    }
    const index = this.iDateMediator.getTypesOrder().indexOf(type);
    if (index > -1) {
      this.inputLikeText.selectInnerNode(dateFragmentsView, index * 2, index * 2 + 1);
    }
  };

  public componentDidMount(): void {
    this.updateFromProps(false);
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  public blur() {
    if (this.inputLikeText) {
      this.inputLikeText.blur();
    }
  }

  public focus() {
    if (this.inputLikeText) {
      this.inputLikeText.focus();
    }
  }

  public blink() {
    if (this.inputLikeText) {
      this.inputLikeText.blink();
    }
  }

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private renderMain() {
    const { focused, selected, inputMode, valueFormatted } = this.state;
    const showValue = Boolean(focused || valueFormatted);
    const { width, size } = this.getProps();

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
          <InputLikeText
            id={this.props.id}
            width={width}
            ref={this.inputLikeTextRef}
            size={size}
            disabled={this.props.disabled}
            error={this.props.error}
            warning={this.props.warning}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onClick={this.props.onClick}
            onKeyDown={this.handleKeyDown}
            onMouseDownCapture={this.handleMouseDownCapture}
            onPaste={this.handlePaste}
            rightIcon={this.renderIcon()}
            onDoubleClickCapture={this.handleDoubleClick}
            onMouseDragStart={this.handleMouseDragStart}
            onMouseDragEnd={this.handleMouseDragEnd}
            value={this.iDateMediator.getInternalString()}
            inputMode={'numeric'}
            takeContentWidth
          >
            <span className={this.emotion.cx(this.styles.value(), { [this.styles.valueVisible()]: showValue })}>
              <DateFragmentsView
                ref={this.dateFragmentsViewRef}
                fragments={this.iDateMediator.getFragments()}
                onSelectDateComponent={this.handleSelectDateComponent}
                selected={selected}
                inputMode={inputMode}
              />
            </span>
          </InputLikeText>
        </FocusControlWrapper>
      </CommonWrapper>
    );
  }

  private renderIcon = () => {
    const { withIcon, disabled = false } = this.props;
    const size = this.getProps().size;
    const styles = this.styles;
    if (withIcon) {
      const theme = this.theme;
      const icon = <CalendarIcon size={size} />;
      const iconStyles = this.emotion.cx({
        [styles.icon(theme)]: true,
        [styles.iconSmall(theme)]: size === 'small',
        [styles.iconMedium(theme)]: size === 'medium',
        [styles.iconLarge(theme)]: size === 'large',
        [styles.iconDisabled(theme)]: disabled,
      });
      return (
        <span className={iconStyles} data-tid={DateInputDataTids.icon}>
          {icon}
        </span>
      );
    }
    return null;
  };

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    this.setState((prevState) => ({
      focused: true,
      selected: this.isMouseDown && !prevState.focused ? prevState.selected : this.iDateMediator.getLeftmostType(),
    }));

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private resetFocus = () => this.updateValue({ focused: false, selected: null, inputMode: false });

  private handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    this.resetFocus();

    if (this.props.onBlur) {
      const restored = this.iDateMediator.restore();
      if (restored) {
        e.persist();
        this.blurEvent = e;
      } else {
        this.props.onBlur(e);
      }
    }
  };

  private handleMouseDownCapture = (e: React.MouseEvent<HTMLSpanElement>) => {
    const isFragment = this.dateFragmentsView ? this.dateFragmentsView.isFragment(e.target) : false;
    if (this.state.focused && !isFragment) {
      e.preventDefault();
    }
    this.isMouseFocus = !this.state.focused;
    this.isMouseDown = isFragment;
  };

  private handleSelectDateComponent = (type: InternalDateComponentType) => {
    if (!(this.isMouseFocus && this.iDateMediator.isEmpty())) {
      this.selectDateComponent(type);
    }
    this.isMouseFocus = false;
    this.isMouseDown = false;
  };

  private handleMouseDragStart = () => {
    this.setState({ dragged: true, selected: null });
  };

  private handleMouseDragEnd = () => {
    const selection = globalObject.getSelection?.();
    if (
      selection &&
      selection.toString().length === LENGTH_FULLDATE &&
      this.state.selected !== InternalDateComponentType.All
    ) {
      this.selectDateComponent(InternalDateComponentType.All);
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (this.conditionalHandler(extractAction(e), e)) {
      e.preventDefault();
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  private handlePaste = (e: React.ClipboardEvent<HTMLElement>) => {
    const pasted = e && e.clipboardData.getData('text').trim();
    if (pasted && this.iDateMediator.validateString(pasted)) {
      this.iDateMediator.paste(pasted);
      this.updateValue();
    }
  };

  private handleDoubleClick = () => {
    this.selectDateComponent(InternalDateComponentType.All);
  };

  private inputLikeTextRef = (el: InputLikeText | null) => {
    this.inputLikeText = el;
  };

  private dateFragmentsViewRef = (el: DateFragmentsView | null) => {
    this.dateFragmentsView = el;
  };

  private selectDateComponent = (selected: InternalDateComponentType | null): void => {
    this.setState({ selected, inputMode: false });
  };

  private updateValue = (state: Partial<DateInputState> = {}, sync = true): void => {
    const valueFormatted = this.iDateMediator.getString();

    const update = () => this.setState({ ...state, valueFormatted } as DateInputState, this.emitChange);

    if (sync && React.version.search('18') === 0) {
      ReactDOM.flushSync(update);
    } else {
      update();
    }
  };

  private updateFromProps = (sync: boolean): void => {
    this.iDateMediator.update(this.props, this.locale);

    this.updateValue({}, sync);
  };

  private fullSelection = (): void => {
    this.selectDateComponent(InternalDateComponentType.All);
  };

  private pressDelimiter = (): void => {
    const value = this.iDateMediator.get(this.state.selected);
    if (value !== null && value !== '') {
      if (!this.ignoringDelimiter) {
        this.shiftSelection(1);
      }
      this.ignoringDelimiter = false;
    }
  };

  private emitChange = (): void => {
    const value = this.iDateMediator.getInternalString();
    if (this.props.value === value) {
      return;
    }
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
    if (this.blurEvent && this.props.onBlur) {
      this.props.onBlur(this.blurEvent);
      this.blurEvent = null;
    }
  };

  private clearSelected = (): void => {
    const selected = this.state.selected === null ? this.iDateMediator.getLeftmostType() : this.state.selected;
    this.iDateMediator.clear(selected);
    this.updateValue({
      inputMode: false,
      selected: selected === InternalDateComponentType.All ? this.iDateMediator.getLeftmostType() : selected,
    });
  };

  private clearOneChar = (): void => {
    const { selected, inputMode } = this.state;
    const nextType = selected === null ? this.iDateMediator.getRightmostType() : selected;
    if (this.iDateMediator.isNull(nextType)) {
      this.shiftSelection(-1);
      return;
    }
    if (selected === InternalDateComponentType.All) {
      this.iDateMediator.clear(InternalDateComponentType.All);
      this.updateValue({ selected: this.iDateMediator.getLeftmostType() });
      return;
    }
    this.iDateMediator.deleteOneCharRight(nextType, inputMode);
    this.updateValue({
      inputMode: this.iDateMediator.get(nextType) !== null,
      selected: nextType,
    });
  };

  private shiftDateComponent = (step: number): void => {
    const { selected } = this.state;
    const changed = this.iDateMediator.shiftDateComponent(selected, step);
    if (!changed) {
      this.blink();
      return;
    }
    this.updateValue({
      inputMode: false,
      selected: selected === InternalDateComponentType.All ? this.iDateMediator.getLeftmostType() : selected,
    });
  };

  private shiftSelection = (step: number): void => {
    const selected = this.iDateMediator.getShiftedType(this.state.selected, step);
    if (selected !== this.state.selected) {
      this.setState({ selected, inputMode: false });
    }
  };

  private inputValue = (event: React.KeyboardEvent<HTMLElement>): void => {
    let selected = this.state.selected;
    if (selected === InternalDateComponentType.All) {
      selected = this.iDateMediator.getLeftmostType();
      this.iDateMediator.clear(InternalDateComponentType.All);
      this.setState({ selected });
    }
    const { inputMode, changed } = this.iDateMediator.inputKey(event.key, selected, this.state.inputMode);
    if (!changed) {
      this.blink();
      return;
    }

    if (!inputMode) {
      this.ignoringDelimiter = true;
      this.shiftSelection(1);
    }
    this.updateValue({ inputMode });
  };
}
