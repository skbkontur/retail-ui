import React, { useContext } from 'react';

import { EmotionContext } from '../../lib/theming/Emotion';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './DayCellView.styles';
import { CalendarContext } from './CalendarContext';
import { DayCellViewModel } from './DayCellViewModel';
import * as CDS from './CalendarDateShape';
import { CalendarDay, CalendarDayProps } from './CalendarDay';

export interface DayCellViewProps {
  date: DayCellViewModel;
}

export const DayCellView = (props: DayCellViewProps) => {
  const { date } = props;
  const { value, minDate, maxDate, isHoliday, renderDay, today, onDateClick } = useContext(CalendarContext);
  const emotion = useContext(EmotionContext);
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    onDateClick?.(date);
  };

  const humanDateString = InternalDateTransformer.dateToHumanString(date);
  const styles = getStyles(emotion);

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && CDS.isEqual(date, today)),
    isSelected: Boolean(value && CDS.isEqual(date, value)),
    isDisabled: !CDS.isBetween(date, minDate, maxDate),
    isWeekend: isHoliday?.(humanDateString, date.isWeekend) ?? date.isWeekend,
    date: humanDateString,
  };

  const dayElement = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;

  return (
    <div onClick={handleClick} className={styles.cell(theme)}>
      {dayElement}
    </div>
  );
};
