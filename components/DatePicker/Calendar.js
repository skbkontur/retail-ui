// @flow

import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Calendar.less';

const MONTH_NAMES = [
  'янв', 'фев', 'мар', 'апр',
  'май', 'июн', 'июл', 'авг',
  'сен', 'окт', 'ноя', 'дек'
];
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;
const FIRST_WEEK_SHIFT = (new Date(0).getUTCDay() - 1) * DAY;
const DAY_HEIGHT = 25;
const CALENDAR_HEIGHT = 220;

type Props = {
  initialDate: Date,
  value: ?Date,
  onNav: (date: Date) => void,
  onPick: (date: Date) => void,
};

type State = {
  mouseX: number,
  mouseY: number,
  pos: number,
};

export default class Calendar extends React.Component {
  props: Props;
  state: State;

  _today: Date;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      mouseX: 0,
      mouseY: 0,
      pos: dateToPos(props.initialDate)
    };

    this._today = new Date();
  }

  render() {
    let offset = this.state.pos % DAY_HEIGHT;
    if (offset < 0) {
      offset += DAY_HEIGHT;
    }
    const from = (this.state.pos - offset) / DAY_HEIGHT * WEEK -
      FIRST_WEEK_SHIFT;
    const week = getWeek(from);

    const months = [];
    let monthStart = new Date(from);
    monthStart.setUTCDate(1);
    for (let i = 0; i < 4; ++i) {
      const monthEnd = new Date(monthStart.getTime());
      monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1);
      const y = getDayTop(week, offset, +monthStart);
      const style = {
        top: y,
        height: getDayTop(week, offset, +monthEnd) - y
      };
      const monthClass = classNames({
        [styles.month]: true,
        [styles.grey]: monthStart.getUTCMonth() % 2
      });
      months.push(
        <div key={+monthStart} className={monthClass} style={style}>
          <div style={{ position: 'relative', top: Math.max(0, -y) }}>
            {MONTH_NAMES[monthStart.getUTCMonth()]}
            <div className={styles.year}>{monthStart.getUTCFullYear()}</div>
          </div>
        </div>
      );

      monthStart = monthEnd;
    }

    const cells = [];
    const cellCount = Math.ceil((CALENDAR_HEIGHT + offset) / DAY_HEIGHT) * 7;
    for (let i = 0; i < cellCount; ++i) {
      const cur = from + i * DAY;
      const curWeek = getWeek(cur);
      const date = new Date(cur);
      const x = getDay(date) * DAY_HEIGHT;
      const y = (curWeek - week) * DAY_HEIGHT - offset;
      const style = { left: x, top: y };

      const mouseX = this.state.mouseX;
      const mouseY = this.state.mouseY;
      const active = x < mouseX && x + DAY_HEIGHT > mouseX && y < mouseY && y +
          DAY_HEIGHT > mouseY;

      const cellClass = classNames({
        [styles.cell]: true,
        [styles.cellActive]: active,
        [styles.cellToday]: this._isToday(date),
        [styles.cellCurrent]: isSameDate(this.props.value, date),
        [styles.grey]: date.getUTCMonth() % 2,
        [styles.cellHoly]: date.getUTCDay() === 0 || date.getUTCDay() === 6
      });
      cells.push(
        <span key={cur} className={cellClass} style={style}>
          <div className={styles.cellInner}>{date.getUTCDate()}</div>
        </span>
      );
    }

    return (
      <div className={styles.root} tabIndex="0" onWheel={this.handleWheel}>
        {cells}
        {months}
        <div className={styles.mask} onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).focus();
  }

  moveToDate(date: Date) {
    const newDate = new Date(0);
    newDate.setUTCFullYear(date.getUTCFullYear());
    newDate.setUTCMonth(date.getUTCMonth());
    this.setState({ pos: dateToPos(newDate) });
  }

  handleWheel = (event: SyntheticWheelEvent) => {
    event.preventDefault();
    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= DAY_HEIGHT;
    } else if (event.deltaMode === 2) {
      deltaY *= DAY_HEIGHT * 4;
    }

    const pos = this.state.pos + deltaY;
    this.setState({ pos });

    const date = posToDate(pos);
    date.setUTCDate(date.getUTCDate() + 6);
    this.props.onNav(date);
  };

  handleMouseMove = (event: SyntheticMouseEvent) => {
    const currentTarget: HTMLElement = (event.currentTarget: any);
    const rect = currentTarget.getBoundingClientRect();
    this.setState({
      mouseX: event.clientX - rect.left,
      mouseY: event.clientY - rect.top
    });
  };

  handleMouseLeave = () => {
    this.setState({ mouseX: -10 });
  };

  handleMouseDown = (event: SyntheticMouseEvent) => {
    if (event.button !== 0) {
      return;
    }

    const currentTarget: HTMLElement = (event.currentTarget: any);
    const rect = currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const time = Math.floor((this.state.pos + y) / DAY_HEIGHT) * WEEK  -
        FIRST_WEEK_SHIFT;
    const date = new Date(time);
    const weekDay = Math.floor(x / DAY_HEIGHT);
    if (weekDay < 7) {
      date.setUTCDate(date.getUTCDate() + weekDay);

      if (this.props.onPick) {
        this.props.onPick(date);
      }
    }
  };

  _isToday(date) {
    return isSameDate(date, this._today);
  }
}

function dateToPos(date) {
  return (Math.floor((+date - FIRST_WEEK_SHIFT - DAY) / WEEK) - 1) * DAY_HEIGHT;
}

function posToDate(pos) {
  return new Date(Math.floor(pos / DAY_HEIGHT + 2) * WEEK - FIRST_WEEK_SHIFT);
}

function getWeek(time) {
  return Math.floor((FIRST_WEEK_SHIFT + time) / WEEK);
}

function getDay(date) {
  const day = date.getUTCDay();
  return day ? day - 1 : 6;
}

function getDayTop(fromWeek, offset, time) {
  return (getWeek(time) - fromWeek) * DAY_HEIGHT - offset;
}

function isSameDate(a, b) {
  return a && b &&
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate();
}
