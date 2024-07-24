import React, { useRef, useState } from 'react';
import { css } from '@emotion/css';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { THEME_2022 } from '../../lib/theming/themes/Theme2022';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import {
  CommonProps,
  CommonWrapper,
} from '../../internal/CommonWrapper';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Calendar, CalendarDateShape, CalendarDay, CalendarDayProps, CalendarProps } from '../Calendar';
import { DropdownContainer, DropdownContainerProps } from '../../internal/DropdownContainer';
import { DateInput } from '../DateInput';
import { isBetween, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } from '../../lib/date/comparison';
import { SizeProp } from '../../lib/types/props';

import { styles } from './DateRangePicker.styles';

export const DateRangePickerDataTids = {
  root: 'DateRangePicker__root',
} as const;

export interface DateRangePickerProps
  extends Pick<DropdownContainerProps, 'menuPos'>,
  Pick<CalendarProps, 'isHoliday' | 'minDate' | 'maxDate' | 'renderDay' | 'onMonthChange'>,
  CommonProps {
  autoFocus?: boolean;
  disabled?: boolean;
  /**
   * Отвечает за отображение кнопки "Сегодня".
   */
  enableTodayLink?: boolean;
  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  menuAlign?: 'left' | 'right';
  size?: SizeProp;
  value?: string | null;
  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;
  width?: number | string;
  onBlur?: () => void;
  /**
   * Вызывается при изменении `value`
   *
   * @param value - строка в формате `dd.mm.yyyy`.
   */
  onValueChange: (value: string) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  onMouseEnter?: (e: React.MouseEvent<any>) => void;
  onMouseLeave?: (e: React.MouseEvent<any>) => void;
  onMouseOver?: (e: React.MouseEvent<any>) => void;
  /**
   * Использовать на мобильных устройствах нативный календарь для выбора дат.
   *
   * - На iOS нативный календарь не умеет работать с minDate и maxDate
   */
  useMobileNativeDatePicker?: boolean;
}

export interface DateRangePickerState {
  opened: boolean;
  canUseMobileNativeDatePicker: boolean;
  today: CalendarDateShape;
}

