// @flow
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DatePicker from '../DatePicker';

class DatePickerWithError extends React.Component {
  state: {
    value: string | Date | null,
    error: boolean
  } = {
    value: new Date(),
    error: false
  };

  handleChange = (_, value) => {
    this.setState({ value, error: typeof value === 'string' });
  }

  render() {
    return (
      <DatePicker
        error={this.state.error}
        value={this.state.value}
        onChange={this.handleChange}
        onUnexpectedInput={(x) => x.length ? x : null}
      />
    );
  }
}

storiesOf('DatePicker', module)
  .add('with mouseevent handlers', () => (
    <div>
      <DatePicker
        onMouseEnter={() => console.count('enter')}
        onMouseLeave={() => console.count('leave')}
        onChange={action('change')}
      />
      <button>ok</button>
    </div>
  ))
  .add('DatePickerWithError', () => <DatePickerWithError />);
