import React from 'react';

import { Story } from '../../../typings/stories';
import { Switcher } from '../Switcher';
import { Gapped } from '../../Gapped';

class Component extends React.Component<{ items: string[]; error?: boolean }, { value: string }> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <Switcher
        value={this.state.value}
        onValueChange={this.handleChange}
        label={'Label for Switcher'}
        {...this.props}
      />
    );
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };
}

export default { title: 'Switcher' };

export const Horizontal: Story = () => {
  return <Component items={['One', 'Two', 'Three']} />;
};
Horizontal.storyName = 'horizontal';

Horizontal.parameters = {
  creevey: {
    skip: [{ in: ['chromeFlat', 'chromeFlat8px'], tests: 'clicked' }],
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Button"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
    },
  },
};

export const Errored = () => {
  return <Component error items={['One', 'Two', 'Three']} />;
};
Errored.storyName = 'errored';
Errored.parameters = { creevey: { skip: [{ in: ['chromeFlat', 'chromeFlat8px'] }] } };

export const Disabled = () => {
  return (
    <Gapped vertical>
      <Switcher disabled value={'One'} label={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Two'} label={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Three'} label={'Label for Switcher'} items={['One', 'Two', 'Three']} />
    </Gapped>
  );
};

Disabled.storyName = 'disabled';
Disabled.parameters = { creevey: { skip: [{ in: ['chrome', 'chrome8px', 'chromeFlat', 'chromeFlat8px'] }] } };
