import React from 'react';
import {
  Button,
  Checkbox,
  ComboBox,
  DatePicker,
  Gapped,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switcher,
  Tabs,
  Toggle,
} from '@skbkontur/react-ui';
import { Meta, Story } from '@skbkontur/react-ui/typings/stories';

import { FeatureFlagToggle } from '../../../../.storybook-docs/FeatureFlagToggle';

import {
  ValidationBehaviour,
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
  const [isFlagEnabled, setIsFlagEnabled] = React.useState<boolean>(true);
  const container = React.useRef<ValidationContainer>(null);

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
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ValidationsFeatureFlagsContext.Provider value={{ hideTooltipOnSelectionControls: isFlagEnabled }}>
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
    </>
  );
};

export const ExampleCombobox: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState<boolean>(true);
  const [selected, setSelected] = React.useState<ComboBoxStoryState>({ value: 'one', label: 'one' });
  const container = React.useRef<ValidationContainer>(null);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ValidationsFeatureFlagsContext.Provider value={{ dropdownsDoNotOpenOnFocusByValidation: isFlagEnabled }}>
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
    </>
  );
};

export const ExampleDatePicker: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState<boolean>(true);
  const container = React.useRef<ValidationContainer>(null);
  const [value, setValue] = React.useState<Date | string | null>(null);

  async function handleSubmit() {
    await container.current?.validate();
  }

  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ValidationsFeatureFlagsContext.Provider value={{ dropdownsDoNotOpenOnFocusByValidation: isFlagEnabled }}>
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
    </>
  );
};

export const ValidateOnMount: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState<boolean>(true);
  const container = React.useRef<ValidationContainer>(null);

  async function handleSubmit(): Promise<void> {
    await container.current?.validate();
  }

  const [type, setType] = React.useState('submit');
  const [activeTab, setActiveTab] = React.useState<'phone' | 'email'>('phone');

  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [check, setCheck] = React.useState<boolean>(false);

  const errorInfo: ValidationInfo = {
    message: 'Заполните поле',
    type: type as ValidationBehaviour,
  };

  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ValidationsFeatureFlagsContext.Provider value={{ validationWrapperValidateOnMount: true }}>
        <ValidationContainer ref={container}>
          <Gapped gap={16} vertical>
            <Switcher onValueChange={setType} value={type} items={['submit', 'lostfocus', 'immediate']} />

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <Tabs.Tab id="phone">Phone</Tabs.Tab>
              <Tabs.Tab id="email">Email</Tabs.Tab>
            </Tabs>

            {activeTab === 'phone' && (
              <div>
                <ValidationWrapper validationInfo={phone ? null : errorInfo}>
                  <Input placeholder="Телефон" value={phone} onValueChange={setPhone} />
                </ValidationWrapper>
              </div>
            )}

            {activeTab === 'email' && (
              <div title="Email">
                <ValidationWrapper validationInfo={email ? null : errorInfo}>
                  <Input placeholder="Почта" value={email} onValueChange={setEmail} />
                </ValidationWrapper>
              </div>
            )}

            <ValidationWrapper validationInfo={check ? null : errorInfo}>
              <Checkbox checked={check} onValueChange={setCheck}>
                Чекбокс вне табов
              </Checkbox>
            </ValidationWrapper>

            <Button use={'primary'} onClick={handleSubmit}>
              Submit
            </Button>
          </Gapped>
        </ValidationContainer>
      </ValidationsFeatureFlagsContext.Provider>
    </>
  );
};
