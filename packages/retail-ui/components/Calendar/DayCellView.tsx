import * as React from 'react';
import * as CDS from './CalendarDateShape';
import config from './config';
import styles from './DayCellView.less';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import jsStyles from './DayCellView.styles';
import ThemeConsumer from '../ThemeConsumer';

interface DayCellViewProps {
  date: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  onDateClick?: (day: CDS.CalendarDateShape) => void;
  isWeekend?: boolean;
}

const size = config.DAY_HEIGHT;

const cellStyle = {
  width: size,
  height: size,
  lineHeight: size - 2 + 'px',
  borderRadius: size / 2,
};

export class DayCellView extends React.PureComponent<DayCellViewProps, {}> {
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
    const { date, minDate, maxDate, today, value, isWeekend } = this.props;

    return (
      <button
        style={cellStyle}
        tabIndex={-1}
        disabled={!CDS.isBetween(date, minDate, maxDate)}
        className={cx({
          [styles.cell]: true,
          [jsStyles.cell(this.theme)]: true,
          [jsStyles.today(this.theme)]: !!today && !!CDS.isEqual(date, today),
          [jsStyles.selected(this.theme)]: !!value && !!CDS.isEqual(date, value),
          [jsStyles.weekend(this.theme)]: !!isWeekend,
        })}
        onClick={this.handleClick}
      >
        {date.date}
      </button>
    );
  }

  private handleClick = (): void => {
    const { onDateClick } = this.props;
    if (!onDateClick) {
      return;
    }
    const { date, month, year } = this.props.date;
    onDateClick({ date, month, year });
  };
}
