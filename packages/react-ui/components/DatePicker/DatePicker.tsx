import type { HTMLAttributes } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { Popup } from '../../internal/Popup/index.js';
import { LocaleContext } from '../../lib/locale/index.js';
import { locale } from '../../lib/locale/decorators.js';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter.js';
import { ArrowAUpIcon16Light } from '../../internal/icons2022/ArrowAUpIcon/ArrowAUp16Light.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import { InternalDate } from '../../lib/date/InternalDate.js';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants.js';
import { InternalDateOrder, InternalDateSeparator, InternalDateValidateCheck } from '../../lib/date/types.js';
import type { Nullable } from '../../typings/utility-types.js';
import { DateInput } from '../DateInput/index.js';
import { filterProps } from '../../lib/filterProps.js';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { isMobile } from '../../lib/client.js';
import { NativeDateInput } from '../../internal/NativeDateInput/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import { isNonNullable } from '../../lib/utils.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import type { CalendarDateShape, CalendarProps } from '../Calendar/index.js';
import { Calendar } from '../Calendar/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { Button } from '../Button/index.js';
import { getTodayDate } from '../Calendar/CalendarUtils.js';
import type { SizeProp } from '../../lib/types/props.js';
import { responsiveLayout } from '../ResponsiveLayout/decorator.js';
import { getMenuPositions } from '../../lib/getMenuPositions.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './DatePicker.styles.js';
import type { DatePickerLocale } from './locale/index.js';
import { DatePickerLocaleHelper } from './locale/index.js';
import { MobilePicker } from './MobilePicker.js';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  size: true,
  onKeyDown: true,
};

export const MIN_WIDTH = 120;

export interface DatePickerProps
  extends
    Pick<CalendarProps, 'isHoliday' | 'minDate' | 'maxDate' | 'renderDay' | 'onMonthChange'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    CommonProps {
  /** Устанавливает фокус на контроле после окончания загрузки страницы. */

  autoFocus?: boolean;

  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Отображает кнопку "Сегодня" в календаре. */
  enableTodayLink?: boolean;

  /** Переводит контрол в состояние валидации "ошибка". */
  error?: boolean;

  /** Задает nекущую позицию выпадающего окна вручную. */
  menuPos?: 'top' | 'bottom';

  /** Задает выравнивание меню. */
  menuAlign?: 'left' | 'right';

  /** Задает размер контрола. */
  size?: SizeProp;

  /**
   * Строка формата `dd.mm.yyyy`
   * Задает значение автокомплита.
   */
  value?: string | null;

  /** Переводит контрол в состояние валидации "предупреждение". */
  warning?: boolean;

  /** Задает ширину автокомплита. */
  width?: number | string;

  /** Задает функцию, которая вызывается при потере датапикером фокуса. */
  onBlur?: () => void;

  /** Задает функцию, вызывающуюся при изменении value.
   * @param value - строка в формате `dd.mm.yyyy`. */
  onValueChange: (value: string) => void;

  /** Задает функцию, которая вызывается при получении датапикером фокуса. */
  onFocus?: () => void;

  /** Задает функцию, которая вызывается при нажатии кнопки на клавиатуре. */
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). См разницу с onMouseOver в [документации](https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave)  */
  onMouseEnter?: (e: React.MouseEvent<any>) => void;

  /** Задает функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: (e: React.MouseEvent<any>) => void;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseover`). */
  onMouseOver?: (e: React.MouseEvent<any>) => void;

  /** Позволяет использовать на мобильных устройствах нативный календарь для выбора дат.
   * На iOS нативный календарь не умеет работать с minDate и maxDate. */
  useMobileNativeDatePicker?: boolean;
}

export interface DatePickerState {
  opened: boolean;
  canUseMobileNativeDatePicker: boolean;
  today: CalendarDateShape;
}

export const DatePickerDataTids = {
  root: 'DatePicker__root',
  input: 'DatePicker__input',
  label: 'DatePicker__label',
  pickerRoot: 'Picker__root',
  pickerTodayWrapper: 'Picker__todayWrapper',
} as const;

type DefaultProps = Required<Pick<DatePickerProps, 'minDate' | 'maxDate'>>;

