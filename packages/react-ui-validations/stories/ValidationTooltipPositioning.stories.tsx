import { Autocomplete } from '@skbkontur/react-ui/components/Autocomplete/Autocomplete';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/ComboBox';
import { CurrencyInput } from '@skbkontur/react-ui/components/CurrencyInput/CurrencyInput';
import { DateInput } from '@skbkontur/react-ui/components/DateInput/DateInput';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker/DatePicker';
import { FxInput } from '@skbkontur/react-ui/components/FxInput/FxInput';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { MaskedInput } from '@skbkontur/react-ui/components/MaskedInput/MaskedInput';
import { PasswordInput } from '@skbkontur/react-ui/components/PasswordInput/PasswordInput';
import { Select } from '@skbkontur/react-ui/components/Select/Select';
import { Textarea } from '@skbkontur/react-ui/components/Textarea/Textarea';
import type { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { ValidationContainer, ValidationWrapper, tooltip } from '../index.js';
import type { ValidationInfo } from '../index.js';
import type { Story } from '../typings/stories.js';
import type { Nullable } from '../typings/Types.js';

const meta: Meta = {
  title: 'ValidationTooltip positioning',
};

export default meta;

const validationInfo: ValidationInfo = { message: 'Ошибка!', type: 'submit' };

const autocompleteItems = ['Москва', 'Санкт-Петербург', 'Казань'];

const CustomInput = (props: React.ComponentProps<typeof Input>) => <Input {...props} />;

interface ComboBoxValue {
  value: string;
  label: string;
}

const comboboxItems: ComboBoxValue[] = [
  { value: 'one', label: 'one' },
  { value: 'two', label: 'two' },
];

function renderWrapper(control: React.ReactElement) {
  return (
    <ValidationWrapper renderMessage={tooltip('left middle')} validationInfo={validationInfo}>
      {control}
    </ValidationWrapper>
  );
}

function PositioningStory({ children }: { children: React.ReactNode }) {
  const refContainer = useRef<ValidationContainer>(null);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    refContainer.current?.submit();
  };

  return (
    <form style={{ width: '600px', paddingTop: 20 }} onSubmit={submitForm}>
      <ValidationContainer ref={refContainer}>{children}</ValidationContainer>
      <br />
      <Button data-tid="validation-tooltip-submit" use="success" width="100%" type="submit">
        Submit
      </Button>
    </form>
  );
}

export const CustomInputControl: Story = () => (
  <PositioningStory>
    {renderWrapper(<CustomInput data-tid="validation-tooltip-custom-input" width="100%" placeholder="CustomInput" />)}
  </PositioningStory>
);

export const InputControl: Story = () => (
  <PositioningStory>
    {renderWrapper(<Input data-tid="validation-tooltip-input" width="100%" placeholder="Input" />)}
  </PositioningStory>
);

export const TextareaControl: Story = () => (
  <PositioningStory>
    {renderWrapper(<Textarea data-tid="validation-tooltip-textarea" width="100%" rows={2} placeholder="Textarea" />)}
  </PositioningStory>
);

export const PasswordInputControl: Story = () => {
  const [value, setValue] = useState('');

  return (
    <PositioningStory>
      {renderWrapper(
        <PasswordInput
          data-tid="validation-tooltip-password-input"
          width="100%"
          placeholder="PasswordInput"
          value={value}
          onValueChange={setValue}
        />,
      )}
    </PositioningStory>
  );
};

export const CurrencyInputControl: Story = () => {
  const [value, setValue] = useState<Nullable<number>>(null);

  return (
    <PositioningStory>
      {renderWrapper(
        <CurrencyInput
          data-tid="validation-tooltip-currency-input"
          width="100%"
          placeholder="CurrencyInput"
          value={value}
          onValueChange={setValue}
        />,
      )}
    </PositioningStory>
  );
};

export const MaskedInputControl: Story = () => {
  const [value, setValue] = useState('');

  return (
    <PositioningStory>
      {renderWrapper(
        <MaskedInput
          data-tid="validation-tooltip-masked-input"
          width="100%"
          mask="99.99.999-9"
          placeholder="MaskedInput"
          value={value}
          onValueChange={setValue}
        />,
      )}
    </PositioningStory>
  );
};

export const FxInputControl: Story = () => {
  const [value, setValue] = useState<string | number>('');

  return (
    <PositioningStory>
      {renderWrapper(
        <FxInput
          data-tid="validation-tooltip-fx-input"
          width="100%"
          placeholder="FxInput"
          value={value}
          onValueChange={setValue}
        />,
      )}
    </PositioningStory>
  );
};

export const DateInputControl: Story = () => {
  const [value, setValue] = useState('');

  return (
    <PositioningStory>
      {renderWrapper(
        <DateInput data-tid="validation-tooltip-date-input" width="100%" value={value} onValueChange={setValue} />,
      )}
    </PositioningStory>
  );
};

export const SelectControl: Story = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <PositioningStory>
      {renderWrapper(
        <Select
          data-tid="validation-tooltip-select"
          width="100%"
          placeholder="Select"
          items={['Первый', 'Второй', 'Третий']}
          value={value}
          onValueChange={setValue}
        />,
      )}
    </PositioningStory>
  );
};

export const ComboBoxControl: Story = () => {
  const [value, setValue] = useState<ComboBoxValue | null>(null);

  return (
    <PositioningStory>
      {renderWrapper(
        <ComboBox
          data-tid="validation-tooltip-combobox"
          width="100%"
          placeholder="ComboBox"
          value={value}
          getItems={() => Promise.resolve(comboboxItems)}
          onValueChange={setValue}
        />,
      )}
    </PositioningStory>
  );
};

export const AutocompleteControl: Story = () => {
  const [value, setValue] = useState('');

  return (
    <PositioningStory>
      {renderWrapper(
        <Autocomplete
          data-tid="validation-tooltip-autocomplete"
          width="100%"
          placeholder="Autocomplete"
          source={autocompleteItems}
          value={value}
          onValueChange={setValue}
        />,
      )}
    </PositioningStory>
  );
};

export const DatePickerControl: Story = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <PositioningStory>
      {renderWrapper(
        <DatePicker data-tid="validation-tooltip-date-picker" width="100%" value={value} onValueChange={setValue} />,
      )}
    </PositioningStory>
  );
};
