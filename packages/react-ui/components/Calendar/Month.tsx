import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { DateSelect } from '../../internal/DateSelect';

import { themeConfig } from './config';
import { MonthViewModel } from './MonthViewModel';
import { DayCellViewModel } from './DayCellViewModel';
import { MonthView } from './MonthView';
import { DayCellView } from './DayCellView';
import * as CalendarScrollEvents from './CalendarScrollEvents';
import { styles } from './MonthView.styles';

interface MonthProps {
  top: number;
  month: MonthViewModel;
  onMonthYearChange: (month: number, year: number) => void;
}

export class Month extends React.Component<MonthProps> {
  private theme!: Theme;

  private monthSelect: DateSelect | null = null;
  private yearSelect: DateSelect | null = null;

  constructor(props: MonthProps) {
    super(props);
    this.state = {};
  }

  public shouldComponentUpdate(nextProps: MonthProps) {
    // console.log('Month shouldComponentUpdate', nextProps);
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

interface MonthDayGridProps {
  days: DayCellViewModel[];
  offset: number;
}

class MonthDayGrid extends React.Component<MonthDayGridProps> {
  private theme!: Theme;

  constructor(props: MonthDayGridProps) {
    super(props);
    this.state = {};
  }

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
    return (
      <div className={styles.monthDayGrid(this.theme)}>
        <div
          style={{
            width: this.props.offset * themeConfig(this.theme).DAY_WIDTH,
            display: 'inline-block',
          }}
        />
        {this.props.days.map((day) => (
          <DayCellView date={day} key={`${day.date}.${day.month}.${day.year}`} />
        ))}
      </div>
    );
  }
}
