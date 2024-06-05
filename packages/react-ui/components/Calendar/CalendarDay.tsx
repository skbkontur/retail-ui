import React, { PropsWithChildren, useContext, memo } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { InternalDate } from '../../lib/date/InternalDate';
import { LocaleContext } from '../../lib/locale';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/getVisualStateDataAttributes';
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
      const _isTheme2022 = isTheme2022(theme);

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
              [styles.today(theme)]: isToday && !_isTheme2022,
              [styles.selected(theme)]: isSelected,
              [styles.weekend(theme)]: isWeekend,
            },
            className,
          )}
          {...getVisualStateDataAttributes({ selected: isSelected })}
          {...rest}
        >
          <span className={cx({ [styles.todayCaption2022(theme)]: isToday && _isTheme2022 })}>{caption}</span>
        </button>
      );
    },
  ),
);
