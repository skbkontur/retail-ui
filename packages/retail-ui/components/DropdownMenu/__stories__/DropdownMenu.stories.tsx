import React from 'react';
import { storiesOf } from '@storybook/react';
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
import { PopupMenuCaptionProps } from '../../internal/PopupMenu';
import { Input } from '../../Input';

storiesOf('DropdownMenu', module)
  .addDecorator(story => (
    <div
      style={{
        padding: '20px 120px 150px',
        border: '1px solid #dfdede',
        overflow: 'hidden',
      }}
    >
      {story()}
    </div>
  ))
  .add('Simple example', () => (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
      <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
      <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Example with width of menu', () => (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={350}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Example with maximum height of menu', () => (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Caption accepts an arbitrary element', () => (
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
  ))
  .add('Only static elements', () => (
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
  ))
  .add('Caption accepts a function', () => (
    <DropdownMenu
      menuWidth="300px"
      caption={(captionProps: PopupMenuCaptionProps) => (
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
  ))
  .add('Without animations', () => (
    <DropdownMenu disableAnimations caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
      <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
      <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('With header and footer', () => (
    <DropdownWithScrollStateChange
      disableAnimations
      caption={<Button use="primary">Открыть меню</Button>}
      menuWidth={250}
    />
  ));

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

  private handleInputChange = (_: any, value: string) => {
    this.setState({ value });
  };

  private resetStateToDefault = () => {
    this.setState({ value: '' });
  };
}
