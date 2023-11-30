import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';

import { isMobile } from '../../lib/client';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';
import { InternalDate } from '../../lib/date/InternalDate';
import { LocaleContext } from '../../lib/locale';

import { globalClasses, styles } from './DayCellView.styles';
import { CalendarDataTids } from './Calendar';
import { CalendarContext } from './CalendarContext';
import * as CalendarUtils from './CalendarUtils';
import { DayCellViewModel } from './DayCellViewModel';
import { isBetween, isEqual, isGreaterOrEqual, isLess, isLessOrEqual } from './CalendarDateShape';

export interface DayCellViewProps {
  date: DayCellViewModel;
}

export interface DayCellViewFlags {
  isSelected: boolean;
  isHovered: boolean;
  isDisabled: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isDayInSelectedPeriod: boolean;
  isPeriodStart: boolean;
  isPeriodEnd: boolean;
}

export const DayCellView = (props: DayCellViewProps) => {
  const { date } = props;
  const { value, hoveredDate, periodStartDate, periodEndDate, minDate, maxDate, isHoliday, renderDay, today } =
    useContext(CalendarContext);
  const { langCode } = useContext(LocaleContext);
  const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);

  const stringDate = InternalDateTransformer.dateToInternalString({
    date: date.date,
    month: CalendarUtils.getMonthInHumanFormat(date.month),
    year: date.year,
  });

  const isWeekend = isHoliday?.(stringDate, date.isWeekend) ?? date.isWeekend;
  const isSelected = Boolean((!periodStartDate || !periodEndDate) && value && isEqual(date, value));
  const isHovered = isEqual(date, hoveredDate);
  const isDisabled = !isBetween(date, minDate, maxDate);
  const isToday = isEqual(today, date);

  let isDayInSelectedPeriod = false,
    isPeriodStart = false,
    isPeriodEnd = false;

  const periodStart = periodStartDate || hoveredDate;
  const periodEnd = periodEndDate || hoveredDate;
  if (periodStart && periodEnd) {
    const [earliestDate, latestDate] = isLess(periodStart, periodEnd)
      ? [periodStart, periodEnd]
      : [periodEnd, periodStart];

    isDayInSelectedPeriod = isGreaterOrEqual(date, earliestDate) && isLessOrEqual(date, latestDate);
    isPeriodStart = isEqual(date, earliestDate);
    isPeriodEnd = isEqual(date, latestDate);
  }

  const ariaLabel = `${locale.dayCellChooseDateAriaLabel}: ${new InternalDate({ langCode })
    .setComponents({ ...date }, true)
    .toA11YFormat()}`;

  const defaultProps: Required<DayProps> = {
    ariaLabel,
    stringDate,
    isSelected,
    isHovered,
    isDisabled,
    isToday,
    isWeekend,
    isDayInSelectedPeriod,
    isPeriodStart,
    isPeriodEnd,
    children: date.date,
  };

  return renderDay ? (renderDay(stringDate, defaultProps, Day) as JSX.Element) : <Day {...defaultProps} />;
};

export type DayProps = PropsWithChildren<{
  ariaLabel: string;
  stringDate: string;
  isSelected: boolean;
  isHovered: boolean;
  isDisabled: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isDayInSelectedPeriod: boolean;
  isPeriodStart: boolean;
  isPeriodEnd: boolean;
}>;

const Day: FunctionComponent<DayProps> = ({
  ariaLabel,
  stringDate,
  children,
  isSelected,
  isHovered,
  isDisabled,
  isToday,
  isWeekend,
  isDayInSelectedPeriod,
  isPeriodStart,
  isPeriodEnd,
}) => {
  const theme = useContext(ThemeContext);
  const _isTheme2022 = isTheme2022(theme);

  const child = _isTheme2022 ? (
    <span className={cx(globalClasses.todayCaption, styles.todayCaption())}>{children}</span>
  ) : (
    children
  );

  return (
    <button
      data-tid={CalendarDataTids.dayCell}
      tabIndex={-1}
      aria-label={ariaLabel}
      data-date={stringDate}
      disabled={isDisabled}
      className={cx({
        [styles.cell(theme)]: true,
        [styles.cursorPointer()]: !isMobile,
        [styles.weekend(theme)]: isWeekend,
        [styles.period(theme)]: isDayInSelectedPeriod,
        [styles.periodStart()]: isPeriodStart,
        [styles.periodEnd()]: isPeriodEnd,
      })}
    >
      <div
        className={cx({
          [styles.element(theme)]: true,
          [styles.today(theme)]: isToday && !_isTheme2022,
          [styles.today2022(theme)]: isToday && _isTheme2022,
          [styles.selected(theme)]: isSelected,
          [styles.elementHover(theme)]: isHovered,
          [styles.cursorPointer()]: !isMobile,
        })}
      >
        {child}
      </div>
    </button>
  );
};