function DateRangePicker(props: DateRangePickerProps) {
  const { minDate, maxDate } = props;
  const start = useRef<any>(null);
  const end = useRef<any>(null);

  const [periodStart, setPeriodStart] = useState<string | null>(null);
  const [periodEnd, setPeriodEnd] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const [currentFocus, setCurrentFocus] = useState<any>(null);

  const dropdownContainer = useRef(null);
  const calendarRef = useRef<any>(null);

  const updatePeriod = (value: string) => {
    if (!periodStart && !periodEnd) {
      if (currentFocus === 'start') {
        setPeriodStart(value);
        setCurrentFocus('end');
        end.current.focus();
      } else {
        setPeriodEnd(value);
        setCurrentFocus('start');
        start.current.focus();
      }
      return;
    }

    if (periodStart && !periodEnd) {
      if (isGreaterOrEqual(periodStart, value)) {
        setPeriodStart(value);
        setPeriodEnd(periodStart);
        setShowCalendar(false);
        setHoveredDay(null);
      } else {
        setPeriodEnd(value);
        setShowCalendar(false);
        setHoveredDay(null);
      }
      return;
    }

    // Всё заполнено
    if (!periodStart || !periodEnd) {
      return;
    }

    if (currentFocus === 'start') {
      if (isLessOrEqual(value, periodEnd)) {
        setPeriodStart(value);
        setShowCalendar(false);
        setHoveredDay(null);
      } else {
        setPeriodStart(value);
        setPeriodEnd(null);
        setCurrentFocus('end');
        end.current.focus();
      }
    } else if (currentFocus === 'end') {
      if (isGreaterOrEqual(value, periodStart)) {
        setPeriodEnd(value);
        setShowCalendar(false);
        setHoveredDay(null);
      } else {
        setPeriodStart(value);
        setPeriodEnd(null);
        setCurrentFocus('end');
        end.current.focus();
      }
    }
  };

  const renderDay = (props: CalendarDayProps) => {
    const isDayInHoveredPeriod =
      periodStart &&
      hoveredDay !== null &&
      ((currentFocus === 'end' &&
        isBetween(props.date, periodStart, hoveredDay)) ||
        (currentFocus === 'start' &&
          isBetween(props.date, hoveredDay, periodStart)));

    const isDayInPeriod =
      periodStart && periodEnd && isBetween(props.date, periodStart, periodEnd);
    const isFirstDay = props.date === periodStart;
    const isLastDay = props.date === periodEnd;

    return (
      /* borderRadius */
      <CalendarDay
        {...props}
        onMouseOver={() => {
          setHoveredDay(props.date);
        }}
        onMouseOut={() => {
          setHoveredDay(null);
        }}
        className={css`position: relative;
        z-index: 1;

        /* Фикс кликабельной области для демки */
        span:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        ${periodStart && 'border-radius: 0;'}


        &:before {
          content: '';
          opacity: 0;
        }

        ${(isDayInPeriod || isDayInHoveredPeriod) &&
          `
          background: rgb(230,230,230);

          &:hover:before {
            content: '';
            opacity: 1;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            z-index: -1;
          }
          `
          }

        ${(props.date === hoveredDay ||
            (!isDayInPeriod && isDayInHoveredPeriod)) &&
          `&, &:hover, { background: rgb(240,240,240); }`
          }

        ${isDayInPeriod &&
          `
          &:hover {
            background: rgb(230,230,230);
          }
          
          &:before {
            background: rgb(240,240,240);
          }
          `
          }
        

          ${((isFirstDay && !hoveredDay) ||
            (isFirstDay &&
              hoveredDay &&
              isGreaterOrEqual(hoveredDay, periodStart)) ||
            (periodStart &&
              props.date === hoveredDay &&
              isLessOrEqual(props.date, periodStart))) &&
          `border-radius: 50% 0 0 50%;`
          }
          
          ${((isLastDay && !hoveredDay) ||
            (isLastDay &&
              hoveredDay &&
              isLessOrEqual(hoveredDay, periodEnd)) ||
            // Создание (не изменение)
            (periodStart &&
              !periodEnd &&
              props.date === hoveredDay &&
              isGreaterOrEqual(props.date, periodStart)) ||
            (periodEnd &&
              props.date === hoveredDay &&
              isGreaterOrEqual(props.date, periodEnd))) &&
          `
            border-radius: 0 50% 50% 0;
            `
          }

          ${
          /* Если ховер в противоположную сторону */
          !isDayInPeriod &&
          !isDayInHoveredPeriod &&
          `
            border-radius: 50%;
            `
          }

          ${(isFirstDay || isLastDay) &&
          `
          position:relative;
          z-index: 1;
          color: white;
          border: 0;

          &:before {
            content: '';
            opacity: 1;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #3d3d3d;
            z-index: -1;
          }
          `
          }
          
          /* Выход за промежутки диапазона */
          ${hoveredDay &&
          ((currentFocus === 'start' &&
            isFirstDay &&
            isLess(hoveredDay, periodStart)) ||
            (currentFocus === 'end' &&
              isLastDay &&
              isGreater(hoveredDay, periodEnd))) &&
          `

          &:after {
            content: '';
            position: absolute;
            z-index: -2;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(240,240,240);
          }`
          }
          
            ${isFirstDay && '&:after { border-radius: 0 50% 50% 0; }'}
            ${isLastDay && '&:after { border-radius: 50% 0 0 50%; }'}
            `}
      />
    );
  };

  return (
    <CommonWrapper {...props}>
      <ResponsiveLayout>
        {({ isMobile }) => {
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                return (
                  <ThemeContext.Provider value={ThemeFactory.create({ calendarBottomSeparatorBorder: 'none' }, theme)}>
                    <CommonWrapper {...props}>
                      <div
                        data-tid={DateRangePickerDataTids.root}
                        className={cx({ [styles.root(theme)]: true, [styles.rootMobile(theme)]: isMobile })}
                      >
                        <ThemeContext.Provider
                          value={ThemeFactory.create(
                            { calendarWrapperHeight: '450px' },
                            THEME_2022
                          )}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                              <DateInput
                                value={periodStart ? periodStart : ""}
                                onValueChange={setPeriodStart}
                                ref={start}
                                withIcon
                                width="100%"
                                size={props.size}
                                minDate={minDate}
                                onFocus={() => {
                                  setCurrentFocus('start');
                                  setShowCalendar(true);
                                  if (periodStart) {
                                    const [, month, year] = periodStart.split('.').map(Number);
                                    // Баг scrollToMonth дает неправильный год
                                    if (month && calendarRef) {
                                      calendarRef?.current?.scrollToMonth(month - 1, year);
                                    }
                                  }
                                }}
                              />
                            </div>
                            <span>&nbsp;—&nbsp;</span>
                            <div>
                              <DateInput
                                value={periodEnd ? periodEnd : ""}
                                onValueChange={setPeriodEnd}
                                withIcon
                                size={props.size}
                                width="100%"
                                minDate={maxDate}
                                ref={end}
                                onFocus={() => {
                                  setCurrentFocus('end');
                                  setShowCalendar(true);
                                  if (periodEnd) {
                                    const [, month, year] = periodEnd?.split('.').map(Number);
                                    if (month && calendarRef) {
                                      calendarRef?.current?.scrollToMonth(month - 1, year);
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>

                          <div ref={dropdownContainer} />
                          {showCalendar && (
                            <DropdownContainer
                              menuPos={props.menuPos}
                              data-tid={DateRangePickerDataTids.root}
                              offsetY={parseInt(theme.datePickerMenuOffsetY)}
                              align={props.menuAlign}
                              getParent={() => dropdownContainer.current}
                            >
                              <div className={styles.calendarWrapper(theme)}>
                                <Calendar
                                  value={null}
                                  minDate={minDate}
                                  maxDate={maxDate}
                                  renderDay={renderDay}
                                  onValueChange={(value) => updatePeriod(value)}
                                  ref={calendarRef}
                                />
                              </div>
                            </DropdownContainer>
                          )}
                        </ThemeContext.Provider>
                      </div>
                    </CommonWrapper>
                  </ThemeContext.Provider>
                );
              }}
            </ThemeContext.Consumer>

          );
        }}
      </ResponsiveLayout>
    </CommonWrapper>
  );
}

// TODO validate()
function validate() {
  return [];
}


DateRangePicker.__KONTUR_REACT_UI__ = 'DateRangePicker';
DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.validate = validate;

export { DateRangePicker };
