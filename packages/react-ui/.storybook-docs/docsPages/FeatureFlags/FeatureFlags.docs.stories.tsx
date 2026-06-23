import React from 'react';

import { Select } from '../../../components/Select/Select.js';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext/ReactUIFeatureFlagsContext.js';
import type { Meta, Story } from '../../../typings/stories.js';
import { FeatureFlagToggle } from '../../FeatureFlagToggle.js';

const meta: Meta = {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Пустая история нужна, чтобы страница нормально собиралась */
// export const Default: Story = () => {
//   return <div />;
// };

export const SelectAutoScrollToSelectedItem: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState(true);
  const [value, setValue] = React.useState('ten');
  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ selectAutoScrollToSelectedItem: isFlagEnabled }}>
        <Select
          value={value}
          onValueChange={setValue}
          items={['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']}
        />
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};
