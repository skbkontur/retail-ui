import React, { ReactElement, useCallback, useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';

import { styles } from './DayCellView.styles';
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
  const theme = useContext(ThemeContext);

  const isDisabled = !CDS.isBetween(date, minDate, maxDate);

  const humanDateString = InternalDateTransformer.dateToHumanString(date);

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && CDS.isEqual(date, today)),
    isSelected: Boolean(value && CDS.isEqual(date, value)),
    isDisabled,
    isWeekend: isHoliday?.(humanDateString, date.isWeekend) ?? date.isWeekend,
    date: humanDateString,
  };

  const dayElement: ReactElement<CalendarDayProps> = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;
  const customDayClickHandler = dayElement.props.onClick;

  const dayClickHandler = useCallback<NonNullable<typeof customDayClickHandler>>(
    (e) => {
      customDayClickHandler?.(e);
      onDateClick?.(date);
    },
    [customDayClickHandler, onDateClick, date],
  );

  const dayElementWithClickHandler = React.cloneElement<CalendarDayProps>(dayElement, {
    onClick: dayClickHandler,
  });

  return <div className={styles.cell(theme)}>{dayElementWithClickHandler}</div>;
};
