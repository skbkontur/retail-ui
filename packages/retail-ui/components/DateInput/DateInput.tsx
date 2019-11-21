import CalendarIcon from '@skbkontur/react-icons/Calendar';
import * as React from 'react';
import { ConditionalHandler } from '../../lib/ConditionalHandler';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';
import { InternalDateComponentType } from '../../lib/date/types';
import { cx } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import { DatePickerLocale, DatePickerLocaleHelper } from '../DatePicker/locale';
import InputLikeText from '../internal/InputLikeText';
import { locale } from '../LocaleProvider/decorators';
import ThemeConsumer from '../ThemeConsumer';
import { DateFragmentsView } from './DateFragmentsView';
import jsStyles from './DateInput.styles';
import { Actions, extractAction } from './helpers/DateInputKeyboardActions';
import InternalDateMediator from './helpers/InternalDateMediator';
import { IconType } from '../Input/Input';

export interface DateInputState {
  selected: InternalDateComponentType | null;
  valueFormatted: string;
  inputMode: boolean;
  focused: boolean;
  dragged: boolean;
}

export interface DateInputProps {
  value: string;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
  /**
   * Минимальная дата.
   * @default '01.01.1900'
   */
  minDate: string;
  /**
   * Максимальная дата
   * @default '31.12.2099'
   */
  maxDate: string;
  /**
   * Ширина поля
   * @default 125
   */
  width: string | number;
  withIcon?: boolean;
  /**
   * Размер поля
   * @default 'small'
   */
  size: 'small' | 'large' | 'medium';
  onBlur?: (x0: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (x0: React.FocusEvent<HTMLElement>) => void;
  /**
   * @param e - объект, частично имитирующий объект `Event`.
   * @param value - строка в формате `dd.mm.yyyy`.
   */
  onChange?: (e: { target: { value: string } }, value: string) => void;
  onKeyDown?: (x0: React.KeyboardEvent<HTMLElement>) => void;
}

@locale('DatePicker', DatePickerLocaleHelper)
export class DateInput extends React.Component<DateInputProps, DateInputState> {
  public static defaultProps = {
    value: '',
    minDate: MIN_FULLDATE,
    maxDate: MAX_FULLDATE,
    size: 'small',
    width: 125,
  };

  private iDateMediator: InternalDateMediator = new InternalDateMediator();
  private inputLikeText: InputLikeText | null = null;
  private isMouseDown: boolean = false;
  private ignoringDelimiter: boolean = false;
  private locale!: DatePickerLocale;
  private divInnerNode: HTMLDivElement | null = null;
  private fragmentNodes: Set<HTMLSpanElement> = new Set();
  private theme!: ITheme;
  private conditionalHandler = new ConditionalHandler<Actions, [React.KeyboardEvent<HTMLElement>]>()
    .add(Actions.MoveSelectionLeft, () => this.shiftSelection(-1))
    .add(Actions.MoveSelectionRight, () => this.shiftSelection(1))
    .add(Actions.Separator, () => this.pressDelimiter())
    .add(Actions.MoveSelectionFirst, () => this.selectDateComponent(this.iDateMediator.getLeftmostType()))
    .add(Actions.MoveSelectionLast, () => this.selectDateComponent(this.iDateMediator.getRightmostType()))
    .add(Actions.Increment, () => this.shiftDateComponent(1))
    .add(Actions.Decrement, () => this.shiftDateComponent(-1))
    .add(Actions.Digit, e => this.inputValue(e))
    .add(Actions.ClearSelection, () => this.clearSelected())
    .add(Actions.ClearOneChar, () => this.clearOneChar())
    .add(Actions.FullSelection, () => this.fullSelection())
    .add(Actions.WrongInput, () => this.notify())
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

