import { DateInput, DateOrder, DateSeparator, Gapped, LangCodes, LocaleContext, Select } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Date Components/DateInput',
  component: DateInput,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState<string | undefined>();

  return <DateInput value={value} onValueChange={setValue} />;
};

/** Проп `size` задаёт размер поля. */
export const ExampleSize: Story = () => {
  const [value, setValue] = React.useState<string | undefined>();

  return (
    <Gapped vertical>
      <DateInput value={value} onValueChange={setValue} size={'small'} />
      <DateInput value={value} onValueChange={setValue} size={'medium'} />
      <DateInput value={value} onValueChange={setValue} size={'large'} />
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `width` задаёт ширину поля. */
export const ExampleWidth: Story = () => {
  const [value, setValue] = React.useState<string | undefined>();

  return <DateInput value={value} onValueChange={setValue} width={250} />;
};
ExampleWidth.storyName = 'Ширина';

/** Проп `withIcon` добавляет иконку календаря в поле. */
export const ExampleWithIcon: Story = () => {
  const [value, setValue] = React.useState<string | undefined>();

  return <DateInput value={value} onValueChange={setValue} withIcon />;
};
ExampleWithIcon.storyName = 'Иконка календаря';

/** С помощью пропсов `minDate` и `maxDate` можно задавать минимально и максимально возможную дату для выбора в поле. Подняться выше или ниже установленных дат при использовании стрелок на клавиатуре у пользователя не получится, но сами по себе пропсы не блокируют ручной ввод и вставку дат в поле вне заданных рамок. */
export const ExampleMinMaxDate: Story = () => {
  const [date, setDate] = React.useState('01.01.2026');
  const [minDate] = React.useState('01.01.2000');
  const [maxDate] = React.useState('01.01.2050');

  return <DateInput value={date} onValueChange={setDate} minDate={minDate} maxDate={maxDate} />;
};
ExampleMinMaxDate.storyName = 'Минимальная и максимальная даты';

/** Проп `disabled` блокирует поле.  */
export const ExampleDisabled: Story = () => {
  return <DateInput disabled value="27.04.1992" />;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `error` переводит поле в состояние ошибки. */
export const ExampleError: Story = () => {
  return <DateInput error value="27.04.1992" />;
};
ExampleError.storyName = 'Состояние ошибки';

/** Проп `warning` переводит поле в состояние предупреждения. */
export const ExampleWarning: Story = () => {
  return <DateInput warning value="27.04.1992" />;
};
ExampleWarning.storyName = 'Состояние предупреждения';

/** Поле ввода даты может быть настроено с нужным порядком компонентов даты (год/месяц/день) и символом-разделителем. */
export const ExampleFormatting: Story = () => {
  class DateInputFormatting extends React.Component<
    Record<string, never>,
    { order: DateOrder; separator: keyof typeof DateSeparator; value: string }
  > {
    constructor(props: Record<string, never>) {
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
          <div>
            <span style={{ width: '300px', display: 'inline-block' }}>
              Порядок компонентов (<code>DateOrder</code>)
            </span>
            <Select
              value={this.state.order}
              items={Object.keys(DateOrder)}
              onValueChange={(order) => this.setState({ order })}
            />
          </div>
          <div>
            <span style={{ width: '300px', display: 'inline-block' }}>
              Разделитель (<code>DateSeparator</code>)
            </span>
            <Select
              value={this.state.separator}
              items={Object.keys(DateSeparator)}
              onValueChange={(separator) => this.setState({ separator })}
            />
          </div>
        </Gapped>
      );
    }
  }

  return <DateInputFormatting />;
};
ExampleFormatting.storyName = 'Форматирование даты';

/** Формат даты зависит от локали в `LangCodes`. */
export const ExampleFormattingLocale: Story = () => {
  class DateInputFormatting2 extends React.Component<Record<string, never>, { langCode: LangCodes; value: string }> {
    constructor(props: Record<string, never>) {
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
ExampleFormattingLocale.storyName = 'Форматирование даты при смене локали';
