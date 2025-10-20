import React from 'react';
import { People1Icon16Regular } from '@skbkontur/icons/icons/People1Icon/People1Icon16Regular';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular';
import { XIcon16Regular } from '@skbkontur/icons/icons/XIcon/XIcon16Regular';

import type { Story } from '../../../typings/stories';
import { BGRuler } from '../../../internal/BGRuler';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { Group } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Dropdown } from '../../Dropdown';
import { DropdownMenu } from '../../DropdownMenu';
import { Select } from '../../Select';
import { Autocomplete } from '../../Autocomplete';
import { PasswordInput } from '../../PasswordInput';
import { CurrencyInput } from '../../CurrencyInput';
import { FxInput } from '../../FxInput';
import { Hint } from '../../Hint';
import { Tooltip } from '../../Tooltip';
import { Gapped } from '../../Gapped';
import { SingleToast } from '../../SingleToast';

export default {
  title: 'Group',
  component: Group,
};

export const SimpleGroupWithInputAndButton: Story = () => (
  <Group width="300px">
    <Input placeholder="Search" width="100%" />
    <Button icon={<SearchLoupeIcon16Regular />} />
  </Group>
);
SimpleGroupWithInputAndButton.storyName = 'Simple Group with Input and Button';

export const GroupWithAllSupportedComponents: Story = () => (
  <Group>
    <Button icon={<People1Icon16Regular />} />
    <Input value="" placeholder="Input" />
    <FxInput value="" placeholder="FxInput" onValueChange={console.log} />
    <Autocomplete value="" placeholder="Autocomplete" onValueChange={console.log} />
    <PasswordInput value="" placeholder="PasswordInput" onValueChange={console.log} />
    <CurrencyInput value={1} placeholder="CurrencyInput" onValueChange={console.log} />
    <Select value="" placeholder="Select value" onValueChange={console.log} />
    <Dropdown caption="Dropdown" />
    <DropdownMenu caption={(props) => <Button corners={props.corners}>DropdownMenu</Button>} />
    <Button icon={<XIcon16Regular />} />
  </Group>
);
GroupWithAllSupportedComponents.storyName = 'Group With All Supported Components';

export const SimpleGroupWithCustomInputsWidth: Story = () => (
  <Group>
    <Input placeholder="Search" width="300px" />
    <Button icon={<SearchLoupeIcon16Regular />} />
    <Input placeholder="Search" width="100px" />
  </Group>
);
SimpleGroupWithCustomInputsWidth.storyName = 'Simple Group with custom Inputs width';

export const GroupWithInputAndMultipleButtons: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Group>
      <Button onClick={() => setValue('')}>Clear</Button>
      <Input value={value} onValueChange={setValue} placeholder="Search" width="100%" />
      <Button icon={<SearchLoupeIcon16Regular />} />
      <Button>Cancel</Button>
    </Group>
  );
};
GroupWithInputAndMultipleButtons.storyName = 'Group with Input and multiple Buttons';
GroupWithInputAndMultipleButtons.parameters = { creevey: { skip: true } };

export const ButtonGroup: Story = () => (
  <>
    <SingleToast />

    <Group>
      <Button onClick={() => SingleToast.push('Раз')}>Раз</Button>
      <Button onClick={() => SingleToast.push('Два')}>Два</Button>
      <Button onClick={() => SingleToast.push('Три')}>Три</Button>
    </Group>
  </>
);
ButtonGroup.storyName = 'Button group';

export const ComplexElements: Story = () => (
  <>
    <SingleToast />

    <Group>
      <Button icon={<XIcon16Regular />} onClick={() => SingleToast.push('Clear!')} width="10px" />
      <Input placeholder="Disabled" disabled rightIcon={<People1Icon16Regular />} width="100%" />
      <Button onClick={() => SingleToast.push('Push!')} error>
        Push
      </Button>
    </Group>
  </>
);
ComplexElements.storyName = 'Complex elements';
ComplexElements.parameters = { creevey: { skip: true } };

export const WithWidth: Story = () => (
  <ThemeContext.Consumer>
    {(theme) => {
      return (
        <div
          style={{
            background: theme.prototype.constructor.name.includes('Dark') ? '1f1f1f' : '#eee',
            padding: '30px 10px 10px',
            position: 'relative',
          }}
        >
          <BGRuler color="#888" left={10} right={9} />
          <Group width={240}>
            <Button>
              <XIcon16Regular />
            </Button>
            <Input placeholder="240px" width="100%" />
          </Group>
          <br />
          <br />
          <Group>
            <Button>
              <XIcon16Regular />
            </Button>
            <Input placeholder="no width" width="100%" />
          </Group>
        </div>
      );
    }}
  </ThemeContext.Consumer>
);
WithWidth.storyName = 'With width';

export const WithHintsAndTooltips: Story = () => (
  <Group>
    <Hint text="Hint">
      <Button>Hint</Button>
    </Hint>
    <Button>Button</Button>
    <Tooltip render={() => 'Tooltip'}>
      <Button>Tooltip</Button>
    </Tooltip>
  </Group>
);
WithHintsAndTooltips.storyName = 'With Hints and Tooltips';

export const WithStretchedInputWrappedInHint: Story = () => (
  <div style={{ padding: '64px', border: 'lightgreen 4px solid' }}>
    <Group width={500}>
      <Button icon={<SearchLoupeIcon16Regular />}></Button>
      <Hint manual opened text="I wrap this input">
        <Input placeholder="Wrapped" width="100%" />
      </Hint>
    </Group>
  </div>
);
WithStretchedInputWrappedInHint.storyName = 'With stretched Input wrapped in Hint';

export const WithStretchedInputWrappedInTooltip: Story = () => (
  <div style={{ padding: '64px', border: 'lightgreen 4px solid' }}>
    <Group width={500}>
      <Button icon={<SearchLoupeIcon16Regular />}></Button>
      <Tooltip render={() => 'I wrap this input'} trigger="opened" pos="top center">
        <Input placeholder="Wrapped" width="100%" />
      </Tooltip>
    </Group>
  </div>
);
WithStretchedInputWrappedInTooltip.storyName = 'With stretched Input wrapped in Tooltip';

export const WithNestedSiblings: Story = () => {
  const stretchButton = (
    <Button style={{ background: 'blue' }} width="100%">
      100%
    </Button>
  );
  const fixedButton = <Button style={{ background: 'blue' }}>None</Button>;

  const groupWithNestedSiblings = (stretchedSiblingsCount: number) => (
    <Group width={600}>
      <Button style={{ background: 'orange' }} width="100%">
        {'100% (Not nested)'}
      </Button>
      <Hint text="Hint nesting three buttons">
        {[0, 1, 2].map((i) => (stretchedSiblingsCount > i ? stretchButton : fixedButton))}
      </Hint>
    </Group>
  );

  return (
    <Gapped gap={16} vertical>
      {[0, 1, 2, 3].map((stretchedSiblingsCount) => groupWithNestedSiblings(stretchedSiblingsCount))}
    </Gapped>
  );
};
WithNestedSiblings.storyName = 'With nested siblings (Exotic)';
WithNestedSiblings.parameters = { creevey: { skip: true } };
