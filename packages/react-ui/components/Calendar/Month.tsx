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
  periodStartDate?: CDS.CalendarDateShape;
  periodEndDate?: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  hoveredDate?: CDS.CalendarDateShape;
  onDateClick?: (date: CDS.CalendarDateShape) => void;
  onMonthYearChange: (month: number, year: number) => void;
  isHoliday?: (day: CDS.CalendarDateShape & { isWeekend: boolean }) => boolean;
  onMouseEnterDay?: (hoveredDate: CDS.CalendarDateShape) => void;
  onMouseLeaveDay?: (hoveredDate: CDS.CalendarDateShape) => void;
}

type DefaultProps = Required<Pick<MonthDayGridProps, 'isHoliday'>>;

export class Month extends React.Component<MonthProps> {
  private theme!: Theme;

  private monthSelect: DateSelect | null = null;
  private yearSelect: DateSelect | null = null;

  constructor(props: MonthProps) {
    super(props);
    this.state = {};
  }

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
    if (!CDS.isEqual(nextProps.periodEndDate, this.props.periodEndDate)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.periodStartDate, this.props.periodStartDate)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.hoveredDate, this.props.hoveredDate)) {
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
        periodStartDate={this.props.periodStartDate}
        periodEndDate={this.props.periodEndDate}
        today={this.props.today}
        value={this.props.value}
        onDateClick={this.props.onDateClick}
        isHoliday={this.props.isHoliday}
        hoveredDate={this.props.hoveredDate}
        onMouseEnterDay={this.props.onMouseEnterDay}
        onMouseLeaveDay={this.props.onMouseLeaveDay}
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

interface MonthDayGridProps {
  days: DayCellViewModel[];
  offset: number;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  periodStartDate?: CDS.CalendarDateShape;
  periodEndDate?: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  hoveredDate?: CDS.CalendarDateShape;
  onDateClick?: (x0: CDS.CalendarDateShape) => void;
  isHoliday?: (day: CDS.CalendarDateShape & { isWeekend: boolean }) => boolean;
  onMouseEnterDay?: (hoveredDate: CDS.CalendarDateShape) => void;
  onMouseLeaveDay?: (hoveredDate: CDS.CalendarDateShape) => void;
}

class MonthDayGrid extends React.Component<MonthDayGridProps> {
  private theme!: Theme;

  public static defaultProps: DefaultProps = {
    isHoliday: (day: CDS.CalendarDateShape & { isWeekend: boolean }) => day.isWeekend,
  };

  constructor(props: MonthDayGridProps) {
    super(props);
    this.state = {};
  }

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
    if (!CDS.isEqual(nextProps.periodStartDate, this.props.periodStartDate)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.periodEndDate, this.props.periodEndDate)) {
      return true;
    }
    if (!CDS.isEqual(nextProps.hoveredDate, this.props.hoveredDate)) {
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
    return (
      <div className={styles.monthDayGrid(this.theme)}>
        <div
          style={{
            width: this.props.offset * themeConfig(this.theme).DAY_SIZE,
            display: 'inline-block',
          }}
        />
        {this.props.days.map((day) => {
          const isWeekend = this.getProps().isHoliday(day);

          return (
            <DayCellView
              date={day}
              key={`${day.date}.${day.month}.${day.year}`}
              isDisabled={this.isDisabled(day)}
              isToday={this.isToday(day)}
              periodStartDate={this.props.periodStartDate}
              periodEndDate={this.props.periodEndDate}
              value={this.props.value}
              hoveredDate={this.props.hoveredDate}
              isWeekend={isWeekend}
              isPeriodStart={this.isPeriodStart(day)}
              isPeriodEnd={this.isPeriodEnd(day)}
              isDayInSelectedPeriod={this.isDayInSelectedPeriod(day)}
              onDateClick={this.props.onDateClick}
              onMouseEnter={this.props.onMouseEnterDay}
              onMouseLeave={this.props.onMouseLeaveDay}
            />
          );
        })}
      </div>
    );
  }

  private isToday = (day: DayCellViewModel) => {
    return Boolean(this.props.today && CDS.isEqual(day, this.props.today));
  };

  private isDisabled = (date: DayCellViewModel) => {
    const { minDate, maxDate, periodStartDate: minPeriodDate, periodEndDate: maxPeriodDate } = this.props;
    if (!CDS.isBetween(date, minDate, maxDate)) {
      return true;
    }
    if (minPeriodDate && !maxPeriodDate) {
      return Boolean(CDS.isLessOrEqual(date, minPeriodDate)) && !Boolean(CDS.isEqual(minPeriodDate, date));
    }

    if (!minPeriodDate && maxPeriodDate) {
      return Boolean(CDS.isLessOrEqual(maxPeriodDate, date)) && !Boolean(CDS.isEqual(maxPeriodDate, date));
    }
    return false;
  };

  private isDayInSelectedPeriod = (date: DayCellViewModel) => {
    const { hoveredDate, periodEndDate: maxPeriodDate, periodStartDate: minPeriodDate } = this.props;
    if (hoveredDate) {
      if (maxPeriodDate && !minPeriodDate) {
        return CDS.isBetween(date, hoveredDate, maxPeriodDate);
      }
      if (minPeriodDate && !maxPeriodDate) {
        return CDS.isBetween(date, minPeriodDate, hoveredDate);
      }
    }

    return Boolean(minPeriodDate && maxPeriodDate && CDS.isBetween(date, minPeriodDate, maxPeriodDate));
  };

  private isPeriodStart = (date: DayCellViewModel) => {
    const { periodStartDate, hoveredDate } = this.props;
    return (
      (!periodStartDate && Boolean(hoveredDate && CDS.isEqual(date, hoveredDate))) ||
      Boolean(periodStartDate && CDS.isEqual(date, periodStartDate))
    );
  };

  private isPeriodEnd = (date: DayCellViewModel) => {
    const { periodEndDate, hoveredDate } = this.props;
    return (
      (!periodEndDate && Boolean(hoveredDate && CDS.isEqual(date, hoveredDate))) ||
      Boolean(periodEndDate && CDS.isEqual(date, periodEndDate))
    );
  };
}
