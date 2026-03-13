import type { PropsWithChildren } from 'react';
import React, { useContext, memo, useCallback } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { DatePickerLocaleHelper } from '../DatePicker/locale/index.js';
import { InternalDate } from '../../lib/date/InternalDate.js';
import { LocaleContext } from '../../lib/locale/index.js';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';

import { getStyles } from './DayCellView.styles.js';
import { CalendarDataTids } from './Calendar.js';

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

  /** Задает функцию, которая вызывается при клике на день. Необходима для внутренней работы Calendar. Не предназначена для переопределения. Вместо этого, следует использовать стандартный `onClick`.
   * @internal @ignore
   */
  onDayClick: () => void;
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
        onDayClick,
        onClick,
        children,
        className,
        ...rest
      }: PropsWithChildren<CalendarDayProps>,
      ref: React.Ref<HTMLButtonElement>,
    ) {
      const theme = useContext(ThemeContext);
      const { cx } = useEmotion();
      const styles = useStyles(getStyles);

      const { langCode } = useContext(LocaleContext);
      const internalDate = new InternalDate({ langCode, value: date });

      const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);
      const ariaLabel = `${locale.dayCellChooseDateAriaLabel}: ${internalDate.toA11YFormat()}`;

      const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
        (e) => {
          onDayClick();
          onClick?.(e);
        },
        [onDayClick, onClick],
      );

      const { date: day } = internalDate.getComponentsLikeNumber();
      const caption = children ?? day;

      return (
        <button
          ref={ref}
          data-tid={CalendarDataTids.dayCell}
          aria-label={ariaLabel}
          tabIndex={-1}
          disabled={isDisabled}
          onClick={handleClick}
          className={cx(
            {
              [styles.day(theme)]: true,
              [styles.weekend(theme)]: isWeekend,
              [styles.selected(theme)]: isSelected,
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
