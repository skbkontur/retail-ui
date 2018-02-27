// @flow
import Button from '../../Button/index';
import Gapped from '../../Gapped/index';
import MockDate from '../../internal/MockDate';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DatePicker from '../DatePicker';

type State = {
  error: boolean,
  value: * | null
};

class DatePickerWithError extends React.Component<*, State> {
  state = {
    value: null,
    error: false
  };

  _handleChange = (_, value) => {
    action('change')(_, value);
    this.setState({
      value
    });
  };

  render() {
    return (
      <Gapped>
        <DatePicker
          disabled={this.props.disabled}
          size={this.props.size}
          error={this.state.error}
          value={this.state.value}
          onChange={this._handleChange}
          enableTodayLink
        />
        <Button onClick={() => this.setState({ value: null })}>Clear</Button>
        <Button onClick={() => this.setState({ value: '99.99.9999' })}>
          Set "99.99.9999"
        </Button>
        <Button onClick={() => this.setState({ value: '99.hello' })}>
          Set "99.hello"
        </Button>
        <Button onClick={() => this.setState({ value: '10.3' })}>
          Set "10.3"
        </Button>
      </Gapped>
    );
  }
}

storiesOf('DatePicker', module)
  .addDecorator(story => (
    <div>
      <h2>Mocked date 01.02.2017</h2>
      <MockDate date={new Date('2017-01-02')} />
      {story()}
    </div>
  ))
  .add('with mouseevent handlers', () => (
    <div style={{ paddingTop: 200 }}>
      <DatePicker
        value="02.07.2017"
        onMouseEnter={() => console.count('enter')}
        onMouseLeave={() => console.count('leave')}
        onChange={action('change')}
      />
      <button>ok</button>
    </div>
  ))
  .add('DatePickerWithError', () => <DatePickerWithError />)
  .add('DatePicker disabled', () => <DatePickerWithError disabled />)
  .add('DatePicker medium', () => <DatePickerWithError size="medium" />)
  .add('DatePicker large', () => <DatePickerWithError size="large" />);
