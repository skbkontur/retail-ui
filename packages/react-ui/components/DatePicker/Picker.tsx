import React from 'react';
import shallowEqual from 'shallowequal';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
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
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { Button } from '../Button';
import { ArrowAUpIcon16Light } from '../../internal/icons2022/ArrowAUpIcon/ArrowAUp16Light';

import { styles } from './Picker.styles';
import { DatePickerDataTids } from './DatePicker';
import { DatePickerLocale, DatePickerLocaleHelper } from './locale';

interface PickerProps extends Pick<CalendarProps, 'value' | 'minDate' | 'maxDate' | 'isHoliday' | 'onValueChange'> {
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
    const date = new InternalDate().parseValue(this.props.value).getComponentsLikeNumber();

    if (date && !shallowEqual(this.props.value, prevProps.value)) {
      this.scrollToMonth(date.month - 1, date.year);
    }
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

  private renderMain() {
    return (
      <div
        data-tid={DatePickerDataTids.pickerRoot}
        className={styles.root(this.theme)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Calendar
          ref={(c) => (this.calendar = c)}
          maxDate={this.parseValueToDate(this.props.maxDate)}
          minDate={this.parseValueToDate(this.props.minDate)}
          onValueChange={this.props.onValueChange}
          isHoliday={this.props.isHoliday}
          value={this.parseValueToDate(this.props.value)}
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
      this.props.onSelect(today);
    }

    if (this.calendar) {
      const { month, year } = this.state.today;
      this.calendar.scrollToMonth(month, year);
    }
  };
}
