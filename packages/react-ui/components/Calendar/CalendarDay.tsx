import React, { memo, PropsWithChildren, useContext } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { EmotionContext } from '../../lib/theming/Emotion';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { InternalDate } from '../../lib/date/InternalDate';
import { LocaleContext } from '../../lib/locale';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { getStyles } from './DayCellView.styles';
import { CalendarDataTids } from './Calendar';

export interface CalendarDayProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Устанавливает, является ли день текущим. */
  isToday?: boolean;

  /** Устанавливает, является ли день выбранным. */
  isSelected?: boolean;

  /** Устанавливает, является ли день недоступным. */
  isDisabled?: boolean;

  /** Устанавливает, является ли день выходным. */
  isWeekend?: boolean;

  /** Задает день. */
  date: string;
}

/**
 * Компонент дня `CalendarDay` из Calendar.
 *
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
      const emotion = useContext(EmotionContext);

      const { langCode } = useContext(LocaleContext);
      const internalDate = new InternalDate({ langCode, value: date });

      const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);
      const ariaLabel = `${locale.dayCellChooseDateAriaLabel}: ${internalDate.toA11YFormat()}`;

      const { date: day } = internalDate.getComponentsLikeNumber();
      const caption = children ?? day;
      const styles = getStyles(emotion);

      return (
        <button
          ref={ref}
          data-tid={CalendarDataTids.dayCell}
          aria-label={ariaLabel}
          tabIndex={-1}
          disabled={isDisabled}
          className={emotion.cx(
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
          <span className={emotion.cx({ [styles.todayCaption(theme)]: isToday })}>{caption}</span>
        </button>
      );
    },
  ),
);
