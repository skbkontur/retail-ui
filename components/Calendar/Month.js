// @flow

import * as React from 'react';

import config from './config';

import * as CDS from './CalendarDateShape';
import { MonthViewModel } from './MonthViewModel';
import { DayCellViewModel } from './DayCellViewModel';

import { MonthView } from './MonthView';
import { DayCellView } from './DayCellView';
import CalendarScrollEvents from './CalendarScrollEvents';

type MonthProps = {
  top: number,
  month: MonthViewModel,
  maxDate?: CDS.CalendarDateShape,
  minDate?: CDS.CalendarDateShape,
  today?: CDS.CalendarDateShape,
  value?: ?CDS.CalendarDateShape,
  onDateClick?: (date: CDS.CalendarDateShape) => void,
  onMonthYearChange: (month: number, year: number) => void
};

export class Month extends React.Component<MonthProps> {
  _monthSelect;
  _yearSelect;

  shouldComponentUpdate(nextProps: MonthProps) {
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

  componentDidMount() {
    CalendarScrollEvents.addListener(this._closeSelects);
  }

  render() {
    const { month, maxDate, minDate, top } = this.props;
    return (
      <MonthView
        firstDayOffset={month.offset}
        height={month.height}
        isFirstInYear={month.isFirstInYear}
        isLastInYear={month.isLastInYear}
        maxDate={maxDate}
        minDate={minDate}
        month={month.month}
        top={top}
        year={month.year}
        onMonthSelect={this._handleMonthSelect}
        onYearSelect={this._handleYearSelect}
        monthSelectRef={this._monthRef}
        yearSelectRef={this._yearRef}
      >
        {this._renderCells()}
      </MonthView>
    );
  }

  _renderCells() {
    return (
      <MonthDayGrid
        days={this.props.month.days}
        offset={this.props.month.offset}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        today={this.props.today}
        value={this.props.value}
        onDateClick={this.props.onDateClick}
      />
    );
  }

  _closeSelects = () => {
    if (this._monthSelect) {
      this._monthSelect.close();
    }
    if (this._yearSelect) {
      this._yearSelect.close();
    }
  };

  _monthRef = monthSelect => {
    this._monthSelect = monthSelect;
  };

  _yearRef = yearSelect => {
    this._yearSelect = yearSelect;
  };

  _handleMonthSelect = (month: number) => {
    this.props.onMonthYearChange(month, this.props.month.year);
  };

  _handleYearSelect = (year: number) => {
    this.props.onMonthYearChange(this.props.month.month, year);
  };
}

type MonthDayGridProps = {
  days: DayCellViewModel[],
  offset: number,
  minDate?: CDS.CalendarDateShape,
  maxDate?: CDS.CalendarDateShape,
  today?: CDS.CalendarDateShape,
  value?: ?CDS.CalendarDateShape,
  onDateClick?: CDS.CalendarDateShape => void
};

class MonthDayGrid extends React.Component<MonthDayGridProps> {
  shouldComponentUpdate(nextProps: MonthDayGridProps) {
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

  render() {
    return (
      <div>
        <div
          style={{
            width: this.props.offset * config.DAY_HEIGHT,
            display: 'inline-block'
          }}
        />
        {this.props.days.map(day => (
          <DayCellView
            date={day}
            key={`${day.date}.${day.month}.${day.year}`}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            today={this.props.today}
            value={this.props.value}
            isWeekend={day.isWeekend}
            onClick={this._handleClick}
          />
        ))}
      </div>
    );
  }

  _handleClick = event => {
    const { onDateClick } = this.props;
    if (!onDateClick) {
      return;
    }
    const name = event.currentTarget.name;
    if (!name) {
      throw new Error('Missing name on date button');
    }
    const [date, month, year] = name.split('.').map(Number);
    onDateClick({ date, month, year });
  };
}
