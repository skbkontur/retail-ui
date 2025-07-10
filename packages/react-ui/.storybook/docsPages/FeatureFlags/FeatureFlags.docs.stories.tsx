import React from 'react';
import { Button, ComboBox, ReactUIFeatureFlagsContext, Sticky, Tooltip } from '@skbkontur/react-ui';
import { emit } from '@skbkontur/react-ui/lib/LayoutEvents';

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
