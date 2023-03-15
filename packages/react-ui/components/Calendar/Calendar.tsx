import React, { useContext, useEffect } from 'react';
import normalizeWheel from 'normalize-wheel';
import throttle from 'lodash.throttle';

import { mergeRefs } from '../../lib/utils';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';
import { MAX_DATE, MAX_MONTH, MAX_YEAR, MIN_DATE, MIN_MONTH, MIN_YEAR } from '../../lib/date/constants';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { animation as calendarAnimation } from '../../lib/animation';
import { isMobile } from '../../lib/client';

import { themeConfig } from './config';
import * as CalendarUtils from './calendarUtils';
import { MonthViewModel } from './MonthViewModel';
import * as CalendarScrollEvents from './CalendarScrollEvents';
import { Month } from './Month';
import { styles } from './Calendar.styles';
import { CalendarDateShape, create, isGreater, isLess } from './CalendarDateShape';
import { useStateWithCallback } from './useStateWithCallback';
import { getInitialDate } from './calendarUtils';

export interface CalendarProps extends CommonProps {
  /**
   * Вызывается при изменении `value`
   */
  onValueChange?: (date: CalendarDateShape) => void;
  /**
   * Задаёт текущую дату
   *
   * Дата задаётся в формате: `{ year, month, date }`
   */
  value: Nullable<CalendarDateShape>;
  /**
   * Задаёт максимальную возможную дату
   */
  maxDate?: CalendarDateShape;
  /**
   * Задаёт минимальную возможную дату
   */
  minDate?: CalendarDateShape;
  /**
   * Функция для определения праздничных дней
   * @default (_day, isWeekend) => isWeekend
   * @param {T} day - строка в формате `dd.mm.yyyy`
   * @param {boolean} isWeekend - флаг выходного (суббота или воскресенье)
   *
   * @returns {boolean} `true` для выходного или `false` для рабочего дня
   */
  isHoliday?: (day: CalendarDateShape & { isWeekend: boolean }) => boolean;
  /**
   * Управляет наличием разделительной линии внизу календаря
   */
  hasBottomSeparator?: boolean;
  /**
   * Позволяет задавать дату по умолчанию
   */
  shouldSetInitialDate?: boolean;
  /**
   * Позволяет понять, используется ли компонент в контексте `DatePicker`'а
   * @ignore
   */
  _isDatePicker?: boolean;
  /**
   * @ignore
   */
  _initialMonth?: number;
  /**
   * @ignore
   */
  _initialYear?: number;
}

export interface CalendarState {
  scrollPosition: number;
  months: MonthViewModel[];
  today: CalendarDateShape;
  scrollDirection: number;
  scrollTarget: number;
}

export const CalendarDataTids = {
  root: 'Calendar__root',
  month: 'MonthView__month',
  headerMonth: 'MonthView__headerMonth',
  headerYear: 'MonthView__headerYear',
} as const;

