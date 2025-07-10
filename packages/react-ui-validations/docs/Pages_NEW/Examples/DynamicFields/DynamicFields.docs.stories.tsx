import type { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Tabs } from '@skbkontur/react-ui/components/Tabs';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';

import type { ValidationBehaviour, ValidationInfo } from '../../../../src';
import { ValidationContainer, ValidationsFeatureFlagsContext, ValidationWrapper } from '../../../../src';

export default {
  title: 'Examples/Dynamic fields',
} as Meta;

export const DynamicFields: Story = () => {
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
  );
};
