import React from 'react';
import UserIcon from '@skbkontur/react-icons/User';
import SearchIcon from '@skbkontur/react-icons/Search';
import DeleteIcon from '@skbkontur/react-icons/Delete';

import type { Story } from '../../../typings/stories';
import { BGRuler } from '../../../internal/BGRuler';
import { Group } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Toast } from '../../Toast';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { Dropdown } from '../../Dropdown';
import { DropdownMenu } from '../../DropdownMenu';
import { Select } from '../../Select';
import { Autocomplete } from '../../Autocomplete';
import { PasswordInput } from '../../PasswordInput';
import { CurrencyInput } from '../../CurrencyInput';
import { FxInput } from '../../FxInput';

export default {
  title: 'Group',
  component: Group,
};

export const SimpleGroupWithInputAndButton: Story = () => (
  <Group width="300px">
    <Input placeholder="Search" width="100%" />
    <Button icon={<SearchIcon />} />
  </Group>
);
SimpleGroupWithInputAndButton.storyName = 'Simple Group with Input and Button';

export const GroupWithAllSupportedComponents: Story = () => (
  <Group>
    <Button icon={<UserIcon />} />
    <Input value="" placeholder="Input" />
    <FxInput value="" placeholder="FxInput" onValueChange={console.log} />
    <Autocomplete value="" placeholder="Autocomplete" onValueChange={console.log} />
    <PasswordInput value="" placeholder="PasswordInput" onValueChange={console.log} />
    <CurrencyInput value={1} placeholder="CurrencyInput" onValueChange={console.log} />
    <Select value="" placeholder="Select value" onValueChange={console.log} />
    <Dropdown caption="Dropdown" />
    <DropdownMenu caption={(props) => <Button corners={props.corners}>DropdownMenu</Button>} />
    <Button icon={<DeleteIcon />} />
  </Group>
);
GroupWithAllSupportedComponents.storyName = 'Group With All Supported Components';

export const SimpleGroupWithCustomInputsWidth = () => (
  <Group>
    <Input placeholder="Search" width="300px" />
    <Button icon={<SearchIcon />} />
    <Input placeholder="Search" width="100px" />
  </Group>
);
SimpleGroupWithCustomInputsWidth.storyName = 'Simple Group with custom Inputs width';

export const GroupWithInputAndMultipleButtons = () => {
  const [value, setValue] = React.useState('');

  return (
    <Group>
      <Button onClick={() => setValue('')}>Clear</Button>
      <Input value={value} onValueChange={setValue} placeholder="Search" width="100%" />
      <Button icon={<SearchIcon />} />
      <Button>Cancel</Button>
    </Group>
  );
};
GroupWithInputAndMultipleButtons.storyName = 'Group with Input and multiple Buttons';
GroupWithInputAndMultipleButtons.parameters = { creevey: { skip: true } };

export const ButtonGroup = () => (
  <Group>
    <Button onClick={() => Toast.push('Раз')}>Раз</Button>
    <Button onClick={() => Toast.push('Два')}>Два</Button>
    <Button onClick={() => Toast.push('Три')}>Три</Button>
  </Group>
);
ButtonGroup.storyName = 'Button group';

export const ComplexElements = () => (
  <Group>
    <Button icon={<DeleteIcon />} onClick={() => Toast.push('Clear!')} width="10px" />
    <Input placeholder="Disabled" disabled rightIcon={<UserIcon />} width="100%" />
    <Button onClick={() => Toast.push('Push!')} error>
      Push
    </Button>
  </Group>
);
ComplexElements.storyName = 'Complex elements';
ComplexElements.parameters = { creevey: { skip: true } };

export const WithWidth = () => (
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
              <DeleteIcon />
            </Button>
            <Input placeholder="240px" width="100%" />
          </Group>
          <br />
          <br />
          <Group>
            <Button>
              <DeleteIcon />
            </Button>
            <Input placeholder="no width" width="100%" />
          </Group>
        </div>
      );
    }}
  </ThemeContext.Consumer>
);
WithWidth.storyName = 'With width';
