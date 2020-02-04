import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { LocaleProvider } from '../../LocaleProvider';
import { Select } from '../../Select';
import { DateInput, DateInputProps } from '../DateInput';

interface DateInputFormattingState {
  order: InternalDateOrder;
  separator: keyof typeof InternalDateSeparator;
  value: string;
}
class DateInputFormatting extends React.Component<{}, DateInputFormattingState> {
  public state: DateInputFormattingState = {
    order: InternalDateOrder.YMD,
    separator: 'Dot',
    value: '21.12.2012',
  };

  public handleChangeOrder = (fakeEvent: any, order: any) => this.setState({ order });
  public handleChangeSeparator = (fakeEvent: any, separator: any) => this.setState({ separator });
  public handleChangeValue = (value: any) => {
    action('change')(value);
    this.setState({ value });
  };

  public render() {
    return (
      <Gapped vertical gap={10}>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Порядок компонентов <code>InternalDateOrder</code>
          </span>
          <Select value={this.state.order} items={Object.keys(InternalDateOrder)} onChange={this.handleChangeOrder} />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель <code>InternalDateSeparator</code>
          </span>
          <Select
            value={this.state.separator}
            items={Object.keys(InternalDateSeparator)}
            onChange={this.handleChangeSeparator}
          />
        </div>
        <LocaleProvider
          locale={{
            DatePicker: {
              separator: InternalDateSeparator[this.state.separator],
              order: this.state.order,
            },
          }}
        >
          <DateInput onValueChange={this.handleChangeValue} value={this.state.value} />
          <br />
          <br />
        </LocaleProvider>
      </Gapped>
    );
  }
}

class DateInputDifferentFormatting extends React.Component<any, any> {
  public render() {
    const value = '21.12.2012';
    return (
      <table>
        <thead>
          <tr>
            <td> </td>
            <td>YMD</td>
            <td>MDY</td>
            <td>DMY</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dot</td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.YMD } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.MDY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.DMY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
          </tr>
          <tr>
            <td>Dash</td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.YMD } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.MDY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.DMY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
          </tr>
          <tr>
            <td>Slash</td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.YMD } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.MDY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.DMY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
          </tr>
          <tr>
            <td>Space</td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.YMD } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.MDY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
            <td>
              <LocaleProvider
                locale={{ DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.DMY } }}
              >
                <DateInput value={value} />
              </LocaleProvider>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

interface DateInputSimpleProps extends DateInputProps {
  defaultValue?: string;
}

class DateInputSimple extends React.Component<Partial<DateInputSimpleProps>> {
  public state: { value: string } = {
    value: this.props.defaultValue || '',
  };

  public handleChange = (value: string) => {
    this.setState({ value });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  public render() {
    return <DateInput {...this.props} onValueChange={this.handleChange} value={this.state.value} />;
  }
}

class DateInputLastEvent extends React.Component {
  public state: { lastEvent: string } = {
    lastEvent: 'none',
  };

  public handleBlur = () => {
    this.setState({ lastEvent: 'blur' });
  };

  public handleChange = () => {
    this.setState({ lastEvent: 'change' });
  };

  public render() {
    return (
      <Gapped>
        <DateInputSimple onValueChange={this.handleChange} onBlur={this.handleBlur} defaultValue="21.12.2012" />
        <div>{this.state.lastEvent}</div>
      </Gapped>
    );
  }
}

storiesOf('DateInput', module)
  .add('simple', () => <DateInputSimple defaultValue="01.02.2017" />)
  .add('formatting', () => <DateInputFormatting />)
  .add('different formatting', () => <DateInputDifferentFormatting />)
  .add('disabled', () => <DateInputSimple disabled defaultValue="01.02.2017" />)
  .add('with width', () => <DateInputSimple width="50px" defaultValue="01.02.2017" />)
  .add('blur always after change', () => <DateInputLastEvent />);
