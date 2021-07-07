import React from 'react';
import shallowEqual from 'shallowequal';

import { InternalDate } from '../../lib/date/InternalDate';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter';
import { Calendar, CalendarDateShape, isGreater, isLess } from '../../internal/Calendar';
import { locale } from '../../lib/locale/decorators';
import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isMobile } from '../../lib/client';

import { jsStyles } from './Picker.styles';
import { DatePickerLocale, DatePickerLocaleHelper } from './locale';
import { nativeDateInputUtils } from './utils';

interface Props {
  maxDate?: CalendarDateShape;
  minDate?: CalendarDateShape;
  value: Nullable<CalendarDateShape>;
  onPick: (date: CalendarDateShape | undefined) => void;
  onSelect?: (date: CalendarDateShape) => void;
  enableTodayLink?: boolean;
  isHoliday?: (day: CalendarDateShape & { isWeekend: boolean }) => boolean;
  useMobileNativeDatePicker?: boolean;
}

interface State {
  date: CalendarDateShape;
  today: CalendarDateShape;
  useMobileNative?: boolean;
}

const getTodayCalendarDate = () => {
  const d = new Date();
  return {
    date: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
  };
};

@locale('DatePicker', DatePickerLocaleHelper)
export class Picker extends React.Component<Props, State> {
  public static __KONTUR_REACT_UI__ = 'Picker';

  private theme!: Theme;
  private calendar: Calendar | null = null;
  private readonly locale!: DatePickerLocale;
  private dateInput: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);
    const today = getTodayCalendarDate();
    this.state = {
      date: this.getInitialDate(today),
      today,
      useMobileNative: isMobile && this.props.useMobileNativeDatePicker,
    };
  }
  public componentDidMount() {
    if (this.state.useMobileNative && this.dateInput) {
      setTimeout(() => {
        this.dateInput?.click();
      }, 0);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    const { value } = this.props;
    if (value && !shallowEqual(value, prevProps.value)) {
      this.scrollToMonth(value.month, value.year);
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { date } = this.state;
    const { upMonthOfShape, getDateForNativeFromShape } = nativeDateInputUtils;

    return (
      <div className={jsStyles.root(this.theme)} onMouseDown={e => e.preventDefault()}>
        {this.state.useMobileNative ? (
          <input
            type="date"
            // в пикер minDate и maxDate приходят с заниженным месяцем (отсчет с 0),
            // но для натива это не нужно
            min={getDateForNativeFromShape(upMonthOfShape(this.props.minDate))}
            max={getDateForNativeFromShape(upMonthOfShape(this.props.maxDate))}
            value={getDateForNativeFromShape(this.props.value)}
            onChange={this.handleNativeDateInputChange}
            ref={this.getDateInputRef}
            className={jsStyles.inputTypeDate()}
            tabIndex={-1}
          />
        ) : (
          <>
            <Calendar
              ref={c => (this.calendar = c)}
              value={this.props.value}
              initialMonth={date.month}
              initialYear={date.year}
              onSelect={this.props.onPick}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              isHoliday={this.props.isHoliday}
            />
            {this.props.enableTodayLink && this.renderTodayLink()}{' '}
          </>
        )}
      </div>
    );
  }

  private scrollToMonth = (month: number, year: number) => {
    if (this.calendar) {
      this.calendar.scrollToMonth(month, year);
    }
  };

  private renderTodayLink() {
    const { order, separator } = this.locale;
    const today = new InternalDate({ order, separator }).setComponents(InternalDateGetter.getTodayComponents());
    return (
      <button
        data-tid="Picker__todayWrapper"
        className={jsStyles.todayWrapper(this.theme)}
        onClick={this.handleSelectToday(today)}
        tabIndex={-1}
      >
        {`${this.locale.today} ${today.toString({ withPad: true, withSeparator: true })}`}
      </button>
    );
  }

  private handleSelectToday = (today: InternalDate) => () => {
    if (this.props.onSelect) {
      this.props.onSelect(today.toNativeFormat()!);
    }
    if (this.calendar) {
      const { month, year } = this.state.today;
      this.calendar.scrollToMonth(month, year);
    }
  };

  private getInitialDate = (today: CalendarDateShape) => {
    if (this.props.value) {
      return this.props.value;
    }

    if (this.props.minDate && isLess(today, this.props.minDate)) {
      return this.props.minDate;
    }

    if (this.props.maxDate && isGreater(today, this.props.maxDate)) {
      return this.props.maxDate;
    }

    return today;
  };

  private getDateInputRef = (element: Nullable<HTMLInputElement>) => {
    this.dateInput = element || null;
  };

  private handleNativeDateInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const date = nativeDateInputUtils.getDateShapeFromNativeFormat(e.currentTarget.value);
    this.props.onPick(date);
  };
}
