// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MenuIcon from '@skbkontur/react-icons/Menu';
import ArrowSize2Icon from '@skbkontur/react-icons/ArrowSize2';
import MenuItem from '../../MenuItem';
import MenuHeader from '../../MenuHeader';
import MenuSeparator from '../../MenuSeparator';
import DropdownMenu, { DropdownMenuProps } from '../DropdownMenu';
import Button from '../../Button';
import Toast from '../../Toast';
import { PopupMenuCaptionProps } from '../../internal/PopupMenu/PopupMenu';
import Input from '../../Input/Input';
import SearchIcon from '@skbkontur/react-icons/Search';
import { CSSProperties } from 'react';
import { ScrollContainerScrollState } from '../../ScrollContainer/ScrollContainer';

storiesOf('DropdownMenu', module)
  .addDecorator(story => (
    <div
      style={{
        padding: '20px 120px 150px',
        border: '1px solid #dfdede',
        overflow: 'hidden'
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
    <DropdownMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuWidth={350}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Example with maximum height of menu', () => (
    <DropdownMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuMaxHeight={150}
    >
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
            transform: captionProps.opened ? 'rotate(45deg)' : 'none'
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
    <DropdownMenu
      disableAnimations
      caption={<Button use="primary">Открыть меню</Button>}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
      <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
      <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('With fixed header', () => (
    <DropdownWithScrollStateChange
      disableAnimations
      caption={<Button use="primary">Открыть меню</Button>}
      menuWidth={250}
    />
  ));

class DropdownWithScrollStateChange extends React.Component<
  DropdownMenuProps,
  { scrollState: ScrollContainerScrollState; value: string }
> {
  public state = {
    scrollState: 'top' as ScrollContainerScrollState,
    value: ''
  };

  public render() {
    return (
      <DropdownMenu
        {...this.props}
        onScrollStateChange={this.onScrollStateChange}
        menuMaxHeight={450}
        menuWidth={this.props.menuWidth}
        onClose={this.resetStateToDefault}
      >
        {this.input}
        {new Array(50).fill('').map((i, index) => (
          <MenuItem key={index}>{`Item ${index}`}</MenuItem>
        ))}
      </DropdownMenu>
    );
  }

  private get input() {
    const { scrollState } = this.state;
    const fixedState = scrollState !== 'top';

    const inputWrapperStyles: CSSProperties = {
      position: fixedState ? 'fixed' : 'static',
      boxShadow: fixedState ? '0 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
      zIndex: 3000,
      padding: '10px',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      top: fixedState ? 0 : undefined,
      transition: 'all 0.3s'
    };

    return (
      <div
        style={{
          position: 'relative',
          width: this.props.menuWidth
        }}
      >
        <div style={inputWrapperStyles}>
          <Input
            leftIcon={<SearchIcon />}
            value={this.state.value}
            onChange={this.handleInputChange}
            width={220}
          />
        </div>
      </div>
    );
  }

  private handleInputChange = (_: any, value: string) => {
    this.setState({ value });
  };

  private onScrollStateChange = (scrollState: ScrollContainerScrollState) => {
    this.setState({ scrollState });
  };

  private resetStateToDefault = () => {
    this.setState({ value: '', scrollState: 'top' });
  };
}
