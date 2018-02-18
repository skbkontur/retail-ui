// @flow
import MockDate from '../../internal/MockDate';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DatePicker from '../DatePicker';

type State = {
  error: boolean,
  value: * | null
};

class DatePickerWithError extends React.Component<{}, State> {
  state = {
    value: null,
    error: false
  };

  _handleChange = (_, value) => {
    this.setState({
      value,
      error: value == null || !DatePicker.isValidDate(value)
    });
  };

  render() {
    return (
      <DatePicker
        error={this.state.error}
        value={this.state.value}
        onChange={this._handleChange}
        enableTodayLink
      />
    );
  }
}

storiesOf('DatePicker', module)
  .addDecorator(story => (
    <div>
      <MockDate date={new Date('2017-01-02')} />
      {story()}
    </div>
  ))
  .add('with mouseevent handlers', () => (
    <div style={{ paddingTop: 200 }}>
      <DatePicker
        value={{ date: 2, month: 0, year: 2017 }}
        onMouseEnter={() => console.count('enter')}
        onMouseLeave={() => console.count('leave')}
        onChange={action('change')}
      />
      <button>ok</button>
    </div>
  ))
  .add('DatePickerWithError', () => <DatePickerWithError />);
