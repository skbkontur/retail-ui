import type { PropsWithChildren } from 'react';
import React, { useContext, memo } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { InternalDate } from '../../lib/date/InternalDate';
import { LocaleContext } from '../../lib/locale';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { styles } from './DayCellView.styles';
import { CalendarDataTids } from './Calendar';

export interface CalendarDayProps extends React.HTMLAttributes<HTMLButtonElement> {
  isToday?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isWeekend?: boolean;
  date: string;
}

/**
 * @visibleName Calendar.Day
 */
export const CalendarDay = memo(
  forwardRefAndName(
    'CalendarDay',
    function CalendarDay(
      {
        isToday,
        isSelected,
        isDisabled,
        isWeekend,
        date,
        children,
        className,
        ...rest
      }: PropsWithChildren<CalendarDayProps>,
      ref: React.Ref<HTMLButtonElement>,
    ) {
      const theme = useContext(ThemeContext);

      const { langCode } = useContext(LocaleContext);
      const internalDate = new InternalDate({ langCode, value: date });

      const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);
      const ariaLabel = `${locale.dayCellChooseDateAriaLabel}: ${internalDate.toA11YFormat()}`;

      const { date: day } = internalDate.getComponentsLikeNumber();
      const caption = children ?? day;

      return (
        <button
          ref={ref}
          data-tid={CalendarDataTids.dayCell}
          aria-label={ariaLabel}
          tabIndex={-1}
          disabled={isDisabled}
          className={cx(
            {
              [styles.day(theme)]: true,
              [styles.selected(theme)]: isSelected,
              [styles.weekend(theme)]: isWeekend,
            },
            className,
          )}
          {...getVisualStateDataAttributes({ selected: isSelected })}
          {...rest}
        >
          <span className={cx({ [styles.todayCaption(theme)]: isToday })}>{caption}</span>
        </button>
      );
    },
  ),
);
