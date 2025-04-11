import React from 'react';
import { DateInput, Gapped, LangCodes, LocaleContext, Select, DateOrder, DateSeparator } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Date Components/DateInput',
  component: DateInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return <DateInput value="27.04.1992" />;
};
Example1.storyName = 'Пример с введенной датой';

export const Example2: Story = () => {
  const [value, setValue] = React.useState();

  return <DateInput value={value} onValueChange={setValue} />;
};
Example2.storyName = 'Пример с изменяющимся значением';

export const Example3: Story = () => {
  return <DateInput disabled value="27.04.1992" />;
};
Example3.storyName = 'Disabled';

export const Example4: Story = () => {
  class DateInputFormatting2 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        langCode: LangCodes.ru_RU,
        value: '21.12.2012',
      };
    }

    render() {
      return (
        <Gapped vertical gap={10}>
          <div>
            <span style={{ width: '300px', display: 'inline-block' }}>
              Локаль (<tt>LangCodes</tt>)
            </span>
            <Select
              value={this.state.langCode}
              placeholder="Выбрать язык"
              items={Object.values(LangCodes)}
              onValueChange={(langCode) => this.setState({ langCode })}
            />
          </div>
          <LocaleContext.Provider value={{ langCode: this.state.langCode }}>
            <DateInput onValueChange={(value) => this.setState({ value })} value={this.state.value} />
          </LocaleContext.Provider>
        </Gapped>
      );
    }
  }

  return <DateInputFormatting2 />;
};
Example4.storyName = 'Форматирование даты при смене локали';

export const Example5: Story = () => {
  class DateInputFormatting extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        order: DateOrder.YMD,
        separator: 'Dot',
        value: '21.12.2012',
      };
    }

    render() {
      return (
        <Gapped vertical gap={10}>
          <div>
            <span style={{ width: '300px', display: 'inline-block' }}>
              Порядок компонентов (<tt>DateOrder</tt>)
            </span>
            <Select
              value={this.state.order}
              items={Object.keys(DateOrder)}
              onValueChange={(order) => this.setState({ order })}
            />
          </div>
          <div>
            <span style={{ width: '300px', display: 'inline-block' }}>
              Разделитель (<tt>DateSeparator</tt>)
            </span>
            <Select
              value={this.state.separator}
              items={Object.keys(DateSeparator)}
              onValueChange={(separator) => this.setState({ separator })}
            />
          </div>
          <LocaleContext.Provider
            value={{
              locale: {
                DatePicker: {
                  separator: DateSeparator[this.state.separator],
                  order: this.state.order,
                },
              },
            }}
          >
            <DateInput onValueChange={(value) => this.setState({ value })} value={this.state.value} />
          </LocaleContext.Provider>
        </Gapped>
      );
    }
  }

  return <DateInputFormatting />;
};
Example5.storyName = 'Ручное форматирование даты';
