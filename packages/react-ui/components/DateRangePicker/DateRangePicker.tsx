import React, { useRef, useState } from 'react';
import { css } from '@emotion/css';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
// import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Calendar, CalendarDay, CalendarDayProps } from '../Calendar';
import { DropdownContainer } from '../../internal/DropdownContainer';
import { DateInputProps } from '../DateInput';
import { isBetween, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } from '../../lib/date/comparison';
import { DatePickerProps } from '../DatePicker';
import { styles } from '../DatePicker/DatePicker.styles';
import { MobilePicker } from '../DatePicker/MobilePicker';

import { DateRangePickerSeparator } from './DateRangePickerSeparator';
import { DateRangePickerContext, DateRangePickerContextProps } from './DateRangePickerContext';
import { DateRangePickerField } from './DateRangePickerField';

export const DateRangePickerDataTids = {
  root: 'DateRangePicker__root',
  from: 'DateRangePicker__from',
  to: 'DateRangePicker__to',
  dropdown: 'DateRangePicker__dropdown',
  calendar: 'DateRangePicker__calendar',
} as const;

export interface DateRangePickerProps
  extends Pick<
    DatePickerProps,
    | 'value'
    | 'minDate'
    | 'maxDate'
    | 'size'
    | 'isHoliday'
    // TODO | 'renderDay'
    | 'menuPos'
    | 'useMobileNativeDatePicker'

    | 'autoFocus'
    | 'disabled'
    | 'error'
    | 'warning'

    | 'onBlur'
    | 'onFocus'
    | 'onKeyDown'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onMouseOver'
  > {
  from?: string;
  to?: string;
  onValueChange: (from: string | null, to: string | null) => void;
  onFromValueChange?: (value: string) => void;
  onToValueChange?: (value: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> & {
  From: React.FC<DateInputProps>,
  To: React.FC<DateInputProps>
  Separator: React.FC,
} = (props) => {
  const { minDate, maxDate } = props;
  // const start = useRef(null);
  // const end = useRef(null);

  const [periodStart, setPeriodStart] = useState<string | null>(null);
  const [periodEnd, setPeriodEnd] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentFocus, setCurrentFocus] = useState<any>(null);

  const dropdownContainer = useRef(null);
  const calendarRef = useRef(null);

  function updatePeriod(value: string) {
    const handleInitialPeriod = (value: string) => {
      if (currentFocus === 'start') {
        setPeriodStart(value);
        setCurrentFocus('end');
      } else {
        setPeriodEnd(value);
        setCurrentFocus('start');
      }
    };

    const handleSinglePeriod = (value: string) => {
      if (isGreaterOrEqual(periodStart || '', value)) {
        setPeriodStart(value);
        setPeriodEnd(periodStart);
      } else {
        setPeriodEnd(value);
      }
      resetPeriod();
    };

    const handleFullPeriod = (value: string) => {
      if (currentFocus === 'start') {
        updateStartPeriod(value);
      } else {
        updateEndPeriod(value);
      }
    };

    const updateStartPeriod = (value: string) => {
      if (isLessOrEqual(value, periodEnd || '')) {
        setPeriodStart(value);
        resetPeriod();
      } else {
        setPeriodStart(value);
        setPeriodEnd(null);
        setCurrentFocus('end');
      }
    };

    const updateEndPeriod = (value: string) => {
      if (isGreaterOrEqual(value, periodStart || '')) {
        setPeriodEnd(value);
        resetPeriod();
      } else {
        setPeriodStart(value);
        setPeriodEnd(null);
        setCurrentFocus('end');
      }
    };

    const resetPeriod = () => {
      setShowCalendar(false);
      setHoveredDay(null);
    };

    if (!periodStart && !periodEnd) {
      handleInitialPeriod(value);
    } else if (periodStart && !periodEnd) {
      handleSinglePeriod(value);
    } else {
      handleFullPeriod(value);
    }
  }

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
      <CalendarDay
        {...props}
        onMouseOver={() => { setHoveredDay(props.date); }}
        onMouseOut={() => { setHoveredDay(null); }}
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

  const dateRangePickerContextProps: DateRangePickerContextProps = {
    from: props.from,
    to: props.to,
    minDate: props.minDate,
    maxDate: props.maxDate,
    size: props.size,
    onValueChange: props.onValueChange,
    onFromValueChange: props.onFromValueChange,
    onToValueChange: props.onToValueChange,

    periodStart: periodStart || "",
    periodEnd: periodEnd || "",
    hoveredDay,
    showCalendar,
    currentFocus,

    setPeriodStart,
    setPeriodEnd,
    setHoveredDay,
    setShowCalendar,
    setCurrentFocus,

    calendarRef
  };

  return (
    <CommonWrapper {...props}>
      <ResponsiveLayout>
        {({ isMobile }) => (
          <ThemeContext.Consumer>
            {(theme) => {
              return (
                <ThemeContext.Provider value={ThemeFactory.create({
                  calendarBottomSeparatorBorder: 'none',
                  calendarWrapperHeight: '450px'
                }, theme)}>
                  <CommonWrapper {...props}>
                    <div
                      className={styles.root()}
                      data-tid={DateRangePickerDataTids.root}
                    >
                      <DateRangePickerContext.Provider value={dateRangePickerContextProps}>
                        {
                          isMobile ?
                            <MobilePicker
                              value={props.value}
                              minDate={props.minDate}
                              maxDate={props.maxDate}
                              onValueChange={() => { console.log('todo') }}
                              isHoliday={props.isHoliday}
                            />
                            :
                            <>
                              {props.children
                                ? props.children
                                : <>
                                  <DateRangePickerFrom />
                                  <DateRangePickerSeparator />
                                  <DateRangePickerTo />
                                </>}

                              <div
                                ref={dropdownContainer}
                                data-tid={DateRangePickerDataTids.dropdown}
                              />
                              {showCalendar && (
                                <DropdownContainer
                                  menuPos={props.menuPos}
                                  data-tid={DateRangePickerDataTids.root}
                                  offsetY={parseInt(theme.datePickerMenuOffsetY)}
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
                                      data-tid={DateRangePickerDataTids.calendar}
                                    />
                                  </div>
                                </DropdownContainer>
                              )}
                            </>
                        }
                      </DateRangePickerContext.Provider>
                    </div>
                  </CommonWrapper>
                </ThemeContext.Provider>
              );
            }}
          </ThemeContext.Consumer>
        )
        }
      </ResponsiveLayout>
    </CommonWrapper>
  );
}

const DateRangePickerFrom: React.FC<DateInputProps> = (props) => (
  <DateRangePickerField {...props} type="start" />
);

const DateRangePickerTo: React.FC<DateInputProps> = (props) => (
  <DateRangePickerField {...props} type="end" />
);

DateRangePicker.__KONTUR_REACT_UI__ = 'DateRangePicker';
DateRangePicker.displayName = 'DateRangePicker';

DateRangePicker.From = DateRangePickerFrom;
DateRangePicker.To = DateRangePickerTo;
DateRangePicker.Separator = DateRangePickerSeparator;
