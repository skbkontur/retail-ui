import { Gapped, TimePicker } from '@skbkontur/react-ui';
import { ValidationContainer, type ValidationInfo, ValidationWrapper } from '@skbkontur/react-ui-validations';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Input data/TimePicker',
  component: TimePicker,
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Внешняя валидация позволяет проверить, что обязательное поле времени заполнено. */
export const ExampleRequiredValidation: Story = () => {
  const [value, setValue] = React.useState('');

  const validateRequired = (currentValue: string): ValidationInfo | null => {
    if (!currentValue) {
      return { message: 'Укажите время', type: 'immediate' };
    }

    return null;
  };

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validateRequired(value)}>
        <TimePicker value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleRequiredValidation.storyName = 'Обязательное поле';

/** Внешняя валидация позволяет проверить, что значение времени попадает в допустимый диапазон. */
export const ExampleRangeValidation: Story = () => {
  const [value, setValue] = React.useState('07:30');

  const validateRange = (currentValue: string): ValidationInfo | null => {
    if (currentValue && !TimePicker.validate(currentValue, { minTime: '09:00', maxTime: '18:00' })) {
      return { message: 'Время должно быть в диапазоне с 09:00 до 18:00', type: 'immediate' };
    }

    return null;
  };

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validateRange(value)}>
        <TimePicker value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleRangeValidation.storyName = 'Допустимый диапазон';

export const ExampleValidation: Story = () => {
  const isValidBasic = TimePicker.validate('09:00');
  const isValidWithSecondsFormat = TimePicker.validate('14:00:30', { format: 'HH:mm:ss' });
  const isValidWithRangeFormat = TimePicker.validate('14:00', {
    format: 'HH:mm',
    minTime: '09:00:00',
    maxTime: '14:00:30',
  });

  const isInvalidTime = TimePicker.validate('25:88');
  const isInvalidWithSecondsFormat = TimePicker.validate('14:00', { format: 'HH:mm:ss' });
  const isInvalidValueFormatMismatch = TimePicker.validate('14:00:30', { format: 'HH:mm' });
  const isInvalidWithSecondsRangeFormat = TimePicker.validate('14:00:30', {
    format: 'HH:mm:ss',
    minTime: '09:00',
    maxTime: '14:00',
  });

  return (
    <Gapped vertical gap={16} style={{ fontFamily: 'monospace', fontSize: '14px' }}>
      <>
        TimePicker.validate('09:00')
        <br />
        {' => '}
        {String(isValidBasic)}
      </>
      <>
        TimePicker.validate('14:00:30', {'{'} format: 'HH:mm:ss' {'}'})
        <br />
        {' => '}
        {String(isValidWithSecondsFormat)}
      </>
      <>
        TimePicker.validate('14:00', {'{'} format: 'HH:mm', minTime: '09:00:00', maxTime: '14:00:30' {'}'})
        <br />
        {' => '}
        {String(isValidWithRangeFormat)}
      </>
      <br />
      <>
        TimePicker.validate('25:88')
        <br />
        {' => '}
        {String(isInvalidTime)}
      </>
      <>
        TimePicker.validate('14:00', {'{'} format: 'HH:mm:ss' {'}'})
        <br />
        {' => '}
        {String(isInvalidWithSecondsFormat)}
      </>
      <>
        TimePicker.validate('14:00:30', {'{'} format: 'HH:mm' {'}'})
        <br />
        {' => '}
        {String(isInvalidValueFormatMismatch)}
      </>
      <>
        TimePicker.validate('14:00:30', {'{'} format: 'HH:mm:ss', minTime: '09:00', maxTime: '14:00' {'}'})
        <br />
        {' => '}
        {String(isInvalidWithSecondsRangeFormat)}
      </>
    </Gapped>
  );
};
ExampleValidation.storyName = 'Валидация времени';
