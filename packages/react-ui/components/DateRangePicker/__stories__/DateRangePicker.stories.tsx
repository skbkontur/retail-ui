import React from 'react';
import { Story } from '@storybook/react';

import { Meta } from '../../../typings/stories';
import { DateRangePicker } from '../DateRangePicker';
import { Gapped } from '../../Gapped';
import { LangCodes, LocaleContext } from '../../../lib/locale';

export default {
  title: 'DateRangePicker',
} as Meta;

export const Component = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={setValue}>
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
  return (
    <>
      <Gapped vertical>
        <DateRangePicker size="large" value={valueL} onValueChange={setValueL}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>

        <DateRangePicker size="medium" value={valueM} onValueChange={setValueM}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>

        <DateRangePicker size="small" value={valueS} onValueChange={setValueS}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>
      </Gapped>
    </>
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

export const MenuAlign: Story = () => {
  return <></>;
};
MenuAlign.parameters = {};

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
DateRangePickerLocaleProvider.storyName = 'LocaleProvider';
DateRangePickerLocaleProvider.parameters = { creevey: { skip: true } };

export const Disabled: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={setValue}>
      <DateRangePicker.Start disabled />
      <DateRangePicker.Separator />
      <DateRangePicker.End disabled />
    </DateRangePicker>
  );
};
Disabled.parameters = {};

export const CustomChildren: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={setValue}>
      <Gapped vertical gap={4}>
        <DateRangePicker.Start />
        <DateRangePicker.End />
      </Gapped>
    </DateRangePicker>
  );
};
CustomChildren.storyName = 'CustomChildren';
CustomChildren.parameters = {};

export const Range: Story = () => {
  return <></>;
};
Range.parameters = {};
