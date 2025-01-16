import React from 'react';
import { Story } from '@storybook/react';

import { Meta } from '../../../typings/stories';
import { DateRangePicker } from '../DateRangePicker';
import { Tooltip } from '../../Tooltip';
import { Gapped } from '../../Gapped';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeIn } from '../../../lib/theming/Theme';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default {
  title: 'DateRangePicker',
} as Meta;

export const Component = () => {
  const [value, setValue] = React.useState(['', '']);
  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      onValueChange={([start, end]) => setValue([start, end])}
    >
      <DateRangePicker.Start />
      <DateRangePicker.Separator />
      <DateRangePicker.End />
    </DateRangePicker>
  );
};
Component.storyName = 'DateRangePicker';
Component.parameters = {};

export const Mobile: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={setValue}>
      <DateRangePicker.Start />
      <DateRangePicker.Separator />
      <DateRangePicker.End />
    </DateRangePicker>
  );
};
Mobile.parameters = { viewport: { defaultViewport: 'iphone' } };

export const Sizes: Story = () => {
  const [valueS, setValueS] = React.useState(['', '']);
  const [valueM, setValueM] = React.useState(['', '']);
  const [valueL, setValueL] = React.useState(['', '']);

  const theme = React.useContext(ThemeContext);
  const createTheme = (tokens: ThemeIn) => ThemeFactory.create(tokens, theme);

  return (
    <Gapped vertical gap={16}>
      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '44px', calendarCellHeight: '44px' })}>
        <DateRangePicker size="large" value={valueL} onValueChange={setValueL}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>
      </ThemeContext.Provider>

      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '36px', calendarCellHeight: '36px' })}>
        <DateRangePicker size="medium" value={valueM} onValueChange={setValueM}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>
      </ThemeContext.Provider>
      <DateRangePicker size="small" value={valueS} onValueChange={setValueS}>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>
    </Gapped>
  );
};
Sizes.parameters = {};

export const MinMax: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} minDate="05.07.2024" maxDate="15.08.2024" onValueChange={setValue}>
      <DateRangePicker.Start />
      <DateRangePicker.Separator />
      <DateRangePicker.End />
    </DateRangePicker>
  );
};
MinMax.parameters = {};

export const Autofocus: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={setValue} autoFocus>
      <DateRangePicker.Start />
      <DateRangePicker.Separator />
      <DateRangePicker.End />
    </DateRangePicker>
  );
};
Autofocus.parameters = {};

export const MenuPos: Story = () => {
  const [valueTop, setValueTop] = React.useState(['', '']);
  const [valueBottom, setValueBottom] = React.useState(['', '']);

  return (
    <Gapped vertical gap={16} style={{ margin: 120 }}>
      <DateRangePicker menuPos="top" value={valueTop} onValueChange={setValueTop}>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>

      <DateRangePicker menuPos="bottom" value={valueBottom} onValueChange={setValueBottom}>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>
    </Gapped>
  );
};
MenuPos.parameters = {};

export const DateRangePickerLocaleProvider = () => {
  return (
    <div style={{ paddingTop: 200 }}>
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <DateRangePicker value={['', '']} onValueChange={console.log}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>
      </LocaleContext.Provider>
    </div>
  );
};
DateRangePickerLocaleProvider.parameters = { creevey: { skip: true } };

export const Disabled: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={setValue} disabled={[true, true]}>
      <DateRangePicker.Start />
      <DateRangePicker.Separator />
      <DateRangePicker.End />
    </DateRangePicker>
  );
};
Disabled.parameters = {};

export const OptionalRange: Story = () => {
  const [value1, setValue1] = React.useState(['', '']);
  const [value2, setValue2] = React.useState(['', '']);
  const [value3, setValue3] = React.useState(['', '']);

  return (
    <Gapped vertical gap={16}>
      <DateRangePicker optional={[false, false]} value={value1} onValueChange={setValue1}>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>

      <DateRangePicker optional={[true, true]} value={value2} onValueChange={setValue2}>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>

      <DateRangePicker optional={[true, true]} value={value3} onValueChange={setValue3}>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>
    </Gapped>
  );
};
OptionalRange.parameters = {};

export const CustomChildrenWithoutDash: Story = () => {
  const [value, setValue] = React.useState(['', '']);
  return (
    <DateRangePicker value={value} onValueChange={setValue}>
      <DateRangePicker.Start style={{ borderRadius: 0 }} />
      <DateRangePicker.End style={{ marginLeft: -1, borderRadius: 0 }} />
    </DateRangePicker>
  );
};
CustomChildrenWithoutDash.parameters = {};

export const CustomChildrenVertical: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={([start, end]) => setValue([start, end])}>
      <Gapped gap={4} vertical>
        <DateRangePicker.Start />
        <DateRangePicker.End />
      </Gapped>
    </DateRangePicker>
  );
};
CustomChildrenVertical.parameters = {};

export const Validations: Story = () => {
  const [value, setValue] = React.useState(['', '']);
  const [error, setError] = React.useState([false, false]);
  const minDate = '10.10.2018';
  const maxDate = '13.11.2024';

  const [startError, endError] = error;

  const validate = () => {
    if (!value[0] || !value[1]) {
      return;
    }
    const [start, end] = DateRangePicker.validate(value, { minDate, maxDate });
    setError([!start, !end]);
  };

  const unvalidate = () => {
    setError([false, false]);
  };

  const tooltipProps = {
    render: () => (
      <>
        Укажите дату в промежутке
        <br />
        {minDate}—{maxDate}
        <br />в формате ДД.ММ.ГГГГ
      </>
    ),
    pos: 'top left',
    closeButton: false,
  };

  return (
    <DateRangePicker
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      error={error}
      onValueChange={setValue}
      onFocus={unvalidate}
      onBlur={validate}
    >
      <Tooltip trigger={startError && !endError ? 'opened' : 'closed'} {...tooltipProps}>
        <DateRangePicker.Start />
      </Tooltip>
      <DateRangePicker.Separator />
      <Tooltip trigger={endError ? 'opened' : 'closed'} {...tooltipProps}>
        <DateRangePicker.End />
      </Tooltip>
    </DateRangePicker>
  );
};
Validations.parameters = {};
