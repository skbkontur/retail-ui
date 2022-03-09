import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';

import { Story } from '../../../typings/stories';
import { Toggle } from '../Toggle';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { Tooltip } from '../../Tooltip';
import { delay } from '../../../lib/utils';

class Playground extends Component<any, any> {
  public state = {
    checked: false,
    loadingActive: false,
    loading: false,
  };

  public render() {
    return (
      <div>
        <div>
          <Gapped gap={10}>
            <Gapped vertical gap={10}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onValueChange={this.toggle.bind(this)}
                  loading={this.state.loading}
                />{' '}
                {this.state.checked ? 'On' : 'Off'}
              </div>
              <div>
                <Toggle checked={false} disabled />
                {' Off disabled'}
              </div>
              <div>
                <Toggle checked={true} disabled />
                {' On disabled'}
              </div>
            </Gapped>

            <Gapped vertical gap={10}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onValueChange={this.toggle.bind(this)}
                  warning
                  loading={this.state.loading}
                />{' '}
                {this.state.checked ? 'On' : 'Off'}
              </div>
              <div>
                <Toggle checked={false} disabled warning />
                {' Off disabled'}
              </div>
              <div>
                <Toggle checked={true} disabled warning />
                {' On disabled'}
              </div>
            </Gapped>

            <Gapped vertical gap={10}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onValueChange={this.toggle.bind(this)}
                  error
                  loading={this.state.loading}
                />{' '}
                {this.state.checked ? 'On' : 'Off'}
              </div>
              <div>
                <Toggle checked={false} disabled error />
                {' Off disabled'}
              </div>
              <div>
                <Toggle checked={true} disabled error />
                {' On disabled'}
              </div>
            </Gapped>
            <Gapped vertical gap={10}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onValueChange={this.toggle.bind(this)}
                  loading={this.state.loading}
                  color="#28bf4f"
                />{' '}
                {this.state.checked ? 'On' : 'Off'}
              </div>
              <div>
                <Toggle checked={false} disabled color="#28bf4f" />
                {' Off disabled'}
              </div>
              <div>
                <Toggle checked={true} disabled color="#28bf4f" />
                {' On disabled'}
              </div>
            </Gapped>
          </Gapped>
        </div>
        <div style={{ marginTop: '15px' }}>
          <Gapped gap={10}>
            <Checkbox onValueChange={this.activeLoading.bind(this)} checked={this.state.loadingActive}>
              Loading
            </Checkbox>
            {this.state.loading && <Button onClick={this.stopLoading.bind(this)}>Stop loading</Button>}
          </Gapped>
        </div>
      </div>
    );
  }

  private toggle(checked: boolean) {
    this.setState({
      checked,
      loading: this.state.loadingActive,
    });
  }

  private activeLoading() {
    this.setState({ loadingActive: !this.state.loadingActive });
  }

  private stopLoading() {
    this.setState({
      loading: false,
    });
  }
}

class Simple extends React.Component<any, any> {
  public state = {
    checked: true,
  };

  public render() {
    return (
      <div>
        <Toggle
          checked={this.state.checked}
          onValueChange={() => {
            const { checked } = this.state;
            this.setState({ checked: !checked });
          }}
        />{' '}
        {this.state.checked ? 'On' : 'Off'}
      </div>
    );
  }
}

class SimpleChildren extends React.Component<any, any> {
  public state = {
    checked: true,
  };

  public render() {
    return (
      <div>
        <Toggle
          checked={this.state.checked}
          onValueChange={() => {
            const { checked } = this.state;
            this.setState({ checked: !checked });
          }}
        >
          {this.state.checked ? 'On' : 'Off'}
        </Toggle>
      </div>
    );
  }
}

class SimpleChildrenLines extends React.Component<any, any> {
  public state = {
    checked: true,
  };

  public render() {
    return (
      <div style={{ width: 250 }}>
        <Toggle
          checked={this.state.checked}
          onValueChange={() => {
            const { checked } = this.state;
            this.setState({ checked: !checked });
          }}
        >
          <span>
            Возможно очень длинный текст, который может не влезть в одну строку и частично перенесётся на следующую.
          </span>
        </Toggle>
      </div>
    );
  }
}

export default { title: 'Toggle' };

export const Plain: Story = () => <Simple />;
Plain.storyName = 'plain';

Plain.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async pressed() {
        await this.browser
          .actions({
            bridge: true,
          })
          .move({
            origin: this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }),
          })
          .press()
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
        await this.browser
          .actions({
            bridge: true,
          })
          .release()
          .perform();
      },
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
    },
  },
};

export const Uncontrolled = () => <Toggle onValueChange={action('toggle')} />;
Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.parameters = { creevey: { skip: [true] } };

export const PlaygroundStory = () => <Playground />;
PlaygroundStory.storyName = 'playground';

export const DisabledWithCaption: Story = () => {
  return <Toggle disabled>Disabled with caption</Toggle>;
};

export const DisabledWithTooltip: Story = () => (
  <div style={{ padding: '50px' }}>
    <Tooltip render={() => 'Hello'}>
      <Toggle disabled />
    </Tooltip>
  </div>
);
DisabledWithTooltip.storyName = 'disabled with Tooltip';

DisabledWithTooltip.parameters = {
  creevey: {
    tests: {
      async pressed() {
        await this.browser
          .actions({
            bridge: true,
          })
          .move({
            origin: this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }),
          })
          .press()
          .perform();
        await delay(100);
        await this.expect(await this.takeScreenshot()).to.matchImage('pressed');

        await this.browser
          .actions({
            bridge: true,
          })
          .release()
          .perform();
      },
    },
  },
};

export const WithChildren: Story = () => <SimpleChildren />;
WithChildren.storyName = 'with children';

WithChildren.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
    },
  },
};

export const WithLongDescription: Story = () => <SimpleChildrenLines />;
WithLongDescription.storyName = 'with long description';

WithLongDescription.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
    },
  },
};

export const WithLeftCaption: Story = () => <Toggle captionPosition="left">left caption</Toggle>;
