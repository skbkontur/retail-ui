import React from 'react';
import type { CommonProps } from 'react-ui/internal/CommonWrapper/types';

import type { Story } from '../../../typings/stories';
import type { SwitcherItems, SwitcherProps } from '../Switcher';
import { Switcher } from '../Switcher';
import { Gapped } from '../../Gapped';
import { Hint } from '../../Hint';
import { Tooltip } from '../../Tooltip';
import type { ButtonProps } from '../../Button';
import { Button } from '../../Button';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Select } from '../../Select';
import type { SizeProp } from '../../../lib/types/props';

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

export const Errored: Story = () => {
  return <Component error items={['One', 'Two', 'Three']} />;
};
Errored.storyName = 'errored';

export const Disabled: Story = () => {
  return (
    <Gapped vertical>
      <Switcher disabled value={'One'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Two'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Three'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
    </Gapped>
  );
};
Disabled.storyName = 'disabled';

const items: SwitcherItems[] = [
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

interface LabelledSwitcherExampleProps extends CommonProps {
  label?: string;
}

function LabelledSwitcherExample({ label, children }: LabelledSwitcherExampleProps): React.ReactElement {
  return (
    <div>
      <div style={{ color: '#AAAAAA' }}>{label}</div>
      {children}
    </div>
  );
}

export const WithCustomWidth: Story = () => {
  const items: SwitcherItems[] = ['One', 'Two', 'Three'];
  const itemsWithProps: SwitcherItems[] = [
    {
      label: '100px',
      value: '1',
      buttonProps: {
        width: 100,
      },
    },
    {
      label: '200px',
      value: '2',
      buttonProps: {
        width: 200,
      },
    },
    {
      label: 'Should stretch',
      value: '3',
    },
  ];

  return (
    <Gapped vertical gap={16}>
      <LabelledSwitcherExample label="width=500px">
        <Switcher items={items} width={'500px'} />
      </LabelledSwitcherExample>

      <LabelledSwitcherExample label="width=500px + caption">
        <Switcher caption="Надпись учитывается в ширине" items={items} width={'500px'} />
      </LabelledSwitcherExample>

      <LabelledSwitcherExample label="width=50%">
        <div style={{ width: '300px', backgroundColor: 'lightgreen', padding: '8px' }}>
          <Switcher items={items} width={'50%'} />
        </div>
      </LabelledSwitcherExample>

      <LabelledSwitcherExample label="width=100%">
        <div style={{ width: '300px', backgroundColor: 'lightgreen', padding: '8px' }}>
          <Switcher items={items} width={'100%'} />
        </div>
      </LabelledSwitcherExample>

      <LabelledSwitcherExample label="width=20px">
        <Switcher items={items} width={'20px'} />
      </LabelledSwitcherExample>

      <LabelledSwitcherExample label="width=20px + caption">
        <Switcher caption="Этой надписи будет плохо" items={items} width={'20px'} />
      </LabelledSwitcherExample>

      <LabelledSwitcherExample label="width=800px + buttonProps:{width}">
        <Switcher items={itemsWithProps} width={'800px'} />
      </LabelledSwitcherExample>

      <LabelledSwitcherExample label="width=800px + buttonProps:{width} + caption">
        <Switcher caption="Название" items={itemsWithProps} width={'800px'} />
      </LabelledSwitcherExample>
    </Gapped>
  );
};
WithCustomWidth.storyName = 'with custom width';

export const WithCustomWidthAndRenderItem: Story = () => {
  return (
    <div style={{ padding: '65px 20px' }}>
      <Component items={items} renderItem={renderItem} width={'500px'} />
    </div>
  );
};
WithCustomWidthAndRenderItem.storyName = 'with custom width and renderItem';
