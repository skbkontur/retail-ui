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
  return (
    <DateRangePicker onValueChange={console.log} />
  );
};
Component.storyName = 'DateRangePicker';
Component.parameters = {};

export const Mobile: Story = () => {
  return (
    <DateRangePicker onValueChange={console.log} />
  );
};
Mobile.parameters = { viewport: { defaultViewport: 'iphone' } };

export const Sizes: Story = () => {
  return (
    <>
      <Gapped vertical>
        <DateRangePicker onValueChange={console.log} size="large" />
        <DateRangePicker onValueChange={console.log} size="medium" />
        <DateRangePicker onValueChange={console.log} size="small" />
      </Gapped>
    </>
  );
};
Sizes.parameters = {};

export const MinMax: Story = () => {
  return (
    <DateRangePicker
      minDate="05.07.2024"
      maxDate="15.08.2024"
      onValueChange={console.log}
    />
  );
};
MinMax.parameters = {};

export const Autofocus: Story = () => {
  return (
    <DateRangePicker
      autoFocus
      onValueChange={console.log}
    />
  );
};
Autofocus.parameters = {};

export const MenuAlign: Story = () => {
  return (
    <>
    </>
  );
};
MenuAlign.parameters = {};

export const MenuPos: Story = () => {
  return (
    <Gapped vertical gap={16} style={{ margin: 120 }}>
      <DateRangePicker
        menuPos="top"
        onValueChange={console.log}
      />
      <DateRangePicker
        menuPos="bottom"
        onValueChange={console.log}
      />
    </Gapped>
  );
};
MenuPos.storyName = 'MenuPos';
MenuPos.parameters = {};

export const DateRangePickerLocaleProvider = () => {
  return (
    <div style={{ paddingTop: 200 }}>
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <DateRangePicker
          value="10.07.2024"
          minDate="05.07.2024"
          maxDate="30.08.2024"
          onValueChange={console.log}
        />
      </LocaleContext.Provider>
    </div>
  );
};
DateRangePickerLocaleProvider.storyName = 'LocaleProvider';
DateRangePickerLocaleProvider.parameters = { creevey: { skip: true } };

export const Disabled: Story = () => {
  return (
    <DateRangePicker onValueChange={() => void (0)} disabled />
  );
};
Disabled.storyName = 'Disabled';
Disabled.parameters = {};

export const CustomChildren: Story = () => {
  return (
    <DateRangePicker onValueChange={console.log}>
      <Gapped vertical gap={4}>
        <DateRangePicker.From />
        <DateRangePicker.To />
      </Gapped>
    </DateRangePicker>
  );
};
CustomChildren.storyName = 'CustomChildren';
CustomChildren.parameters = {};

export const Range: Story = () => {
  return (
    <>
    </>
  );
};
Range.parameters = {};
