import React from 'react';
import shallowEqual from 'shallowequal';

import { InternalDate } from '../../lib/date/InternalDate';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter';
import { Calendar, CalendarDateShape, isGreater, isLess } from '../../internal/Calendar';
import { locale } from '../../lib/locale/decorators';
import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './Picker.styles';
import { DatePickerLocale, DatePickerLocaleHelper } from './locale';
import { DatePickerDataTids } from './DatePicker';

interface Props {
  maxDate?: CalendarDateShape;
  minDate?: CalendarDateShape;
  value: Nullable<CalendarDateShape>;
  onPick: (date: CalendarDateShape) => void;
  onSelect?: (date: CalendarDateShape) => void;
  enableTodayLink?: boolean;
  isHoliday?: (day: CalendarDateShape & { isWeekend: boolean }) => boolean;
}

interface State {
  date: CalendarDateShape;
  today: CalendarDateShape;
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

  constructor(props: Props) {
    super(props);
    const today = getTodayCalendarDate();
    this.state = {
      date: this.getInitialDate(today),
      today,
    };
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
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { date } = this.state;

    return (
      <div
        data-tid={DatePickerDataTids.pickerRoot}
        className={styles.root(this.theme)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Calendar
          ref={(c) => (this.calendar = c)}
          value={this.props.value}
          initialMonth={date.month}
          initialYear={date.year}
          onSelect={this.props.onPick}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          isHoliday={this.props.isHoliday}
        />
        {this.props.enableTodayLink && this.renderTodayLink()}{' '}
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
        data-tid={DatePickerDataTids.pickerTodayWrapper}
        className={styles.todayWrapper(this.theme)}
        onClick={this.handleSelectToday(today)}
        tabIndex={-1}
      >
        {`${this.locale.today} ${today.toString({ withPad: true, withSeparator: true })}`}
      </button>
    );
  }

  private handleSelectToday = (today: InternalDate) => () => {
    if (this.props.onSelect) {
      const todayInNativeFormat = today.toNativeFormat();
      if (todayInNativeFormat) {
        this.props.onSelect(todayInNativeFormat);
      }
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
}
