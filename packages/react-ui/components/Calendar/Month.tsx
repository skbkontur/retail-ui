import type { Emotion } from '@emotion/css/create-instance';
import React, { type JSX } from 'react';

import type { DateSelect } from '../../internal/DateSelect/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import * as CalendarScrollEvents from './CalendarScrollEvents.js';
import { DayCellView } from './DayCellView.js';
import { getStyles as getCellStyles } from './DayCellView.styles.js';
import type { DayCellViewModel } from './DayCellViewModel.js';
import { MonthView } from './MonthView.js';
import { getStyles } from './MonthView.styles.js';
import type { MonthViewModel } from './MonthViewModel.js';

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

  public render(): React.JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain(): JSX.Element {
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

  private renderCells(): JSX.Element {
    return <MonthDayGrid days={this.props.month.days} offset={this.props.month.offset} />;
  }

  private closeSelects = (): void => {
    if (this.monthSelect) {
      this.monthSelect.close();
    }
    if (this.yearSelect) {
      this.yearSelect.close();
    }
  };

  private monthRef = (monthSelect: DateSelect | null): void => {
    this.monthSelect = monthSelect;
  };

  private yearRef = (yearSelect: DateSelect | null): void => {
    this.yearSelect = yearSelect;
  };

  private handleMonthSelect = (month: number): void => {
    this.props.onMonthYearChange(month, this.props.month.year);
  };

  private handleYearSelect = (year: number): void => {
    this.props.onMonthYearChange(this.props.month.month, year);
  };
}

const DAYS_PER_WEEK = 7;

interface MonthDayGridProps {
  days: DayCellViewModel[];
  offset: number;
}

@withRenderEnvironment
class MonthDayGrid extends React.Component<MonthDayGridProps> {
  private styles!: ReturnType<typeof getStyles>;
  private cellStyles!: ReturnType<typeof getCellStyles>;
  private theme!: Theme;
  private emotion!: Emotion;

  public shouldComponentUpdate(nextProps: MonthDayGridProps) {
    return this.props.days !== nextProps.days;
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);
    this.cellStyles = getCellStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain(): JSX.Element {
    const leadingDays = Array.from({ length: this.props.offset }, (_, i) => (
      <div key={`leading_${i}`} className={this.cellStyles.cell(this.theme)} />
    ));
    const trailingOffset = DAYS_PER_WEEK - ((this.props.offset + this.props.days.length) % DAYS_PER_WEEK);
    const trailingDays = Array.from({ length: trailingOffset }, (_, i) => (
      <div key={`trailing_${i}`} className={this.cellStyles.cell(this.theme)} />
    ));
    const days = this.props.days.map((day) => {
      return <DayCellView date={day} key={`${day.date}.${day.month}.${day.year}`} />;
    });
    const weeks = divideToWeeks(leadingDays.concat(days, trailingDays));
    return (
      <div className={this.styles.monthDayGrid(this.theme)}>
        {weeks.map((week, i) => (
          <div className={this.styles.monthDayRow(this.theme)} key={`week_${i}`}>
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
