import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/ComboBox';
import { Button } from '@skbkontur/react-ui';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';

import { ValidationContainer, ValidationsFeatureFlagsContext, ValidationWrapper } from '../src';

export default {
  title: 'DropdownOnSubmit',
  parameters: { creevey: { skip: true } },
} as Meta;

interface ComboBoxStoryState {
  value: string;
  label: string;
}

export const Combobox = () => {
  const [selected, setSelected] = useState<ComboBoxStoryState>({ value: 'one', label: 'one' });
  const container = useRef<ValidationContainer>(null);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <div style={{ padding: 20, width: 550, height: 100 }}>
      <Button onClick={handleSubmit}>Call submit</Button>
      <ValidationContainer ref={container}>
        <ValidationWrapper
          validationInfo={{
            message: 'Всегда невалидно',
            type: 'immediate',
          }}
        >
          <ComboBox
            onValueChange={setSelected}
            value={selected}
            getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])}
          />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};

export const ComboboxWithFlagIgnoreOpenDropdownOnSubmitValidation = () => {
  const [selected, setSelected] = useState<ComboBoxStoryState>({ value: 'one', label: 'one' });
  const container = useRef<ValidationContainer>(null);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <div style={{ padding: 20, width: 550, height: 100 }}>
      <Button onClick={handleSubmit}>Call submit</Button>
      <ValidationsFeatureFlagsContext.Provider value={{ ignoreOpenDropdownOnSubmitValidation: true }}>
        <ValidationContainer ref={container}>
          <ValidationWrapper
            validationInfo={{
              message: 'Всегда невалидно',
              type: 'immediate',
            }}
          >
            <ComboBox
              getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])}
              onValueChange={setSelected}
              value={selected}
            />
          </ValidationWrapper>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
    </div>
  );
};

export const BaseDatePicker = () => {
  const container = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<Date | string | null>(null);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <div style={{ padding: 20, width: 550, height: 100 }}>
      <Button onClick={handleSubmit}>Call submit</Button>
      <ValidationContainer ref={container}>
        <ValidationWrapper
          validationInfo={{
            message: 'Всегда невалидно',
            type: 'immediate',
          }}
        >
          <DatePicker value={value as any} onValueChange={setValue} />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};

export const BaseDatePickerWithFlagIgnoreOpenDropdownOnSubmitValidation = () => {
  const container = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<Date | string | null>(null);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <div style={{ padding: 20, width: 550, height: 100 }}>
      <Button onClick={handleSubmit}>Call submit</Button>
      <ValidationsFeatureFlagsContext.Provider value={{ ignoreOpenDropdownOnSubmitValidation: true }}>
        <ValidationContainer ref={container}>
          <ValidationWrapper
            validationInfo={{
              message: 'Всегда невалидно',
              type: 'immediate',
            }}
          >
            <DatePicker value={value as any} onValueChange={setValue} />
          </ValidationWrapper>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
    </div>
  );
};
