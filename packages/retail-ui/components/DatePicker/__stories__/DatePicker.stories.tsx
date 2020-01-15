import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';
import { MockDate } from '../../internal/MockDate';
import { LangCodes, LocaleProvider } from '../../LocaleProvider';
import { Tooltip } from '../../Tooltip';
import { DatePicker } from '../DatePicker';

class DatePickerWithError extends React.Component<any, any> {
  public state = {
    value: '15.08.2014',
    error: false,
    tooltip: false,
  };

  public render() {
    return (
      <Gapped>
        <Tooltip
          trigger={this.state.tooltip ? 'opened' : 'closed'}
          render={() => 'Такой даты не существует'}
          onCloseClick={this._removeTooltip}
        >
          <LocaleProvider locale={{ DatePicker: { order: InternalDateOrder.MDY } }}>
            <DatePicker
              {...this.props}
              disabled={this.props.disabled}
              size={this.props.size}
              error={this.state.error}
              value={this.state.value}
              minDate="15.08.2003"
              maxDate="21.10.2006"
              onChange={this._handleChange}
              onFocus={this._invalidate}
              onBlur={this._validate}
              enableTodayLink
            />
          </LocaleProvider>
        </Tooltip>
        <Button onClick={() => this.setState({ value: null, error: null, tooltip: false })}>Clear</Button>
        <Button onClick={() => this.setState({ value: '99.99.9999' })}>Set &quot;99.99.9999&quot;</Button>
        <Button onClick={() => this.setState({ value: '99.hello' })}>Set &quot;99.hello&quot;</Button>
        <Button onClick={() => this.setState({ value: '10.3' })}>Set &quot;10.3&quot;</Button>
      </Gapped>
    );
  }

  private _handleChange = (_: any, value: any) => {
    action('change')(_, value);
    this.setState({ value });
  };

  private _invalidate = () => {
    this.setState({ error: false, tooltip: false });
  };

  private _validate = () => {
    const currentValue = this.state.value;
    this.setState(() => {
      const error =
        !!currentValue && !DatePicker.validate(currentValue, { minDate: '08.15.2003', maxDate: '10.21.2006' });
      return {
        error,
        tooltip: error,
      };
    });
  };

  private _removeTooltip = () => {
    this.setState({
      tooltip: false,
    });
  };
}

class DatePickerWithMinMax extends React.Component<any, any> {
  public state = {
    min: '02.07.2017',
    max: '30.01.2020',
    value: '02.07.2017',
    order: InternalDateOrder.DMY,
    separator: InternalDateSeparator.Dot,
  };

  public render(): React.ReactNode {
    return (
      <Gapped vertical gap={10}>
        <label>
          Начало периода:{' '}
          <input
            type="text"
            value={this.state.min}
            placeholder="min"
            onChange={e => this.setState({ min: e.target.value })}
          />
        </label>
        <label>
          Окончание периода:{' '}
          <input
            type="text"
            value={this.state.max}
            placeholder="max"
            onChange={e => this.setState({ max: e.target.value })}
          />
        </label>
        <LocaleProvider locale={{ DatePicker: { order: this.state.order, separator: this.state.separator } }}>
          <DatePicker
            width={200}
            value={this.state.value}
            minDate={this.state.min}
            maxDate={this.state.max}
            onChange={action('change')}
          />
        </LocaleProvider>
      </Gapped>
    );
  }
}

const dateForMock = new Date('2017-01-02');

storiesOf('DatePicker', module)
  .addDecorator(story =>
    process.env.NODE_ENV === 'test' ? (
      <div>
        <h2>Mocked date {dateForMock.toDateString()}</h2>
        <MockDate date={dateForMock} />
        {story()}
      </div>
    ) : (
      <div>{story()}</div>
    ),
  )
  .add('with mouseevent handlers', () => (
    <div style={{ padding: '200px 150px 350px 0px' }}>
      <DatePicker
        width={200}
        value="02.07.2017"
        onMouseEnter={() => console.count('enter')}
        onMouseLeave={() => console.count('leave')}
        onChange={action('change')}
      />
    </div>
  ))
  .add('DatePickerWithError', () => <DatePickerWithError />)
  .add('DatePicker disabled', () => <DatePickerWithError disabled />)
  .add('DatePicker medium', () => <DatePickerWithError size="medium" />)
  .add('DatePicker large', () => <DatePickerWithError size="large" />)
  .add('DatePicker with min max date', () => (
    <div style={{ padding: '200px 150px 350px 0px' }}>
      <DatePickerWithMinMax />
    </div>
  ))
  .add('DatePicker LocaleProvider', () => {
    return (
      <div style={{ paddingTop: 200 }}>
        <LocaleProvider langCode={LangCodes.en_GB}>
          <DatePicker
            value="02.07.2017"
            minDate="02.07.2017"
            maxDate="30.01.2020"
            onChange={action('change')}
            enableTodayLink={true}
          />
        </LocaleProvider>
      </div>
    );
  });
