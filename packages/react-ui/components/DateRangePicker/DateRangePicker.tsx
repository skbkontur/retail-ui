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

export type CurrentFocusType = 'start' | 'end' | null;

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
  optional?: [boolean, boolean];
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
  const [currentFocus, setCurrentFocus] = useState<CurrentFocusType>(null);

  const startRef = useRef<DateInput>(null);
  const endRef = useRef<DateInput>(null);
  const calendarRef = useRef<Calendar>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const [start, end] = props.value;
  const setValue = props.onValueChange;
  const setStart = (value = '') => props.onValueChange([value, end]);
  const setEnd = (value = '') => props.onValueChange([start, value]);
  
  useEffect(() => {
    switch (currentFocus) {
      case 'start':
        // fix DateInput flushSync warning in React 18
        setTimeout(() => {
          startRef.current?.focus();
          props.onFocus?.();
        });
        return;

      case 'end':
        // fix DateInput flushSync warning in React 18
        setTimeout(() => {
          endRef.current?.focus();
          props.onFocus?.();
        });
        return;

      case null:
      default:
        setShowCalendar(false);
    }
  }, [startRef, endRef, currentFocus]);

  const close = () => {
    setShowCalendar(false);
    setCurrentFocus(null);
    setHoveredDay(null);
  };

  const setOptionalValue = (type: CurrentFocusType) => {
    if (type === 'start') {
      setStart('');
      setCurrentFocus('end');
    } else if (type === 'end') {
      setEnd('');
      close();
    }
  };

  const updatePeriod = (value: string) => {
    if ((props.minDate && isLess(value, props.minDate)) || (props.maxDate && isGreater(value, props.maxDate))) {
      return;
    }

    const handleInitialPeriod = (value: string) => {
      if (currentFocus === 'start') {
        setStart(value);
        setCurrentFocus('end');
      } else {
        setEnd(value);
        setCurrentFocus('start');
      }
    };

    const handlePartialPeriod = (value: string) => {
      if (currentFocus === 'start') {
        if (start) {
          setStart(value);
          setCurrentFocus('end');
          return;
        }

        if (end && isGreater(value, end)) {
          setValue([value, '']);
          setCurrentFocus('end');
          return;
        }

        setStart(value);
        close();
      } else if (currentFocus === 'end') {
        if (end) {
          setEnd(value);
          setCurrentFocus('start');
          return;
        }

        if (start && isLess(value, start)) {
          setValue([value, '']);
          setCurrentFocus('end');
          return;
        }

        setEnd(value);
        close();
      }
    };

    const handleFullPeriod = (value: string) => {
      if (currentFocus === 'start') {
        if (end && isLessOrEqual(value, end)) {
          setStart(value);
          close();
        } else {
          setValue([value, '']);
          setCurrentFocus('end');
        }
      } else if (currentFocus === 'end') {
        if (start && isGreaterOrEqual(value, start)) {
          setEnd(value);
          close();
        } else {
          setValue([value, '']);
          setCurrentFocus('end');
        }
      }
    };

    if (!start && !end) {
      handleInitialPeriod(value);
    } else if ((start && !end) || (!start && end)) {
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

    const isDayFirst = start === day;
    const isDayLast = end === day;
    const isDayInPeriod = Boolean(start && end && isBetween(day, start, end));

    const hasHoveredDay = hoveredDay !== null;
    const isDayInHoveredPeriod =
      hasHoveredDay &&
      Boolean(
        (currentFocus === 'start' && end && isBetween(day, hoveredDay, end)) ||
        (currentFocus === 'end' && start && isBetween(day, start, hoveredDay)),
      );

    let hasLeftRoundings;
    let hasRightRoundings;

    if (hasHoveredDay) {
      // TODO: check if start / end not setted
      const isDayBeforeFirstInPeriod = start ? isLess(hoveredDay, start) : end;
      const isDayAfterLastInPeriod = end ? isGreater(hoveredDay, end) : start;

      if (isDayFirst && (isGreaterOrEqual(hoveredDay, start) || currentFocus === 'end')) {
        hasLeftRoundings = true;
      }

      if (isDayLast && (isLessOrEqual(hoveredDay, end) || currentFocus === 'start')) {
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
    start,
    end,
    minDate: props.minDate,
    maxDate: props.maxDate,
    size: props.size,
    autoFocus: props.autoFocus,
    onValueChange: props.onValueChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    hoveredDay,
    showCalendar,
    currentFocus,
    setStart,
    setEnd,
    setShowCalendar,
    setCurrentFocus,
    startRef,
    endRef,
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

  const renderCalendar = (theme: Theme, widthAuto = false) => (
    <Calendar
      value={null}
      minDate={props.minDate}
      maxDate={props.maxDate}
      renderDay={(dayProps) => renderRange(dayProps, theme, props.renderDay)}
      onValueChange={updatePeriod}
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
              onClick={() => updatePeriod(today)}
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
        {currentFocus === 'start' && props.optional?.[0] && (
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
        {currentFocus === 'end' && props.optional?.[1] && (
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
        onValueChange={(value) => props.onValueChange([value, end || ''])}
        disabled={startRef.current?.props.disabled}
      />
      <DateRangePicker.Separator />
      <NativeDateInput
        value={end}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onValueChange={(value) => props.onValueChange([start || '', value])}
        disabled={endRef.current?.props.disabled}
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
              ref={popupContainerRef}
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
                              <DateRangePicker.Start width="auto" size="medium" />
                              <DateRangePicker.Separator />
                              <DateRangePicker.End width="auto" size="medium"  />
                            </div>
                          }
                          onCloseRequest={close}
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
                            anchorElement={getRootNode(popupContainerRef.current)}
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
