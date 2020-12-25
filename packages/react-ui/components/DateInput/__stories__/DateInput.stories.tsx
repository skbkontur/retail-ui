import React from 'react';
import { action } from '@storybook/addon-actions';
import { CSFStory } from 'creevey';

import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { Select } from '../../Select';
import { DateInput, DateInputProps } from '../DateInput';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { defaultLangCode } from '../../../lib/locale/constants';

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
            Порядок компонентов <code>InternalDateOrder</code>
          </span>
          <Select
            value={this.state.order}
            items={Object.keys(InternalDateOrder)}
            onValueChange={this.handleChangeOrder}
          />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель <code>InternalDateSeparator</code>
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

export default { title: 'DateInput' };

export const Simple: CSFStory<JSX.Element> = () => <DateInputSimple defaultValue="01.02.2017" />;
Simple.story = {
  name: 'simple',
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async focus() {
          this.browser.executeScript(() => {
            (window.document.querySelector("[data-comp-name~='DateInput']") as HTMLElement).focus();
          });
          await this.expect(await this.takeScreenshot()).to.matchImage('focus');
        },
      },
    },
  },
};

export const WithAutoFocus: CSFStory<JSX.Element> = () => <DateInput autoFocus />;
WithAutoFocus.story = { name: 'with autoFocus' };

export const Formatting = () => <DateInputFormatting />;
Formatting.story = { name: 'formatting', parameters: { creevey: { skip: [true] } } };

export const DifferentFormatting = () => <DateInputDifferentFormatting />;
DifferentFormatting.story = { name: 'different formatting' };

export const Disabled: CSFStory<JSX.Element> = () => <DateInputSimple disabled defaultValue="01.02.2017" />;
Disabled.story = {
  name: 'disabled',
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async focus() {
          this.browser.executeScript(() => {
            (window.document.querySelector("[data-comp-name~='DateInput']") as HTMLElement).focus();
          });
          await this.expect(await this.takeScreenshot()).to.matchImage('focus');
        },
      },
    },
  },
};

export const WithWidth: CSFStory<JSX.Element> = () => <DateInputSimple width="50px" defaultValue="01.02.2017" />;
WithWidth.story = {
  name: 'with width',
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async focus() {
          this.browser.executeScript(() => {
            (window.document.querySelector("[data-comp-name~='DateInput']") as HTMLElement).focus();
          });
          await this.expect(await this.takeScreenshot()).to.matchImage('focus');
        },
      },
    },
  },
};

export const BlurAlwaysAfterChange: CSFStory<JSX.Element> = () => <DateInputLastEvent />;
BlurAlwaysAfterChange.story = {
  name: 'blur always after change',
  parameters: {
    creevey: {
      tests: {
        async ['value not changed']() {
          this.browser.executeScript(() => {
            (window.document.querySelector("[data-comp-name~='DateInput']") as HTMLElement).focus();
          });
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'body' }))
            .pause(500)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('value not changed');
        },
        async ['value changed']() {
          this.browser.executeScript(() => {
            (window.document.querySelector("[data-comp-name~='DateInput']") as HTMLElement).focus();
          });
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys('12')
            .click(this.browser.findElement({ css: 'body' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('value changed');
        },
        async ['value restored']() {
          await this.browser.executeScript(() => {
            // @ts-ignore
            window.OldDate = window.Date;
            // @ts-ignore
            window.Date = function() {
              // @ts-ignore
              return new window.OldDate(2000, 0, 1);
            };
          });
          this.browser.executeScript(() => {
            (window.document.querySelector("[data-comp-name~='DateInput']") as HTMLElement).focus();
          });
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.DELETE)
            .click(this.browser.findElement({ css: 'body' }))
            .perform();
          // @ts-ignore
          await this.browser.executeScript(() => {
            // @ts-ignore
            if (window.OldDate) {
              // @ts-ignore
              window.Date = window.OldDate;
            }
          });
          await this.expect(await this.takeScreenshot()).to.matchImage('value restored');
        },
      },
    },
  },
};
