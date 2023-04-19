import React from 'react';
import shallowEqual from 'shallowequal';

import { InternalDateValidateCheck } from '../../lib/date/types';
import { Nullable } from '../../typings/utility-types';
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

interface PickerProps extends Pick<CalendarProps, 'date' | 'minDate' | 'maxDate' | 'isHoliday' | 'onDateChange'> {
  /**
   * Управляет наличием кнопки "Сегодня"
   */
  enableTodayLink?: boolean;
  onSelect?: (date: string) => void;
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
    this.state = {
      today: getTodayDate(),
    };
  }

  public componentDidUpdate(prevProps: PickerProps) {
    const date = new InternalDate().parseValue(this.props.date).getComponentsLikeNumber();

    if (date && !shallowEqual(this.props.date, prevProps.date)) {
      this.scrollToMonth(date.month - 1, date.year);
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
          hasBottomSeparator={false}
          maxDate={this.parseValueToDate(this.props.maxDate)}
          minDate={this.parseValueToDate(this.props.minDate)}
          onDateChange={this.props.onDateChange}
          isHoliday={this.props.isHoliday}
          date={this.parseValueToDate(this.props.date)}
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
      <button
        data-tid={DatePickerDataTids.pickerTodayWrapper}
        className={cx({
          [styles.todayLinkWrapper(this.theme)]: true,
        })}
        onClick={this.handleSelectToday(today)}
        tabIndex={-1}
      >
        {`${this.locale.today} ${today}`}
      </button>
    );
  }

  private handleSelectToday = (today: string) => () => {
    if (this.props.onSelect) {
      this.props.onSelect(today);
    }

    if (this.calendar) {
      const { month, year } = this.state.today;
      this.calendar.scrollToMonth(month, year);
    }
  };
}
