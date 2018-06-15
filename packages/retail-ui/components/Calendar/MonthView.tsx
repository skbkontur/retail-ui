import classNames from 'classnames';
import * as React from 'react';
import * as CDS from './CalendarDateShape';

import config from './config';

import classes = require('./MonthView.less');

import DateSelect from '../DateSelect';

interface MonthViewProps {
  children: React.ReactNode;
  firstDayOffset: number;
  height: number;
  isFirstInYear?: boolean;
  isLastInYear?: boolean;
  maxDate?: CDS.CalendarDateShape;
  minDate?: CDS.CalendarDateShape;
  month: number;
  top: number;
  year: number;
  onMonthSelect: (month: number) => void;
  onYearSelect: (month: number) => void;
  monthSelectRef: (select: DateSelect | null) => void;
  yearSelectRef: (select: DateSelect | null) => void;
}

export const MonthView = ({
  children,
  firstDayOffset,
  height,
  isFirstInYear,
  isLastInYear,
  maxDate,
  minDate,
  month,
  top,
  year,
  onMonthSelect,
  onYearSelect,
  monthSelectRef,
  yearSelectRef
}: MonthViewProps) => {
  const isTopNegative = top <= 0;
  const isHeaderSticked = isTopNegative && height >= -top;

  const headerTop = isHeaderSticked
    ? Math.min(-top, height - config.MONTH_TITLE_HEIGHT)
    : 0;

  const alpha = isHeaderSticked
    ? (height + top - config.MONTH_TITLE_HEIGHT) / 10
    : 1;

  const borderBottomColor = `rgba(223, 222, 222, ${alpha})`;

  const isYearVisible = isFirstInYear || isHeaderSticked;
  const yearTop = isHeaderSticked && !isLastInYear ? -headerTop - top : 0;

  const monthSelectDisabled =
    top > 40 ||
    headerTop < 0 ||
    headerTop >= height - config.MONTH_TITLE_HEIGHT;

  const yearSelectDisabled =
    top > 40 || (isLastInYear && top < -height + config.MONTH_TITLE_HEIGHT);
  return (
    <div className={classes.month} style={{ top }} key={month + '-' + year}>
      <div
        style={{ ...styles.monthTitle, top: headerTop, borderBottomColor }}
        className={classNames({
          [classes.monthTitle]: true,
          [classes.headerSticked]: isHeaderSticked
        })}
      >
        <div className={classes.headerMonth}>
          <DateSelect
            disabled={monthSelectDisabled}
            width={85}
            type="month"
            value={month}
            onChange={onMonthSelect}
            ref={!monthSelectDisabled ? monthSelectRef : undefined}
          />
        </div>
        {isYearVisible && (
          <div className={classes.headerYear} style={{ top: yearTop }}>
            <DateSelect
              disabled={yearSelectDisabled}
              width={50}
              type="year"
              value={year}
              minYear={minDate ? minDate.year : undefined}
              maxYear={maxDate ? maxDate.year : undefined}
              onChange={onYearSelect}
              ref={!yearSelectDisabled ? yearSelectRef : undefined}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const styles = {
  header: {
    lineHeight: config.MONTH_TITLE_HEIGHT + 'px'
  },
  monthTitle: {
    lineHeight: config.MONTH_TITLE_HEIGHT + 'px'
  }
};
