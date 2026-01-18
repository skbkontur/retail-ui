import type { ReactElement } from 'react';
import React, { useCallback, useContext } from 'react';

import { useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer.js';

import { getStyles } from './DayCellView.styles.js';
import { CalendarContext } from './CalendarContext.js';
import type { DayCellViewModel } from './DayCellViewModel.js';
import * as CDS from './CalendarDateShape.js';
import type { CalendarDayProps } from './CalendarDay.js';
import { CalendarDay } from './CalendarDay.js';

export interface DayCellViewProps {
  date: DayCellViewModel;
}

export const DayCellView = (props: DayCellViewProps): React.JSX.Element => {
  const { date } = props;
  const { value, minDate, maxDate, isHoliday, renderDay, today, onDateClick } = useContext(CalendarContext);
  const styles = useStyles(getStyles);
  const theme = useContext(ThemeContext);

  const isDisabled = !CDS.isBetween(date, minDate, maxDate);

  const humanDateString = InternalDateTransformer.dateToHumanString(date);

  const dayClickHandler = useCallback(() => {
    onDateClick?.(date);
  }, [onDateClick, date]);

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && CDS.isEqual(date, today)),
    isSelected: Boolean(value && CDS.isEqual(date, value)),
    isDisabled,
    isWeekend: isHoliday?.(humanDateString, date.isWeekend) ?? date.isWeekend,
    date: humanDateString,
    onDayClick: dayClickHandler,
  };

  const dayElement: ReactElement<CalendarDayProps> = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;

  return <div className={styles.cell(theme)}>{dayElement}</div>;
};
