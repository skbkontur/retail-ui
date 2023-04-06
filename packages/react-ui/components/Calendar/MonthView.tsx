import React, { useContext } from 'react';

import { DateSelectCaption } from '../../internal/DateSelect/DateSelectCaption';
import { DateSelect } from '../../internal/DateSelect';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { cx } from '../../lib/theming/Emotion';
import { useResponsiveLayout } from '../../components/ResponsiveLayout';
import { DatePickerLocale, DatePickerLocaleHelper } from '../../components/DatePicker/locale';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { Nullable } from '../..//typings/utility-types';

import { styles } from './MonthView.styles';
import { themeConfig } from './config';
import * as CDS from './CalendarDateShape';
import { CalendarDataTids } from './Calendar';

export const getMinMonth = (year: number, minDate: Nullable<CDS.CalendarDateShape>) => {
  let min = 0;
  for (let i = 0; i < 12; ++i) {
    if (minDate && CDS.isGreaterOrEqual({ date: 31, month: i, year }, minDate)) {
      min = i;
      break;
    }
  }
  return min;
};

export const getMaxMonth = (year: number, maxDate: Nullable<CDS.CalendarDateShape>) => {
  let max = 11;
  for (let i = 11; i >= 0; --i) {
    if (maxDate && CDS.isLessOrEqual({ date: 1, month: i, year }, maxDate)) {
      max = i;
      break;
    }
  }
  return max;
};

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
  const { isMobile } = useResponsiveLayout();
  const locale = useLocaleForControl('DatePicker', DatePickerLocaleHelper);

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
  const headerTop = isHeaderSticky ? Math.min(-top, height - themeConfig(theme).MONTH_TITLE_HEIGHT) : 0;
  const alpha = isHeaderSticky ? (height + top - themeConfig(theme).MONTH_TITLE_HEIGHT) / 10 : 1;
  const borderBottomColor = ColorFunctions.fade(theme.calendarMonthTitleBorderBottomColor, alpha);
  const isYearVisible = isFirstInYear || isHeaderSticky;
  const yearTop = isHeaderSticky && !isLastInYear ? -headerTop - top : 0;
  const monthSelectDisabled = top > 40 || headerTop < 0 || headerTop >= height - themeConfig(theme).MONTH_TITLE_HEIGHT;
  const yearSelectDisabled = top > 40 || (isLastInYear && top < -height + themeConfig(theme).MONTH_TITLE_HEIGHT);

  return (
    <div
      data-tid={CalendarDataTids.month}
      className={cx({ [styles.month(theme)]: true, [styles.monthMobile()]: isMobile })}
      style={{ top }}
      key={month + '-' + year}
    >
      <div
        style={{ top: headerTop }}
        className={cx({
          [styles.header()]: true,
          [styles.headerSticky(theme)]: isHeaderSticky,
        })}
      >
        <div style={{ borderBottomColor }} className={styles.monthTitle(theme)}>
          <div data-tid={CalendarDataTids.headerMonth} className={styles.headerMonth(theme)}>
            {isMobile ? (
              <DateSelectCaption
                disabled={monthSelectDisabled}
                width="6em"
                caption={locale.months[month]}
                menu={monthSelectDisabled ? null : getMonthsSelect(props, locale)}
              />
            ) : (
              <DateSelect
                disabled={monthSelectDisabled}
                width={85}
                type="month"
                value={month}
                onValueChange={onMonthSelect}
                ref={!monthSelectDisabled ? monthSelectRef : undefined}
                minValue={getMinMonth(year, minDate)}
                maxValue={getMaxMonth(year, maxDate)}
              />
            )}
          </div>
          {isYearVisible && (
            <div data-tid={CalendarDataTids.headerYear} className={styles.headerYear(theme)} style={{ top: yearTop }}>
              {isMobile ? (
                <DateSelectCaption
                  disabled={yearSelectDisabled}
                  width="3.5em"
                  caption={year}
                  menu={yearSelectDisabled ? null : getYearsSelect(props)}
                />
              ) : (
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
              )}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

const defaultMinYear = 1900;
const defaultMaxYear = 2100;

const getYearsSelect = (props: MonthViewProps) => {
  const min = props.minDate?.year ?? defaultMinYear;
  const max = props.maxDate?.year ?? defaultMaxYear;
  const years = [];
  for (let year = min; year <= max; ++year) {
    years.push({ year, disabled: year < min || year > max });
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      data-tid={CalendarDataTids.yearSelectMobile}
      className={styles.nativeSelect()}
      value={props.year}
      onChange={(e) => {
        props.onYearSelect(parseInt(e.target.value));
      }}
    >
      {years.map((year) => (
        <option key={year.year} value={year.year} disabled={year.disabled}>
          {year.year}
        </option>
      ))}
    </select>
  );
};

const getMonthsSelect = (props: MonthViewProps, locale: DatePickerLocale) => {
  const min = getMinMonth(props.year, props.minDate);
  const max = getMaxMonth(props.year, props.maxDate);
  const months = [];
  for (let month = 0; month < 12; ++month) {
    months.push({ month, disabled: month < min || month > max });
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      data-tid={CalendarDataTids.monthSelectMobile}
      className={styles.nativeSelect()}
      value={props.month}
      onChange={(e) => {
        props.onMonthSelect(parseInt(e.target.value));
      }}
    >
      {months.map((month) => (
        <option key={month.month} value={month.month} disabled={month.disabled}>
          {locale.months[month.month]}
        </option>
      ))}
    </select>
  );
};
