import { ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { Meta, Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { Radio } from '../Radio';

export default {
  title: 'components/Radio',
  component: Radio,
  parameters: { creevey: { skip: [{ stories: 'Playground' }] } },
} as Meta;

export const RadioWithDifferentStates = () => (
  <div style={{ margin: '5px' }}>
    <Gapped gap={20}>
      <Radio value="value" />
      <Radio disabled value="value" />
      <Radio disabled checked value="value" />
      <Radio checked value="value" />
      <Radio focused value="value" />
      <Radio focused checked value="value" />
      <Radio error value="value" />
      <Radio warning value="value" />
    </Gapped>
  </div>
);
RadioWithDifferentStates.storyName = 'Radio with different states';
RadioWithDifferentStates.parameters = { creevey: { skip: [{ in: ['chromeFlat', 'chromeFlat8px'] }] } };

const PlaygroundTemplate: ComponentStory<typeof Radio> = (args) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <span style={{ display: 'inline-block', verticalAlign: 'sub' }}>
      <Radio onClick={() => setIsChecked(!isChecked)} checked={isChecked} {...args} />
    </span>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  error: false,
  warning: false,
  focused: false,
  value: 'radio',
  children: 'radio button',
};

export const Highlighted: Story = () => {
  return (
    <div style={{ marginBottom: '70px' }}>
      <div>
        <Radio value={'value'} checked />
      </div>
      <div>
        <Radio value={'value'} checked warning />
      </div>
      <div>
        <Radio value={'value'} checked error />
      </div>
    </div>
  );
};

Highlighted.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async tabPress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'body' }))
          .sendKeys(this.keys.TAB)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
      },
    },
  },
};
