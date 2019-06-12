import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import Gapped from '../../Gapped';
import LocaleProvider from '../../LocaleProvider';
import Select from '../../Select';
import DateInput from '../DateInput';

interface DateInputFormattingState {
  order: InternalDateOrder;
  separator: keyof typeof InternalDateSeparator;
  value: string;
}
class DateInputFormatting extends React.Component<{}, DateInputFormattingState> {
  public state: DateInputFormattingState = {
    order: InternalDateOrder.YMD,
    separator: 'Dot',
    value: '2012.12.30',
  };

  public handleChangeOrder = (fakeEvent: any, order: any) => this.setState({ order });
  public handleChangeSeparator = (fakeEvent: any, separator: any) => this.setState({ separator });
  public handleChangeValue = (fakeEvent: any, value: any) => {
    action('change')(fakeEvent, value);
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
          <DateInput onChange={this.handleChangeValue} value={this.state.value} />
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
            <td>{' '}</td>
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

storiesOf('DateInput', module)
  .add('simple', () => <DateInput value="01.02.2017" />)
  .add('formatting', () => <DateInputFormatting />)
  .add('different formatting', () => <DateInputDifferentFormatting />)
  .add('disabled', () => <DateInput disabled value="01.02.2017" />)
  .add('with width', () => <DateInput width="50px" value="01.02.2017" />);
