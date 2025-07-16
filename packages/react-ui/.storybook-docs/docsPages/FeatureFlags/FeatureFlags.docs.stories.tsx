import React from 'react';
import {
  Button,
  ComboBox,
  DateInput,
  DatePicker,
  Gapped,
  RadioGroup,
  ReactUIFeatureFlagsContext,
  Sticky,
  Tooltip,
} from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';
import { emit } from '../../../lib/LayoutEvents';

export default {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ComboBoxAllowValueChangeInEditingState: Story = () => {
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
      <Gapped>
        <ComboBox
          value={value}
          searchOnFocus={false}
          getItems={getItems}
          onValueChange={(value) => setValue(value)}
          onInputValueChange={(value) => {
            setValue({ value, label: value });
          }}
        />
        <Button onClick={handleValueChange}>Обновить</Button>
      </Gapped>
    </ReactUIFeatureFlagsContext.Provider>
  );
};

export const DateInputFixSameNumberTypingOnRefocus: Story = () => {
  const [value, setValue] = React.useState('');
  return (
    <ReactUIFeatureFlagsContext.Provider value={{ dateInputFixSameNumberTypingOnRefocus: true }}>
      <DateInput value={value} onValueChange={setValue} />
    </ReactUIFeatureFlagsContext.Provider>
  );
};

export const DateInputAllowInvalidValuesInDays: Story = () => {
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

export const StickyReduceLayoutEvents: Story = () => {
  const [sticky, setSticky] = React.useState(false);
  const [stickyOffset, setStickyOffset] = React.useState(8);
  const [flag, setFlag] = React.useState(true);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const toggleSticky = () => setSticky(!sticky);
  const toggleFlag = () => setFlag(!flag);
  const handleOffsetChange = () => setStickyOffset(Math.random() * 200);
  // Tooltip не должен перерисовываться, чтобы демонстрировать эффект отставания
  // т.е. его пропы и children не должны меняться
  const renderTooltip = React.useCallback(() => 'Tooltip, который отстает при включенном флаге', []);

  const content = (
    <div ref={setAnchor} style={{ display: 'inline-flex', gap: 8 }}>
      <Button onClick={toggleSticky}>1. {sticky ? 'Выключить' : 'Включить'} Sticky</Button>
      <Button onClick={handleOffsetChange}>2. Сместить кнопки</Button>
      <Button onClick={emit}>3. Поправить Tooltip</Button>
      <Button onClick={toggleFlag}>4. {flag ? 'Выключить' : 'Включить'} флаг</Button>
    </div>
  );

  return (
    <div>
      {anchor && <Tooltip anchorElement={anchor} render={renderTooltip} trigger="opened" pos="right middle" />}
      <div style={{ height: sticky ? 500 : 0 }} />
      <ReactUIFeatureFlagsContext.Provider
        value={{
          stickyReduceLayoutEvents: flag,
        }}
      >
        {sticky ? (
          <Sticky side="bottom" offset={stickyOffset}>
            {content}
          </Sticky>
        ) : (
          content
        )}
      </ReactUIFeatureFlagsContext.Provider>
    </div>
  );
};

export const RadioGroupRemoveBaselineSpacer: Story = () => {
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
