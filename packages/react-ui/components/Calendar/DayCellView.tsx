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
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  onDateClick?: (day: CDS.CalendarDateShape) => void;
  isWeekend?: boolean;
  renderItem: (date: CDS.CalendarDateShape) => React.ReactNode | number;
}

export function DayCellView(props: DayCellViewProps) {
  const { date, minDate, maxDate, today, value, isWeekend, onDateClick, renderItem } = props;
  const theme = useContext(ThemeContext);
  const _isTheme2022 = isTheme2022(theme);

  const handleClick = () => {
    const { date, month, year } = props.date;
    onDateClick?.({ date, month, year });
  };

  const child = _isTheme2022 ? (
    <span className={cx(globalClasses.todayCaption, styles.todayCaption())}>{renderItem(date)}</span>
  ) : (
    renderItem(date)
  );

  const isToday = Boolean(today && CDS.isEqual(date, today));

  const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);

  return (
    <button
      data-tid={CalendarDataTids.dayCell}
      tabIndex={-1}
      aria-label={`${locale.dayCellChooseDateAriaLabel} ${value?.date}.${value && value.month + 1}.${value?.year}`}
      disabled={!CDS.isBetween(date, minDate, maxDate)}
      className={cx({
        [styles.cell(theme)]: true,
        [styles.today(theme)]: isToday && !_isTheme2022,
        [styles.today2022(theme)]: isToday && _isTheme2022,
        [styles.selected(theme)]: Boolean(value && CDS.isEqual(date, value)),
        [styles.weekend(theme)]: Boolean(isWeekend),
      })}
      onClick={handleClick}
    >
      {child}
    </button>
  );
}
