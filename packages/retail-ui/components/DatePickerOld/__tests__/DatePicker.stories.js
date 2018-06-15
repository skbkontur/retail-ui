
import MockDate from '../../internal/MockDate';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DatePicker from '../DatePickerOld';

type State = {
  error: boolean,
  value: string | Date | null
};

class DatePickerWithError extends React.Component<{}, State> {
  state = {
    value: new Date(),
    error: false
  };

  handleChange = (_, value: Date | string | null) => {
    this.setState({ value, error: typeof value === 'string' });
  };

  render() {
    return (
      <DatePicker
        error={this.state.error}
        value={this.state.value}
        onChange={this.handleChange}
        onUnexpectedInput={x => (x.length ? x : null)}
      />
    );
  }
}

storiesOf('DatePickerOld', module)
  .addDecorator(story => (
    <div>
      <MockDate date={new Date('2017-01-02')} />
      {story()}
    </div>
  ))
  .add('with mouseevent handlers', () => (
    <div style={{ paddingTop: 200 }}>
      <DatePicker
        value={new Date('2017-01-02')}
        onMouseEnter={() => console.count('enter')}
        onMouseLeave={() => console.count('leave')}
        onChange={action('change')}
      />
      <button>ok</button>
    </div>
  ))
  .add('DatePickerWithError', () => <DatePickerWithError />);
