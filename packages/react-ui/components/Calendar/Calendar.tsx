import React from 'react';
import normalizeWheel from 'normalize-wheel';
import throttle from 'lodash.throttle';

import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { LocaleContext } from '../../lib/locale';
import { locale } from '../../lib/locale/decorators';
import { cx } from '../../lib/theming/Emotion';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { MAX_DATE, MAX_MONTH, MAX_YEAR, MIN_DATE, MIN_MONTH, MIN_YEAR } from '../../lib/date/constants';
import { Nullable, Range } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { animation } from '../../lib/animation';
import { isMobile } from '../../lib/client';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { themeConfig } from './config';
import * as CalendarUtils from './CalendarUtils';
import { MonthViewModel } from './MonthViewModel';
import * as CalendarScrollEvents from './CalendarScrollEvents';
import { Month } from './Month';
import { styles } from './Calendar.styles';
import { CalendarDateShape, create, isGreater, isLess } from './CalendarDateShape';
import { getInitialDate, getTodayDate, setInititalDate } from './CalendarUtils';
import { CalendarLocale, CalendarLocaleHelper } from './locale';

export interface CalendarProps extends CommonProps {
  /**
   * Вызывается при изменении `date`, содержит в себе текущее значение даты
   */
  onDateChange?: (date: CalendarDateShape) => void;
  /**
   * Задаёт текущую дату
   *
   * Дата задаётся в формате: `{ year, month, date }`
   */
  date: Nullable<CalendarDateShape>;
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
   * Позволяет задать месяц по умолчанию
   */
  initialMonth?: Range<1, 13>;
  /**
   * Позволяет задать год по умолчанию
   */
  initialYear?: number;
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

type DefaultProps = Required<Pick<CalendarProps, 'minDate' | 'maxDate' | 'hasBottomSeparator'>>;

/**
 * Компонент календаря из [DatePicker](https://tech.skbkontur.ru/react-ui/#/Components/DatePicker)'а
 */
@rootNode
@locale('Calendar', CalendarLocaleHelper)
export class Calendar extends React.Component<CalendarProps, CalendarState> {
  public static __KONTUR_REACT_UI__ = 'Calendar';

  public static defaultProps: DefaultProps = {
    minDate: {
      year: MIN_YEAR,
      month: MIN_MONTH,
      date: MIN_DATE,
    },
    maxDate: {
      year: MAX_YEAR,
      month: MAX_MONTH,
      date: MAX_DATE,
    },
    hasBottomSeparator: true,
  };

  private getProps = createPropsGetter(Calendar.defaultProps);

  private theme!: Theme;
  private readonly locale!: CalendarLocale;
  private wheelEndTimeout: Nullable<number>;
  private root: Nullable<HTMLElement>;
  private animation = animation();
  private touchStartY: Nullable<number> = null;
  private setRootNode!: TSetRootNode;

