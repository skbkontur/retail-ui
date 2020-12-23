import React from 'react';
import UserIcon from '@skbkontur/react-icons/User';
import SearchIcon from '@skbkontur/react-icons/Search';
import DeleteIcon from '@skbkontur/react-icons/Delete';
import { CSFStory } from 'creevey';

import { BGRuler } from '../../../internal/BGRuler';
import { Group } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Toast } from '../../Toast';

export default { title: 'Group' };

export const SimpleGroupWithInputAndButton: CSFStory<JSX.Element> = () => (
  <Group width="300px">
    <Input placeholder="Search" width="100%" />
    <Button icon={<SearchIcon />} />
  </Group>
);
SimpleGroupWithInputAndButton.storyName = 'Simple Group with Input and Button';
SimpleGroupWithInputAndButton.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async ['focused input']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('focused input');
      },
    },
  },
};

export const SimpleGroupWithCustomInputsWidth = () => (
  <Group>
    <Input placeholder="Search" width="300px" />
    <Button icon={<SearchIcon />} />
    <Input placeholder="Search" width="100px" />
  </Group>
);
SimpleGroupWithCustomInputsWidth.storyName = 'Simple Group with custom Inputs width';

export const GroupWithInputAndMultipleButtons = () => (
  <Group>
    <Button>Clear</Button>
    <Input placeholder="Search" width="100%" />
    <Button icon={<SearchIcon />} />
    <Button>Cancel</Button>
  </Group>
);
GroupWithInputAndMultipleButtons.storyName = 'Group with Input and multiple Buttons';
GroupWithInputAndMultipleButtons.parameters = { creevey: { skip: [true] } };

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
ComplexElements.parameters = { creevey: { skip: [true] } };

export const WithWidth = () => (
  <div style={{ background: '#eee', padding: '30px 10px 10px', position: 'relative' }}>
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
WithWidth.storyName = 'With width';
