import CalendarIcon from '@skbkontur/react-icons/Calendar';
import * as React from 'react';
import { MIN_FULLDATE, MAX_FULLDATE } from '../../lib/date/constants';
import { InternalDate } from '../../lib/date/InternalDate';
import InternalDateGetter from '../../lib/date/InternalDateGetter';
import InternalDateTransformer from '../../lib/date/InternalDateTransformer';
import { InternalDateComponent, InternalDateComponentType, InternalDateValidateCheck } from '../../lib/date/types';
import MouseDrag from '../../lib/events/MouseDrag';
import { isFirefox } from '../../lib/utils';
import { DatePickerLocale, DatePickerLocaleHelper } from '../DatePicker/locale';
import { isEdge, isIE } from '../ensureOldIEClassName';
import InputLikeText from '../internal/InputLikeText';
import { locale } from '../LocaleProvider/decorators';
import { DateFragmentsView } from './DateFragmentsView';
import { Actions, extractAction } from './helpers/DateInputKeyboardActions';
import { inputNumber } from './helpers/inputNumber';
import { removeAllSelections, selectNodeContents } from './helpers/SelectionHelpers';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './DateInput.styles';
import { ITheme } from '../../lib/theming/Theme';
import ThemeConsumer from '../ThemeConsumer';
import debounce from 'lodash.debounce';

export interface DateInputState {
  selected: InternalDateComponentType | null;
  internalDate: InternalDate;
  typesOrder: InternalDateComponentType[];
  inputMode: boolean;
  focused: boolean;
  notify: boolean;
  dragged: boolean;
  autoMoved: boolean;
}

export interface DateInputProps {
  value?: string;
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

const IS_IE = isIE || isEdge;

@locale('DatePicker', DatePickerLocaleHelper)
export class DateInput extends React.Component<DateInputProps, DateInputState> {
  public static defaultProps = {
    minDate: MIN_FULLDATE,
    maxDate: MAX_FULLDATE,
    size: 'small',
    width: 125,
  };

  private theme!: ITheme;
  private locale!: DatePickerLocale;
  private inputLikeText: InputLikeText | null = null;
  private divInnerNode: HTMLDivElement | null = null;
  private isMouseDown: boolean = false;
  private isFirstFocus: boolean = false;
  private ieFrozen: boolean = false;

  constructor(props: DateInputProps) {
    super(props);

    this.state = {
      notify: false,
      selected: null,
      internalDate: new InternalDate(),
      typesOrder: [],
      inputMode: false,
      focused: false,
      dragged: false,
      autoMoved: false,
    };
  }

  public componentDidUpdate(prevProps: DateInputProps, prevState: DateInputState) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.minDate !== this.props.minDate ||
      prevProps.maxDate !== this.props.maxDate ||
      prevState.internalDate.getOrder() !== this.locale.order ||
      prevState.internalDate.getSeparator() !== this.locale.separator
    ) {
      this.updateInternalDate(undefined, {}, this.updateInternalDateFromProps);
    }

    if (this.state.focused && prevState.selected !== this.state.selected) {
      this.selection();
    }

