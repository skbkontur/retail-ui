import { IconArchiveBoxRegular16 } from '@skbkontur/icons/IconArchiveBoxRegular16';
import { IconCheckALight16 } from '@skbkontur/icons/IconCheckALight16';
import { IconCheckALight20 } from '@skbkontur/icons/IconCheckALight20';
import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import { IconCheckARegular24 } from '@skbkontur/icons/IconCheckARegular24';
import { IconSearchLoupeRegular16 } from '@skbkontur/icons/IconSearchLoupeRegular16';
import { IconXLight16 } from '@skbkontur/icons/IconXLight16';
import { IconXLight20 } from '@skbkontur/icons/IconXLight20';
import { IconXRegular24 } from '@skbkontur/icons/IconXRegular24';
import type { ReactElement } from 'react';
import React from 'react';

import { ComponentTable } from '../../../internal/ComponentTable.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme.js';
import type { Meta, Story } from '../../../typings/stories.js';
import { Gapped } from '../../Gapped/index.js';
import { Button } from '../Button.js';
import type { ButtonProps } from '../Button.js';

const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    size: { control: 'radio' },
  },
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: 'Default' },
      },
    },
  },
};

export default meta;

type ButtonState = Partial<ButtonProps<'button' | 'a'>>;

export const Default: Story = () => (
  <Button data-tid="test-button">Здесь рисуется первая история из файла .stories.tsx</Button>
);

const useStates2022: ButtonState[] = [
  { use: 'default' },
  { use: 'fill' },
  { use: 'outline' },
  { use: 'text' },
  { use: 'accent' },
  { use: 'danger' },
  { use: 'pay' },
  { use: 'success' },

  /** @deprecated */
  { use: 'primary' },
  { use: 'backless' },
  { use: 'link' },
];
const testingButtonUseStates2022: ButtonState[] = [
  { use: 'default' },
  { use: 'fill' },
  { use: 'outline' },
  { use: 'text' },
  { use: 'accent' },

  /** @deprecated */
  { use: 'primary' },
  { use: 'backless' },
  { use: 'link' },
];

const buttonAsLinkUseStates: ButtonState[] = [
  { use: 'default' },
  { use: 'fill' },
  { use: 'outline' },
  { use: 'text' },
  { use: 'accent' },
  { use: 'danger' },
  { use: 'pay' },
  { use: 'success' },

  /** @deprecated */
  { use: 'primary' },
  { use: 'backless' },
];

const buttonAsLinkTestingProps: ButtonState[] = [
  { children: 'Link' },
  { disabled: true },
  { loading: true },
  { icon: <IconCheckARegular16 /> },
  { icon: <IconCheckARegular16 />, disabled: true },
  { rightIcon: <IconCheckARegular16 /> },
  { rightIcon: <IconCheckARegular16 />, disabled: true },
  { icon: <IconCheckARegular16 />, rightIcon: <IconCheckARegular16 /> },
  { icon: <IconCheckARegular16 />, rightIcon: <IconCheckARegular16 />, disabled: true },
  { error: true },
  { warning: true },
];

const testingLinkState: ButtonState[] = [{ use: 'link' }];

const getButtonUseStates = () => {
  return testingButtonUseStates2022.map((x) => ({ props: x }));
};

const getUseStates = () => {
  return useStates2022.map((x) => ({ props: x }));
};

const getIcon = (icon: ReactElement) => {
  return icon;
};

export const Use: Story = () => (
  <ComponentTable
    Component={Button}
    rows={getUseStates()}
    cols={useDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const useDifferentStates: ButtonState[] = [{}, { checked: true }, { active: true }, { active: true, checked: true }];

export const Warning: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', warning: true }}
  />
);

export const Error: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', error: true }}
  />
);

export const Focused: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', visuallyFocused: true }}
  />
);

export const Arrow: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: true }}
  />
);

export const ArrowLeft: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: 'left' }}
  />
);

const arrowDifferentStates: ButtonState[] = [
  { warning: true },
  { error: true },
  { checked: true },
  { visuallyFocused: true },
  { warning: true, error: true },
  { warning: true, checked: true },
  { warning: true, visuallyFocused: true },
  { error: true, checked: true },
  { error: true, visuallyFocused: true },
  { checked: true, visuallyFocused: true },
];

