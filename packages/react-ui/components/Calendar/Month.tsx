import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { DateSelect } from '../../internal/DateSelect';
import { Nullable } from '../../typings/utility-types';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { themeConfig } from './config';
import * as CDS from './CalendarDateShape';
import { MonthViewModel } from './MonthViewModel';
import { DayCellViewModel } from './DayCellViewModel';
import { MonthView } from './MonthView';
import { DayCellView } from './DayCellView';
import * as CalendarScrollEvents from './CalendarScrollEvents';
import { styles } from './MonthView.styles';

interface MonthProps {
  top: number;
  month: MonthViewModel;
  maxDate?: CDS.CalendarDateShape;
  minDate?: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  onDateClick?: (date: CDS.CalendarDateShape) => void;
  onMonthYearChange: (month: number, year: number) => void;
  isHoliday?: (day: CDS.CalendarDateShape & { isWeekend: boolean }) => boolean;
  renderDay?: (date: CDS.CalendarDateShape) => React.ReactNode;
}

type DefaultProps = Required<Pick<MonthDayGridProps, 'isHoliday' | 'renderItem'>>;

export class Month extends React.Component<MonthProps> {
  private theme!: Theme;

  private monthSelect: DateSelect | null = null;
  private yearSelect: DateSelect | null = null;

  public shouldComponentUpdate(nextProps: MonthProps) {
    if (this.props.top !== nextProps.top) {
      return true;
    }
    if (!CDS.isEqual(nextProps.value, this.props.value)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.today, this.props.today)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.minDate, this.props.minDate)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.maxDate, this.props.maxDate)) {
      return true;
    }
    return this.props.month !== nextProps.month;
  }

  public componentDidMount() {
    CalendarScrollEvents.addListener(this.closeSelects);
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

  public renderMain() {
    const { month, maxDate, minDate, top } = this.props;
    return (
      <MonthView
        firstDayOffset={month.offset}
        height={month.getHeight(this.theme)}
        isFirstInYear={month.isFirstInYear}
        isLastInYear={month.isLastInYear}
        maxDate={maxDate}
        minDate={minDate}
        month={month.month}
        top={top}
        year={month.year}
        onMonthSelect={this.handleMonthSelect}
        onYearSelect={this.handleYearSelect}
        monthSelectRef={this.monthRef}
        yearSelectRef={this.yearRef}
      >
        {this.renderCells()}
      </MonthView>
    );
  }

  private renderCells() {
    return (
      <MonthDayGrid
        days={this.props.month.days}
        offset={this.props.month.offset}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        today={this.props.today}
        value={this.props.value}
        onDateClick={this.props.onDateClick}
        isHoliday={this.props.isHoliday}
        renderItem={this.props.renderDay}
      />
    );
  }

  private closeSelects = () => {
    if (this.monthSelect) {
      this.monthSelect.close();
    }
    if (this.yearSelect) {
      this.yearSelect.close();
    }
  };

  private monthRef = (monthSelect: DateSelect | null) => {
    this.monthSelect = monthSelect;
  };

  private yearRef = (yearSelect: DateSelect | null) => {
    this.yearSelect = yearSelect;
  };

  private handleMonthSelect = (month: number) => {
    this.props.onMonthYearChange(month, this.props.month.year);
  };

  private handleYearSelect = (year: number) => {
    this.props.onMonthYearChange(this.props.month.month, year);
  };
}

const DAYS_PER_WEEK = 7;

interface MonthDayGridProps {
  days: DayCellViewModel[];
  offset: number;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  onDateClick?: (x0: CDS.CalendarDateShape) => void;
  isHoliday?: (day: CDS.CalendarDateShape & { isWeekend: boolean }) => boolean;
  renderItem: (date: CDS.CalendarDateShape) => React.ReactNode;
}

class MonthDayGrid extends React.Component<MonthDayGridProps> {
  private theme!: Theme;

  public static defaultProps: DefaultProps = {
    isHoliday: (day: CDS.CalendarDateShape & { isWeekend: boolean }) => day.isWeekend,
    renderItem: (date: CDS.CalendarDateShape) => date.date,
  };

  private getProps = createPropsGetter(MonthDayGrid.defaultProps);

  public shouldComponentUpdate(nextProps: MonthDayGridProps) {
    if (!CDS.isEqual(nextProps.value, this.props.value)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.today, this.props.today)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.minDate, this.props.minDate)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.maxDate, this.props.maxDate)) {
      return true;
    }
    return this.props.days !== nextProps.days;
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

  public renderMain() {
    const leadingDays = Array.from({ length: this.props.offset }, (_, i) => (
      <div
        key={`leadgin_${i}`}
        style={{ display: 'inline-block', width: themeConfig(this.theme).DAY_SIZE, flex: '1 1' }}
      />
    ));
    const trailingOffset = DAYS_PER_WEEK - ((this.props.offset + this.props.days.length) % DAYS_PER_WEEK);
    const trailingDays = Array.from({ length: trailingOffset }, (_, i) => (
      <div
        key={`trailing_${i}`}
        style={{ display: 'inline-block', width: themeConfig(this.theme).DAY_SIZE, flex: '1 1' }}
      />
    ));
    const days = this.props.days.map((day) => {
      const isWeekend = this.getProps().isHoliday(day);

      return (
        <DayCellView
          date={day}
          key={`${day.date}.${day.month}.${day.year}`}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          today={this.props.today}
          value={this.props.value}
          isWeekend={isWeekend}
          onDateClick={this.props.onDateClick}
          renderItem={this.props.renderItem}
        />
      );
    });
    const weeks = divideToWeeks(leadingDays.concat(days, trailingDays));
    return (
      <div className={styles.monthDayGrid(this.theme)}>
        {weeks.map((week, i) => (
          <div className={styles.monthDayRow(this.theme)} key={`week_${i}`}>
            {week}
          </div>
        ))}
      </div>
    );
  }
}

function divideToWeeks<T>(days: T[]): T[][] {
  const weeks: T[][] = [];
  for (let i = 0; i < days.length; i += DAYS_PER_WEEK) {
    const week = days.slice(i, i + DAYS_PER_WEEK);
    weeks.push(week);
  }
  return weeks;
}