    if (this.state.notify && !prevState.notify) {
      this.notify();
    }
  }

  public componentDidMount(): void {
    this.updateInternalDate(undefined, {}, this.updateInternalDateFromProps);
    if (this.divInnerNode) {
      MouseDrag.listen(this.divInnerNode);
      this.divInnerNode.addEventListener('mousedragstart', this.handleMouseDragStart);
      this.divInnerNode.addEventListener('mousedragend', this.handleMouseDragEnd);
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

  public blur() {
    if (this.inputLikeText) {
      this.inputLikeText.blur();
    }
    this.setState({ focused: false });
  }

  public focus() {
    if (!this.props.disabled) {
      if (this.inputLikeText) {
        this.inputLikeText.focus();
      }
      this.setState({ focused: true });
    }
  }

  public blink() {
    if (!this.props.disabled) {
      if (this.inputLikeText) {
        this.inputLikeText.blink();
      }
    }
  }

  private renderMain() {
    const { internalDate, focused, selected, inputMode } = this.state;
    const fragments =
      internalDate && (focused || !internalDate.isEmpty())
        ? internalDate.toFragments({
            withSeparator: true,
            withPad: true,
          })
        : [];

    return (
      <InputLikeText
        width={this.props.width}
        ref={el => {
          this.inputLikeText = el;
        }}
        size={this.props.size}
        disabled={this.props.disabled}
        error={this.props.error}
        warning={this.props.warning}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onPaste={this.handlePaste}
        rightIcon={this.renderIcon}
        onDoubleClickCapture={this.handleDoubleClick}
      >
        <DateFragmentsView
          nodeRef={this.divInnerNodeRef}
          fragments={fragments}
          onSelectDateComponent={this.handleSelectDateComponent}
          selected={selected}
          inputMode={inputMode}
        />
      </InputLikeText>
    );
  }

  private divInnerNodeRef = (el: HTMLDivElement | null) => {
    this.divInnerNode = el;
  };

  private handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    this.isMouseDown = true;

    if (IS_IE && this.state.focused && !this.ieFrozen) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private handleMouseUp = (): void => {
    this.isMouseDown = false;
    this.setState({ selected: this.getFirstDateComponentType() });
  };

  private handleSelectDateComponent = (type: InternalDateComponentType, event: React.MouseEvent<HTMLElement>): void => {
    this.isMouseDown = false;
    if (this.isFirstFocus && this.state.internalDate && this.state.internalDate.isEmpty()) {
      this.isFirstFocus = false;
      return;
    }
    this.selectDateComponent(type);
    event.preventDefault();
    event.stopPropagation();
    this.isFirstFocus = false;
  };

  private changeSelectedDateComponent = (type?: InternalDateComponentType | null): void => {
    type = type || this.state.selected;
    if (type === null) {
      return;
    }
    if (type === InternalDateComponentType.All) {
      this.selectNodeContents(this.divInnerNode);
      return;
    }
    const index = this.state.typesOrder.indexOf(type);
    if (index > -1) {
      this.selectNodeContents(this.divInnerNode, index * 2, index * 2 + 1);
    }
  };

  private handleMouseDragStart = () => this.setState({ dragged: true, selected: null });
  private handleMouseDragEnd = () => this.setState({ dragged: false });

  private updateInternalDate = (
    _internalDate?: InternalDate,
    state: Partial<DateInputState> = {},
    callback: (...any: any[]) => void = this.emitChange,
  ): void => {
    const internalDate = (_internalDate || this.state.internalDate || new InternalDate()).clone();
    internalDate.setOrder(this.locale.order).setSeparator(this.locale.separator);
    const typesOrder = internalDate.toFragments().map(({ type }) => type);
    this.setState({ ...state, typesOrder, internalDate } as DateInputState, callback);
  };

  private updateInternalDateFromProps = (): void => {
    let isMod: boolean = false;
    const internalDate = this.state.internalDate.clone();
    const start = internalDate.getRangeStart();
    const min = start && start.toInternalString();
    const end = internalDate.getRangeEnd();
    const max = end && end.toInternalString();
    const { order, separator } = this.locale;
    if (this.props.minDate !== min) {
      isMod = true;
      internalDate.setRangeStart(new InternalDate({ order, separator, value: this.props.minDate }));
    }
    if (this.props.maxDate !== max) {
      isMod = true;
      internalDate.setRangeEnd(new InternalDate({ order, separator, value: this.props.maxDate }));
    }
    if (!this.props.value || this.props.value !== internalDate.toInternalString()) {
      isMod = true;
      internalDate.parseInternalValue(this.props.value);
    }
    if (isMod) {
      this.setState({ internalDate });
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLElement>): void => {
    if (this.props.disabled) {
      return;
    }

    if (IS_IE && this.ieFrozen) {
      this.ieFrozen = false;
      event.preventDefault();
      return;
    }

    this.setState(prevState => {
      this.isFirstFocus = !prevState.focused;
      return {
        focused: true,
        selected:
          prevState.selected === null && !this.isMouseDown ? this.getFirstDateComponentType() : prevState.selected,
      };
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLElement>): void => {
    if (IS_IE && this.ieFrozen) {
      event.preventDefault();
      return;
    }

    event.persist();

    this.setState({ focused: false, selected: null, inputMode: false }, () => {
      const { internalDate } = this.state;
      removeAllSelections();
      if (internalDate && internalDate.isIncomplete()) {
        this.updateInternalDate(internalDate.restore());
      }
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    });
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    const action = extractAction(event);

    if (action === Actions.MoveSelectionLeft) {
      this.moveSelection(-1);
    }

    if (action === Actions.MoveSelectionRight) {
      this.moveSelection(1);
    }

    if (action === Actions.Separator) {
      this.pressDelimiter();
    }

    if (action === Actions.MoveSelectionFirst) {
      this.selectDateComponent(this.getFirstDateComponentType());
    }

    if (action === Actions.MoveSelectionLast) {
      this.selectDateComponent(this.getLastDateComponentType());
    }

    if (action === Actions.Increment) {
      this.updateDateComponentBy(1);
    }

    if (action === Actions.Decrement) {
      this.updateDateComponentBy(-1);
    }

    if (action === Actions.Digit) {
      this.inputValue(event);
    }

    if (action === Actions.ClearSelection) {
      this.clearSelected();
    }

    if (action === Actions.ClearOneChar) {
      if (this.state.selected === InternalDateComponentType.All) {
        this.clearSelected();
      } else {
        this.clearOneChar();
      }
    }

    if (action === Actions.FullSelection) {
      event.nativeEvent.stopImmediatePropagation();
      this.selectDateComponent(InternalDateComponentType.All);
    }

    if (action === Actions.PasteValue) {
      // @ts-ignore (IE specific api)
      if (isIE && window.clipboardData) {
        // @ts-ignore
        this.handlePaste(undefined, window.clipboardData.getData('text'));
      }
    }

    if (action === Actions.WrongInput) {
      this.blink();
    }

    if (this.state.focused && action !== Actions.Ignore) {
      this.selection();
    }

    if (action !== Actions.Ignore && action !== Actions.PasteValue && action !== Actions.CopyValue) {
      event.preventDefault();
    }
  };

  // tslint:disable:member-ordering
  private selectionNotIe = () => {
    this.changeSelectedDateComponent(this.state.selected)
  };
  private selectionIe = debounce(() => {
    const node = this.inputLikeText && this.inputLikeText.getNode();
    if (this.inputLikeText && node && node.contains(document.activeElement)) {
      this.ieFrozen = true;
      this.changeSelectedDateComponent(this.state.selected);
      if (this.inputLikeText) {
        this.inputLikeText.focus();
      }
    }
  }, 10);
  private selection = IS_IE ? this.selectionIe : this.selectionNotIe;
  // tslint:enable:member-ordering

  private pressDelimiter = () => {
    const value = this.state.internalDate.get(this.state.selected);
    if (value !== null && value !== '') {
      if (this.state.autoMoved) {
        this.setState({ autoMoved: false });
      } else {
        this.moveSelection(1);
      }
    }
  };

  private handlePaste = (e?: React.ClipboardEvent<HTMLElement>, pasted?: string): void => {
    pasted = pasted || (e && e.clipboardData.getData('text').trim());
    if (pasted && this.state.internalDate !== null) {
      this.updateInternalDate(
        this.state.internalDate
          .parseValue(pasted)
          .restore()
          .cutOffExcess(),
      );
    }
  };

  private emitChange = (): void => {
    const value = this.state.internalDate.isEmpty() ? '' : this.state.internalDate.toInternalString();
    if (this.props.value === value) {
      return;
    }
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  };

  private clearSelected(): void {
    const selected = this.state.selected === null ? this.getFirstDateComponentType() : this.state.selected;
    this.updateInternalDate(this.state.internalDate.clone().set(selected, null), { inputMode: false, selected });
    if (selected === InternalDateComponentType.All) {
      this.selectDateComponent(this.getFirstDateComponentType());
    }
  }

  private clearOneChar(): void {
    const { selected, internalDate, inputMode } = this.state;
    const prevType = selected === null ? this.getLastDateComponentType() : selected;
    const nextType =
      prevType === InternalDateComponentType.All
        ? internalDate
          .toFragments({ withSeparator: false })
          .reduce((_type, { value, type }) => (value !== null ? type : _type), this.getLastDateComponentType())
        : prevType;
    let prev = internalDate.get(nextType);
    if (prev === null) {
      this.moveSelection(-1);
      return;
    }
    prev = String(inputMode ? prev : InternalDateTransformer.padDateComponent(nextType, prev));
    const next = prev.replace(/.$/, '') || null;
    this.updateInternalDate(internalDate.clone().set(nextType, next), {
      inputMode: next !== null,
      selected: nextType,
    });
  }

  private updateDateComponentBy(step: number): void {
    const internalDate = this.state.internalDate.clone();
    const initial = internalDate.clone();
    let { selected } = this.state;
    selected = selected === null ? this.getFirstDateComponentType() : selected;
    const isValidRange = internalDate.validate({ checks: [InternalDateValidateCheck.Range] });
    const start = internalDate.getRangeStart();
    const end = internalDate.getRangeEnd();
    if (!isValidRange) {
      if (start && InternalDateGetter.max([internalDate, start]) === start) {
        internalDate.setComponents(start.getComponentsRaw());
      } else if (end && InternalDateGetter.min([internalDate, end]) === end) {
        internalDate.setComponents(end.getComponentsRaw());
      }
    } else {
      const clone = internalDate.clone().shift(selected, step, { isRange: false, isLoop: true });
      if (clone.validate({ checks: [InternalDateValidateCheck.Range] })) {
        internalDate.shift(selected, step, { isRange: false, isLoop: true });
      }
    }
    this.updateInternalDate(internalDate, {
      inputMode: false,
      selected: selected === InternalDateComponentType.All ? this.getFirstDateComponentType() : selected,
      notify: initial.get(selected) === internalDate.get(selected),
    });
  }

  private moveSelection(step: number, isAutoMoved: boolean = false): void {
    const { internalDate, typesOrder, selected } = this.state;
    const index = selected === null ? 0 : typesOrder.indexOf(selected);
    if (
      (typesOrder[index] === this.getLastDateComponentType() && step > 0) ||
      (typesOrder[index] === this.getFirstDateComponentType() && step < 0)
    ) {
      return;
    }
    let nextIndex = index + step;
    if (selected === InternalDateComponentType.All) {
      nextIndex = step < 0 ? 0 : typesOrder.length - 1;
    }
    if (selected === InternalDateComponentType.Year && internalDate.getYear() !== null) {
      internalDate.restore(selected);
    }
    this.updateInternalDate(internalDate);
    if (nextIndex >= 0 && nextIndex < typesOrder.length) {
      this.setState({
        selected: typesOrder[nextIndex],
        inputMode: false,
        autoMoved: isAutoMoved,
      });
    }
  }

  private notify(): void {
    this.blink();
    this.setState({ notify: false });
  }

  private inputValue(event: React.KeyboardEvent<HTMLElement>): void {
    event.persist();
    let { selected: type } = this.state;
    const internalDate = this.state.internalDate.clone();
    let prev = internalDate.get(type);
    if (type === null) {
      type = this.getFirstDateComponentType();
      prev = null;
      internalDate.set(type, null);
    }
    if (type === InternalDateComponentType.All) {
      type = this.getFirstDateComponentType();
      prev = null;
      internalDate.set(InternalDateComponentType.All, null);
    }
    this.setState({ selected: type, internalDate }, () => {
      inputNumber(type, prev, event.key, this.state.inputMode, this.inputNumberCallBack);
    });
  }

  private inputNumberCallBack = (next: InternalDateComponent, inputMode: boolean): void => {
    let { selected: type } = this.state;
    const internalDate = this.state.internalDate.clone();
    if (type === null || type === InternalDateComponentType.All) {
      type = this.getFirstDateComponentType();
      inputMode = false;
      this.selectDateComponent(type);
    }
    internalDate.set(type, next);
    if (!inputMode) {
      if (type !== InternalDateComponentType.Year) {
        internalDate.cutOffExcess(type);
      } else {
        internalDate.restore(type);
      }
      this.moveSelection(1, true);
    }
    this.updateInternalDate(internalDate, { inputMode });
  };

  private selectNodeContents = (node: HTMLElement | null, start?: number, end?: number): void => {
    if (this.state.focused && node) {
      if (isFirefox) {
        selectNodeContents(node, start, end);
        setTimeout(() => this.state.focused && selectNodeContents(node, start, end), 0);
      } else {
        selectNodeContents(node, start, end);
      }
    }
  };

  private selectDateComponent = (selected: InternalDateComponentType | null): void => {
    if (IS_IE && this.ieFrozen) {
      return;
    }
    this.setState({ selected, inputMode: false });
  };

  private handleDoubleClick = (): void => {
    this.selectDateComponent(InternalDateComponentType.All);
  };

  private getFirstDateComponentType = (): InternalDateComponentType => this.state.typesOrder[0];

  private getLastDateComponentType = (): InternalDateComponentType =>
    this.state.typesOrder[this.state.typesOrder.length - 1];

  private renderIcon = () => {
    const { withIcon, size, disabled = false } = this.props;

    if (withIcon) {
      const theme = this.theme;
      const iconStyles = cx({
        [styles.icon]: true,
        [jsStyles.icon(theme)]: true,
        [jsStyles.iconSmall(theme)]: size === 'small',
        [jsStyles.iconMedium(theme)]: size === 'medium',
        [jsStyles.iconLarge(theme)]: size === 'large',
        [styles.iconDisabled]: disabled,
        [jsStyles.iconDisabled(theme)]: disabled,
      });
      return (
        <span className={iconStyles}>
          <CalendarIcon/>
        </span>
      );
    }
    return null;
  };
}

export default DateInput;