/**
 * Поле `DatePicker` помогает вводить дату с клавиатуры или выбирать ее с помощью мыши.
 *
 * Используйте поле с датой, когда нужно ввести дату в формате ДД.ММ.ГГГГ.
 *
 * Поле с датой отличается от обычного поля ввода наличием иконки, маски и блока календаря.
 */
@withRenderEnvironment
@responsiveLayout
@rootNode
@locale('DatePicker', DatePickerLocaleHelper)
export class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {
  public static __KONTUR_REACT_UI__ = 'DatePicker';
  public static displayName = 'DatePicker';

  public static defaultProps: DefaultProps = {
    minDate: MIN_FULLDATE,
    maxDate: MAX_FULLDATE,
  };

  private getProps = createPropsGetter(DatePicker.defaultProps);
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private readonly locale!: DatePickerLocale;
  private canOpenPopup = true;

  public static validate = (value: Nullable<string>, range: { minDate?: string; maxDate?: string } = {}): boolean => {
    if (!value) {
      return false;
    }

    const { minDate = MIN_FULLDATE, maxDate = MAX_FULLDATE } = range;
    const internalDate = new InternalDate({
      order: InternalDateOrder.DMY,
      separator: InternalDateSeparator.Dot,
    })
      .setRangeStart(new InternalDate({ value: minDate }))
      .setRangeEnd(new InternalDate({ value: maxDate }))
      .parseValue(value);

    return internalDate.validate({
      checks: [
        InternalDateValidateCheck.NotNull,
        InternalDateValidateCheck.Number,
        InternalDateValidateCheck.Native,
        InternalDateValidateCheck.Limits,
        InternalDateValidateCheck.Range,
      ],
    });
  };

  public state: DatePickerState = { opened: false, canUseMobileNativeDatePicker: false, today: getTodayDate() };

  private input: DateInput | null = null;
  private focused = false;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private isMobileLayout!: boolean;

