// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { Meta, Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { Radio } from '../Radio';

export default {
  title: 'Radio',
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: 'Playground' },
      },
    },
  },
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
RadioWithDifferentStates.parameters = {
  creevey: {
    skip: {
      'story-skip-0': { in: ['chromeFlat8px'] },
    },
  },
};

export const Playground = () => {
  class Comp extends React.Component {
    public state = {
      hovered: false,
      checked: false,
      active: false,
      value: 'value',
    };

    public render() {
      return (
        <div>
          <div onClick={this.handleClick}>
            <span style={{ display: 'inline-block', verticalAlign: 'sub' }}>
              <Radio {...this.state} />
            </span>
          </div>
        </div>
      );
    }

    private handleClick = () => {
      this.setState({ checked: !this.state.checked });
    };
  }

  return <Comp />;
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
    skip: {
      flaky: { in: /firefox/ },
    },
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
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
      },
    },
  },
};

export const Size: Story = () => {
  return (
    <div>
      <Gapped vertical>
        <Radio size={'small'} value="value">
          Size: small
        </Radio>
        <Radio size={'medium'} value="value">
          Size: medium
        </Radio>
        <Radio size={'large'} value="value">
          Size: large
        </Radio>
      </Gapped>
    </div>
  );
};
