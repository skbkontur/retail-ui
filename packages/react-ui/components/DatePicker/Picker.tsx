import React from 'react';
import warning from 'warning';

import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter';
import { InternalDate } from '../../lib/date/InternalDate';
import { locale } from '../../lib/locale/decorators';
import { Calendar } from '../Calendar';
import { CalendarDateShape } from '../Calendar/CalendarDateShape';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { getTodayDate } from '../Calendar/CalendarUtils';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { Button } from '../Button';
import { ArrowAUpIcon16Light } from '../../internal/icons2022/ArrowAUpIcon/ArrowAUp16Light';

import { styles } from './DatePicker.styles';
import { DatePickerDataTids } from './DatePicker';
import { DatePickerLocale, DatePickerLocaleHelper } from './locale';

interface PickerProps {
  maxDate?: CalendarDateShape;
  minDate?: CalendarDateShape;
  value: Nullable<CalendarDateShape>;
  onPick: (date: CalendarDateShape) => void;
  onSelect?: (date: CalendarDateShape) => void;
  enableTodayLink?: boolean;
  isHoliday?: (day: CalendarDateShape & { isWeekend: boolean }) => boolean;
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
    warning(
      false,
      `<Picker /> has been deprecated. It will be removed in the next major version of the library. If you wish to have a similar component make use of public component <Calendar />.`,
    );
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;

          return (
            <ThemeContext.Provider value={ThemeFactory.create({ calendarBottomSeparatorBorder: 'none' }, theme)}>
              {this.renderMain()}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private isHoliday = (day: string, isWeekend: boolean) => {
    const dateShape = new InternalDate().parseValue(day).getComponentsLikeNumber();

    return !!this.props.isHoliday?.({ ...dateShape, isWeekend });
  };

  private onValueChange = (date: string) => {
    const dateShape = new InternalDate().parseValue(date).getComponentsLikeNumber();

    return this.props.onPick(dateShape);
  };

  private renderMain() {
    return (
      <div
        data-tid={DatePickerDataTids.pickerRoot}
        className={styles.calendarWrapper(this.theme)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Calendar
          ref={(c) => (this.calendar = c)}
          maxDate={this.getDateFromShape(this.props.maxDate)}
          minDate={this.getDateFromShape(this.props.minDate)}
          onValueChange={this.onValueChange}
          isHoliday={this.isHoliday}
          value={this.getDateFromShape(this.props.value)}
        />
        {this.props.enableTodayLink && this.renderTodayLink()}{' '}
      </div>
    );
  }

  private getDateFromShape = (dateShape: CalendarDateShape | undefined | null) => {
    if (!dateShape) {
      return undefined;
    }

    return InternalDateTransformer.dateToInternalString(dateShape);
  };

  private renderTodayLink() {
    const { order, separator } = this.locale;
    const today = new InternalDate({ order, separator })
      .setComponents(InternalDateGetter.getTodayComponents())
      .toString({ withPad: true, withSeparator: true });

    if (isTheme2022(this.theme)) {
      return (
        <div style={{ margin: 8 }}>
          <Button
            data-tid={DatePickerDataTids.pickerTodayWrapper}
            width="100%"
            onClick={this.handleSelectToday(today)}
            icon={<ArrowAUpIcon16Light />}
          >
            {this.locale.today}
          </Button>
        </div>
      );
    }

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
      const todayInNativeFormat = new InternalDate().parseValue(today).toNativeFormat() as CalendarDateShape;
      this.props.onSelect(todayInNativeFormat);
    }

    if (this.calendar) {
      const { month, year } = this.state.today;
      this.calendar.scrollToMonth(month, year);
    }
  };
}
