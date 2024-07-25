import React from 'react';

import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { CustomComboBoxDataTids } from '../../../internal/CustomComboBox';
import { Button, ButtonDataTids } from '../../Button';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';
import { ComboBox } from '../ComboBox';

export default {
  title: 'ComboBox/Functional tests',
  parameters: {
    creevey: {
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b)/ } },
    },
  },
} as Meta;

const updateTypedValue: CreeveyTests = {
  async 'Update value'() {
    const element = await this.browser.findElement({ css: `[data-tid~="${CustomComboBoxDataTids.comboBoxView}"]` });
    await this.browser
      .actions({
        bridge: true,
      })
      .click(element)
      .sendKeys('Тест...')
      .pause(500)
      .perform();
    const withTypedText = await this.browser.takeScreenshot();

    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: `[data-tid~="${ButtonDataTids.root}"]` }))
      .pause(500)
      .perform();
    const updatedValue = await this.browser.takeScreenshot();
    await this.expect({ withTypedText, updatedValue }).to.matchImages();
  },
};

export const WithFeatureFlagsValueChange: Story = () => {
  const [value, setValue] = React.useState({ value: '', label: '' });

  const handleValueChange = () => {
    setValue({ value: `Обновленное значение`, label: `Обновленное значение` });
  };

  const getItems = () =>
    Promise.resolve([
      { value: 'Первый', label: 'Первый' },
      { value: 'Второй', label: 'Второй' },
    ]);

  return (
    <div>
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
    </div>
  );
};
WithFeatureFlagsValueChange.storyName = 'With featureFlags value change';
WithFeatureFlagsValueChange.parameters = {
  creevey: {
    tests: updateTypedValue,
  },
};