const getTodayDate = () => {
  const date = new Date();
  return {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

const setInititalDate = (
  inititialDate: number | undefined,
  todayDate: number,
  date: number,
  shouldSetInitialDate: boolean | undefined,
) => {
  if (shouldSetInitialDate && date) {
    return date;
  }

  if (inititialDate) {
    return inititialDate;
  }

  return todayDate;
};

/**
 * Компонент календаря из [DatePicker](https://tech.skbkontur.ru/react-ui/#/Components/DatePicker)'а
 */
export const Calendar = forwardRefAndName<HTMLDivElement, CalendarProps>(
  'Calendar',
  (
    {
      isHoliday,
      onValueChange,
      value,
      minDate = {
        year: MIN_YEAR,
        month: MIN_MONTH,
        date: MIN_DATE,
      },
      maxDate = {
        year: MAX_YEAR,
        month: MAX_MONTH,
        date: MAX_DATE,
      },
      _isDatePicker,
      _initialMonth,
      _initialYear,
      hasBottomSeparator = !_isDatePicker,
      shouldSetInitialDate = !_isDatePicker,
      className,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);

    const animation = calendarAnimation();

    const today = getTodayDate();
    const date = getInitialDate(today, value, minDate, maxDate);
    const initialMonth = setInititalDate(_initialMonth, today.month, date.month, shouldSetInitialDate);
    const initialYear = setInititalDate(_initialYear, today.year, date.year, shouldSetInitialDate);

    const [state, setState] = useStateWithCallback({
      scrollPosition: 0,
      months: CalendarUtils.getMonths(initialMonth, initialYear),
      today,
      scrollDirection: 1,
      scrollTarget: 0,
    });

    useEffect(() => {
      return () => {
        if (animation.inProgress()) {
          animation.cancel();
        }
      };
    }, []);

    const scrollAmount = (scrollAmmount: number, onEnd?: () => void) => {
      return animation.animate(
        scrollAmmount,
        (deltaY) => {
          setState((state) => {
            return { ...state, scrollPosition: state.scrollPosition + deltaY };
          });
        },
        onEnd,
      );
    };

    const scrollTo = (pos: number, onEnd?: () => void) => {
      const scrollAmmount = pos - state.scrollPosition;
      return scrollAmount(scrollAmmount, onEnd);
    };

    const scrollToMonth = async (month: number, year: number) => {
      if (animation.inProgress()) {
        animation.finish();
        // FIXME: Dirty hack to await batched updates
        await new Promise((r) => setTimeout(r));
      }

      if (minDate && isGreater(minDate, create(32, month, year))) {
        scrollToMonth(minDate.month, minDate.year);
        return;
      }

      if (maxDate && isLess(maxDate, create(0, month, year))) {
        scrollToMonth(maxDate.month, maxDate.year);
        return;
      }

      const currentMonth = state.months[1];
      const diffInMonths = currentMonth.month + currentMonth.year * 12 - month - year * 12;

      if (diffInMonths === 0) {
        scrollTo(0);
        return;
      }

      const maxMonthsToAdd = themeConfig(theme).MAX_MONTHS_TO_APPEND_ON_SCROLL;

      const onEnd = () => {
        setState({ ...state, months: CalendarUtils.getMonths(month, year), scrollPosition: 0 });
      };

      const isYearChanges = (state: CalendarState) => {
        return (
          state.months[1].year !== year &&
          // if diff in months is 2 or less,
          // either year is not changing either months already
          // have right isFirstInYear/isLastInYear flags
          Math.abs(diffInMonths) > 2
        );
      };

      // If scrolling upwards, prepend maximum maxMonthsToAdd months
      // and scroll to the first month
      if (diffInMonths > 0) {
        const monthsToPrependCount = Math.min(Math.abs(diffInMonths) - 1, maxMonthsToAdd);
        const monthsToPrepend = Array.from({ length: monthsToPrependCount }, (_, index) =>
          MonthViewModel.create(month + index, year),
        );
        setState(
          (state) => {
            const yearChanges = isYearChanges(state);
            if (yearChanges) {
              // Mutating here can lead to some unexpected bugs
              // but we couldn't find any yet
              state.months[0].isFirstInYear = true;
              if (monthsToPrepend.length) {
                // Mutating item here is safe as it was just created
                monthsToPrepend[monthsToPrepend.length - 1].isLastInYear = true;
              }
            }
            return {
              ...state,
              months: monthsToPrepend.concat(state.months),
              scrollPosition: -CalendarUtils.getMonthsHeight(monthsToPrepend, theme),
            };
          },
          () => {
            const targetPosition = state.months[0].getHeight(theme);
            scrollTo(targetPosition, onEnd);
          },
        );
      }

      // If scrolling downwards, append maximum maxMonthsToAdd months
      // and scroll to the last but one month
      if (diffInMonths < 0) {
        const monthsToAppendCount = Math.min(Math.abs(diffInMonths), maxMonthsToAdd);
        const monthsToAppend = Array.from({ length: monthsToAppendCount }, (_, index) =>
          MonthViewModel.create(month + index - monthsToAppendCount + 2, year),
        );
        setState(
          (state) => {
            if (isYearChanges(state)) {
              // Mutating here can lead to some unexpected bugs
              // but we couldn't find any yet
              state.months[state.months.length - 1].isLastInYear = true;
              // Mutating item here is safe as it was just created
              if (monthsToAppend[0]) {
                monthsToAppend[0].isFirstInYear = true;
              }
            }
            return { ...state, months: state.months.concat(monthsToAppend) };
          },
          () => {
            const targetPosition = -1 * CalendarUtils.getMonthsHeight(state.months.slice(1, -2), theme);
            scrollTo(targetPosition, onEnd);
          },
        );
      }
    };

    const handleMonthYearChange = (month: number, year: number) => {
      scrollToMonth(month, year);
    };

    const renderMonth = ([top, month]: [number, MonthViewModel]) => {
      return (
        <Month
          key={month.month + '-' + month.year}
          top={top}
          month={month}
          maxDate={maxDate}
          minDate={minDate}
          today={state.today}
          value={value}
          onDateClick={onValueChange}
          onMonthYearChange={handleMonthYearChange}
          isHoliday={isHoliday}
        />
      );
    };

    let root: Nullable<HTMLElement>;
    let touchStartY: Nullable<number> = null;

    const handleTouchStart = (event: Event) => {
      if (!(event instanceof TouchEvent)) {
        return;
      }

      const clientY = event.targetTouches[0].clientY;
      touchStartY = clientY;
    };

    const scrollToNearestWeek = () => {
      const thresholdHeight = themeConfig(theme).MONTH_TITLE_OFFSET_HEIGHT + themeConfig(theme).DAY_SIZE;

      if (state.scrollTarget < thresholdHeight) {
        let targetPosition = 0;
        if (state.scrollDirection < 0) {
          targetPosition = thresholdHeight;
        }

        setState({ ...state, scrollTarget: targetPosition }, () => {
          const amount = state.scrollTarget - targetPosition;
          animation.animate(amount, (deltaY) => {
            // FIXME: Typescript not resolving setState cb type
            setState(CalendarUtils.applyDelta(deltaY, theme) as any);
          });
        });
      }
    };

    const handleWheel = (event: Event) => {
      if (!(event instanceof WheelEvent)) {
        return;
      }
      event.preventDefault();
      const { pixelY } = normalizeWheel(event);

      executeAnimations(pixelY);
    };

    let wheelEndTimeout: Nullable<number>;
    const handleWheelEnd = () => {
      if (wheelEndTimeout) {
        clearTimeout(wheelEndTimeout);
      }
      wheelEndTimeout = window.setTimeout(scrollToNearestWeek, 300);
    };

    const executeAnimations = (pixelY: number) => {
      setState(({ months, scrollPosition }) => {
        const targetPosition = CalendarUtils.calculateScrollPosition(
          months,
          scrollPosition,
          pixelY,
          theme,
        ).scrollPosition;
        return { ...state, scrollTarget: targetPosition };
      }, handleWheelEnd);

      animation.animate(pixelY, (deltaY) => {
        // FIXME: Typescript not resolving setState cb type
        setState(CalendarUtils.applyDelta(deltaY, theme) as any);
      });

      CalendarScrollEvents.emit();
    };

    const handleTouchMove = (event: Event) => {
      if (!(event instanceof TouchEvent)) {
        return;
      }

      const { clientY } = event.changedTouches[0];

      const deltaY = (touchStartY || 0) - clientY;
      touchStartY = clientY;

      executeAnimations(deltaY);
    };

    const throttledHandleTouchMove = throttle(handleTouchMove, 10);

    const refRoot = (element: HTMLElement | null) => {
      if (!root && element) {
        if (isMobile) {
          element.addEventListener('touchstart', handleTouchStart);
          element.addEventListener('touchmove', throttledHandleTouchMove);
        } else {
          element.addEventListener('wheel', handleWheel, { passive: false });
        }
      }
      if (root && !element) {
        if (isMobile) {
          root.removeEventListener('touchstart', handleTouchStart);
          root.removeEventListener('touchmove', throttledHandleTouchMove);
        } else {
          root.removeEventListener('wheel', handleWheel);
        }
      }
      root = element;
    };

    const getMonthPositions = () => {
      const positions = [state.scrollPosition - state.months[0].getHeight(theme)];
      for (let i = 1; i < state.months.length; i++) {
        const position = positions[i - 1] + state.months[i - 1].getHeight(theme);
        positions.push(position);
      }
      return positions;
    };
    const positions = getMonthPositions();

    return (
      <div
        ref={mergeRefs([refRoot, ref])}
        data-tid={CalendarDataTids.root}
        className={cx(styles.root(theme), className)}
        {...rest}
      >
        <div style={{ height: themeConfig(theme).WRAPPER_HEIGHT }} className={styles.wrapper()}>
          {state.months
            .map<[number, MonthViewModel]>((x, i) => [positions[i], x])
            .filter(([top, month]) => CalendarUtils.isMonthVisible(top, month, theme))
            .map(renderMonth, this)}
        </div>
        {hasBottomSeparator && <div className={styles.separator(theme)} />}
      </div>
    );
  },
);
