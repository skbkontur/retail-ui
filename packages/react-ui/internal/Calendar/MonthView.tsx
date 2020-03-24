import React, { useContext } from 'react';
import cn from 'classnames';

import { DateSelect } from '../DateSelect';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import { jsStyles } from './MonthView.styles';
import { config } from './config';
import * as CDS from './CalendarDateShape';

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

export function MonthView(props: MonthViewProps) {
  const theme = useContext(ThemeContext);

  const {
    children,
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
    yearSelectRef,
  } = props;

  const isTopNegative = top <= 0;
  const isHeaderSticky = isTopNegative && height >= -top;
  const headerTop = isHeaderSticky ? Math.min(-top, height - config.MONTH_TITLE_HEIGHT) : 0;
  const alpha = isHeaderSticky ? (height + top - config.MONTH_TITLE_HEIGHT) / 10 : 1;
  const borderBottomColor = ColorFunctions.fade(theme.calendarMonthTitleBorderBottomColor, alpha);
  const isYearVisible = isFirstInYear || isHeaderSticky;
  const yearTop = isHeaderSticky && !isLastInYear ? -headerTop - top : 0;
  const monthSelectDisabled = top > 40 || headerTop < 0 || headerTop >= height - config.MONTH_TITLE_HEIGHT;
  const yearSelectDisabled = top > 40 || (isLastInYear && top < -height + config.MONTH_TITLE_HEIGHT);

  const getMinMonth = (value: number) => {
    let min = 0;
    for (let i = 0; i < 12; ++i) {
      if (minDate && CDS.isGreaterOrEqual({ date: 31, month: i, year: value }, minDate)) {
        min = i;
        break;
      }
    }
    return min;
  };

  const getMaxMonth = (value: number) => {
    let max = 11;
    for (let i = 11; i >= 0; --i) {
      if (maxDate && CDS.isLessOrEqual({ date: 1, month: i, year: value }, maxDate)) {
        max = i;
        break;
      }
    }
    return max;
  };

  return (
    <div data-tid="MonthView__month" className={jsStyles.month()} style={{ top }} key={month + '-' + year}>
      <div
        style={{ lineHeight: `${config.MONTH_TITLE_HEIGHT}px`, top: headerTop, borderBottomColor }}
        className={cn({
          [jsStyles.monthTitle(theme)]: true,
          [jsStyles.headerSticky(theme)]: isHeaderSticky,
        })}
      >
        <div data-tid="MonthView__headerMonth" className={jsStyles.headerMonth()}>
          <DateSelect
            disabled={monthSelectDisabled}
            width={85}
            type="month"
            value={month}
            onValueChange={onMonthSelect}
            ref={!monthSelectDisabled ? monthSelectRef : undefined}
            minValue={getMinMonth(year)}
            maxValue={getMaxMonth(year)}
          />
        </div>
        {isYearVisible && (
          <div data-tid="MonthView__headerYear" className={jsStyles.headerYear()} style={{ top: yearTop }}>
            <DateSelect
              disabled={yearSelectDisabled}
              width={50}
              type="year"
              value={year}
              minValue={minDate ? minDate.year : undefined}
              maxValue={maxDate ? maxDate.year : undefined}
              onValueChange={onYearSelect}
              ref={!yearSelectDisabled ? yearSelectRef : undefined}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
