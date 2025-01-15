import React, { useEffect, useRef, useState } from 'react';

import { MobilePopup } from '../../internal/MobilePopup';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { css, cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { Calendar, CalendarDataTids, CalendarDay, CalendarDayProps } from '../Calendar';
import { Popup } from '../../internal/Popup';
import { DateInput } from '../DateInput';
import { isBetween, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } from '../../lib/date/comparison';
import { DatePickerProps } from '../DatePicker';
import { ZIndex } from '../../internal/ZIndex';
import { getRootNode } from '../../lib/rootNode';
import { getMenuPositions } from '../../lib/getMenuPositions';
import { Button } from '../Button';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { InternalDate } from '../../lib/date/InternalDate';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter';
import { ArrowAUpIcon16Light } from '../../internal/icons2022/ArrowAUpIcon/ArrowAUp16Light';
import { NativeDateInput } from '../../internal/NativeDateInput';

import { styles } from './DateRangePicker.styles';
import { DateRangePickerSeparator } from './DateRangePickerSeparator';
import { DateRangePickerContext, DateRangePickerContextProps } from './DateRangePickerContext';
import { DateRangePickerField, DateRangePickerFieldWithTypeProps } from './DateRangePickerField';
import { getDateRangePickerTheme, getMobileDateRangePickerTheme } from './DateRangePickerTheme';
import { DatePickerLocaleHelper } from './locale';
import { dateRangePickerValidate } from './dateRangePickerValidate';

export const DateRangePickerDataTids = {
  root: 'DateRangePicker__root',
  start: 'DateRangePicker__from',
  end: 'DateRangePicker__to',
  popup: 'DateRangePicker__popup',
  calendar: 'DateRangePicker__calendar',
  pickerTodayWrapper: 'DateRangePicker__todayWrapper',
  optionalStartFieldButton: 'DateRangePicker__optionalStartFieldButton',
  optionalEndFieldButton: 'DateRangePicker__optionalEndFieldButton',
} as const;

export type DateRangeFieldType = 'start' | 'end' | null;

export interface DateRangePickerProps
  extends CommonProps,
    Pick<
      DatePickerProps,
      | 'minDate'
      | 'maxDate'
      | 'size'
      | 'renderDay'
      | 'menuPos'
      | 'menuAlign'
      | 'useMobileNativeDatePicker'
      | 'autoFocus'
      | 'enableTodayLink'
      | 'onBlur'
      | 'onFocus'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onMouseOver'
      | 'onMonthChange'
    > {
  /** Даты начала и окончания `[ dd.mm.yyyy, dd.mm.yyyy ]` */
  value: string[];
  /** Открытые периоды начала и окончания */
  optional?: boolean[];
  warning?: boolean[];
  disabled?: boolean[];
  error?: boolean[];
  /**
   * Элементы DateRangePicker:
   * `<DateRangePicker.Start />`
   * `<DateRangePicker.Separator />`
   * `<DateRangePicker.End />`
   */
  children: React.ReactNode;
  onValueChange: (value: string[]) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> & {
  Start: React.FC<DateRangePickerFieldWithTypeProps>;
  End: React.FC<DateRangePickerFieldWithTypeProps>;
  Separator: React.FC;
  validate: typeof dateRangePickerValidate;
} = (props) => {
  const { isMobile } = useResponsiveLayout();
  const locale = useLocaleForControl('DateRangePicker', DatePickerLocaleHelper);

  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<DateRangeFieldType>(null);

  const dateRangePickerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<DateInput>(null);
  const endRef = useRef<DateInput>(null);
  const calendarRef = useRef<Calendar>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const [start, end] = props.value;
  const setValue = props.onValueChange;
  const setStart = (date = '') => props.onValueChange([date, end]);
  const setEnd = (date = '') => props.onValueChange([start, date]);

  useEffect(() => {
    switch (activeField) {
      case 'start':
        // fix DateInput flushSync warning in React 18
        setTimeout(() => {
          startRef.current?.focus();
        });
        return;

      case 'end':
        // fix DateInput flushSync warning in React 18
        setTimeout(() => {
          endRef.current?.focus();
        });
        return;

      case null:
      default:
        setShowCalendar(false);
    }
  }, [startRef, endRef, activeField]);

  const scrollToMonth = (type: DateRangeFieldType) => {
    const date = type === 'start' ? start : end;
    if (date) {
      const [, month, year] = date.split('.').map(Number);
      if (month) {
        calendarRef.current?.scrollToMonth(month, year);
      }
    }
  };

  const open = (type: DateRangeFieldType) => {
    setActiveField(type);
    setShowCalendar(true);
    scrollToMonth(type);
  };

  const close = () => {
    setActiveField(null);
    setShowCalendar(false);
    setHoveredDay(null);
  };

  const setOptionalValue = (type: DateRangeFieldType) => {
    switch (type) {
      case 'start':
        setStart('');
        setActiveField('end');
        break;

      case 'end':
        setEnd('');
        close();
        break;
    }
  };

  const updateRange = (date: string) => {
    if ((props.minDate && isLess(date, props.minDate)) || (props.maxDate && isGreater(date, props.maxDate))) {
      return;
    }

    const handleInitialPeriod = (date: string) => {
      if (activeField === 'start') {
        setStart(date);
        setActiveField('end');
      } else {
        setEnd(date);
        setActiveField('start');
      }
    };

    const handlePartialPeriod = (date: string) => {
      if (activeField === 'start') {
        if (start) {
          setStart(date);
          setActiveField('end');
          return;
        }

        if (end && isGreater(date, end)) {
          setValue([date, '']);
          setActiveField('end');
          return;
        }

        setStart(date);
        close();
      } else if (activeField === 'end') {
        if (end) {
          setEnd(date);
          setActiveField('start');
          return;
        }

        if (start && isLess(date, start)) {
          setValue([date, '']);
          setActiveField('end');
          return;
        }

        setEnd(date);
        close();
      }
    };

    const handleFullPeriod = (date: string) => {
      if (activeField === 'start') {
        if (end && isLessOrEqual(date, end)) {
          setStart(date);
          close();
        } else {
          setValue([date, '']);
          setActiveField('end');
        }
      } else if (activeField === 'end') {
        if (start && isGreaterOrEqual(date, start)) {
          setEnd(date);
          close();
        } else {
          setValue([date, '']);
          setActiveField('end');
        }
      }
    };

    if (!start && !end) {
      handleInitialPeriod(date);
    } else if ((start && !end) || (!start && end)) {
      handlePartialPeriod(date);
    } else {
      handleFullPeriod(date);
    }
  };

  const renderRange = (
    props: CalendarDayProps,
    t: Theme,
    renderDayFn: ((props: CalendarDayProps) => React.ReactElement) | undefined,
  ) => {
    const day = props.date;

    const isDayFirst = start === day;
    const isDayLast = end === day;
    const isDayInPeriod = Boolean(start && end && isBetween(day, start, end));

    const hasHoveredDay = hoveredDay !== null;
    const isDayInHoveredPeriod =
      hasHoveredDay &&
      Boolean(
        (activeField === 'start' && end && isBetween(day, hoveredDay, end)) ||
          (activeField === 'end' && start && isBetween(day, start, hoveredDay)),
      );

    let hasLeftRoundings;
    let hasRightRoundings;

    if (hasHoveredDay) {
      // TODO: check if start / end not setted
      const isDayBeforeFirstInPeriod = start ? isLess(hoveredDay, start) : end;
      const isDayAfterLastInPeriod = end ? isGreater(hoveredDay, end) : start;

      if (isDayFirst && (isGreaterOrEqual(hoveredDay, start) || activeField === 'end')) {
        hasLeftRoundings = true;
      }

      if (isDayLast && (isLessOrEqual(hoveredDay, end) || activeField === 'start')) {
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
            background: ${isDayInPeriod && t.rangeCalendarCellBg};
            border-top-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};
            border-bottom-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};
            border-top-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};
            border-bottom-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};
          `,
          (isDayFirst || isDayLast) &&
            css`
              position: relative;

              [data-tid=${CalendarDataTids.dayCell}] {
                color: ${t.rangeCalendarCellEndColor};

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
                background: ${t.rangeCalendarCellEndBg};
                border-radius: ${t.calendarCellBorderRadius};
              }
            `,
          isDayInHoveredPeriod &&
            css`
              background: ${t.rangeCalendarCellBg};
            `,
          isDayInPeriod &&
            css`
              @media (hover: hover) {
                &:hover [data-tid=${CalendarDataTids.dayCell}] {
                  background: ${t.rangeCalendarCellHoverBg};
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
    start,
    end,
    minDate: props.minDate,
    maxDate: props.maxDate,
    size: props.size,
    disabled: props.disabled,
    autoFocus: props.autoFocus,
    warning: props.warning,
    error: props.error,
    onValueChange: props.onValueChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    setStart,
    setEnd,
    open,
    close,
    dateRangePickerRef,
    startRef,
    endRef,
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

  const renderCalendar = (theme: Theme, widthAuto = false) => (
    <Calendar
      value={null}
      minDate={props.minDate}
      maxDate={props.maxDate}
      renderDay={(dayProps) => renderRange(dayProps, theme, props.renderDay)}
      onValueChange={updateRange}
      ref={calendarRef}
      data-tid={DateRangePickerDataTids.calendar}
      onMonthChange={props.onMonthChange}
      className={cx({
        [css`
          width: auto;
        `]: widthAuto,
      })}
    />
  );

  const renderButtons = () => {
    const renderTodayLink = () => {
      const today = new InternalDate(locale)
        .setComponents(InternalDateGetter.getTodayComponents())
        .toString({ withPad: true, withSeparator: true });

      return (
        props.enableTodayLink && (
          <div style={{ margin: 8 }}>
            <Button
              aria-label={locale.todayAriaLabel}
              data-tid={DateRangePickerDataTids.pickerTodayWrapper}
              width="100%"
              onClick={() => updateRange(today)}
              icon={<ArrowAUpIcon16Light />}
            >
              {locale.today}
            </Button>
          </div>
        )
      );
    };

    const renderOptionalButtons = () => (
      <>
        {activeField === 'start' && props.optional?.[0] && (
          <div style={{ margin: 8 }}>
            <Button
              width="100%"
              data-tid={DateRangePickerDataTids.optionalStartFieldButton}
              onClick={() => setOptionalValue('start')}
            >
              {locale.withoutFirstDate}
            </Button>
          </div>
        )}
        {activeField === 'end' && props.optional?.[1] && (
          <div style={{ margin: 8 }}>
            <Button
              width="100%"
              data-tid={DateRangePickerDataTids.optionalEndFieldButton}
              onClick={() => setOptionalValue('end')}
            >
              {locale.withoutSecondDate}
            </Button>
          </div>
        )}
      </>
    );

    const hasOptionalButtons = props.optional?.find(Boolean);
    return hasOptionalButtons ? renderOptionalButtons() : renderTodayLink();
  };

  const renderNativeDateInput = () => (
    <>
      <NativeDateInput
        value={start}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onValueChange={(date) => props.onValueChange([date, end || ''])}
        disabled={props.disabled?.[0]}
      />
      <DateRangePicker.Separator />
      <NativeDateInput
        value={end}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onValueChange={(date) => props.onValueChange([start || '', date])}
        disabled={props.disabled?.[1]}
      />
    </>
  );

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <ThemeContext.Provider value={getDateRangePickerTheme(theme)}>
          <CommonWrapper {...props}>
            <div
              className={styles.root()}
              data-tid={DateRangePickerDataTids.root}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onMouseOver={props.onMouseOver}
              ref={dateRangePickerRef}
            >
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
                  {props.children}
                </div>

                {props.useMobileNativeDatePicker && isMobile
                  ? renderNativeDateInput()
                  : showCalendar && (
                      <>
                        {isMobile ? (
                          <MobilePopup
                            opened
                            headerChildComponent={
                              <div className={styles.inputWrapper()} style={{ width: '100%' }}>
                                <DateRangePicker.Start
                                  width="auto"
                                  size="medium"
                                  className={cx({ [styles.inputVisuallyFocus(theme)]: activeField === 'start' })}
                                />
                                <DateRangePicker.Separator />
                                <DateRangePicker.End
                                  width="auto"
                                  size="medium"
                                  className={cx({ [styles.inputVisuallyFocus(theme)]: activeField === 'end' })}
                                />
                              </div>
                            }
                            onCloseRequest={() => {
                              close();
                              props.onBlur?.();
                            }}
                            footerChildComponent={renderButtons()}
                          >
                            <ThemeContext.Provider value={getMobileDateRangePickerTheme(theme)}>
                              {renderCalendar(theme, true)}
                            </ThemeContext.Provider>
                          </MobilePopup>
                        ) : (
                          <>
                            <div data-tid={DateRangePickerDataTids.popup} />
                            <Popup
                              opened
                              hasShadow
                              priority={ZIndex.priorities.PopupMenu}
                              positions={getMenuPositions(props.menuPos, props.menuAlign)}
                              data-tid={DateRangePickerDataTids.root}
                              anchorElement={getRootNode(dateRangePickerRef.current)}
                              margin={parseInt(theme.datePickerMenuOffsetY)}
                            >
                              <div
                                className={styles.calendarWrapper(theme)}
                                onMouseDown={(e) => e.preventDefault()}
                                ref={calendarContainerRef}
                              >
                                {renderCalendar(theme)}
                                {renderButtons()}
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
      )}
    </ThemeContext.Consumer>
  );
};

DateRangePicker.__KONTUR_REACT_UI__ = 'DateRangePicker';
DateRangePicker.displayName = 'DateRangePicker';

DateRangePicker.Start = (props: DateRangePickerFieldWithTypeProps) => <DateRangePickerField {...props} type="start" />;
DateRangePicker.End = (props: DateRangePickerFieldWithTypeProps) => <DateRangePickerField {...props} type="end" />;
DateRangePicker.Separator = DateRangePickerSeparator;
DateRangePicker.validate = dateRangePickerValidate;