export const ArrowSize: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={arrowDifferentSizeStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const arrowDifferentSizeStates: ButtonState[] = [
  { arrow: true },
  { arrow: true, size: 'medium' },
  { arrow: true, size: 'large' },
  { arrow: 'left' },
  { arrow: 'left', size: 'medium' },
  { arrow: 'left', size: 'large' },
];

export const Borderless: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={borderlessDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', borderless: true }}
  />
);

const borderlessDifferentStates: ButtonState[] = [
  {},
  { disabled: true },
  { loading: true },
  { checked: true },
  { visuallyFocused: true },
  { error: true },
  { warning: true },
  { active: true },
];

export const Size: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const sizeDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Loading: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={loadingDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', loading: true }}
  />
);

const loadingDifferentStates: ButtonState[] = [
  { checked: true },
  { visuallyFocused: true },
  { active: true },
  { checked: true, visuallyFocused: true },
  { checked: true, active: true },
  { visuallyFocused: true, active: true },
];

export const Narrow: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={narrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', narrow: true }}
  />
);

const narrowDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Align: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={alignDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', width: '200px' }}
  />
);

const alignDifferentStates: ButtonState[] = [
  { align: 'center' },
  { align: 'end' },
  { align: 'justify' },
  { align: 'left' },
  { align: 'right' },
  { align: 'start' },
];

export const Link = () => (
  <ComponentTable
    Component={Button}
    cols={testingLinkState.map((x) => ({ props: x }))}
    rows={linkDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', use: 'link' }}
  />
);

const linkDifferentStates: ButtonState[] = [
  { children: 'Default width' },
  { width: 'auto' },
  { width: 200 },
  { warning: true },
  { warning: true, size: 'medium' },
  { warning: true, size: 'large' },
  { error: true },
  { error: true, size: 'medium' },
  { error: true, size: 'large' },
  { visuallyFocused: true },
  { visuallyFocused: true, size: 'medium' },
  { visuallyFocused: true, size: 'large' },
  { disabled: true },
  { disabled: true, size: 'medium' },
  { disabled: true, size: 'large' },
  { loading: true },
  { loading: true, size: 'medium' },
  { loading: true, size: 'large' },
];

export const Icon: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={iconDifferentStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);
const iconDifferentStates: ButtonState[] = [
  { icon: <IconArchiveBoxRegular16 /> },
  { icon: <IconArchiveBoxRegular16 />, children: 'Button' },
  { icon: <IconCheckARegular16 /> },
  { icon: <IconCheckARegular16 />, loading: true },
  { icon: <IconCheckARegular16 />, children: 'Button' },
  { icon: <IconCheckARegular16 />, children: 'Button', size: 'medium' },
  { icon: <IconCheckARegular16 />, children: 'Button', size: 'large' },
  { icon: <IconCheckARegular16 />, children: 'Button', loading: true },
];

export const RightIcon: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={rightIconDifferentStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);
const rightIconDifferentStates: ButtonState[] = [
  { rightIcon: <IconCheckALight16 /> },
  { rightIcon: <IconCheckALight16 />, children: 'Button' },
  { rightIcon: <IconCheckALight16 /> },
  { rightIcon: <IconCheckALight16 />, loading: true },
  { rightIcon: <IconCheckALight16 />, children: 'Button' },
  { rightIcon: <IconCheckALight20 />, children: 'Button', size: 'medium' },
  { rightIcon: <IconCheckARegular24 />, children: 'Button', size: 'large' },
  { rightIcon: <IconCheckALight16 />, children: 'Button', loading: true },
];

export const BothIcons: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={bothIconsDifferentStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);
const bothIconsDifferentStates: ButtonState[] = [
  { icon: <IconCheckALight16 />, rightIcon: <IconXLight16 /> },
  { icon: <IconCheckALight16 />, rightIcon: <IconXLight16 />, children: 'Button' },
  { icon: <IconCheckALight16 />, rightIcon: <IconXLight16 /> },
  { icon: <IconCheckALight16 />, rightIcon: <IconXLight16 />, loading: true },
  { icon: <IconCheckALight16 />, rightIcon: <IconXLight16 />, children: 'Button' },
  { icon: <IconCheckALight20 />, rightIcon: <IconXLight20 />, children: 'Button', size: 'medium' },
  { icon: <IconCheckARegular24 />, rightIcon: <IconXRegular24 />, children: 'Button', size: 'large' },
  { icon: <IconCheckALight16 />, rightIcon: <IconXLight16 />, children: 'Button', loading: true },
];

export const Disabled: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={disabledDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', disabled: true }}
  />
);

export const ArrowDisabled: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getUseStates()}
    rows={disabledDifferentStates.filter((state) => !state.icon).map((state) => ({ props: state }))}
    presetProps={{ children: 'Button', disabled: true, arrow: true }}
  />
);

