import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/ComboBox';
import { Button, Toggle } from '@skbkontur/react-ui';
import { DatePicker as BaseDatePicker } from '@skbkontur/react-ui/components/DatePicker';

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
  const [useFlag, setUseFlag] = useState<boolean>(false);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ paddingBottom: 24, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Toggle checked={useFlag} onValueChange={setUseFlag} />
        <span>flag dropdownsDoNotOpenOnFocusByValidation</span>
      </div>
      <ValidationsFeatureFlagsContext.Provider value={{ dropdownsDoNotOpenOnFocusByValidation: useFlag }}>
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
      </ValidationsFeatureFlagsContext.Provider>
      <div style={{ paddingTop: 48 }}>
        <Button onClick={handleSubmit}>Call submit</Button>
      </div>
    </div>
  );
};

export const DatePicker = () => {
  const container = useRef<ValidationContainer>(null);
  const [value, setValue] = useState<Date | string | null>(null);
  const [useFlag, setUseFlag] = useState<boolean>(false);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ paddingBottom: 24, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Toggle checked={useFlag} onValueChange={setUseFlag} />
        <span>flag dropdownsDoNotOpenOnFocusByValidation</span>
      </div>
      <ValidationsFeatureFlagsContext.Provider value={{ dropdownsDoNotOpenOnFocusByValidation: useFlag }}>
        <ValidationContainer ref={container}>
          <ValidationWrapper
            validationInfo={{
              message: 'Всегда невалидно',
              type: 'immediate',
            }}
          >
            <BaseDatePicker value={value as any} onValueChange={setValue} />
          </ValidationWrapper>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
      <div style={{ paddingTop: 48 }}>
        <Button onClick={handleSubmit}>Call submit</Button>
      </div>
    </div>
  );
};
