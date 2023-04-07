import React from 'react';
import shallowEqual from 'shallowequal';

import { cx } from '../../lib/theming/Emotion';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter';
import { InternalDate } from '../../lib/date/InternalDate';
import { locale } from '../../lib/locale/decorators';
import { Calendar, CalendarProps } from '../Calendar';
import { CalendarDateShape } from '../Calendar/CalendarDateShape';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { getTodayDate } from '../Calendar/CalendarUtils';

import { styles } from './Picker.styles';
import { DatePickerDataTids } from './DatePicker';
import { DatePickerLocale, DatePickerLocaleHelper } from './locale';

interface PickerProps extends Pick<CalendarProps, 'maxDate' | 'minDate' | 'date' | 'onDateChange' | 'isHoliday'> {
  /**
   * Управляет наличием кнопки "Сегодня"
   */
  enableTodayLink?: boolean;
  onSelect?: (date: CalendarDateShape) => void;
}

interface PickerState {
  today: CalendarDateShape;
}

@locale('DatePicker', DatePickerLocaleHelper)
export class Picker extends React.Component<PickerProps, PickerState> {
  public static __KONTUR_REACT_UI__ = 'Picker';

  private theme!: Theme;
  private calendar: Calendar | null = null;
  private readonly locale!: DatePickerLocale;

  constructor(props: PickerProps) {
    super(props);
    const today = getTodayDate();
    this.state = {
      today,
    };
  }

  public componentDidUpdate(prevProps: PickerProps) {
    const { date } = this.props;
    if (date && !shallowEqual(date, prevProps.date)) {
      this.scrollToMonth(date.month, date.year);
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
    return (
      <div
        data-tid={DatePickerDataTids.pickerRoot}
        className={styles.root(this.theme)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Calendar
          ref={(c) => (this.calendar = c)}
          shouldSetInitialDate={false}
          hasBottomSeparator={false}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          onDateChange={this.props.onDateChange}
          isHoliday={this.props.isHoliday}
          date={this.props.date}
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
        className={cx({
          [styles.todayLinkWrapper(this.theme)]: true,
        })}
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
}
