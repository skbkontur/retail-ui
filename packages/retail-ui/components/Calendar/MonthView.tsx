import * as React from 'react';
import * as CDS from './CalendarDateShape';
import config from './config';
import styles from './MonthView.less';
import DateSelect from '../DateSelect';
import { cx as classNames } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import jsStyles from './MonthView.styles';
import ThemeConsumer from '../ThemeConsumer';

interface MonthViewProps {
  children: React.ReactNode;
  firstDayOffset: number;
  height: number;
  isFirstInYear?: boolean;
  isLastInYear?: boolean;
  maxDate?: CDS.CalendarDateShape;
  minDate?: CDS.CalendarDateShape;
  month: number;
  top: number;
  year: number;
  onMonthSelect: (month: number) => void;
  onYearSelect: (month: number) => void;
  monthSelectRef: (select: DateSelect | null) => void;
  yearSelectRef: (select: DateSelect | null) => void;
}

export class MonthView extends React.Component<MonthViewProps> {
  private theme!: ITheme;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const {
      children,
      height,
      isFirstInYear,
      isLastInYear,
      maxDate,
      minDate,
      month,
      top,
      year,
      onMonthSelect,
      onYearSelect,
      monthSelectRef,
      yearSelectRef,
    } = this.props;

    const isTopNegative = top <= 0;
    const isHeaderSticky = isTopNegative && height >= -top;
    const headerTop = isHeaderSticky ? Math.min(-top, height - config.MONTH_TITLE_HEIGHT) : 0;
    const alpha = isHeaderSticky ? (height + top - config.MONTH_TITLE_HEIGHT) / 10 : 1;
    const borderBottomColor = `rgba(223, 222, 222, ${alpha})`;
    const isYearVisible = isFirstInYear || isHeaderSticky;
    const yearTop = isHeaderSticky && !isLastInYear ? -headerTop - top : 0;
    const monthSelectDisabled = top > 40 || headerTop < 0 || headerTop >= height - config.MONTH_TITLE_HEIGHT;
    const yearSelectDisabled = top > 40 || (isLastInYear && top < -height + config.MONTH_TITLE_HEIGHT);

    const getMinMonth = (value: number) => {
      let min = 0;
      for (let i = 0; i < 12; ++i) {
        if (minDate && CDS.isGreaterOrEqual({ date: 31, month: i, year: value }, minDate)) {
          min = i;
          break;
        }
      }
      return min;
    };

    const getMaxMonth = (value: number) => {
      let max = 11;
      for (let i = 11; i >= 0; --i) {
        if (maxDate && CDS.isLessOrEqual({ date: 1, month: i, year: value }, maxDate)) {
          max = i;
          break;
        }
      }
      return max;
    };

    return (
      <div className={styles.month} style={{ top }} key={month + '-' + year}>
        <div
          style={{ lineHeight: `${config.MONTH_TITLE_HEIGHT}px`, top: headerTop, borderBottomColor }}
          className={classNames({
            [styles.monthTitle]: true,
            [jsStyles.monthTitle(this.theme)]: true,
            [styles.headerSticky]: isHeaderSticky,
            [jsStyles.headerSticky(this.theme)]: isHeaderSticky,
          })}
        >
          <div className={styles.headerMonth}>
            <DateSelect
              disabled={monthSelectDisabled}
              width={85}
              type="month"
              value={month}
              onChange={onMonthSelect}
              ref={!monthSelectDisabled ? monthSelectRef : undefined}
              minValue={getMinMonth(year)}
              maxValue={getMaxMonth(year)}
            />
          </div>
          {isYearVisible && (
            <div className={styles.headerYear} style={{ top: yearTop }}>
              <DateSelect
                disabled={yearSelectDisabled}
                width={50}
                type="year"
                value={year}
                minValue={minDate ? minDate.year : undefined}
                maxValue={maxDate ? maxDate.year : undefined}
                onChange={onYearSelect}
                ref={!yearSelectDisabled ? yearSelectRef : undefined}
              />
            </div>
          )}
        </div>
        {children}
      </div>
    );
  }
}
