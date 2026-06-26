import { IconTimeClockStopwatchLight16 } from '@skbkontur/icons/IconTimeClockStopwatchLight16';
import { IconTimeClockStopwatchLight20 } from '@skbkontur/icons/IconTimeClockStopwatchLight20';
import { IconTimeClockStopwatchRegular24 } from '@skbkontur/icons/IconTimeClockStopwatchRegular24';
import React from 'react';

import { iconSizer } from '../../../internal/icons2022/iconSizer.js';
import type { Meta, Story } from '../../../typings/stories.js';
import { Gapped } from '../../Gapped/index.js';
import type { TimePickerProps } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';

const meta: Meta = {
  title: 'TimePicker',
  component: TimePicker,
  parameters: {
    creevey: {
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    },
  },
};

export default meta;

const ControlledTimePicker = (props: TimePickerProps) => {
  const [value, setValue] = React.useState(props.value ?? '');

  return <TimePicker {...props} value={value} onValueChange={setValue} />;
};

const renderSizes = (props: TimePickerProps) => (
  <Gapped gap={24}>
    <ControlledTimePicker {...props} size={'small'} />
    <ControlledTimePicker {...props} size={'medium'} />
    <ControlledTimePicker {...props} size={'large'} />
  </Gapped>
);

export const States: Story = () => (
  <Gapped vertical>
    Состояния
    {renderSizes({})}
    {renderSizes({ value: '12:30' })}
    {renderSizes({ value: '12:30', error: true })}
    {renderSizes({ value: '12:30', warning: true })}
    {renderSizes({ value: '12:30', disabled: true })}
  </Gapped>
);

States.storyName = 'States';

export const Formats: Story = () => (
  <Gapped vertical gap={24}>
    Формат 'HH:mm'
    {renderSizes({ format: 'HH:mm' })}
    Формат 'HH:mm:ss'
    {renderSizes({ format: 'HH:mm:ss' })}
  </Gapped>
);

Formats.storyName = 'Formats';

export const Items: Story = () => {
  const items = [
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00' },
    { value: '11:00' },
    { value: '12:00' },
    { value: '13:00' },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00' },
    { value: '17:00' },
    { value: '18:00' },
    { value: '19:00' },
    { value: '20:00' },
  ];

  return (
    <Gapped vertical gap={24}>
      Массив элементов в выпадающем меню
      {renderSizes({ items: items })}
    </Gapped>
  );
};

Items.storyName = 'Items';

export const ItemsWithInfo: Story = () => {
  const items = [
    { value: '08:00', label: '30 мин' },
    { value: '08:30', label: '1 ч' },
    { value: '09:00', label: '1 ч 30 мин' },
    { value: '09:30', label: '2 ч' },
    { value: '10:00', label: '2 ч 30 мин' },
    { value: '10:30', label: '3 ч' },
    { value: '11:00', label: '3 ч 30 мин' },
    { value: '11:30', label: '4 ч' },
    { value: '12:00', label: '4 ч 30 мин' },
    { value: '12:30', label: '5 ч' },
    { value: '13:00', label: '5 ч 30 мин' },
    { value: '13:30', label: '6 ч' },
    { value: '14:00', label: '6 ч 30 мин' },
    { value: '14:30', label: '7 ч' },
    { value: '15:00', label: '7 ч 30 мин' },
    { value: '15:30', label: '8 ч' },
    { value: '16:00', label: '8 ч 30 мин' },
    { value: '16:30', label: '9 ч' },
    { value: '17:00', label: '9 ч 30 мин' },
    { value: '17:30', label: '10 ч' },
    { value: '18:00', label: '10 ч 30 мин' },
    { value: '18:30', label: '11 ч' },
    { value: '19:00', label: '11 ч 30 мин' },
    { value: '19:30', label: '12 ч' },
    { value: '20:00', label: '12 ч 30 мин' },
  ];

  return (
    <Gapped vertical gap={24}>
      Массив элементов в выпадающем меню с дополнительной информацией
      {renderSizes({ items: items })}
    </Gapped>
  );
};

ItemsWithInfo.storyName = 'ItemsWithInfo';

export const DisabledItems: Story = () => {
  const items = [
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00', disabled: true },
    { value: '11:00' },
    { value: '12:00' },
    { value: '13:00', disabled: true },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00', disabled: true },
    { value: '17:00' },
    { value: '18:00' },
    { value: '19:00', disabled: true },
    { value: '20:00' },
  ];

  return (
    <Gapped vertical gap={24}>
      Массив элементов в выпадающем меню с заблокированными значениями
      {renderSizes({ items: items })}
    </Gapped>
  );
};

DisabledItems.storyName = 'DisabledItems';

export const ItemsWithMinMax: Story = () => {
  const items = [
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00' },
    { value: '11:00' },
    { value: '12:00' },
    { value: '13:00' },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00' },
    { value: '17:00' },
    { value: '18:00' },
    { value: '19:00' },
    { value: '20:00' },
  ];

  return (
    <Gapped vertical gap={24}>
      Ограничение выбора элементов выпадающего меню через minTime и maxTime
      {renderSizes({ minTime: '12:00', maxTime: '16:00', items: items })}
    </Gapped>
  );
};

ItemsWithMinMax.storyName = 'ItemsWithMinMax';

export const RightIconAndSuffix: Story = () => {
  const CustomTimeIcon = iconSizer(
    {
      small: () => <IconTimeClockStopwatchLight16 />,
      medium: () => <IconTimeClockStopwatchLight20 />,
      large: () => <IconTimeClockStopwatchRegular24 />,
    },
    'CustomTimeIcon',
  );

  return (
    <Gapped vertical gap={24}>
      Без иконки
      {renderSizes({ value: '12:30', rightIcon: null })}С кастомной иконкой
      {renderSizes({ value: '12:30', rightIcon: <CustomTimeIcon /> })}С suffix
      {renderSizes({ value: '12:30', rightIcon: null, suffix: 'МСК' })}С кастомной иконкой и suffix
      {renderSizes({ value: '12:30', rightIcon: <CustomTimeIcon />, suffix: 'МСК' })}
    </Gapped>
  );
};

RightIconAndSuffix.storyName = 'RightIconAndSuffix';

export const MobileTimePicker: Story = () => {
  const items = [
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00' },
    { value: '11:00', disabled: true },
    { value: '12:00' },
    { value: '13:00' },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00' },
  ];

  return (
    <Gapped vertical gap={24}>
      Мобильный TimePicker с инпутом над элементами
      {renderSizes({ items: items, value: '12:30' })}
    </Gapped>
  );
};

MobileTimePicker.storyName = 'MobileTimePicker';
MobileTimePicker.parameters = {
  creevey: { skip: true },
  viewport: {
    defaultViewport: 'iphone',
  },
};
