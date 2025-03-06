import React from 'react';
import { Button, ComboBox, DatePicker, Toggle } from '@skbkontur/react-ui';
import { Meta, Story } from '@skbkontur/react-ui/typings/stories';

import { ValidationContainer, ValidationsFeatureFlagsContext, ValidationWrapper } from '../../../../src';

export default {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
} as Meta;

interface ComboBoxStoryState {
  value: string;
  label: string;
}

export const ExampleCombobox: Story = () => {
  const [selected, setSelected] = React.useState<ComboBoxStoryState>({ value: 'one', label: 'one' });
  const container = React.useRef<ValidationContainer>(null);
  const [useFlag, setUseFlag] = React.useState<boolean>(false);

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

export const ExampleDatePicker: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [value, setValue] = React.useState<Date | string | null>(null);
  const [useFlag, setUseFlag] = React.useState<boolean>(false);

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
            <DatePicker value={value as any} onValueChange={setValue} />
          </ValidationWrapper>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
      <div style={{ paddingTop: 48 }}>
        <Button onClick={handleSubmit}>Call submit</Button>
      </div>
    </div>
  );
};
