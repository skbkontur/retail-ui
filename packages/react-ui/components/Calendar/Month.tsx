import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { DateSelect } from '../../internal/DateSelect';

import type { MonthViewModel } from './MonthViewModel';
import type { DayCellViewModel } from './DayCellViewModel';
import { MonthView } from './MonthView';
import { DayCellView } from './DayCellView';
import * as CalendarScrollEvents from './CalendarScrollEvents';
import { styles } from './MonthView.styles';
import { styles as cellStyles } from './DayCellView.styles';

interface MonthProps {
  top: number;
  month: MonthViewModel;
  onMonthYearChange: (monthNative: number, year: number) => void;
}

export class Month extends React.Component<MonthProps> {
  private theme!: Theme;

  private monthSelect: DateSelect | null = null;
  private yearSelect: DateSelect | null = null;

  public shouldComponentUpdate(nextProps: MonthProps) {
    if (this.props.top !== nextProps.top) {
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
    const { month, top } = this.props;
    return (
      <MonthView
        firstDayOffset={month.offset}
        height={month.getHeight(this.theme)}
        isFirstInYear={month.isFirstInYear}
        isLastInYear={month.isLastInYear}
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
    return <MonthDayGrid days={this.props.month.days} offset={this.props.month.offset} />;
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
}

class MonthDayGrid extends React.Component<MonthDayGridProps> {
  private theme!: Theme;

  public shouldComponentUpdate(nextProps: MonthDayGridProps) {
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
      <div key={`leading_${i}`} className={cellStyles.cell(this.theme)} />
    ));
    const trailingOffset = DAYS_PER_WEEK - ((this.props.offset + this.props.days.length) % DAYS_PER_WEEK);
    const trailingDays = Array.from({ length: trailingOffset }, (_, i) => (
      <div key={`trailing_${i}`} className={cellStyles.cell(this.theme)} />
    ));
    const days = this.props.days.map((day) => {
      return <DayCellView date={day} key={`${day.date}.${day.month}.${day.year}`} />;
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
