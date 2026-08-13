import React from 'react';

import { ComboBox } from '../../../components/ComboBox/ComboBox.js';
import { MaskedInput } from '../../../components/MaskedInput/MaskedInput.js';
import { MaskedInputMasks } from '../../../components/MaskedInputV2/MaskedInputV2.phone.js';
import { Select } from '../../../components/Select/Select.js';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext/ReactUIFeatureFlagsContext.js';
import type { Meta, Story } from '../../../typings/stories.js';
import { FeatureFlagToggle } from '../../FeatureFlagToggle.js';

const meta: Meta = {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
};

export default meta;

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

export const ComboBoxMaskedInputLegacyBehavior: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState<boolean>(false);
  const [value, setValue] = React.useState({ value: '', label: '' });

  const getItems = () =>
    Promise.resolve([
      { value: '+7 912 043-98-27', label: '+7 912 043-98-27' },
      { value: '+7 912 999-11-22', label: '+7 912 999-11-22' },
    ]);

  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ maskedInputUseLegacyBehavior: isFlagEnabled }}>
        <ComboBox
          value={value}
          width={200}
          mask="+7 999 999-99-99"
          alwaysShowMask
          getItems={getItems}
          onValueChange={setValue}
        />
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};

export const MaskedInputLegacyBehavior: Story = () => {
  const [isFlagEnabled, setIsFlagEnabled] = React.useState<boolean>(false);
  const [value, setValue] = React.useState('');

  return (
    <>
      <FeatureFlagToggle {...{ isFlagEnabled, setIsFlagEnabled }} />
      <ReactUIFeatureFlagsContext.Provider value={{ maskedInputUseLegacyBehavior: isFlagEnabled }}>
        <MaskedInput
          mask={MaskedInputMasks.PhoneRU}
          placeholder="+7"
          alwaysShowMask
          width={200}
          value={value}
          onValueChange={setValue}
        />
      </ReactUIFeatureFlagsContext.Provider>
    </>
  );
};
