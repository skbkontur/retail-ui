import React from 'react';

import { Story } from '../../../typings/stories';
import { Switcher, SwitcherProps } from '../Switcher';
import { Gapped } from '../../Gapped';
import { Hint } from '../../Hint';
import { Tooltip } from '../../Tooltip';
import { ButtonProps } from '../../Button';

interface ComponentState {
  value: string;
}

class Component extends React.Component<SwitcherProps, ComponentState> {
  constructor(props: SwitcherProps) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  public render() {
    const { value, ...rest } = this.props;
    return (
      <Switcher value={this.state.value} onValueChange={this.handleChange} caption={'Label for Switcher'} {...rest} />
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
    skip: [{ in: ['chromeFlat8px'], tests: 'clicked' }],
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
Errored.parameters = { creevey: { skip: [{ in: ['chromeFlat8px'] }] } };

export const Disabled = () => {
  return (
    <Gapped vertical>
      <Switcher disabled value={'One'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Two'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Three'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
    </Gapped>
  );
};

Disabled.storyName = 'disabled';
Disabled.parameters = {
  creevey: { skip: [{ in: ['chrome', 'chrome8px', 'chromeFlat8px', 'chromeDark'] }] },
};

const items: Array<{ label: string; value: string; buttonProps: Partial<ButtonProps> }> = [
  {
    label: 'One',
    value: '111',
    buttonProps: {
      'data-tid': '1-1-1',
      use: 'primary',
    },
  },
  {
    label: 'Two',
    value: '222',
    buttonProps: {
      'data-tid': '2-2-2',
      disabled: true,
    },
  },
  {
    label: 'Three',
    value: '333',
    buttonProps: {
      'data-tid': '3-3-3',
      use: 'danger',
    },
  },
  {
    label: 'four',
    value: '444',
    buttonProps: {
      disabled: true,
    },
  },
];

export const WithDisabledItems = () => {
  return (
    <Gapped vertical>
      <Component items={items} />
      <Component items={items} value={'one'} />
      <Component items={items} value={'two'} />
    </Gapped>
  );
};

WithDisabledItems.storyName = 'with disabled items';
WithDisabledItems.parameters = {
  creevey: { skip: [{ in: ['chrome', 'chrome8px', 'chromeFlat8px', 'chromeDark'] }] },
};

const renderItem = (label: string, value: string, buttonProps: ButtonProps, renderDefault: () => React.ReactNode) => {
  if (value === '111') {
    return (
      <Hint pos="bottom" text="Текст Хинта">
        {renderDefault()}
      </Hint>
    );
  }
  if (value === '333') {
    return (
      <Tooltip pos="bottom center" trigger="opened" render={() => '⚠️ Лучше не трогай...'}>
        {renderDefault()}
      </Tooltip>
    );
  }
  return renderDefault();
};

export const WithCustomRenderItems: Story = () => {
  return (
    <div style={{ padding: '65px 20px' }}>
      <Component items={items} renderItem={renderItem} />
    </div>
  );
};

WithCustomRenderItems.storyName = 'with custom render item';
WithCustomRenderItems.parameters = {
  creevey: {
    skip: [
      {
        in: [
          'chromeDark',
          'chrome8px',
          'firefox8px',
          'firefox',
          'firefoxFlat8px',
          'firefoxDark',
          'ie118px',
          'ie11',
          'ie11Flat8px',
          'ie11Dark',
        ],
      },
    ],
  },
};
