import React from 'react';
import { CSFStory } from 'creevey';

import { Gapped } from '../../Gapped';
import { Radio } from '../Radio';

export default { title: 'Radio', parameters: { creevey: { skip: [{ stories: 'Playground' }] } } };

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
RadioWithDifferentStates.story = {
  name: 'Radio with different states',
  parameters: { creevey: { skip: [{ in: ['chromeFlat', 'chromeFlat8px'] }] } },
};

export const Playground = () => {
  class Comp extends React.Component<{}, any> {
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

export const Highlighted: CSFStory<JSX.Element> = () => {
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
Highlighted.story = {
  parameters: {
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
  },
};
