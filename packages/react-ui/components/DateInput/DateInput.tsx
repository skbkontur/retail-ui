import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { globalObject } from '@skbkontur/global-object';

import type { ReactUIFeatureFlags } from '../../lib/featureFlagsContext';
import { getFullReactUIFlagsContext, ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext';
import { ConditionalHandler } from '../../lib/ConditionalHandler';
import { LENGTH_FULLDATE, MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';
import { InternalDateComponentType } from '../../lib/date/types';
import type { Theme } from '../../lib/theming/Theme';
import type { DatePickerLocale } from '../DatePicker/locale';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { InputLikeText } from '../../internal/InputLikeText';
import { locale } from '../../lib/locale/decorators';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';
import { withSize } from '../../lib/size/SizeDecorator';

import { CalendarIcon } from './CalendarIcon';
import { DateFragmentsView } from './DateFragmentsView';
import { styles } from './DateInput.styles';
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
  root: 'DateInput__root',
  icon: 'DateInput__icon',
} as const;

export interface DateInputProps
  extends CommonProps,
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label' | 'aria-labelledby'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'> {
  /** Устанавливает фокус на контроле после окончания загрузки страницы. */
  autoFocus?: boolean;

  /** Устанавливает значение датаинпута. */
  value?: string;

  /** Переводит контрол в состояние валидации "ошибка". */
  error?: boolean;

  /** Переводит контрол в состояние валидации "предупреждение". */
  warning?: boolean;

  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Задает минимальную возможную дату в формате `dd.mm.yyyy`. */
  minDate?: string;

  /** Задает максимальную возможную дату в формате `dd.mm.yyyy` */
  maxDate?: string;

  /** Задает ширину поля. */
  width?: string | number;

  /** Добавляет иконку календаря. */
  withIcon?: boolean;

  /** Задает размер поля. */
  size?: SizeProp;

  /** Задает функцию, которая вызывается при потере датаинпутом фокуса. */
  onBlur?: (x0: React.FocusEvent<HTMLElement>) => void;

  /** Задает функцию, которая вызывается при клике на датаинпут. */
  onClick?: (x0: React.MouseEvent<HTMLElement>) => void;

  /** Задает функцию, которая вызывается при получении датаинпутом фокуса. */
  onFocus?: (x0: React.FocusEvent<HTMLElement>) => void;

  /** Задает функцию, которая вызывается при изменении value.
   * @param value - строка в формате `dd.mm.yyyy`. */
  onValueChange?: (value: string) => void;

  /** Задает функцию, которая вызывается при нажатии кнопки на клавиатуре. */
  onKeyDown?: (x0: React.KeyboardEvent<HTMLElement>) => void;
}

type DefaultProps = Required<Pick<DateInputProps, 'value' | 'minDate' | 'maxDate' | 'width'>>;

/**
 * Компонент поля `DateInput` из DatePicker'а помогает выбирать дату с клавиатуры.
 */
@rootNode
@locale('DatePicker', DatePickerLocaleHelper)
@withSize
export class DateInput extends React.Component<DateInputProps, DateInputState> {
  public static __KONTUR_REACT_UI__ = 'DateInput';
  public static displayName = 'DateInput';

  public static defaultProps: DefaultProps = {
    value: '',
    minDate: MIN_FULLDATE,
    maxDate: MAX_FULLDATE,
    width: 125,
  };
  private size!: SizeProp;

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
  public getRootNode!: TGetRootNode;
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

  private featureFlags!: ReactUIFeatureFlags;

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
    !this.props.disabled && this.selectNode();
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
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullReactUIFlagsContext(flags);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </ReactUIFeatureFlagsContext.Consumer>
    );
  }

  private renderMain() {
    const { focused, selected, inputMode, valueFormatted } = this.state;
    const showValue = Boolean(focused || valueFormatted);
    const { width } = this.getProps();

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
          <InputLikeText
            data-tid={DateInputDataTids.root}
            id={this.props.id}
            width={width}
            ref={this.inputLikeTextRef}
            size={this.size}
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
            aria-describedby={this.props['aria-describedby']}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
          >
            <span className={cx(styles.value(), { [styles.valueVisible()]: showValue })}>
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
    const size = this.size;

    if (withIcon) {
      const theme = this.theme;
      const icon = <CalendarIcon size={size} />;
      const iconStyles = cx({
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

  private resetFocus = () => this.updateValue({ focused: false, selected: null, inputMode: false }, false);

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
    if (this.props.onValueChange) {
      const value = this.iDateMediator.getInternalString();
      if (this.props.value !== value) {
        this.props.onValueChange(value);
      }
    }

    // `this.blurEvent` is always null in `flushSync` without `setTimeout` due to sync update
    setTimeout(() => {
      if (this.blurEvent && this.props.onBlur) {
        this.props.onBlur(this.blurEvent);
        this.blurEvent = null;
      }
    });
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

    const { inputMode, changed } = this.iDateMediator.inputKey(
      event.key,
      selected,
      this.state.inputMode,
      this.featureFlags.dateInputAllowInvalidValuesInDays,
    );

    if (!this.featureFlags.dateInputFixSameNumberTypingOnRefocus) {
      if (!changed) {
        this.blink();
        return;
      }
    }

    if (!inputMode) {
      this.ignoringDelimiter = true;
      this.shiftSelection(1);
    }
    this.updateValue({ inputMode });
  };
}
