import React, { useRef, useState } from 'react';

import { css, cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Calendar, CalendarDataTids, CalendarDay, CalendarDayProps } from '../Calendar';
import { Popup } from '../../internal/Popup';
import { DateInputProps } from '../DateInput';
import { isBetween, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } from '../../lib/date/comparison';
import { DatePickerProps } from '../DatePicker';
import { MobilePicker } from '../DatePicker/MobilePicker';
import { ZIndex } from '../../internal/ZIndex';

import { styles } from './DateRangePicker.styles';
import { DateRangePickerSeparator } from './DateRangePickerSeparator';
import { DateRangePickerContext, DateRangePickerContextProps } from './DateRangePickerContext';
import { DateRangePickerField } from './DateRangePickerField';
import { getRootNode } from '../../lib/rootNode';
import { getMenuPositions } from '../../lib/getMenuPositions';

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
    | 'renderDay'
    | 'menuPos'
    | 'menuAlign'
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
  From: React.FC<DateInputProps>;
  To: React.FC<DateInputProps>;
  Separator: React.FC;
} = (props) => {
  const { minDate, maxDate } = props;
  const [periodStart, setPeriodStart] = useState<string | null>(null);
  const [periodEnd, setPeriodEnd] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentFocus, setCurrentFocus] = useState<'start' | 'end' | null>(null);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const popupContainerRef = useRef(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const updatePeriod = (value: string) => {
    if ((minDate && isLess(value, minDate)) || (maxDate && isGreater(value, maxDate))) {
      return;
    }

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
      setCurrentFocus(null);
      setHoveredDay(null);
    };

    if (!periodStart && !periodEnd) {
      handleInitialPeriod(value);
    } else if (periodStart && !periodEnd) {
      handleSinglePeriod(value);
    } else {
      handleFullPeriod(value);
    }
  };

  const renderRange = (
    props: CalendarDayProps,
    t: Theme,
    renderDayFn: ((props: CalendarDayProps) => React.ReactElement) | undefined,
  ) => {
    const day = props.date;
    const isHover = hoveredDay !== null;
    const isHoverCurrent = hoveredDay === day;

    const isDayInHoveredPeriod = Boolean(
      isHover &&
      ((currentFocus === 'end' && periodStart && isBetween(day, periodStart, hoveredDay)) ||
        (currentFocus === 'start' && periodStart && isBetween(day, hoveredDay, periodStart))),
    );

    const isDayBeforeFirstDay = periodStart && isLess(day, periodStart);
    const isDayAfterLastDay = periodEnd && isGreater(day, periodEnd);

    const isDayInPeriod = Boolean(periodStart && periodEnd && isBetween(day, periodStart, periodEnd));
    const isFirstDay = periodStart === day;
    const isLastDay = periodEnd === day;
    const isFirstOrLastDay = isFirstDay || isLastDay;

    const hasLeftRoundings = (!isHover && isFirstDay) || (isHoverCurrent && isDayBeforeFirstDay);
    const hasRightRoundings = (!isHover && isLastDay) || (isHoverCurrent && isDayAfterLastDay);

    return (
      <div
        onMouseOver={() => setHoveredDay(day)}
        onMouseOut={() => setHoveredDay(null)}
        className={cx(
          css`
            border-top-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};
            border-bottom-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};

            border-top-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};
            border-bottom-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};

            background: ${isDayInPeriod && t.calendarRangeCellBg};
          `,
          isFirstOrLastDay &&
          css`
              position: relative;

              [data-tid=${CalendarDataTids.dayCell}] {
                color: ${t.calendarRangeCellEndColor};

                &:hover {
                  background: none;
                }
              }

              &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${t.calendarRangeCellEndBg};
                border-radius: ${t.calendarCellBorderRadius};
              }
            `,
          isDayInHoveredPeriod &&
          css`
              background: ${t.calendarRangeCellBg};
            `,
          isDayInPeriod &&
          css`
              &:hover [data-tid=${CalendarDataTids.dayCell}] {
                background: ${t.calendarRangeCellHoverBg};
              }
            `,
        )}
      >
        {renderDayFn ? renderDayFn(props) : <CalendarDay {...props} />}
      </div>
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

    periodStart: periodStart || '',
    periodEnd: periodEnd || '',
    hoveredDay,
    showCalendar,
    currentFocus,

    setPeriodStart,
    setPeriodEnd,
    setHoveredDay,
    setShowCalendar,
    setCurrentFocus,

    fromRef,
    toRef
  };

  return (
    <CommonWrapper {...props}>
      <ResponsiveLayout>
        {({ isMobile }) => (
          <ThemeContext.Consumer>
            {(theme) => {
              return (
                <ThemeContext.Provider
                  value={ThemeFactory.create(
                    {
                      calendarBottomSeparatorBorder: 'none',
                      calendarWrapperHeight: '450px',
                      calendarCellBg: 'transparent',
                    },
                    theme,
                  )}
                >
                  <CommonWrapper {...props}>
                    <div className={styles.root()} data-tid={DateRangePickerDataTids.root}>
                      <DateRangePickerContext.Provider value={dateRangePickerContextProps}>
                        {isMobile ? (
                          <MobilePicker
                            value={props.value}
                            minDate={props.minDate}
                            maxDate={props.maxDate}
                            onValueChange={() => {
                              console.log('todo');
                            }}
                            isHoliday={props.isHoliday}
                          />
                        ) : (
                          <>
                            {props.children ? (
                              props.children
                            ) : (
                              <>
                                <DateRangePickerFrom />
                                <DateRangePickerSeparator />
                                <DateRangePickerTo />
                              </>
                            )}

                            <div ref={popupContainerRef} data-tid={DateRangePickerDataTids.dropdown} />
                            {showCalendar && (
                              <Popup
                                opened
                                hasShadow
                                priority={ZIndex.priorities.PopupMenu}
                                positions={getMenuPositions(props.menuPos, props.menuAlign)}
                                data-tid={DateRangePickerDataTids.root}
                                anchorElement={getRootNode(popupContainerRef.current)}
                                margin={parseInt(theme.datePickerMenuOffsetY)}
                              >
                                <div
                                  className={styles.calendarWrapper(theme)}
                                  onMouseDown={(e) => e.preventDefault()}
                                  ref={calendarContainerRef}
                                >
                                  <Calendar
                                    value={null}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    renderDay={(dayProps) => renderRange(dayProps, theme, props.renderDay)}
                                    onValueChange={(value) => updatePeriod(value)}
                                    data-tid={DateRangePickerDataTids.calendar}
                                  />
                                </div>
                              </Popup>
                            )}
                          </>
                        )}
                      </DateRangePickerContext.Provider>
                    </div>
                  </CommonWrapper>
                </ThemeContext.Provider>
              );
            }}
          </ThemeContext.Consumer>
        )}
      </ResponsiveLayout>
    </CommonWrapper>
  );
};

const DateRangePickerFrom: React.FC<DateInputProps> = (props) => <DateRangePickerField {...props} type="start" />;

const DateRangePickerTo: React.FC<DateInputProps> = (props) => <DateRangePickerField {...props} type="end" />;

DateRangePicker.__KONTUR_REACT_UI__ = 'DateRangePicker';
DateRangePicker.displayName = 'DateRangePicker';

DateRangePicker.From = DateRangePickerFrom;
DateRangePicker.To = DateRangePickerTo;
DateRangePicker.Separator = DateRangePickerSeparator;
