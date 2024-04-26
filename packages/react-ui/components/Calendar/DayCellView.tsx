import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';
import { InternalDate } from '../../lib/date/InternalDate';
import { LocaleContext } from '../../lib/locale';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/getVisualStateDataAttributes';

import { styles } from './DayCellView.styles';
import { CalendarDataTids } from './Calendar';
import { CalendarContext } from './CalendarContext';
import * as CalendarUtils from './CalendarUtils';
import { DayCellViewModel } from './DayCellViewModel';
import { isBetween, isEqual } from './CalendarDateShape';

export interface DayCellViewProps {
  date: DayCellViewModel;
}

export const DayCellView = (props: DayCellViewProps) => {
  const { date } = props;
  const { value, minDate, maxDate, isHoliday, renderDay, today } = useContext(CalendarContext);
  const { langCode } = useContext(LocaleContext);
  const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);

  const stringDate = InternalDateTransformer.dateToInternalString({
    date: date.date,
    month: CalendarUtils.getMonthInHumanFormat(date.month),
    year: date.year,
  });

  const isWeekend = isHoliday?.(stringDate, date.isWeekend) ?? date.isWeekend;
  const isSelected = Boolean(value && isEqual(date, value));
  const isDisabled = !isBetween(date, minDate, maxDate);
  const isToday = isEqual(today, date);

  const ariaLabel = `${locale.dayCellChooseDateAriaLabel}: ${new InternalDate({ langCode })
    .setComponents({ ...date }, true)
    .toA11YFormat()}`;

  const defaultProps: Required<DayProps> = {
    ariaLabel,
    stringDate,
    isSelected,
    isDisabled,
    isToday,
    isWeekend,
    children: date.date,
  };

  return renderDay ? (renderDay(stringDate, defaultProps, Day) as JSX.Element) : <Day {...defaultProps} />;
};

export type DayProps = PropsWithChildren<{
  ariaLabel: string;
  stringDate: string;
  isSelected: boolean;
  isDisabled: boolean;
  isToday: boolean;
  isWeekend: boolean;
}>;

const Day: FunctionComponent<DayProps> = ({
  ariaLabel,
  stringDate,
  children,
  isSelected,
  isDisabled,
  isToday,
  isWeekend,
}) => {
  const theme = useContext(ThemeContext);
  const _isTheme2022 = isTheme2022(theme);

  const child = _isTheme2022 ? <span className={cx(styles.todayCaption2022(theme))}>{children}</span> : children;

  return (
    <button
      data-tid={CalendarDataTids.dayCell}
      tabIndex={-1}
      aria-label={ariaLabel}
      data-date={stringDate}
      disabled={isDisabled}
      className={cx({
        [styles.cell(theme)]: true,
        [styles.day(theme)]: true,
        [styles.today(theme)]: isToday && !_isTheme2022,
        [styles.selected(theme)]: isSelected,
        [styles.weekend(theme)]: isWeekend,
      })}
      {...getVisualStateDataAttributes({ selected: isSelected })}
    >
      {child}
    </button>
  );
};
