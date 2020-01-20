import * as React from 'react';
import { InternalDate } from '../../lib/date/InternalDate';
import InternalDateGetter from '../../lib/date/InternalDateGetter';
import Calendar, { CalendarDateShape } from '../Calendar';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { locale } from '../LocaleProvider/decorators';
import styles from './Picker.module.less';
import { Nullable } from '../../typings/utility-types';
import { isLess, isGreater } from '../Calendar/CalendarDateShape';
import { DatePickerLocaleHelper, DatePickerLocale } from './locale';
import jsStyles from './Picker.styles';
import { cx } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import ThemeConsumer from '../ThemeConsumer';

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
export default class Picker extends React.Component<Props, State> {
  public static __KONTUR_REACT_UI__ = 'Picker';

  private theme!: ITheme;
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
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { date } = this.state;
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <div className={cx(styles.root, jsStyles.root(this.theme))} onMouseDown={e => e.preventDefault()}>
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
        {this.props.enableTodayLink && this.renderTodayLink()}
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
        className={cx(styles.todayWrapper, jsStyles.todayWrapper(this.theme))}
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
}