  public componentDidMount() {
    if (this.props.useMobileNativeDatePicker && isMobile) {
      this.setState({
        canUseMobileNativeDatePicker: true,
      });
    }
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  public componentDidUpdate(prevProps: DatePickerProps, prevState: DatePickerState) {
    const { disabled } = this.props;
    const { opened } = this.state;
    if (disabled && opened) {
      this.close();
    }

    if (prevState.opened && !opened && this.isMobileLayout) {
      this.handleBlur();
    }
  }

  /**
   * @public
   */
  public blur(): void {
    if (this.input) {
      this.input.blur();
    }
    this.handleBlur();
  }

  /**
   * @public
   */
  public focus(opts?: { withoutOpenDropdown?: boolean }): void {
    if (this.props.disabled) {
      return;
    }

    if (opts?.withoutOpenDropdown) {
      this.canOpenPopup = false;
    }

    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * Закрывает выпадашку выбора дня
   * @public
   */
  public close(): void {
    this.setState({ opened: false });
  }

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;

          return (
            <ThemeContext.Provider value={ThemeFactory.create({ calendarBottomSeparatorBorder: 'none' }, theme)}>
              <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
                {this.renderMain}
              </CommonWrapper>
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<DatePickerProps>): React.JSX.Element => {
    let picker = null;

    const { minDate, maxDate, menuPos, menuAlign } = this.getProps();

    const isMobile = this.isMobileLayout;

    if (this.state.opened) {
      if (isMobile) {
        picker = (
          <MobilePicker
            value={this.props.value}
            minDate={this.parseValueToDate(minDate)}
            maxDate={this.parseValueToDate(maxDate)}
            onValueChange={this.props.onValueChange}
            enableTodayLink={this.props.enableTodayLink}
            isHoliday={this.props.isHoliday}
            onCloseRequest={this.handleMobileCloseRequest}
            renderDay={props.renderDay}
            onMonthChange={props.onMonthChange}
          />
        );
      } else {
        picker = (
          <LocaleContext.Provider
            value={{
              locale: {
                Calendar: {
                  months: this.locale.months,
                  dayCellChooseDateAriaLabel: this.locale.dayCellChooseDateAriaLabel,
                  selectMonthAriaLabel: this.locale.selectMonthAriaLabel,
                  selectYearAriaLabel: this.locale.selectYearAriaLabel,
                  selectChosenAriaLabel: this.locale.selectChosenAriaLabel,
                },
              },
            }}
          >
            <Popup
              opened
              hasShadow
              priority={ZIndex.priorities.PopupMenu}
              positions={getMenuPositions(menuPos, menuAlign)}
              data-tid={DatePickerDataTids.root}
              anchorElement={this.getParent()}
              margin={parseInt(this.theme.datePickerMenuOffsetY)}
            >
              <div
                data-tid={DatePickerDataTids.pickerRoot}
                className={this.styles.calendarWrapper(this.theme)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Calendar
                  maxDate={this.parseValueToDate(maxDate)}
                  minDate={this.parseValueToDate(minDate)}
                  onValueChange={this.handleValueChange}
                  isHoliday={this.props.isHoliday}
                  value={this.parseValueToDate(this.props.value)}
                  renderDay={this.props.renderDay}
                  onMonthChange={this.props.onMonthChange}
                />
                {this.props.enableTodayLink && this.renderTodayLink()}{' '}
              </div>
            </Popup>
          </LocaleContext.Provider>
        );
      }
    }
    return (
      <label
        className={this.styles.root()}
        style={this.getRootStyle()}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
        data-tid={DatePickerDataTids.label}
      >
        <DateInput
          id={this.props.id}
          {...filterProps(props, INPUT_PASS_PROPS)}
          ref={this.getInputRef}
          value={this.props.value || ''}
          width="100%"
          withIcon
          minDate={minDate}
          maxDate={maxDate}
          onBlur={isMobile ? undefined : this.handleBlur}
          onFocus={this.handleFocus}
          onValueChange={this.props.onValueChange}
          onClick={this.openPickerPopup}
          onKeyDown={this.handleKeyDown}
          data-tid={DatePickerDataTids.input}
        />
        {this.state.canUseMobileNativeDatePicker ? (
          <NativeDateInput
            onValueChange={this.props.onValueChange}
            value={this.props.value || ''}
            minDate={minDate}
            maxDate={maxDate}
            disabled={this.props.disabled}
          />
        ) : (
          picker
        )}
      </label>
    );
  };

  private parseValueToDate(value?: Nullable<string>): string | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    const date = new InternalDate({ value });
    if (date.validate({ checks: [InternalDateValidateCheck.NotNull, InternalDateValidateCheck.Native] })) {
      return date.toString({ withPad: true });
    }

    return undefined;
  }

  private renderTodayLink() {
    const { order, separator } = this.locale;
    const today = new InternalDate({ order, separator })
      .setComponents(InternalDateGetter.getTodayComponents())
      .toString({ withPad: true, withSeparator: true });

    return (
      <div style={{ margin: 8 }}>
        <Button
          aria-label={this.locale.todayAriaLabel}
          data-tid={DatePickerDataTids.pickerTodayWrapper}
          width="100%"
          onClick={() => {
            this.handleSelect(today);
          }}
          icon={<ArrowAUpIcon16Light />}
        >
          {this.locale.today}
        </Button>
      </div>
    );
  }

  public getParent = (): Nullable<Element> => {
    return getRootNode(this);
  };

  private getRootStyle = () => {
    const { width } = this.props;
    return isNonNullable(width) ? { width } : { minWidth: MIN_WIDTH };
  };

  private getInputRef = (ref: DateInput | null) => {
    this.input = ref;
  };

  private openPickerPopup = () => {
    this.setState({ opened: true });
  };

  private handleFocus = () => {
    if (this.focused) {
      return;
    }

    if (!this.canOpenPopup) {
      this.canOpenPopup = true;
    } else {
      this.openPickerPopup();
    }

    this.focused = true;

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent) => {
    if (!this.state.opened) {
      this.openPickerPopup();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  private handleBlur = () => {
    if (!this.focused) {
      return;
    }

    this.focused = false;
    this.close();

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private handleValueChange = (value: string) => {
    this.handleSelect(value);
    this.blur();
  };

  private handleSelect = (value: string | null) => {
    if (!value) {
      return null;
    }

    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  private handleMobileCloseRequest = () => {
    this.close();
  };
}