export const MultilineTextWithLinkButton = () => (
  <div>
    &quot;You can&apos;t keep boogieing like this. <br />
    You&apos;ll come <Button use="link">down</Button> <br />
    with a fever of some sort.&quot;
    <br />
    <i>Leela</i>
  </div>
);

const disabledDifferentStates: ButtonState[] = [
  {},
  { loading: true },
  { loading: true, icon: <IconCheckARegular16 /> },
];

export const Checked: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={checkedDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', checked: true }}
  />
);

const checkedDifferentStates: ButtonState[] = [
  {},
  { disabled: true },
  { visuallyFocused: true },
  { disabled: true, visuallyFocused: true },
];

export const DifferentPrioritization: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={differentPriorityStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const differentPriorityStates: ButtonState[] = [
  { warning: true, error: true },
  { warning: true, visuallyFocused: true },
  { warning: true, disabled: true },
  { warning: true, checked: true },
  { warning: true, loading: true },
  { error: true, visuallyFocused: true },
  { error: true, disabled: true },
  { error: true, checked: true },
  { error: true, loading: true },
  { visuallyFocused: true, disabled: true },
  { visuallyFocused: true, checked: true },
  { visuallyFocused: true, loading: true },
  { disabled: true, checked: true },
  { disabled: true, loading: true },
  { warning: true, error: true, visuallyFocused: true },
  { warning: true, error: true, disabled: true },
  { warning: true, error: true, checked: true },
  { warning: true, error: true, loading: true },
  { warning: true, visuallyFocused: true, disabled: true },
  { warning: true, visuallyFocused: true, checked: true },
  { warning: true, visuallyFocused: true, loading: true },
  { warning: true, disabled: true, checked: true },
  { warning: true, disabled: true, loading: true },
  { warning: true, checked: true, loading: true },
  { error: true, visuallyFocused: true, disabled: true },
  { error: true, visuallyFocused: true, checked: true },
  { error: true, visuallyFocused: true, loading: true },
  { visuallyFocused: true, disabled: true, checked: true },
  { visuallyFocused: true, disabled: true, loading: true },
  { disabled: true, checked: true, loading: true },
];

export const IconDifferentContent = () => (
  <Gapped vertical>
    <span>Icon as children</span>
    <Button>{<IconCheckARegular16 />}</Button>
    <Button icon={<IconCheckARegular16 />} use={'primary'}>
      Icon with long text and color
    </Button>
    <Button icon={<IconCheckARegular16 />} width="200px">
      With icon, fixed width and long-lon-long text
    </Button>
  </Gapped>
);

export const RightIconDifferentContent = () => (
  <Gapped vertical>
    <Button rightIcon={<IconCheckARegular16 />} use={'primary'}>
      Icon with long text and color
    </Button>
    <Button rightIcon={<IconCheckARegular16 />} width="200px">
      With icon, fixed width and long-lon-long text
    </Button>
  </Gapped>
);

export const BothIconsDifferentContent = () => (
  <Gapped vertical>
    <Button icon={<IconCheckARegular16 />} rightIcon={<IconCheckARegular16 />} use={'primary'}>
      Icon with long text and color
    </Button>
    <Button icon={<IconCheckARegular16 />} rightIcon={<IconCheckARegular16 />} width="200px">
      With icon, fixed width and long-lon-long text
    </Button>
  </Gapped>
);

export const PlaygroundDefault: Story = () => (
  <Button icon={getIcon(<IconCheckARegular16 />)} data-tid="test-button">
    Hello
  </Button>
);

export const PlaygroundDisabled: Story = () => (
  <Button icon={getIcon(<IconCheckARegular16 />)} disabled data-tid="test-button">
    Hello
  </Button>
);

export const TextStylesReset = () => (
  <div
    style={{
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontVariant: 'small-caps slashed-zero',
      fontStretch: 'expanded',
      color: 'red',
      lineHeight: '50px',
      textAlign: 'right',
      textShadow: '3px 3px 3px #333',
      textTransform: 'uppercase',
      letterSpacing: '5px',
    }}
  >
    <Gapped>
      <span>Inherited Styles</span>
      <Button>
        <IconSearchLoupeRegular16 />
      </Button>
      <Button>Button</Button>
      <Button visuallyFocused>Focused</Button>
      <Button active>Active</Button>
      <Button checked>Checked</Button>
      <Button disabled>Disabled</Button>
      <Button use="link">Link</Button>
    </Gapped>
  </div>
);

export const UnusedPropValues: Story = () => (
  <ComponentTable
    Component={Button}
    cols={getButtonUseStates()}
    rows={unusedDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);
const unusedDifferentStates: ButtonState[] = [
  { active: false },
  { arrow: false },
  { autoFocus: false },
  { borderless: false },
  { className: '' },
  { 'data-tid': '' },
  { disabled: false },
  { error: false },
  { loading: false },
  { narrow: false },
  { style: {} },
  { theme: {} },
  { title: '' },
  { warning: false },
  { width: '' },
];

export const IconColor: Story = () => {
  return (
    <Gapped vertical>
      <Button icon={<IconCheckARegular16 color="red" />}>Old icon</Button>
      <Button icon={<IconCheckARegular16 color="red" />}>New icon</Button>
      <Button
        icon={
          <span style={{ color: 'red' }}>
            <IconCheckARegular16 />
          </span>
        }
      >
        Old icon in span
      </Button>
      <Button
        icon={
          <span style={{ color: 'red' }}>
            <IconCheckARegular16 />
          </span>
        }
      >
        New icon in span
      </Button>
      <Button theme={{ btnIconColor: 'red' }} icon={<IconCheckARegular16 />}>
        btnIconColor
      </Button>
    </Gapped>
  );
};

export const IconAndTextHoverColor: Story = () => {
  return (
    <Button
      data-tid="test-button"
      use="text"
      icon={<IconCheckARegular16 />}
      theme={{ btnIconHoverColor: 'red', btnTextHoverTextColor: 'red' }}
    >
      Button
    </Button>
  );
};

export const HoverTextColor: Story = () => {
  return (
    <Button theme={{ btnTextHoverTextColor: 'white', btnTextHoverBg: '#ff5a49' }} use="text" data-tid="test-button">
      Use Text
    </Button>
  );
};

export const BtnBacklessBgAndTextColor: Story = () => {
  const myTheme = ThemeFactory.create({
    btnBacklessTextColor: 'white',
    btnBacklessBg: 'blue',
  });

  return (
    <ThemeContext.Provider value={myTheme}>
      <Button use="backless">Backless</Button>
    </ThemeContext.Provider>
  );
};
BtnBacklessBgAndTextColor.storyName = 'Backless with custom bg and text colors';
BtnBacklessBgAndTextColor.parameters = {
  creevey: {
    skip: {
      'not browser specific': { in: /^(?!\b(chrome2022|chrome2022Dark)\b)/ },
    },
  },
};

export const BtnBacklessBgHoverActive: Story = () => {
  const myTheme = ThemeFactory.create(
    {
      btnBacklessHoverBg: 'red',
      btnBacklessActiveBg: 'green',
    },
    DARK_THEME,
  );

  return (
    <ThemeContext.Provider value={myTheme}>
      <Button data-tid="test-button" use="backless">
        Backless
      </Button>
    </ThemeContext.Provider>
  );
};

export const ButtonAsLink: Story = () => {
  return (
    <ComponentTable
      Component={Button}
      cols={buttonAsLinkUseStates.map((x) => ({ props: x }))}
      rows={buttonAsLinkTestingProps.map((x) => ({ props: x }))}
      presetProps={{ children: 'Link', component: 'a' }}
    />
  );
};

export const ButtonAsLinkIconColor: Story = () => {
  return (
    <Button
      data-tid="test-button"
      theme={{ btnIconColor: 'blue', btnIconHoverColor: 'red' }}
      component="a"
      icon={<IconCheckARegular16 />}
    >
      Button as link
    </Button>
  );
};

export const ButtonAsLinkIconDisabledColor: Story = () => {
  return (
    <Button theme={{ btnIconDisabledColor: 'red' }} component="a" icon={<IconCheckARegular16 />} disabled>
      Button as link
    </Button>
  );
};

export const BtnTextBgHoverActive: Story = () => {
  const myTheme = ThemeFactory.create(
    {
      btnTextHoverBg: 'red',
      btnTextActiveBg: 'green',
    },
    DARK_THEME,
  );

  return (
    <ThemeContext.Provider value={myTheme}>
      <Button data-tid="test-button" use="text">
        Text
      </Button>
    </ThemeContext.Provider>
  );
};
