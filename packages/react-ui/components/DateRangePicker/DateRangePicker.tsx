import React, { useEffect, useRef, useState } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { css, cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { Calendar, CalendarDataTids, CalendarDay, CalendarDayProps } from '../Calendar';
import { Popup } from '../../internal/Popup';
import { DateInputProps } from '../DateInput';
import { isBetween, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } from '../../lib/date/comparison';
import { DatePickerProps } from '../DatePicker';
import { ZIndex } from '../../internal/ZIndex';
import { getRootNode } from '../../lib/rootNode';
import { getMenuPositions } from '../../lib/getMenuPositions';
import { Button } from '../Button';
import { useResponsiveLayout } from '../ResponsiveLayout';

import { styles } from './DateRangePicker.styles';
import { DateRangePickerSeparator } from './DateRangePickerSeparator';
import { DateRangePickerContext, DateRangePickerContextProps } from './DateRangePickerContext';
import { DateRangePickerField } from './DateRangePickerField';
import { MobileDateRangePicker } from './MobileDateRangePicker';
import { getDateRangePickerTheme } from './DateRangePickerTheme';
import { DatePickerLocaleHelper } from './locale';

export const DateRangePickerDataTids = {
  root: 'DateRangePicker__root',
  from: 'DateRangePicker__from',
  to: 'DateRangePicker__to',
  popup: 'DateRangePicker__popup',
  calendar: 'DateRangePicker__calendar',
  optionalFromFieldButton: 'DateRangePicker__optionalFromFieldButton',
  optionalToFieldButton: 'DateRangePicker__optionalToFieldButton',
} as const;

export type CurrentFocusType = 'start' | 'end' | null;

export interface DateRangePickerProps
  extends Pick<
    DatePickerProps,
    | 'value'
    | 'minDate'
    | 'maxDate'
    | 'size'
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
    | 'onMonthChange'
  > {
  from?: string;
  to?: string;
  onValueChange?: (from: string | null, to: string | null) => void;
  onFromValueChange?: (value: string) => void;
  onToValueChange?: (value: string) => void;
  enableTodayLink?: boolean;
  children?: React.ReactNode;
}

export const DateRangePicker: React.FC<DateRangePickerProps> & {
  From: React.FC<DateInputProps>;
  To: React.FC<DateInputProps>;
  Separator: React.FC;
} = (props) => {
  const { isMobile } = useResponsiveLayout();
  const locale = useLocaleForControl('DateRangePicker', DatePickerLocaleHelper);
  const { minDate, maxDate } = props;
  const [periodStart, setPeriodStart] = useState<string | undefined | null>(props.to);
  const [periodEnd, setPeriodEnd] = useState<string | undefined | null>(props.from);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentFocus, setCurrentFocus] = useState<CurrentFocusType>(null);

  const fromRef = useRef<any>(null);
  const toRef = useRef<any>(null);
  const calendarRef = useRef<any>(null);
  const popupContainerRef = useRef(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (currentFocus) {
      case 'start':
        // fix DateInput flushSync warning in React 18
        setTimeout(() => {
          fromRef?.current?.focus();
        });
        return;

      case 'end':
        // fix DateInput flushSync warning in React 18
        setTimeout(() => {
          toRef?.current?.focus();
        });
        return;

      case null:
      default:
        setShowCalendar?.(false);
    }
  }, [currentFocus]);

  const close = () => {
    setShowCalendar(false);
    setCurrentFocus(null);
    setHoveredDay(null);
  };

  const setOptionalValue = (type: CurrentFocusType) => {
    if (type === 'start') {
      setPeriodStart(null);
      setCurrentFocus('end');
    } else if (type === 'end') {
      setPeriodEnd(null);
      close();
    }
  };

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

    const handlePartialPeriod = (value: string) => {
      if (currentFocus === 'start') {
        if (periodStart) {
          setPeriodStart(value);
          setCurrentFocus('end');
          return;
        }

        if (periodEnd && isGreater(value, periodEnd)) {
          setPeriodStart(value);
          setPeriodEnd(null);
          setCurrentFocus('end');
          return;
        }

        setPeriodStart(value);
        close();
      } else if (currentFocus === 'end') {
        if (periodEnd) {
          setPeriodEnd(value);
          setCurrentFocus('start');
          return;
        }

        if (periodStart && isLess(value, periodStart)) {
          setPeriodStart(value);
          setPeriodEnd(null);
          setCurrentFocus('end');
          return;
        }

        setPeriodEnd(value);
        close();
      }
    };

    const handleFullPeriod = (value: string) => {
      if (currentFocus === 'start') {
        if (periodEnd && isLessOrEqual(value, periodEnd)) {
          setPeriodStart(value);
          close();
        } else {
          setPeriodStart(value);
          setPeriodEnd(null);
          setCurrentFocus('end');
        }
      } else if (currentFocus === 'end') {
        if (periodStart && isGreaterOrEqual(value, periodStart)) {
          setPeriodEnd(value);
          close();
        } else {
          setPeriodStart(value);
          setPeriodEnd(null);
          setCurrentFocus('end');
        }
      }
    };

    if (!periodStart && !periodEnd) {
      handleInitialPeriod(value);
    } else if ((periodStart && !periodEnd) || (!periodStart && periodEnd)) {
      handlePartialPeriod(value);
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

    const isDayFirst = periodStart === day;
    const isDayLast = periodEnd === day;
    const isDayInPeriod = Boolean(periodStart && periodEnd && isBetween(day, periodStart, periodEnd));

    const hasHoveredDay = hoveredDay !== null;
    const isDayInHoveredPeriod =
      hasHoveredDay &&
      Boolean(
        (currentFocus === 'start' && periodEnd && isBetween(day, hoveredDay, periodEnd)) ||
          (currentFocus === 'end' && periodStart && isBetween(day, periodStart, hoveredDay)),
      );

    let hasLeftRoundings;
    let hasRightRoundings;

    if (hasHoveredDay) {
      // TODO: check if periodStart / periodEnd not setted
      const isDayBeforeFirstInPeriod = periodStart ? isLess(hoveredDay, periodStart) : periodEnd;
      const isDayAfterLastInPeriod = periodEnd ? isGreater(hoveredDay, periodEnd) : periodStart;

      if (isDayFirst && (isGreaterOrEqual(hoveredDay, periodStart) || currentFocus === 'end')) {
        hasLeftRoundings = true;
      }

      if (isDayLast && (isLessOrEqual(hoveredDay, periodEnd) || currentFocus === 'start')) {
        hasRightRoundings = true;
      }

      const isDayHovered = hoveredDay === day;
      if (isDayHovered) {
        if (isDayBeforeFirstInPeriod) {
          hasLeftRoundings = true;
        }

        if (isDayAfterLastInPeriod) {
          hasRightRoundings = true;
        }
      }
    } else {
      if (isDayFirst) {
        hasLeftRoundings = true;
      }

      if (isDayLast) {
        hasRightRoundings = true;
      }
    }

    return (
      <div
        onMouseOver={() => setHoveredDay(day)}
        onMouseOut={() => setHoveredDay(null)}
        className={cx(
          css`
            width: 100%;
            height: 100%;
            background: ${isDayInPeriod && t.calendarRangeCellBg};
            border-top-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};
            border-bottom-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};
            border-top-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};
            border-bottom-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};
          `,
          (isDayFirst || isDayLast) &&
            css`
              position: relative;

              [data-tid=${CalendarDataTids.dayCell}] {
                color: ${t.calendarRangeCellEndColor};

                @media (hover: hover) {
                  &:hover {
                    background: none;
                  }
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
              @media (hover: hover) {
                &:hover [data-tid=${CalendarDataTids.dayCell}] {
                  background: ${t.calendarRangeCellHoverBg};
                }
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

    isMobile,

    fromRef,
    toRef,
    calendarRef,
  };

  const getSize = (t: Theme) => {
    switch (props.size) {
      case 'large':
        return t.fontSizeLarge;
      case 'medium':
        return t.fontSizeMedium;
      case 'small':
      default:
        return t.fontSizeSmall;
    }
  };

  return (
    <CommonWrapper {...props}>
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <ThemeContext.Provider value={getDateRangePickerTheme(theme)}>
              <CommonWrapper {...props}>
                <div className={styles.root()} data-tid={DateRangePickerDataTids.root} ref={popupContainerRef}>
                  <DateRangePickerContext.Provider value={dateRangePickerContextProps}>
                    <div
                      className={cx(
                        styles.inputWrapper(),
                        styles.inputWrapperWidth(theme),
                        css`
                          font-size: ${getSize(theme)};
                        `,
                      )}
                    >
                      {props.children ? (
                        props.children
                      ) : (
                        <>
                          <DateRangePickerFrom width="auto" />
                          <DateRangePickerSeparator />
                          <DateRangePickerTo width="auto" />
                        </>
                      )}
                    </div>

                    {showCalendar && (
                      <>
                        {isMobile ? (
                          <>
                            <MobileDateRangePicker
                              // enableTodayLink={props.enableTodayLink}
                              onMonthChange={props.onMonthChange}
                              minDate={minDate}
                              maxDate={maxDate}
                              onCalendarPickDay={updatePeriod}
                              onCloseRequest={close}
                              renderDay={(dayProps) => renderRange(dayProps, theme, props.renderDay)}
                              data-tid={DateRangePickerDataTids.calendar}
                            />
                          </>
                        ) : (
                          <>
                            <div data-tid={DateRangePickerDataTids.popup} />
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
                                  onValueChange={updatePeriod}
                                  ref={calendarRef}
                                  data-tid={DateRangePickerDataTids.calendar}
                                />
                                <div style={{ margin: 8 }}>
                                  {currentFocus === 'start' && fromRef.current.props.optional && (
                                    <Button
                                      width="100%"
                                      data-tid={DateRangePickerDataTids.optionalFromFieldButton}
                                      onClick={() => setOptionalValue('start')}
                                    >
                                      {locale.withoutFirstDate}
                                    </Button>
                                  )}
                                  {currentFocus === 'end' && toRef.current.props.optional && (
                                    <Button
                                      width="100%"
                                      data-tid={DateRangePickerDataTids.optionalToFieldButton}
                                      onClick={() => setOptionalValue('end')}
                                    >
                                      {locale.withoutSecondDate}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </Popup>
                          </>
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
    </CommonWrapper>
  );
};

export const DateRangePickerFrom = (props: DateInputProps) => <DateRangePickerField {...props} type="start" />;

export const DateRangePickerTo = (props: DateInputProps) => <DateRangePickerField {...props} type="end" />;

DateRangePicker.__KONTUR_REACT_UI__ = 'DateRangePicker';
DateRangePicker.displayName = 'DateRangePicker';

DateRangePicker.From = DateRangePickerFrom;
DateRangePicker.To = DateRangePickerTo;
DateRangePicker.Separator = DateRangePickerSeparator;
