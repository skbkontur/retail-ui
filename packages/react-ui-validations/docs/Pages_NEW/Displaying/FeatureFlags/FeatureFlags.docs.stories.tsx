import React from 'react';
import {
  Button,
  Checkbox,
  ComboBox,
  DatePicker,
  Gapped,
  Radio,
  RadioGroup,
  Select,
  Switcher,
  Toggle,
} from '@skbkontur/react-ui';
import { Meta, Story } from '@skbkontur/react-ui/typings/stories';

import {
  ValidationContainer,
  ValidationInfo,
  ValidationsFeatureFlagsContext,
  ValidationWrapper,
} from '../../../../src';

export default {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
} as Meta;

interface ComboBoxStoryState {
  value: string;
  label: string;
}

export const ExampleSelection: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [useFlag, setUseFlag] = React.useState<boolean>(false);

  const [combobox, setCombobox] = React.useState<ComboBoxStoryState>();
  const [radioGroup, setRadioGroup] = React.useState<string>('');
  const [radio, setRadio] = React.useState<string>('');
  const [checkbox, setCheckbox] = React.useState<boolean>(false);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [switcher, setSwitcher] = React.useState<string>('');
  const [select, setSelect] = React.useState<string>();

  async function handleSubmit() {
    await container.current?.validate();
  }

  const validation: ValidationInfo = { message: 'Выбери значение', type: 'submit' };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ paddingBottom: 24, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Toggle checked={useFlag} onValueChange={setUseFlag}>
          Включить флаг hideTooltipOnSelectionControls
        </Toggle>
      </div>
      <ValidationsFeatureFlagsContext.Provider value={{ hideTooltipOnSelectionControls: useFlag }}>
        <ValidationContainer ref={container}>
          <Gapped vertical gap={32}>
            <ValidationWrapper validationInfo={validation}>
              <RadioGroup
                value={radioGroup}
                items={['radio group value 1', 'radio group value 2']}
                onValueChange={setRadioGroup}
              />
            </ValidationWrapper>
            <ValidationWrapper validationInfo={validation}>
              <Radio
                checked={radio === '1'}
                value="1"
                onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                  if ('checked' in event.target && event.target.checked) {
                    setRadio('');
                  }
                }}
                onValueChange={setRadio}
              >
                radio value
              </Radio>
            </ValidationWrapper>
            <ValidationWrapper validationInfo={validation}>
              <Checkbox checked={checkbox} onValueChange={setCheckbox}>
                checkbox value
              </Checkbox>
            </ValidationWrapper>
            <ValidationWrapper validationInfo={validation}>
              <Toggle checked={toggle} onValueChange={setToggle}>
                toggle value
              </Toggle>
            </ValidationWrapper>
            <div style={{ display: 'inline-block' }}>
              <ValidationWrapper validationInfo={validation}>
                <Switcher
                  value={switcher}
                  items={['switcher value 1', 'switcher value 2']}
                  onValueChange={setSwitcher}
                />
              </ValidationWrapper>
            </div>
            <ValidationWrapper validationInfo={validation}>
              <Select value={select} items={['select value 1', 'select value 2']} onValueChange={setSelect} />
            </ValidationWrapper>
            <ValidationWrapper validationInfo={validation}>
              <ComboBox
                value={combobox}
                getItems={() => Promise.resolve([{ value: 'combobox value', label: 'combobox value' }])}
                onValueChange={setCombobox}
              />
            </ValidationWrapper>
          </Gapped>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
      <div style={{ paddingTop: 48 }}>
        <Button onClick={handleSubmit}>Call submit</Button>
      </div>
    </div>
  );
};

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
        <Toggle checked={useFlag} onValueChange={setUseFlag}>
          Включить флаг dropdownsDoNotOpenOnFocusByValidation
        </Toggle>
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
        <Toggle checked={useFlag} onValueChange={setUseFlag}>
          Включить флаг dropdownsDoNotOpenOnFocusByValidation
        </Toggle>
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
