import React from 'react';
import { Button, ComboBox, DateInput, RadioGroup, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [value, setValue] = React.useState({ value: '', label: '' });

  const handleValueChange = () => {
    setValue({ value: `Update ${new Date().toLocaleString()}`, label: `Update ${new Date().toLocaleString()}` });
  };

  const getItems = () =>
    Promise.resolve([
      { value: 'Первый', label: 'Первый' },
      { value: 'Второй', label: 'Второй' },
    ]);

  return (
    <ReactUIFeatureFlagsContext.Provider value={{ comboBoxAllowValueChangeInEditingState: true }}>
      <Button onClick={handleValueChange}>Обновить</Button>
      <ComboBox
        value={value}
        searchOnFocus={false}
        getItems={getItems}
        onValueChange={(value) => setValue(value)}
        onInputValueChange={(value) => {
          setValue({ value, label: value });
        }}
      />
    </ReactUIFeatureFlagsContext.Provider>
  );
};

Example1.storyName = 'comboBoxAllowValueChangeInEditingState';

export const Example2: Story = () => {
  const [value, setValue] = React.useState('');
  return (
    <ReactUIFeatureFlagsContext.Provider value={{ dateInputFixSameNuberTypingOnRefocus: true }}>
      <DateInput value={value} onValueChange={setValue} />
    </ReactUIFeatureFlagsContext.Provider>
  );
};

Example2.storyName = 'dateInputNewTypingBehaviour';

export const Example3: Story = () => {
  return (
    <ReactUIFeatureFlagsContext.Provider
      value={{
        radioGroupRemoveBaselineSpacer: true,
      }}
    >
      <div
        style={{
          background: '#ed3f3f',
          margin: '5px',
          display: 'inline-block',
        }}
      >
        <RadioGroup
          style={{
            background: 'white',
          }}
          name="number-simple"
          items={['One', 'Two', 'Three', 'Four']}
          defaultValue="One"
        />
      </div>
    </ReactUIFeatureFlagsContext.Provider>
  );
};

Example3.storyName = 'radioGroupRemoveBaselineSpacer';
