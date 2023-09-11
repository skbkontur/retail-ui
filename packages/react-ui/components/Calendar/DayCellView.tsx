import React, { useContext } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { DatePickerLocaleHelper } from '../DatePicker/locale';

import * as CDS from './CalendarDateShape';
import { globalClasses, styles } from './DayCellView.styles';
import { CalendarDataTids } from './Calendar';

interface DayCellViewProps {
  date: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  periodStartDate?: CDS.CalendarDateShape;
  periodEndDate?: CDS.CalendarDateShape;
  isWeekend?: boolean;
  isToday?: boolean;
  isDayInSelectedPeriod?: boolean;
  isPeriodStart?: boolean;
  isPeriodEnd?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isHovered?: boolean;
  onDateClick?: (day: CDS.CalendarDateShape) => void;
  onMouseEnter?: (hoveredDate: CDS.CalendarDateShape) => void;
  onMouseLeave?: (hoveredDate: CDS.CalendarDateShape) => void;
}

export function DayCellView(props: DayCellViewProps) {
  const {
    date,
    value,
    isWeekend,
    isHovered,
    isSelected,
    isDisabled,
    isToday,
    isPeriodStart,
    isPeriodEnd,
    isDayInSelectedPeriod,
    onDateClick,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const theme = useContext(ThemeContext);
  const _isTheme2022 = isTheme2022(theme);

  const handleClick = () => {
    const { date, month, year } = props.date;
    onDateClick?.({ date, month, year });
  };

  const child = _isTheme2022 ? (
    <span className={cx(globalClasses.todayCaption, styles.todayCaption())}>{date.date}</span>
  ) : (
    date.date
  );

  const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);

  return (
    <button
      data-tid={CalendarDataTids.dayCell}
      tabIndex={-1}
      aria-label={`${locale.dayCellChooseDateAriaLabel} ${value?.date}.${value && value.month + 1}.${value?.year}`}
      disabled={isDisabled}
      className={cx({
        [styles.cell(theme)]: true,
        [styles.weekend(theme)]: isWeekend,
        [styles.period(theme)]: isDayInSelectedPeriod,
        [styles.periodStart()]: isPeriodStart,
        [styles.periodEnd()]: isPeriodEnd,
      })}
      onClick={handleClick}
      onMouseEnter={() => onMouseEnter?.(date)}
      onMouseLeave={() => onMouseLeave?.(date)}
    >
      <div
        className={cx({
          [styles.element(theme)]: true,
          [styles.today(theme)]: isToday && !_isTheme2022,
          [styles.today2022(theme)]: isToday && _isTheme2022,
          [styles.selected(theme)]: isSelected,
          [styles.elementHover(theme)]: isHovered,
        })}
      >
        {child}
      </div>
    </button>
  );
}
