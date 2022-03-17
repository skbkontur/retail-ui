import React from 'react';
import MenuIcon from '@skbkontur/react-icons/Menu';
import ArrowSize2Icon from '@skbkontur/react-icons/ArrowSize2';
import SearchIcon from '@skbkontur/react-icons/Search';
import AddIcon from '@skbkontur/react-icons/Add';
import DeleteIcon from '@skbkontur/react-icons/Delete';

import { Meta, Story, CreeveyTests } from '../../../typings/stories';
import { MenuItem } from '../../MenuItem';
import { MenuHeader } from '../../MenuHeader';
import { MenuSeparator } from '../../MenuSeparator';
import { DropdownMenu, DropdownMenuProps } from '../DropdownMenu';
import { Button } from '../../Button';
import { Toast } from '../../Toast';
import { Input } from '../../Input';
import { Gapped } from '../../Gapped';
import { delay } from '../../../lib/utils';

export default {
  title: 'DropdownMenu',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px 120px 150px',
          border: '1px solid #dfdede',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const SimpleExample: Story = () => (
  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
    <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
    <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
  </DropdownMenu>
);
SimpleExample.storyName = 'Simple example';

SimpleExample.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async clickAfterClickedOnCaption() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clickAfterClickedOnCaption');
      },
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
          .perform();
        await delay(500);
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
      async tabPress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
      },
      async enterPress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ENTER)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
      },
      async escapePress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ENTER)
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ESCAPE)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('escapePress');
      },
    },
  },
};

const MenuOutOfViewPortSample = ({ side }: { side: 'left' | 'right' }) => {
  return (
    <div
      style={{
        overflow: 'auto',
        width: '100vw',
        height: '300px',
        marginLeft: '-100px',
        marginRight: '-100px',
        marginBottom: '-150px',
      }}
      data-tid="container"
    >
      <div
        style={{
          width: 'calc(100% + 50px)',
          display: 'flex',
          justifyContent: `${side === 'right' ? 'flex-end' : 'flex-start'}`,
          alignItems: 'flex-start',
        }}
      >
        <Gapped vertical>
          <DropdownMenu data-tid={'firstMenu'} caption={<Button use="primary">Открыть меню</Button>}>
            <MenuHeader>Заголовок меню</MenuHeader>
            <MenuSeparator />
            <MenuItem>Раз два три раз два три</MenuItem>
            <MenuItem>Раз два три раз два три</MenuItem>
            <MenuItem>Раз два три раз два три</MenuItem>
          </DropdownMenu>
          <DropdownMenu data-tid={'secondMenu'} menuWidth={300} caption={<Button use="primary">Открыть меню</Button>}>
            <MenuHeader>Заголовок меню</MenuHeader>
            <MenuSeparator />
            <MenuItem>Раз два три раз два три</MenuItem>
            <MenuItem>Раз два три раз два три</MenuItem>
            <MenuItem>Раз два три раз два три</MenuItem>
          </DropdownMenu>
        </Gapped>
      </div>
    </div>
  );
};

const outOfViewTests: (side: 'left' | 'right') => CreeveyTests = (side) => {
  return {
    async ['out of viewport']() {
      if (side === 'left') {
        await this.browser.executeScript(function () {
          // @ts-ignore
          const container: Element = window.document.querySelector('[data-tid="container"]');
          container.scrollLeft = container.scrollWidth;
        });
      }

      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="firstMenu"]' }))
        .perform();
      await delay(500);
      await this.expect(await this.takeScreenshot()).to.matchImage('out of viewport');
    },
    async ['out of edge with min menu width']() {
      if (side === 'left') {
        await this.browser.executeScript(function () {
          // @ts-ignore
          const container: Element = window.document.querySelector('[data-tid="container"]');
          container.scrollLeft = container.scrollWidth;
        });
      }

      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid="secondMenu"]' }))
        .perform();
      await delay(500);
      await this.expect(await this.takeScreenshot()).to.matchImage('out of viewport with min menu width');
    },
  };
};

export const MenuOutOfViewPortRight: Story = () => {
  return <MenuOutOfViewPortSample side={'right'} />;
};
MenuOutOfViewPortRight.storyName = 'Menu out of viewport right';

MenuOutOfViewPortRight.parameters = {
  creevey: {
    tests: outOfViewTests('right'),
  },
};

export const MenuOutOfViewPortLeft: Story = () => {
  return <MenuOutOfViewPortSample side={'left'} />;
};
MenuOutOfViewPortLeft.storyName = 'Menu out of viewport left';

MenuOutOfViewPortLeft.parameters = {
  creevey: {
    tests: outOfViewTests('left'),
  },
};

export const CaptionWidth: Story = () => (
  <div style={{ width: '300px' }}>
    <DropdownMenu
      caption={
        <Button width={'100%'} use="primary">
          Открыть меню
        </Button>
      }
      width={'100%'}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
      <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
      <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
    </DropdownMenu>
  </div>
);
CaptionWidth.storyName = 'Caption width 100%';

CaptionWidth.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
    },
  },
};

export const ExampleWithWidthOfMenu = () => (
  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={350}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
);
ExampleWithWidthOfMenu.storyName = 'Example with width of menu';
ExampleWithWidthOfMenu.parameters = { creevey: { skip: true } };

export const ExampleWithMaximumHeightOfMenu = () => (
  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
);
ExampleWithMaximumHeightOfMenu.storyName = 'Example with maximum height of menu';
ExampleWithMaximumHeightOfMenu.parameters = { creevey: { skip: true } };

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
CaptionAcceptsAnArbitraryElement.storyName = 'Caption accepts an arbitrary element';
CaptionAcceptsAnArbitraryElement.parameters = { creevey: { skip: true } };

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
OnlyStaticElements.storyName = 'Only static elements';
OnlyStaticElements.parameters = { creevey: { skip: true } };

export const CaptionAcceptsAFunction = () => (
  <DropdownMenu
    menuWidth="300px"
    caption={(captionProps) => (
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
CaptionAcceptsAFunction.storyName = 'Caption accepts a function';
CaptionAcceptsAFunction.parameters = { creevey: { skip: true } };

export const WithoutAnimations = () => (
  <DropdownMenu disableAnimations caption={<Button use="primary">Открыть меню</Button>}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
    <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
    <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
  </DropdownMenu>
);
WithoutAnimations.storyName = 'Without animations';
WithoutAnimations.parameters = { creevey: { skip: true } };

export const WithHeaderAndFooter: Story = () => (
  <DropdownWithScrollStateChange
    disableAnimations
    caption={<Button use="primary">Открыть меню</Button>}
    menuWidth={250}
  />
);
WithHeaderAndFooter.storyName = 'With header and footer';

WithHeaderAndFooter.parameters = {
  creevey: {
    tests: {
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
          .perform();
        await delay(500);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('clicked');
      },
      async ['scrolled by 100']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
          .perform();
        await this.browser.executeScript(function () {
          // @ts-ignore
          const scrollContainer: Element = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
          scrollContainer.scrollTop += 100;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('scrolled by 100');
      },
      async ['scrolled down to bottom']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="PopupMenu__caption"]' }))
          .perform();
        await this.browser.executeScript(function () {
          // @ts-ignore
          const scrollContainer: Element = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
          scrollContainer.scrollTop += scrollContainer.scrollHeight;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('scrolled down to bottom');
      },
    },
  },
};

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
    this.setState((state) => ({
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
