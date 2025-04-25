import React from 'react';
import normalizeWheel from 'normalize-wheel';
import throttle from 'lodash.throttle';
import shallowEqual from 'shallowequal';
import type { SafeTimer } from '@skbkontur/global-object';
import { globalObject } from '@skbkontur/global-object';

import { isInstanceOf } from '../../lib/isInstanceOf';
import { InternalDate } from '../../lib/date/InternalDate';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { cx } from '../../lib/theming/Emotion';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { MAX_DATE, MAX_MONTH, MAX_YEAR, MIN_DATE, MIN_MONTH, MIN_YEAR } from '../../lib/date/constants';
import type { Nullable, Range } from '../../typings/utility-types';
import type { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { animation } from '../../lib/animation';
import { isMobile } from '../../lib/client';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';

import { themeConfig } from './config';
import { MonthViewModel } from './MonthViewModel';
import * as CalendarScrollEvents from './CalendarScrollEvents';
import { Month } from './Month';
import { styles } from './Calendar.styles';
import type { CalendarDateShape } from './CalendarDateShape';
import { create, isGreater, isLess } from './CalendarDateShape';
import * as CalendarUtils from './CalendarUtils';
import type { CalendarContextProps } from './CalendarContext';
import { CalendarContext } from './CalendarContext';
import type { CalendarDayProps } from './CalendarDay';
import { CalendarDay } from './CalendarDay';

export interface CalendarProps extends CommonProps {
  /** Задает функцию, которая вызывается при изменении value.
   * @param {string} date - строка в формате `dd.mm.yyyy`. */
  onValueChange?: (date: string) => void;

  /** Задает текущую дату в формате `dd.mm.yyyy`. */
  value: Nullable<string>;

  /** Задает максимальную возможную дату в формате `dd.mm.yyyy`. */
  maxDate?: string;

  /** Задает минимальную возможную дату в формате `dd.mm.yyyy`. */
  minDate?: string;

  /** Задает начальную дату периода в формате `dd.mm.yyyy`. */
  periodStartDate?: string;

  /** Задает конечную дату периода в формате `dd.mm.yyyy`. */
  periodEndDate?: string;

  /** Задает функцию для определения праздничных дней.
   * @default (_day, isWeekend) => isWeekend.
   * @param {string} day - строка в формате `dd.mm.yyyy`.
   * @param {boolean} isWeekend - флаг выходного (суббота или воскресенье).
   * @returns {boolean} `true` для выходного или `false` для рабочего дня. */
  isHoliday?: (day: string, isWeekend: boolean) => boolean;

  /** Задает начальный месяц. */
  initialMonth?: Range<1, 13>;

  /** Задает начальный год. */
  initialYear?: number;

  /** Задает метод отрисовки дат в календаре.
   * @default (props: CalendarDayProps) => <CalendarDay {...props} />
   * @param {CalendarDayProps} props - параметры дня.
   * @returns {ReactElement} элемент, который отрисовывает контент числа месяца. */
  renderDay?: (props: CalendarDayProps) => React.ReactElement;

  /** Задает функцию, которая вызывается при каждом изменении месяца.
   * @param {CalendarMonthChangeInfo} changeInfo - информация о изменении отображаемого месяца, где
   * `month: number` - номер текущего отображаемого месяца от 1 до 12,
   * `year: number` - отображаемый год. */
  onMonthChange?: (changeInfo: CalendarMonthChangeInfo) => void;
}

export interface CalendarState {
  scrollPosition: number;
  months: MonthViewModel[];
  scrollDirection: number;
  scrollTarget: number;
}

export interface CalendarMonthChangeInfo {
  month: number;
  year: number;
}

export const CalendarDataTids = {
  root: 'Calendar__root',
  month: 'MonthView__month',
  dayCell: 'DayCellView__root',
  headerMonth: 'MonthView__headerMonth',
  headerYear: 'MonthView__headerYear',
} as const;

type DefaultProps = Required<Pick<CalendarProps, 'minDate' | 'maxDate' | 'isHoliday'>>;

/**
 * Компонент календаря `Calendar` из DatePicker'а помогает выбирать дату с помощью мыши.
 */
@rootNode
export class Calendar extends React.Component<CalendarProps, CalendarState> {
  public static __KONTUR_REACT_UI__ = 'Calendar';
  public static displayName = 'Calendar';

  public static Day = CalendarDay;

  private static formatDate(date: number, month: number, year: number) {
    return new InternalDate().setComponents({ date, month, year }).toString({ withPad: true });
  }

  public static defaultProps: DefaultProps = {
    minDate: Calendar.formatDate(MIN_DATE, MIN_MONTH, MIN_YEAR),
    maxDate: Calendar.formatDate(MAX_DATE, MAX_MONTH, MAX_YEAR),
    isHoliday: (_day: string, isWeekend: boolean) => isWeekend,
  };

  private getProps = createPropsGetter(Calendar.defaultProps);

  private theme!: Theme;
  private wheelEndTimeout: SafeTimer;
  private root: Nullable<HTMLElement>;
  private animation = animation();
  private touchStartY: Nullable<number> = null;
  private setRootNode!: TSetRootNode;

  constructor(props: CalendarProps) {
    super(props);

    const { minDate, maxDate, value } = this.getProps();

    const minDateShape = this.getDateInNativeFormat(minDate);
    const maxDateShape = this.getDateInNativeFormat(maxDate);
    const dateShape = this.getDateInNativeFormat(value);

    const today = CalendarUtils.getTodayDate();
    const initialDate = CalendarUtils.getInitialDate({
      today,
      date: dateShape,
      minDate: minDateShape,
      maxDate: maxDateShape,
    });

    const initialMonth = this.props.initialMonth
      ? CalendarUtils.getMonthInNativeFormat(this.props.initialMonth)
      : initialDate.month;
    const initialYear = this.props.initialYear ?? initialDate.year;

    this.state = {
      scrollPosition: 0,
      months: CalendarUtils.getMonths(initialMonth, initialYear),
      scrollDirection: 1,
      scrollTarget: 0,
    };
  }

  public componentDidUpdate(prevProps: Readonly<CalendarProps>, prevState: Readonly<CalendarState>): void {
    const { value, onMonthChange } = this.props;
    if (value && !shallowEqual(value, prevProps.value)) {
      const date = new InternalDate().parseValue(value).getComponentsLikeNumber();
      this.scrollToMonth(date.month, date.year);
    }

    if (onMonthChange) {
      const visibleMonthsModels = this.getVisibleMonths(this.state).map(this.getViewModel);
      const prevFirstVisibleMonthModels = this.getVisibleMonths(prevState).map(this.getViewModel);

      if (visibleMonthsModels.length > 0 && prevFirstVisibleMonthModels.length > 0) {
        const currentMonth = visibleMonthsModels[0].month;
        const prevCurrentMonth = prevFirstVisibleMonthModels[0].month;

        if (currentMonth !== prevCurrentMonth) {
          this.handleMonthChange(visibleMonthsModels);
        }
      }
    }
  }

  public componentWillUnmount() {
    if (this.animation.inProgress()) {
      this.animation.cancel();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * Прокручивает календарь до переданной даты
   * @public
   */
  public scrollToMonth = async (month: number, year: number) => {
    const monthNative = CalendarUtils.getMonthInNativeFormat(month);

    if (this.animation.inProgress()) {
      this.animation.finish();
      // FIXME: Dirty hack to await batched updates
      await new Promise((r) => globalObject.setTimeout(r, 0));
    }

    const minDate = this.getDateInNativeFormat(this.getProps().minDate);
    const maxDate = this.getDateInNativeFormat(this.getProps().maxDate);

    if (minDate && isGreater(minDate, create(32, monthNative, year))) {
      const minMonth = CalendarUtils.getMonthInHumanFormat(minDate.month);
      this.scrollToMonth(minMonth, minDate.year);
      return;
    }

    if (maxDate && isLess(maxDate, create(0, monthNative, year))) {
      const maxMonth = CalendarUtils.getMonthInHumanFormat(maxDate.month);
      this.scrollToMonth(maxMonth, maxDate.year);
      return;
    }

    const currentMonth = this.state.months[1];
    const diffInMonths = currentMonth.month + currentMonth.year * 12 - monthNative - year * 12;

    if (diffInMonths === 0) {
      this.scrollTo(0);
      return;
    }

    const maxMonthsToAdd = themeConfig(this.theme).MAX_MONTHS_TO_APPEND_ON_SCROLL;

    const onEnd = () => {
      this.setState({
        months: CalendarUtils.getMonths(monthNative, year),
        scrollPosition: 0,
      });
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
      const monthsToPrepend = Array.from({ length: monthsToPrependCount }, (_, index) => {
        return MonthViewModel.create(monthNative + index, year);
      });
      this.setState(
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
            months: monthsToPrepend.concat(state.months),
            scrollPosition: -CalendarUtils.getMonthsHeight(monthsToPrepend, this.theme),
          };
        },
        () => {
          const targetPosition = this.state.months[0].getHeight(this.theme);
          this.scrollTo(targetPosition, onEnd);
        },
      );
    }

    // If scrolling downwards, append maximum maxMonthsToAdd months
    // and scroll to the last but one month
    if (diffInMonths < 0) {
      const monthsToAppendCount = Math.min(Math.abs(diffInMonths), maxMonthsToAdd);
      const monthsToAppend = Array.from({ length: monthsToAppendCount }, (_, index) => {
        return MonthViewModel.create(monthNative + index - monthsToAppendCount + 2, year);
      });
      this.setState(
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
          return { months: state.months.concat(monthsToAppend) };
        },
        () => {
          const targetPosition = -1 * CalendarUtils.getMonthsHeight(this.state.months.slice(1, -2), this.theme);
          this.scrollTo(targetPosition, onEnd);
        },
      );
    }
  };

  private handleMonthChange = (visibleMonths: MonthViewModel[]): void => {
    const currentMonth = visibleMonths[0];
    const changeInfo = {
      month: CalendarUtils.getMonthInHumanFormat(currentMonth.month),
      year: currentMonth.year,
    };

    this.props.onMonthChange?.(changeInfo);
  };

  private getViewModel = (item: [number, MonthViewModel]): MonthViewModel => item[1];

  private renderMain = () => {
    const monthsForRender = this.getVisibleMonths(this.state);
    const wrapperStyle = { height: themeConfig(this.theme).WRAPPER_HEIGHT };

    const props = this.getProps();

    const context: CalendarContextProps = {
      value: this.getDateInNativeFormat(props.value),
      minDate: this.getDateInNativeFormat(props.minDate),
      maxDate: this.getDateInNativeFormat(props.maxDate),
      isHoliday: props.isHoliday,
      renderDay: props.renderDay,
      today: CalendarUtils.getTodayDate(),
      onDateClick: this.handleDateClick,
    };

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...props}>
        <div ref={this.refRoot} data-tid={CalendarDataTids.root} className={cx(styles.root(this.theme))}>
          <div style={wrapperStyle} className={styles.wrapper()}>
            <CalendarContext.Provider value={context}>
              {monthsForRender.map(this.renderMonth, this)}
            </CalendarContext.Provider>
          </div>
          <div className={styles.separator(this.theme)} />
        </div>
      </CommonWrapper>
    );
  };

  private refRoot = (element: HTMLElement | null) => {
    if (!this.root && element) {
      if (isMobile) {
        element.addEventListener('touchstart', this.handleTouchStart);
        element.addEventListener('touchmove', this.throttledHandleTouchMove);
      } else {
        element.addEventListener('wheel', this.handleWheel, { passive: false });
      }
    }
    if (this.root && !element) {
      if (isMobile) {
        this.root.removeEventListener('touchstart', this.handleTouchStart);
        this.root.removeEventListener('touchmove', this.throttledHandleTouchMove);
      } else {
        this.root.removeEventListener('wheel', this.handleWheel);
      }
    }
    this.root = element;
  };

  private renderMonth([top, month]: [number, MonthViewModel]) {
    return (
      <Month
        key={month.month + '-' + month.year}
        top={top}
        month={month}
        onMonthYearChange={this.handleMonthYearChange}
      />
    );
  }

  private handleDateClick = (dateShape: CalendarDateShape) => {
    const value = InternalDateTransformer.dateToHumanString(dateShape);

    this.props.onValueChange?.(value);
  };

  private getDateInNativeFormat(date: Nullable<string>) {
    return new InternalDate().parseValue(date).toNativeFormat();
  }

  private getMonthPositions(months: MonthViewModel[], scrollPosition: number) {
    const positions = [scrollPosition - months[0].getHeight(this.theme)];
    for (let i = 1; i < months.length; i++) {
      const position = positions[i - 1] + months[i - 1].getHeight(this.theme);
      positions.push(position);
    }
    return positions;
  }

  private getVisibleMonths(state: Readonly<CalendarState>): Array<[number, MonthViewModel]> {
    const { months, scrollPosition } = state;
    const positions = this.getMonthPositions(months, scrollPosition);

    return months
      .map<[number, MonthViewModel]>((x, i) => [positions[i], x])
      .filter(([top, month]) => CalendarUtils.isMonthVisible(top, month, this.theme));
  }

  private handleMonthYearChange = (monthNative: number, year: number) => {
    const month = CalendarUtils.getMonthInHumanFormat(monthNative);
    this.scrollToMonth(month, year);
  };

  private executeAnimations = (pixelY: number) => {
    this.setState(({ months, scrollPosition }) => {
      const targetPosition = CalendarUtils.calculateScrollPosition(
        months,
        scrollPosition,
        pixelY,
        this.theme,
      ).scrollPosition;
      return { scrollTarget: targetPosition };
    }, this.handleWheelEnd);

    this.animation.animate(pixelY, (deltaY) => {
      // FIXME: Typescript not resolving setState cb type
      this.setState(CalendarUtils.applyDelta(deltaY, this.theme) as any);
    });

    CalendarScrollEvents.emit();
  };

  private handleTouchStart = (event: Event) => {
    if (!isInstanceOf(event, globalObject.TouchEvent)) {
      return;
    }

    const clientY = event.targetTouches[0].clientY;
    this.touchStartY = clientY;
  };

  private handleTouchMove = (event: Event) => {
    if (!isInstanceOf(event, globalObject.TouchEvent)) {
      return;
    }

    const { clientY } = event.changedTouches[0];

    const deltaY = (this.touchStartY || 0) - clientY;
    this.touchStartY = clientY;

    this.executeAnimations(deltaY);
  };

  private throttledHandleTouchMove = throttle(this.handleTouchMove, 10);

  private handleWheel = (event: Event) => {
    if (!isInstanceOf(event, globalObject.WheelEvent)) {
      return;
    }
    event.preventDefault();
    const { pixelY } = normalizeWheel(event);

    this.executeAnimations(pixelY);
  };

  private handleWheelEnd = () => {
    if (this.wheelEndTimeout) {
      globalObject.clearTimeout(this.wheelEndTimeout);
    }
    this.wheelEndTimeout = globalObject.setTimeout(this.scrollToNearestWeek, 300);
  };
  private scrollToNearestWeek = () => {
    const { scrollTarget, scrollDirection } = this.state;

    const thresholdHeight = themeConfig(this.theme).MONTH_TITLE_OFFSET_HEIGHT + themeConfig(this.theme).DAY_HEIGHT;

    if (scrollTarget < thresholdHeight) {
      let targetPosition = 0;
      if (scrollDirection < 0) {
        targetPosition = thresholdHeight;
      }

      this.setState({ scrollTarget: targetPosition }, () => {
        const amount = scrollTarget - targetPosition;
        this.animation.animate(amount, (deltaY) => {
          // FIXME: Typescript not resolving setState cb type
          this.setState(CalendarUtils.applyDelta(deltaY, this.theme) as any);
        });
      });
    }
  };

  private scrollTo = (pos: number, onEnd?: () => void) => {
    const scrollAmmount = pos - this.state.scrollPosition;
    return this.scrollAmount(scrollAmmount, onEnd);
  };

  private scrollAmount = (scrollAmmount: number, onEnd?: () => void) => {
    return this.animation.animate(
      scrollAmmount,
      (deltaY) => {
        this.setState(({ scrollPosition }) => ({
          scrollPosition: scrollPosition + deltaY,
        }));
      },
      onEnd,
    );
  };
}