  constructor(props: CalendarProps) {
    super(props);

    const { minDate, maxDate } = this.getProps();

    const today = getTodayDate();
    const date = getInitialDate(today, this.props.date, minDate, maxDate);

    const initialMonth = setInititalDate({
      inititialDate: this.props.initialMonth,
      date: date.month,
      todayDate: today.month,
    });
    const initialYear = setInititalDate({
      inititialDate: this.props.initialYear,
      date: date.year,
      todayDate: today.year,
    });

    this.state = {
      scrollPosition: 0,
      months: CalendarUtils.getMonths(this.props.initialMonth ? initialMonth - 1 : initialMonth, initialYear),
      today,
      scrollDirection: 1,
      scrollTarget: 0,
    };
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
    if (this.animation.inProgress()) {
      this.animation.finish();
      // FIXME: Dirty hack to await batched updates
      await new Promise((r) => setTimeout(r));
    }

    const { minDate, maxDate } = this.getProps();

    if (minDate && isGreater(minDate, create(32, month, year))) {
      this.scrollToMonth(minDate.month, minDate.year);
      return;
    }

    if (maxDate && isLess(maxDate, create(0, month, year))) {
      this.scrollToMonth(maxDate.month, maxDate.year);
      return;
    }

    const currentMonth = this.state.months[1];
    const diffInMonths = currentMonth.month + currentMonth.year * 12 - month - year * 12;

    if (diffInMonths === 0) {
      this.scrollTo(0);
      return;
    }

    const maxMonthsToAdd = themeConfig(this.theme).MAX_MONTHS_TO_APPEND_ON_SCROLL;

    const onEnd = () => {
      this.setState({
        months: CalendarUtils.getMonths(month, year),
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
        return MonthViewModel.create(month + index, year);
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
        return MonthViewModel.create(month + index - monthsToAppendCount + 2, year);
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

  private renderMain = () => {
    const positions = this.getMonthPositions();

    const { className, hasBottomSeparator, ...rest } = this.getProps();

    return (
      <LocaleContext.Provider value={{ locale: { DatePicker: { months: this.locale.months } } }}>
        <CommonWrapper rootNodeRef={this.setRootNode} {...rest}>
          <div ref={this.refRoot} data-tid={CalendarDataTids.root} className={cx(styles.root(this.theme), className)}>
            <div style={{ height: themeConfig(this.theme).WRAPPER_HEIGHT }} className={styles.wrapper()}>
              {this.state.months
                .map<[number, MonthViewModel]>((x, i) => [positions[i], x])
                .filter(([top, month]) => CalendarUtils.isMonthVisible(top, month, this.theme))
                .map(this.renderMonth, this)}
            </div>
            {hasBottomSeparator && <div className={styles.separator(this.theme)} />}
          </div>
        </CommonWrapper>
      </LocaleContext.Provider>
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
    const { minDate, maxDate } = this.getProps();
    return (
      <Month
        key={month.month + '-' + month.year}
        top={top}
        month={month}
        maxDate={maxDate}
        minDate={minDate}
        today={this.state.today}
        value={this.props.date}
        onDateClick={this.props.onDateChange}
        onMonthYearChange={this.handleMonthYearChange}
        isHoliday={this.props.isHoliday}
      />
    );
  }

  private getMonthPositions() {
    const { scrollPosition, months } = this.state;

    const positions = [scrollPosition - months[0].getHeight(this.theme)];
    for (let i = 1; i < months.length; i++) {
      const position = positions[i - 1] + months[i - 1].getHeight(this.theme);
      positions.push(position);
    }
    return positions;
  }

  private handleMonthYearChange = (month: number, year: number) => {
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
    if (!(event instanceof TouchEvent)) {
      return;
    }

    const clientY = event.targetTouches[0].clientY;
    this.touchStartY = clientY;
  };

  private handleTouchMove = (event: Event) => {
    if (!(event instanceof TouchEvent)) {
      return;
    }

    const { clientY } = event.changedTouches[0];

    const deltaY = (this.touchStartY || 0) - clientY;
    this.touchStartY = clientY;

    this.executeAnimations(deltaY);
  };

  private throttledHandleTouchMove = throttle(this.handleTouchMove, 10);

  private handleWheel = (event: Event) => {
    if (!(event instanceof WheelEvent)) {
      return;
    }
    event.preventDefault();
    const { pixelY } = normalizeWheel(event);

    this.executeAnimations(pixelY);
  };

  private handleWheelEnd = () => {
    if (this.wheelEndTimeout) {
      clearTimeout(this.wheelEndTimeout);
    }
    this.wheelEndTimeout = window.setTimeout(this.scrollToNearestWeek, 300);
  };
  private scrollToNearestWeek = () => {
    const { scrollTarget, scrollDirection } = this.state;

    const trasholdHeight = themeConfig(this.theme).MONTH_TITLE_OFFSET_HEIGHT + themeConfig(this.theme).DAY_SIZE;

    if (scrollTarget < trasholdHeight) {
      let targetPosition = 0;
      if (scrollDirection < 0) {
        targetPosition = trasholdHeight;
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
