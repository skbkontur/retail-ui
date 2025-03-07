import React from 'react';

import { Story } from '../../../typings/stories';
import { Switcher, SwitcherProps } from '../Switcher';
import { Gapped } from '../../Gapped';
import { Hint } from '../../Hint';
import { Tooltip } from '../../Tooltip';
import { Button, ButtonProps } from '../../Button';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Select } from '../../Select';
import { SizeProp } from '../../../lib/types/props';

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

export default {
  title: 'Switcher',
  component: Switcher,
};

export const Horizontal: Story = () => {
  return <Component items={['One', 'Two', 'Three']} />;
};
Horizontal.storyName = 'horizontal';

export const Errored = () => {
  return <Component error items={['One', 'Two', 'Three']} />;
};
Errored.storyName = 'errored';

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

const renderItem = (label: string, value: string, buttonProps: ButtonProps, renderDefault: () => React.ReactNode) => {
  if (value === '111') {
    return (
      <Hint text="Текст Хинта" opened manual>
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

export const CompareWithButton: Story = () => {
  const [value, setValue] = React.useState<string>();
  const [view, setView] = React.useState<'switcher' | 'button'>('switcher');
  const [size, setSize] = React.useState<SizeProp>('small');
  return (
    <div>
      <ThemeContext.Provider
        value={ThemeFactory.create({
          borderColorError: 'red',
        })}
      >
        {view === 'button' && (
          <Gapped vertical gap={5}>
            <Button width="148px" size={size}>
              Button
            </Button>
            <Button error width="148px" size={size}>
              Button
            </Button>
          </Gapped>
        )}
        {view === 'switcher' && (
          <Gapped vertical gap={5}>
            <Switcher
              value={value}
              onValueChange={setValue}
              size={size}
              style={{ display: 'inline-block' }}
              items={['1', '2', '3'].map((i) => ({ label: i, value: i, buttonProps: { width: 50, autoFocus: true } }))}
            />
            <Switcher
              error
              value={value}
              onValueChange={setValue}
              size={size}
              style={{ display: 'inline-block' }}
              items={['1', '2', '3'].map((i) => ({ label: i, value: i, buttonProps: { width: 50, autoFocus: true } }))}
            />
          </Gapped>
        )}
      </ThemeContext.Provider>
      <br />
      <br />
      <Switcher
        style={{ display: 'inline-block' }}
        items={['switcher', 'button']}
        value={view}
        onValueChange={setView as any}
      />
      <br />
      <br />
      <Select items={['small', 'medium', 'large'] as SizeProp[]} value={size} onValueChange={setSize} />
    </div>
  );
};
CompareWithButton.parameters = {
  creevey: { skip: true },
};
