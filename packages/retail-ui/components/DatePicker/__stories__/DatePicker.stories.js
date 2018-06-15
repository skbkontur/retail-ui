
import Button from '../../Button/index';
import Gapped from '../../Gapped/index';
import MockDate from '../../internal/MockDate';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DatePicker from '../DatePicker';
import Tooltip from '../../Tooltip/index';

class DatePickerWithError extends React.Component<*, *> {
  state = {
    value: null,
    error: false,
    tooltip: false
  };

  _handleChange = (_, value) => {
    action('change')(_, value);
    this.setState({
      value
    });
  };

  _unvalidate = () => {
    this.setState({ error: false, tooltip: false });
  };

  _validate = () => {
    this.setState(state => {
      const error = !!state.value && !DatePicker.validate(state.value);
      return {
        error,
        tooltip: error
      };
    });
  };

  _removeTooltip = () => {
    this.setState(state => ({
      tooltip: false
    }));
  };

  render() {
    return (
      <Gapped>
        <Tooltip
          trigger={this.state.tooltip ? 'opened' : 'closed'}
          render={() => 'Такой даты не существует'}
          onCloseClick={this._removeTooltip}
        >
          <DatePicker
            disabled={this.props.disabled}
            size={this.props.size}
            error={this.state.error}
            value={this.state.value}
            onChange={this._handleChange}
            onFocus={this._unvalidate}
            onBlur={this._validate}
            enableTodayLink
          />
        </Tooltip>
        <Button
          onClick={() =>
            this.setState({ value: null, error: null, tooltip: false })
          }
        >
          Clear
        </Button>
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

const dateForMock = new Date('2017-01-02');

storiesOf('DatePicker', module)
  .addDecorator(
    story =>
      process.env.NODE_ENV === 'test' ? (
        <div>
          <h2>Mocked date {dateForMock.toDateString()}</h2>
          <MockDate date={dateForMock} />
          {story()}
        </div>
      ) : (
        story()
      )
  )
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
