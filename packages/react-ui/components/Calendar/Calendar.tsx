import React from 'react';
import shallowEqual from 'shallowequal';

import { InternalDate } from '../../lib/date/InternalDate';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter';
import { Calendar as CalendarInternal, CalendarDateShape, isGreater, isLess } from '../../internal/Calendar';
import { locale } from '../../lib/locale/decorators';
import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { DatePickerDataTids } from '../DatePicker';

import { styles } from './Calendar.styles';
import { DatePickerLocale, DatePickerLocaleHelper } from './../DatePicker/locale';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

export interface CalendarProps extends CommonProps {
  /**
   * Задаёт текущую дату
   *
   * Дата задаётся в формате: `{ year, month, date }`
   */
  value: Nullable<CalendarDateShape>;
  /**
   * Вызывается при изменении `value`
   */
  onValueChange: (date: CalendarDateShape) => void;
  onSelect?: (date: CalendarDateShape) => void;
  /**
   * Задаёт максимальную возможную дату
   */
  maxDate?: CalendarDateShape;
  /**
   * Задаёт минимальную возможную дату
   */
  minDate?: CalendarDateShape;
  /**
   * Добавляет в календарь кнопку для задания текущей даты
   */
  enableTodayLink?: boolean;
  /**
   * Функция для определения праздничных дней
   * @default (_day, isWeekend) => isWeekend
   * @param {T} day - строка в формате `dd.mm.yyyy`
   * @param {boolean} isWeekend - флаг выходного (суббота или воскресенье)
   *
   * @returns {boolean} `true` для выходного или `false` для рабочего дня
   */
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
@rootNode
export class Calendar extends React.Component<CalendarProps, State> {
  public static __KONTUR_REACT_UI__ = 'Calendar';

  private theme!: Theme;
  private calendar: CalendarInternal | null = null;
  private setRootNode!: TSetRootNode;
  private readonly locale!: DatePickerLocale;

  constructor(props: CalendarProps) {
    super(props);
    const today = getTodayCalendarDate();
    this.state = {
      date: this.getInitialDate(today),
      today,
    };
  }

  public componentDidUpdate(prevProps: CalendarProps) {
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
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain()}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { date } = this.state;

    return (
      <div className={styles.root(this.theme)}>
        <CalendarInternal
          ref={(c) => (this.calendar = c)}
          value={this.props.value}
          initialMonth={date.month}
          initialYear={date.year}
          onSelect={this.props.onValueChange}
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
