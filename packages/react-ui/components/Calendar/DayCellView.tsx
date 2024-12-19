import React, { ReactElement, useContext } from 'react';

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

  const handleClick = () => {
    onDateClick?.(date);
  };

  const humanDateString = InternalDateTransformer.dateToHumanString(date);

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && CDS.isEqual(date, today)),
    isSelected: Boolean(value && CDS.isEqual(date, value)),
    isDisabled,
    isWeekend: isHoliday?.(humanDateString, date.isWeekend) ?? date.isWeekend,
    date: humanDateString,
  };

  const dayElement: ReactElement<CalendarDayProps> = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;

  const dayElementWithClickHandler = React.cloneElement<CalendarDayProps>(dayElement, {
    onClick: (e) => {
      dayElement.props.onClick?.(e);
      handleClick();
    },
  });

  return <div className={styles.cell(theme)}>{dayElementWithClickHandler}</div>;
};
