const classNames = require('classnames');
const React = require('react');

const styles = require('./Calendar.less');

const MONTH_NAMES = [
  'янв', 'фев', 'мар', 'апр',
  'май', 'июн', 'июл', 'авг',
  'сен', 'окт', 'ноя', 'дек',
];
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;
const FIRST_WEEK_SHIFT = (new Date(0).getDay() - 1) * DAY;
const DAY_HEIGHT = 25;
const CALENDAR_HEIGHT = 220;

const CELLS_COUNT = (CALENDAR_HEIGHT / DAY_HEIGHT + 1) * 7;

const Calendar = React.createClass({
  getInitialState() {
    return {
      pos: dateToPos(this.props.initialDate),
    };
  },

  render() {
    let offset = this.state.pos % DAY_HEIGHT;
    if (offset < 0) {
      offset += DAY_HEIGHT;
    }
    let from = (this.state.pos - offset) / DAY_HEIGHT * WEEK - FIRST_WEEK_SHIFT;
    let week = getWeek(from);

    let months = [];
    let monthStart = new Date(from);
    monthStart.setDate(1);
    for (let i = 0; i < 4; ++i) {
      let monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      let y = getDayTop(week, offset, +monthStart);
      let style = {
        top: y,
        height: getDayTop(week, offset, +monthEnd) - y,
      };
      let monthClass = classNames({
        [styles.month]: true,
        [styles.grey]: monthStart.getMonth() % 2,
      });
      months.push(
        <div key={+monthStart} className={monthClass} style={style}>
          <div style={{position: 'relative', top: Math.max(0, -y)}}>
            {MONTH_NAMES[monthStart.getMonth()]}
            <div className={styles.year}>{monthStart.getFullYear()}</div>
          </div>
        </div>
      );

      monthStart = monthEnd;
    }

    let cells = [];
    let cellCount = Math.ceil((CALENDAR_HEIGHT + offset) / DAY_HEIGHT) * 7;
    for (let i = 0; i < cellCount; ++i) {
      let cur = from + i * DAY;
      let curWeek = getWeek(cur);
      let date = new Date(cur);
      let x = getDay(date) * DAY_HEIGHT;
      let y = (curWeek - week) * DAY_HEIGHT - offset;
      let style = {left: x, top: y};

      let mouseX = this.state.mouseX;
      let mouseY = this.state.mouseY;
      let active = x < mouseX && x + DAY_HEIGHT > mouseX && y < mouseY && y +
          DAY_HEIGHT > mouseY;

      let cellClass = classNames({
        [styles.cell]: true,
        [styles.cellActive]: active,
        [styles.cellCurrent]: +this.props.value === +date,
        [styles.grey]: date.getMonth() % 2,
        [styles.cellHoly]: date.getDay() === 0 || date.getDay() === 6,
      });
      cells.push(
        <span key={cur} className={cellClass} style={style}>
          <div className={styles.cellInner}>{date.getDate()}</div>
        </span>
      );
    }

    return (
      <div className={styles.root} tabIndex="0" onWheel={this.handleWheel}>
        {cells}
        {months}
        <div className={styles.mask} onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
            onMouseDown={this.handleMouseDown} />
      </div>
    );
  },

  componentDidMount() {
    React.findDOMNode(this).focus();
  },

  moveToDate(date) {
    let newDate = new Date(0);
    newDate.setFullYear(date.getFullYear());
    newDate.setMonth(date.getMonth());
    this.setState({pos: dateToPos(newDate)});
  },

  handleWheel(event) {
    event.preventDefault();
    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= DAY_HEIGHT;
    } else if (event.deltaMode === 2) {
      deltaY *= DAY_HEIGHT * 4;
    }

    let pos = this.state.pos + deltaY;
    this.setState({pos});

    let date = posToDate(pos);
    date.setDate(date.getDate() + 6);
    this.props.onNav(date);
  },

  handleMouseMove(event) {
    let rect = event.currentTarget.getBoundingClientRect();
    this.setState({
      mouseX: event.clientX - rect.left,
      mouseY: event.clientY - rect.top,
    });
  },

  handleMouseLeave() {
    this.setState({mouseX: -10});
  },

  handleMouseDown(event) {
    let rect = event.currentTarget.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let time = Math.floor((this.state.pos + y) / DAY_HEIGHT) * WEEK  -
        FIRST_WEEK_SHIFT;
    let date = new Date(time);
    let weekDay = Math.floor(x / DAY_HEIGHT);
    if (weekDay < 7) {
      date.setDate(date.getDate() + weekDay);

      if (this.props.onPick) {
        this.props.onPick(date);
      }
    }
  },
});

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
  let day = date.getDay();
  return day ? day - 1 : 6;
}

function getDayTop(fromWeek, offset, time) {
  return (getWeek(time) - fromWeek) * DAY_HEIGHT - offset;
}

module.exports = Calendar;
