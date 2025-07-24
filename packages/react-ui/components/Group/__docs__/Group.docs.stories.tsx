import React from 'react';
import { MathFunctionIcon } from '@skbkontur/icons/icons/MathFunctionIcon';
import { SearchLoupeIcon } from '@skbkontur/icons/icons/SearchLoupeIcon';
import { Group, Button, Input, Hint, DateRangePicker, Tooltip } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext/ReactUIFeatureFlagsContext';

export default {
  title: 'Layout/Group',
  component: Group,
  parameters: { creevey: { skip: true } },
} as Meta;

export const BasicExample: Story = () => {
  const [value, setValue] = React.useState('Foo');

  return (
    <Group width={350}>
      <Button>
        <MathFunctionIcon />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Button>
        <SearchLoupeIcon />
      </Button>
      <Button>Foo</Button>
    </Group>
  );
};
BasicExample.storyName = 'Базовый пример';

/**
 * Пример с группой полей без разделителя в `DateRangePicker`.
 */
export const UsageInDateRangePicker: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <Group>
        <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
        <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
      </Group>
    </DateRangePicker>
  );
};
UsageInDateRangePicker.storyName = 'Внутри контрола DateRangePicker';

/**
 * **Примечание:** на данный момент работает только с [фича-флагом `groupAddHintAndTooltipSupport`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_information-feature-flags--featureflagscontext#groupaddhintandtooltipsupport).
 */
export const WithHint: Story = () => {
  const [value, setValue] = React.useState('Foo');

  return (
    <ReactUIFeatureFlagsContext.Provider value={{ groupAddHintAndTooltipSupport: true }}>
      <Group width={350}>
        <Button>
          <MathFunctionIcon />
        </Button>
        <Input value={value} width="100%" onValueChange={setValue} />
        <Tooltip render={() => 'Hi!'} trigger="opened" pos="bottom">
          <Button>
            <SearchLoupeIcon />
          </Button>
        </Tooltip>
        <Hint text="Hello!">
          <Button>Hover me</Button>
        </Hint>
      </Group>
    </ReactUIFeatureFlagsContext.Provider>
  );
};
WithHint.storyName = 'С хинтом или тултипом';
