import React from 'react';
import { StoryFn } from '@storybook/addons';
import MenuIcon from '@skbkontur/react-icons/Menu';
import ArrowSize2Icon from '@skbkontur/react-icons/ArrowSize2';
import SearchIcon from '@skbkontur/react-icons/Search';
import AddIcon from '@skbkontur/react-icons/Add';
import DeleteIcon from '@skbkontur/react-icons/Delete';

import { MenuItem } from '../../MenuItem';
import { MenuHeader } from '../../MenuHeader';
import { MenuSeparator } from '../../MenuSeparator';
import { DropdownMenu, DropdownMenuProps } from '../DropdownMenu';
import { Button } from '../../Button';
import { Toast } from '../../Toast';
import { Input } from '../../Input';

export default {
  title: 'DropdownMenu',
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div
        style={{
          padding: '20px 120px 150px',
          border: '1px solid #dfdede',
          overflow: 'hidden',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export const SimpleExample = () => (
  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
    <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
    <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
  </DropdownMenu>
);
SimpleExample.story = { name: 'Simple example' };

export const ExampleWithWidthOfMenu = () => (
  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={350}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
);
ExampleWithWidthOfMenu.story = { name: 'Example with width of menu' };

export const ExampleWithMaximumHeightOfMenu = () => (
  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
);
ExampleWithMaximumHeightOfMenu.story = { name: 'Example with maximum height of menu' };

export const CaptionAcceptsAnArbitraryElement = () => (
  <DropdownMenu
    menuWidth="300px"
    caption={
      <span tabIndex={0} style={{ display: 'inline-block' }}>
        <MenuIcon size={32} />
      </span>
    }
  >
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
);
CaptionAcceptsAnArbitraryElement.story = { name: 'Caption accepts an arbitrary element' };

export const OnlyStaticElements = () => (
  <DropdownMenu
    menuWidth="300px"
    caption={
      <span tabIndex={0} style={{ display: 'inline-block' }}>
        <MenuIcon size={32} />
      </span>
    }
  >
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem disabled>Недоступен</MenuItem>
  </DropdownMenu>
);
OnlyStaticElements.story = { name: 'Only static elements' };

export const CaptionAcceptsAFunction = () => (
  <DropdownMenu
    menuWidth="300px"
    caption={captionProps => (
      <span
        style={{
          display: 'inline-block',
          transition: 'all 0.3s',
          transform: captionProps.opened ? 'rotate(45deg)' : 'none',
        }}
      >
        <Button use="primary" onClick={captionProps.toggleMenu}>
          <ArrowSize2Icon size={16} />
        </Button>
      </span>
    )}
  >
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
);
CaptionAcceptsAFunction.story = { name: 'Caption accepts a function' };

export const WithoutAnimations = () => (
  <DropdownMenu disableAnimations caption={<Button use="primary">Открыть меню</Button>}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
    <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
    <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
  </DropdownMenu>
);
WithoutAnimations.story = { name: 'Without animations' };

export const WithHeaderAndFooter = () => (
  <DropdownWithScrollStateChange
    disableAnimations
    caption={<Button use="primary">Открыть меню</Button>}
    menuWidth={250}
  />
);
WithHeaderAndFooter.story = { name: 'With header and footer' };

class DropdownWithScrollStateChange extends React.Component<DropdownMenuProps, { value: string; hasHeader: boolean }> {
  public state = {
    value: '',
    hasHeader: true,
  };

  public render() {
    return (
      <DropdownMenu
        {...this.props}
        menuMaxHeight={'450px'}
        menuWidth={this.props.menuWidth}
        onClose={this.resetStateToDefault}
        header={this.state.hasHeader && this.header()}
        footer={this.footer()}
      >
        {new Array(50).fill('').map((i, index) => (
          <MenuItem key={index}>{`Item ${index}`}</MenuItem>
        ))}
      </DropdownMenu>
    );
  }

  private header = () => {
    return (
      <div
        style={{
          backgroundColor: 'rgba(131, 128, 128, 0.15)',
          margin: '-6px -18px -7px -8px',
          padding: '10px 18px 10px 8px',
        }}
      >
        <Input leftIcon={<SearchIcon />} value={this.state.value} onValueChange={this.handleInputChange} width={220} />
      </div>
    );
  };

  private footer = () => {
    const { hasHeader } = this.state;
    const icon = hasHeader ? <DeleteIcon /> : <AddIcon />;
    return (
      <div style={{ paddingTop: 4 }}>
        <Button use={'link'} icon={icon} onClick={this.switchHeaderState}>
          {hasHeader ? 'Disable header' : 'Enable Header'}
        </Button>
      </div>
    );
  };

  private switchHeaderState = () => {
    this.setState(state => ({
      hasHeader: !state.hasHeader,
    }));
  };

  private handleInputChange = (value: string) => {
    this.setState({ value });
  };

  private resetStateToDefault = () => {
    this.setState({ value: '' });
  };
}