  public componentDidUpdate(prevProps: DateInputProps, prevState: DateInputState) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.minDate !== this.props.minDate ||
      prevProps.maxDate !== this.props.maxDate ||
      this.iDateMediator.isChangedLocale(this.locale)
    ) {
      this.updateFromProps();
    }
    this.selectNode();
  }

  public selectNode = () => {
    const type = this.state.selected;
    if (type === null || !this.inputLikeText) {
      return;
    }
    if (type === InternalDateComponentType.All) {
      this.inputLikeText.selectInnerNode(this.divInnerNode, 0, 5);
      return;
    }
    const index = this.iDateMediator.getTypesOrder().indexOf(type);
    if (index > -1) {
      this.inputLikeText.selectInnerNode(this.divInnerNode, index * 2, index * 2 + 1);
    }
  };

  public componentDidMount(): void {
    this.updateFromProps();
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
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { focused, selected, inputMode, valueFormatted } = this.state;
    const fragments = focused || valueFormatted !== '' ? this.iDateMediator.getFragments() : [];

    return (
      <InputLikeText
        width={this.props.width}
        ref={this.inputLikeTextRef}
        size={this.props.size}
        disabled={this.props.disabled}
        error={this.props.error}
        warning={this.props.warning}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onMouseDownCapture={this.handleMouseDownCapture}
        onPaste={this.handlePaste}
        rightIcon={this.renderIcon()}
        onDoubleClickCapture={this.handleDoubleClick}
        onMouseDragStart={this.handleMouseDragStart}
        onMouseDragEnd={this.handleMouseDragEnd}
        value={this.iDateMediator.getInternalString()}
      >
        <DateFragmentsView
          nodeRef={this.divInnerNodeRef}
          fragments={fragments}
          onSelectDateComponent={this.handleSelectDateComponent}
          onMouseDown={this.handleFragmentMouseDown}
          selected={selected}
          inputMode={inputMode}
          onLoadedFragmentNodes={this.handleLoadedFragmentNodes}
        />
      </InputLikeText>
    );
  }

  private renderIcon = (): IconType => {
    const { withIcon, size, disabled = false } = this.props;

    if (withIcon) {
      const theme = this.theme;
      const iconStyles = cx({
        [jsStyles.icon(theme)]: true,
        [jsStyles.iconSmall(theme)]: size === 'small',
        [jsStyles.iconMedium(theme)]: size === 'medium',
        [jsStyles.iconLarge(theme)]: size === 'large',
        [jsStyles.iconDisabled(theme)]: disabled,
      });
      return (
        <span className={iconStyles}>
          <CalendarIcon />
        </span>
      );
    }
    return null;
  };

  private handleFragmentMouseDown = () => {
    this.isMouseDown = !this.state.focused;
  };

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    this.setState(prevState => ({
      focused: true,
      selected: this.isMouseDown ? prevState.selected : this.iDateMediator.getLeftmostType(),
    }));

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    this.iDateMediator.blur();
    this.updateValue({ focused: false, selected: null, inputMode: false });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  private handleMouseDownCapture = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (this.state.focused && !this.fragmentNodes.has(e.target as HTMLSpanElement)) {
      e.preventDefault();
    }
  };

  private handleLoadedFragmentNodes = (fragmentNodes: Set<HTMLSpanElement>) => {
    this.fragmentNodes = fragmentNodes;
  };

  private handleSelectDateComponent = (type: InternalDateComponentType) => {
    this.isMouseDown = false;
    this.selectDateComponent(type);
  };

  private handleMouseDragStart = () => {
    this.setState({ dragged: true, selected: null });
  };

  private handleMouseDragEnd = () => {
    if (
      this.divInnerNode &&
      this.state.selected !== InternalDateComponentType.All &&
      getSelection().toString() === this.divInnerNode.innerText
    ) {
      this.selectDateComponent(InternalDateComponentType.All);
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.persist();
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

  private divInnerNodeRef = (el: HTMLDivElement | null) => {
    this.divInnerNode = el;
  };

  private inputLikeTextRef = (el: InputLikeText | null) => {
    this.inputLikeText = el;
  };

  private selectDateComponent = (selected: InternalDateComponentType | null): void => {
    this.setState({ selected, inputMode: false });
  };

  private updateValue = (state: Partial<DateInputState> = {}): void => {
    const valueFormatted = this.iDateMediator.getString();

    this.setState({ ...state, valueFormatted } as DateInputState, this.emitChange);
  };

  private updateFromProps = (): void => {
    this.iDateMediator.update(this.props, this.locale);

    this.updateValue();
  };

  private notify = (): void => {
    this.blink();
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
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
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
      this.notify();
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
    const inputMode = this.iDateMediator.inputKey(event.key, selected, this.state.inputMode);

    if (!inputMode) {
      this.ignoringDelimiter = true;
      this.shiftSelection(1);
    }
    this.updateValue({ inputMode });
  };
}

export default DateInput;
