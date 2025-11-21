import React from 'react';
import { action } from '@storybook/addon-actions';

import type { Meta, Story } from '../../../typings/stories';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { Select } from '../../Select';
import type { DateInputProps } from '../DateInput';
import { DateInput } from '../DateInput';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { defaultLangCode } from '../../../lib/locale/constants';
import { InternalDateGetter } from '../../../lib/date/InternalDateGetter';

interface DateInputFormattingState {
  order: InternalDateOrder;
  separator: keyof typeof InternalDateSeparator;
  value: string;
}
class DateInputFormatting extends React.Component {
  public state: DateInputFormattingState = {
    order: InternalDateOrder.YMD,
    separator: 'Dot',
    value: '21.12.2012',
  };

  public handleChangeOrder = (order: any) => this.setState({ order });
  public handleChangeSeparator = (separator: any) => this.setState({ separator });
  public handleChangeValue = (value: any) => {
    action('change')(value);
    this.setState({ value });
  };

  public render() {
    return (
      <Gapped vertical gap={10}>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Порядок компонентов <b>InternalDateOrder</b>
          </span>
          <Select
            value={this.state.order}
            items={Object.keys(InternalDateOrder)}
            onValueChange={this.handleChangeOrder}
          />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель <b>InternalDateSeparator</b>
          </span>
          <Select
            value={this.state.separator}
            items={Object.keys(InternalDateSeparator)}
            onValueChange={this.handleChangeSeparator}
          />
        </div>
        <LocaleContext.Provider
          value={{
            langCode: defaultLangCode,
            locale: {
              DatePicker: {
                separator: InternalDateSeparator[this.state.separator],
                order: this.state.order,
              },
            },
          }}
        >
          <DateInput onValueChange={this.handleChangeValue} value={this.state.value} />
          <br />
          <br />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

class DateInputDifferentFormatting extends React.Component {
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
              <LocaleContext.Provider
                value={{
                  langCode: LangCodes.ru_RU,
                  locale: { DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  langCode: LangCodes.ru_RU,
                  locale: { DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
          <tr>
            <td>Dash</td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
          <tr>
            <td>Slash</td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
          <tr>
            <td>Space</td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

interface DateInputSimpleProps extends Partial<DateInputProps> {
  defaultValue?: string;
}
interface DateInputSimpleState {
  value: string;
}

class DateInputSimple extends React.Component<DateInputSimpleProps> {
  public state: DateInputSimpleState = {
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
  private getTodayComponents = InternalDateGetter.getTodayComponents;
  public state = {
    lastEvent: 'none',
  };

  public handleFocus = () => {
    InternalDateGetter.getTodayComponents = () => ({
      date: 1,
      month: 1,
      year: 2000,
    });
  };

  public handleBlur = () => {
    InternalDateGetter.getTodayComponents = this.getTodayComponents;
    this.setState({ lastEvent: 'blur' });
  };

  public handleChange = () => {
    this.setState({ lastEvent: 'change' });
  };

  public render() {
    return (
      <Gapped>
        <DateInputSimple
          onValueChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          defaultValue="21.12.2012"
        />
        <div>{this.state.lastEvent}</div>
      </Gapped>
    );
  }
}

export default {
  title: 'DateInput',
  component: DateInput,
} as Meta;

export const Simple: Story = () => <DateInputSimple defaultValue="01.02.2017" />;
Simple.storyName = 'simple';

export const WithAutoFocus: Story = () => <DateInput autoFocus />;
WithAutoFocus.storyName = 'with autoFocus';

export const Formatting = () => <DateInputFormatting />;
Formatting.storyName = 'formatting';
Formatting.parameters = { creevey: { skip: true } };

export const DifferentFormatting = () => <DateInputDifferentFormatting />;
DifferentFormatting.storyName = 'different formatting';

export const Disabled: Story = () => <DateInputSimple disabled defaultValue="01.02.2017" />;
Disabled.storyName = 'disabled';

export const WithWidth: Story = () => <DateInputSimple width="50px" defaultValue="01.02.2017" />;
WithWidth.storyName = 'with width';

export const BlurAlwaysAfterChange: Story = () => <DateInputLastEvent />;
BlurAlwaysAfterChange.storyName = 'blur always after change';

export const WithNoValue: Story = () => <DateInput />;

export const WithError: Story = () => (
  <Gapped vertical>
    <Gapped>
      <DateInput value="01.01.2020" error /> Error
    </Gapped>
    <Gapped>
      <DateInput value="01.01.2020" error disabled /> Error and Disabled
    </Gapped>
  </Gapped>
);

export const ShouldSetFocusOnPlaceholderClick: Story = () => {
  return <DateInput />;
};
ShouldSetFocusOnPlaceholderClick.storyName = 'should set focus on placeholder click';
