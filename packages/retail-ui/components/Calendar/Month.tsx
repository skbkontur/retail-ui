import * as React from 'react';

import config from './config';

import * as CDS from './CalendarDateShape';
import { MonthViewModel } from './MonthViewModel';
import { DayCellViewModel } from './DayCellViewModel';

import { MonthView } from './MonthView';
import { DayCellView } from './DayCellView';
import CalendarScrollEvents from './CalendarScrollEvents';
import DateSelect from '../DateSelect/DateSelect';

interface MonthProps {
  top: number;
  month: MonthViewModel;
  maxDate?: CDS.CalendarDateShape;
  minDate?: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  onDateClick?: (date: CDS.CalendarDateShape) => void;
  onMonthYearChange: (month: number, year: number) => void;
}

export class Month extends React.Component<MonthProps> {
  private _monthSelect: DateSelect | null = null;
  private _yearSelect: DateSelect | null = null;

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
    CalendarScrollEvents.addListener(this._closeSelects);
  }

  public render() {
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

  private _renderCells() {
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

  private _closeSelects = () => {
    if (this._monthSelect) {
      this._monthSelect.close();
    }
    if (this._yearSelect) {
      this._yearSelect.close();
    }
  };

  private _monthRef = (monthSelect: DateSelect | null) => {
    this._monthSelect = monthSelect;
  };

  private _yearRef = (yearSelect: DateSelect | null) => {
    this._yearSelect = yearSelect;
  };

  private _handleMonthSelect = (month: number) => {
    this.props.onMonthYearChange(month, this.props.month.year);
  };

  private _handleYearSelect = (year: number) => {
    this.props.onMonthYearChange(this.props.month.month, year);
  };
}

interface MonthDayGridProps {
  days: DayCellViewModel[];
  offset: number;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  onDateClick?: (x0: CDS.CalendarDateShape) => void;
}

class MonthDayGrid extends React.Component<MonthDayGridProps> {
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

  private _handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
