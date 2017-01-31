import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Calendar.less'

const DAY_WIDTH = 27;
const DAY_HEIGHT = 31;
const FIRST_CELL_OFFSET = 7;

export default class CalendarCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this._today = new Date();
  }

  render() {
    const {active} = this.state;
    const {date, weekIdx, offset, value} = this.props;

    const day = getDay(date);
    const isHolyday = date.getUTCDay() === 0 || date.getUTCDay() === 6;

    const x = day !== 0 ? day * DAY_WIDTH + FIRST_CELL_OFFSET : 0;
    const y = weekIdx * DAY_HEIGHT - offset;
    const width = day !== 0 ? DAY_WIDTH : DAY_WIDTH + FIRST_CELL_OFFSET;
    const style = {left: x, top: y, width, height: DAY_HEIGHT};

    const cellClass = classNames({
      [styles.cell]: true,
      [styles.cellActive]: active,
      [styles.cellToday]: this._isToday(date),
      [styles.cellCurrent]: isSameDate(value, date),
      [styles.grey]: date.getUTCMonth() % 2,
      [styles.cellHoly]: isHolyday,
    });

    return (
      <span className={cellClass} style={style}>
        <div
          className={styles.cellInner}
          onMouseOver={this.activate}
          onMouseLeave={this.deactivate}
          onMouseDown={this.pick}
        >
          {date.getUTCDate()}
        </div>
      </span>
    );
  }

  _isToday(date) {
    return isSameDate(date, this._today);
  }

  activate = () => {
    this.setState({active: true});
  }

  deactivate = () => {
    this.setState({active: false});
  }

  pick = (event: SyntheticMouseEvent) => {
    if (event.button !== 0) {
      return;
    }

    if (this.props.onPick) {
      this.props.onPick(this.props.date);
    }
  }
}

function isSameDate(a, b) {
  return a && b &&
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate();
}

function getDay(date) {
  const day = date.getUTCDay();
  return day ? day - 1 : 6;
}
