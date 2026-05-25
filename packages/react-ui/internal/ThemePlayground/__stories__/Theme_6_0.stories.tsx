import type { JSX } from 'react';
import React from 'react';

import { Autocomplete } from '../../../components/Autocomplete/Autocomplete.js';
import { Calendar } from '../../../components/Calendar/Calendar.js';
import { ComboBox } from '../../../components/ComboBox/ComboBox.js';
import { DatePicker } from '../../../components/DatePicker/DatePicker.js';
import { DateRangePicker } from '../../../components/DateRangePicker/DateRangePicker.js';
import { Select } from '../../../components/Select/Select.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { LIGHT_THEME_6_0 } from '../../../lib/theming/themes/LightTheme.js';
import type { Story, Meta } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/utility-types.js';

const mobileDecorator = (Story: () => JSX.Element) => (
  <div
    style={{
      width: '100%',
      minHeight: '100vh',
      boxSizing: 'border-box',
    }}
  >
    <Story />
  </div>
);

const mobileChromeParameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

const meta: Meta = {
  title: 'ThemeVersions/6_0',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_6_0}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
};

export default meta;

export const Calendar6_0: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');
  return <Calendar value={date} onValueChange={setDate} />;
};
Calendar6_0.storyName = 'Calendar 6.0';
Calendar6_0.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome2022)\b)/ },
    },
  },
};

export const AutocompleteMobile6_0: Story = () => {
  const items = ['Абакан', 'Алексин', 'Алматы', 'Альметьевск', 'Алтайский край', 'Амурская область'];
  const [value, setValue] = React.useState('');
  return <Autocomplete source={items} value={value} onValueChange={setValue} placeholder="Введите город на букву А" />;
};
AutocompleteMobile6_0.storyName = 'Autocomplete mobile 6.0';
AutocompleteMobile6_0.parameters = mobileChromeParameters;
AutocompleteMobile6_0.decorators = [mobileDecorator];

export const SelectMobile6_0: Story = () => {
  const [value, setValue] = React.useState<string | undefined>();
  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];
  return <Select search items={items} value={value} onValueChange={setValue} />;
};
SelectMobile6_0.storyName = 'Select mobile 6.0';
SelectMobile6_0.parameters = mobileChromeParameters;
SelectMobile6_0.decorators = [mobileDecorator];

export const DatePickerMobile6_0: Story = () => {
  const [date, setDate] = React.useState('02.07.2017');
  return <DatePicker value={date} onValueChange={setDate} enableTodayLink />;
};
DatePickerMobile6_0.storyName = 'DatePicker mobile 6.0';
DatePickerMobile6_0.parameters = mobileChromeParameters;
DatePickerMobile6_0.decorators = [mobileDecorator];

export const DateRangePickerMobile6_0: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} />
    </DateRangePicker>
  );
};
DateRangePickerMobile6_0.storyName = 'DateRangePicker mobile 6.0';
DateRangePickerMobile6_0.parameters = mobileChromeParameters;
DateRangePickerMobile6_0.decorators = [mobileDecorator];

interface ComboBoxBasicSelected {
  value: number;
  label: string;
}

const getComboBoxBasicItems = (q: string): Promise<ComboBoxBasicSelected[]> =>
  Promise.resolve(
    [
      { value: 1, label: 'Абакан' },
      { value: 2, label: 'Алексин' },
      { value: 3, label: 'Алматы' },
      { value: 4, label: 'Альметьевск' },
      { value: 5, label: 'Алтайский край' },
      { value: 6, label: 'Амурская область' },
      { value: 7, label: 'Анадырь' },
      { value: 8, label: 'Анапа' },
      { value: 9, label: 'Архангельск' },
      { value: 10, label: 'Архангельская область' },
      { value: 11, label: 'Астраханская область' },
      { value: 12, label: 'Астрахань' },
    ].filter((x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
  );

export const ComboBoxMobile6_0: Story = () => {
  const [selected, setSelected] = React.useState<Nullable<ComboBoxBasicSelected>>({
    value: 3,
    label: 'Third',
  });

  const handleValueChange = (value: ComboBoxBasicSelected) => {
    setSelected(value);
  };

  const handleUnexpectedInput = () => {
    setSelected(null);
  };

  return (
    <ComboBox<ComboBoxBasicSelected>
      getItems={getComboBoxBasicItems}
      onValueChange={handleValueChange}
      onUnexpectedInput={handleUnexpectedInput}
      placeholder="Введите или выберите из списка"
      value={selected}
    />
  );
};
ComboBoxMobile6_0.storyName = 'ComboBox mobile 6.0';
ComboBoxMobile6_0.parameters = mobileChromeParameters;
ComboBoxMobile6_0.decorators = [mobileDecorator];
