

import * as React from 'react';
import Calendar, { type CalendarDateShape } from '../Calendar';
import shallowEqual from 'fbjs/lib/shallowEqual';

import { formatDate } from './DatePickerHelpers';
import styled from '../internal/styledRender';

let cssStyles;
let jssStyles;
if (process.env.REACT_APP_EXPERIMENTAL_CSS_IN_JS) {
  jssStyles = require('./Picker.styles').default;
} else {
  cssStyles = require('./Picker.less');
}

type Props = {|
  maxDate?: CalendarDateShape,
  minDate?: CalendarDateShape,
  value: ?CalendarDateShape,
  onPick: (date: CalendarDateShape) => void,
  onSelect?: (date: CalendarDateShape) => void,
  enableTodayLink?: boolean
|};

type State = {
  date: CalendarDateShape,
  today: CalendarDateShape
};

const getTodayCalendarDate = () => {
  const d = new Date();
  return {
    date: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear()
  };
};

export default class Picker extends React.Component<Props, State> {
  _mounted: boolean;

  _calendar;

  constructor(props: Props) {
    super(props);
    const today = getTodayCalendarDate();
    this.state = {
      date: this.props.value || today,
      today
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { value } = this.props;
    if (value && !shallowEqual(value, prevProps.value)) {
      this._scrollToMonth(value.month, value.year);
    }
  }

  render = styled(cssStyles, jssStyles, styles => {
    const { date } = this.state;
    return (
      <div className={styles.root} onMouseDown={e => e.preventDefault()}>
        <Calendar
          ref={c => (this._calendar = c)}
          value={this.props.value}
          initialMonth={date.month}
          initialYear={date.year}
          onSelect={this.props.onPick}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
        />
        {this.props.enableTodayLink && this._renderTodayLink(styles)}
      </div>
    );
  });

  _scrollToMonth = (month, year) => {
    if (this._calendar) {
      this._calendar.scrollToMonth(month, year);
    }
  };

  _renderTodayLink(styles) {
    return (
      <button
        className={styles.todayWrapper}
        onClick={this._handleSelectToday}
        tabIndex={-1}
      >
        Сегодня {formatDate(this.state.today)}
      </button>
    );
  }

  _handleSelectToday = () => {
    const { today } = this.state;
    if (this.props.onSelect) {
      this.props.onSelect(today);
    }
    if (this._calendar) {
      const { month, year } = today;
      this._calendar.scrollToMonth(month, year);
    }
  };
}
