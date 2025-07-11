import React from 'react';
import {
  Button,
  ComboBox,
  DateInput,
  DatePicker,
  RadioGroup,
  ReactUIFeatureFlagsContext,
  Tooltip,
} from '@skbkontur/react-ui';

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

Example2.storyName = 'dateInputFixSameNuberTypingOnRefocus';

export const Example3: Story = () => {
  const [value, setValue] = React.useState('01.02.2025');
  const [error, setError] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(false);
  const unvalidate = () => {
    setError(false);
    setTooltip(false);
  };
  const validate = () => {
    const errorNew = DatePicker.validate(value);
    setError(!errorNew);
    setTooltip(!errorNew);
  };
  const removeTooltip = () => setTooltip(false);
  return (
    <ReactUIFeatureFlagsContext.Provider value={{ dateInputAllowInvalidValuesInDays: true }}>
      <Tooltip trigger={tooltip ? 'opened' : 'closed'} render={() => 'Невалидная дата'} onCloseClick={removeTooltip}>
        <DatePicker
          error={error}
          value={value}
          onValueChange={setValue}
          onFocus={unvalidate}
          onBlur={validate}
          enableTodayLink
        />
      </Tooltip>
    </ReactUIFeatureFlagsContext.Provider>
  );
};

Example3.storyName = 'dateInputAllowInvalidValuesInDays';

export const Example4: Story = () => {
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

Example4.storyName = 'radioGroupRemoveBaselineSpacer';
