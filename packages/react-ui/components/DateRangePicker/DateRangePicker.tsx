import React, { useImperativeHandle, useRef, useState } from 'react';

import { MobilePopup } from '../../internal/MobilePopup';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { css, cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { Calendar, CalendarDay, CalendarDayProps } from '../Calendar';
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
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { LocaleContext } from '../../lib/locale';

import { getFontSize, styles } from './DateRangePicker.styles';
import { DateRangePickerSeparator } from './DateRangePickerSeparator';
import { DateRangePickerContext, DateRangePickerContextProps } from './DateRangePickerContext';
import {
  DateRangePickerField,
  DateRangePickerFieldType,
  DateRangePickerFieldWithTypeProps,
} from './DateRangePickerField';
import { getDateRangePickerTheme, getMobileDateRangePickerTheme } from './DateRangePickerTheme';
import { DateRangePickerLocaleHelper } from './locale';
import { dateRangePickerValidate } from './dateRangePickerValidate';

export const DateRangePickerDataTids = {
  root: 'DateRangePicker__root',
  start: 'DateRangePicker__start',
  end: 'DateRangePicker__end',
  popup: 'DateRangePicker__popup',
  calendar: 'DateRangePicker__calendar',
  todayButton: 'DateRangePicker__todayButton',
  startOptionalButton: 'DateRangePicker__startOptionalButton',
  endOptionalButton: 'DateRangePicker__endOptionalButton',
  mobileStart: 'DateRangePicker__mobileStart',
  mobileEnd: 'DateRangePicker__mobileEnd',
} as const;

export interface DateRangePickerProps
  extends CommonProps,
    Pick<
      DatePickerProps,
      'size' | 'renderDay' | 'menuPos' | 'menuAlign' | 'useMobileNativeDatePicker' | 'enableTodayLink' | 'onMonthChange'
    > {
  /**
   * Элементы DateRangePicker:
   * `<DateRangePicker.Start />`
   * `<DateRangePicker.Separator />`
   * `<DateRangePicker.End />`
   */
  children: React.ReactNode;
}

export const DateRangePicker = Object.assign(
  {
    Start: (props: DateRangePickerFieldWithTypeProps) => <DateRangePickerField {...props} type="start" />,
    End: (props: DateRangePickerFieldWithTypeProps) => <DateRangePickerField {...props} type="end" />,
    Separator: DateRangePickerSeparator,
    validate: dateRangePickerValidate,
  },
  forwardRefAndName('DateRangePicker', (props: DateRangePickerProps, ref) => {
    const { isMobile } = useResponsiveLayout();
    const locale = useLocaleForControl('DateRangePicker', DateRangePickerLocaleHelper);

    const [startValue, setStartValue] = useState('');
    const [startOptional, setStartOptional] = useState(false);
    const [startDisabled, setStartDisabled] = useState(false);

    const [endValue, setEndValue] = useState('');
    const [endOptional, setEndOptional] = useState(false);
    const [endDisabled, setEndDisabled] = useState(false);

    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    const [hoveredDay, setHoveredDay] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [focusField, setFocusField] = useState<DateRangePickerFieldType | null>(null);

    const startRef = useRef<DateInput>(null);
    const endRef = useRef<DateInput>(null);
    const dateRangePickerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<Calendar>(null);

    const isCurrentFocusFieldDisabled =
      (focusField === 'start' && startDisabled) || (focusField === 'end' && endDisabled);

    const open = (fieldType: DateRangePickerFieldType = 'start') => {
      setFocusField(fieldType);
      setShowCalendar(true);
      scrollToMonth(fieldType);
    };

    const close = () => {
      setShowCalendar(false);
      setHoveredDay(null);
    };

    const focus = (fieldType: DateRangePickerFieldType = 'start') => {
      const fieldRef = fieldType === 'start' ? startRef : endRef;

      // fix DateInput flushSync warning in React 18
      setTimeout(() => {
        fieldRef.current?.focus();
      }, 1);
    };

    const setEmpty = (type: DateRangePickerFieldType) => {
      switch (type) {
        case 'start':
          setStartValue('');
          focus('end');
          break;

        case 'end':
          setEndValue('');
          close();
          break;
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
        getRootNode: () => dateRangePickerRef.current,
      }),
      [],
    );

    const dateRangePickerContextProps: DateRangePickerContextProps = {
      startValue,
      startOptional,
      startDisabled,
      endValue,
      endOptional,
      endDisabled,
      minDate,
      maxDate,
      size: props.size,
      setStartValue,
      setStartOptional,
      setStartDisabled,
      setEndValue,
      setEndOptional,
      setEndDisabled,
      setMinDate,
      setMaxDate,
      setFocusField,
      open,
      close,
      dateRangePickerRef,
      startRef,
      endRef,
    };

    const renderCalendar = (theme: Theme, widthAuto = false) => (
      <LocaleContext.Provider
        value={{
          locale: {
            Calendar: {
              months: locale.months,
              dayCellChooseDateAriaLabel: locale.dayCellChooseDateAriaLabel,
              selectMonthAriaLabel: locale.selectMonthAriaLabel,
              selectYearAriaLabel: locale.selectYearAriaLabel,
              selectChosenAriaLabel: locale.selectChosenAriaLabel,
            },
          },
        }}
      >
        <Calendar
          value={focusField === 'start' ? startValue : endValue}
          minDate={minDate}
          maxDate={maxDate}
          renderDay={(dayProps) => renderRange(dayProps, theme, props.renderDay)}
          onValueChange={(value) => updateRange(value)}
          ref={calendarRef}
          onMonthChange={props.onMonthChange}
          className={cx({ [styles.calendarWidthAuto()]: widthAuto })}
        />
      </LocaleContext.Provider>
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
                width="100%"
                icon={<ArrowAUpIcon16Light />}
                aria-label={locale.todayAriaLabel}
                data-tid={DateRangePickerDataTids.todayButton}
                onClick={() => updateRange(today)}
              >
                {locale.today}
              </Button>
            </div>
          )
        );
      };

      const renderOptionalButtons = () => (
        <>
          {focusField === 'start' && startOptional && (
            <div style={{ margin: 8 }}>
              <Button
                width="100%"
                data-tid={DateRangePickerDataTids.startOptionalButton}
                onClick={() => setEmpty('start')}
              >
                {locale.withoutFirstDate}
              </Button>
            </div>
          )}
          {focusField === 'end' && endOptional && (
            <div style={{ margin: 8 }}>
              <Button width="100%" data-tid={DateRangePickerDataTids.endOptionalButton} onClick={() => setEmpty('end')}>
                {locale.withoutSecondDate}
              </Button>
            </div>
          )}
        </>
      );

      const hasOptionalButtons = startOptional || endOptional;
      return hasOptionalButtons ? renderOptionalButtons() : renderTodayLink();
    };

    const renderNativeDateInput = () => (
      <>
        <NativeDateInput
          value={startValue}
          minDate={minDate}
          maxDate={maxDate}
          onValueChange={setStartValue}
          disabled={startDisabled}
        />
        <DateRangePicker.Separator />
        <NativeDateInput
          value={endValue}
          minDate={minDate}
          maxDate={maxDate}
          onValueChange={setEndValue}
          disabled={endDisabled}
        />
      </>
    );

    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <ThemeContext.Provider value={getDateRangePickerTheme(theme)}>
            <CommonWrapper {...props}>
              <div className={styles.root()} data-tid={DateRangePickerDataTids.root} ref={dateRangePickerRef}>
                <DateRangePickerContext.Provider value={dateRangePickerContextProps}>
                  <div
                    className={cx(
                      styles.inputWrapper(),
                      styles.inputWrapperWidth(theme),
                      css`
                        font-size: ${getFontSize(theme, props.size)};
                      `,
                    )}
                  >
                    {props.children}
                  </div>

                  {props.useMobileNativeDatePicker && isMobile
                    ? renderNativeDateInput()
                    : !isCurrentFocusFieldDisabled &&
                      showCalendar && (
                        <>
                          {isMobile ? (
                            <MobilePopup
                              opened
                              headerChildComponent={
                                <div className={styles.inputWrapper()} style={{ width: '100%' }}>
                                  <DateInput
                                    withIcon
                                    value={startValue}
                                    width="auto"
                                    size="medium"
                                    className={cx({ [styles.inputVisuallyFocus(theme)]: focusField === 'start' })}
                                    disabled={startDisabled}
                                    onValueChange={setStartValue}
                                    data-tid={DateRangePickerDataTids.mobileStart}
                                  />
                                  <DateRangePicker.Separator />
                                  <DateInput
                                    withIcon
                                    value={endValue}
                                    width="auto"
                                    size="medium"
                                    className={cx({ [styles.inputVisuallyFocus(theme)]: focusField === 'end' })}
                                    disabled={endDisabled}
                                    onValueChange={setEndValue}
                                    data-tid={DateRangePickerDataTids.mobileEnd}
                                  />
                                </div>
                              }
                              onCloseRequest={() => close()}
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
                                <div className={styles.calendarWrapper(theme)} onMouseDown={(e) => e.preventDefault()}>
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

    function updateRange(date: string) {
      if ((minDate && isLess(date, minDate)) || (maxDate && isGreater(date, maxDate))) {
        return;
      }

      const handleInitialPeriod = (date: string) => {
        if (focusField === 'start') {
          setStartValue(date);
          focus('end');
        } else {
          setEndValue(date);
          focus('start');
        }
      };

      const handlePartialPeriod = (date: string) => {
        if (focusField === 'start') {
          if (startValue) {
            setStartValue(date);
            focus('end');
            return;
          }

          if (endValue && isGreater(date, endValue)) {
            setStartValue(date);
            setEndValue('');
            focus('end');
            return;
          }

          setStartValue(date);
          close();
        } else if (focusField === 'end') {
          if (endValue) {
            setEndValue(date);
            focus('start');
            return;
          }

          if (startValue && isLess(date, startValue)) {
            setStartValue(date);
            setEndValue('');
            focus('end');
            return;
          }

          setEndValue(date);
          close();
        }
      };

      const handleFullPeriod = (date: string) => {
        if (focusField === 'start') {
          if (endValue && isLessOrEqual(date, endValue)) {
            setStartValue(date);
            close();
          } else {
            setStartValue(date);
            setEndValue('');
            focus('end');
          }
        } else if (focusField === 'end') {
          if (startValue && isGreaterOrEqual(date, startValue)) {
            setEndValue(date);
            close();
          } else {
            setStartValue(date);
            setEndValue('');
            focus('end');
          }
        }
      };

      if (!startValue && !endValue) {
        handleInitialPeriod(date);
      } else if ((startValue && !endValue) || (!startValue && endValue)) {
        handlePartialPeriod(date);
      } else {
        handleFullPeriod(date);
      }
    }

    function renderRange(
      props: CalendarDayProps,
      t: Theme,
      renderDayFn: ((props: CalendarDayProps) => React.ReactElement) | undefined,
    ) {
      const day = props.date;

      const isDayFirst = startValue === day;
      const isDayLast = endValue === day;
      const isDayInPeriod = Boolean(startValue && endValue && isBetween(day, startValue, endValue));

      const hasHoveredDay = hoveredDay !== null;
      const isDayInHoveredPeriod =
        hasHoveredDay &&
        Boolean(
          (focusField === 'start' && endValue && isBetween(day, hoveredDay, endValue)) ||
            (focusField === 'end' && startValue && isBetween(day, startValue, hoveredDay)),
        );

      let hasLeftRoundings;
      let hasRightRoundings;

      if (hasHoveredDay) {
        // TODO: check if start / end not setted
        const isDayBeforeFirstInPeriod = startValue ? isLess(hoveredDay, startValue) : endValue;
        const isDayAfterLastInPeriod = endValue ? isGreater(hoveredDay, endValue) : startValue;

        if (isDayFirst && (isGreaterOrEqual(hoveredDay, startValue) || focusField === 'end')) {
          hasLeftRoundings = true;
        }

        if (isDayLast && (isLessOrEqual(hoveredDay, endValue) || focusField === 'start')) {
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
            styles.rangeCalendarDay(),
            css`
              background: ${isDayInPeriod && t.rangeCalendarCellBg};
              border-top-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};
              border-bottom-left-radius: ${hasLeftRoundings && t.calendarCellBorderRadius};
              border-top-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};
              border-bottom-right-radius: ${hasRightRoundings && t.calendarCellBorderRadius};
            `,
            {
              [styles.rangeCalendarDayEnd(t)]: isDayFirst || isDayLast,
              [styles.rangeCalendarDayHoverInPeriod(t)]: isDayInPeriod,
              [styles.rangeCalendarDayInHoveredPeriod(t)]: isDayInHoveredPeriod,
            },
          )}
        >
          {renderDayFn ? renderDayFn(props) : <CalendarDay {...props} />}
        </div>
      );
    }

    function scrollToMonth(fieldType: DateRangePickerFieldType) {
      const date = fieldType === 'start' ? startValue : endValue;
      if (date) {
        const [, month, year] = date.split('.').map(Number);
        if (month) {
          calendarRef.current?.scrollToMonth(month, year);
        }
      }
    }
  }),
);
