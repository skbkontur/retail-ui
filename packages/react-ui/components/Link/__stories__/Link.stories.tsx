import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import React from 'react';

import { ComponentTable } from '../../../internal/ComponentTable.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import type { Story } from '../../../typings/stories.js';
import { Button } from '../../Button/index.js';
import { Gapped } from '../../Gapped/index.js';
import { Hint } from '../../Hint/index.js';
import { SingleToast } from '../../SingleToast/index.js';
import { Link } from '../Link.js';
import type { LinkProps } from '../Link.js';

export default {
  title: 'Link',
  component: Link,
};

export const Simple: Story = () => <Link>Simple Link</Link>;

export const WithIcon: Story = () => {
  return (
    <Gapped vertical>
      <Gapped gap={20}>
        <Link icon={<IconCheckARegular16 />}>Left Icon Link</Link>
        <Link icon={<IconCheckARegular16 />} rightIcon={<IconCheckARegular16 />}>
          Both Icons Link
        </Link>
        <Link rightIcon={<IconCheckARegular16 />}>Right Icon Link</Link>
        <Link icon={<IconCheckARegular16 />} rightIcon={<IconCheckARegular16 />} error>
          Both Icons Link Error
        </Link>
      </Gapped>
      <Gapped gap={20}>
        <Link loading icon={<IconCheckARegular16 />}>
          Left Icon Link
        </Link>
        <Link loading icon={<IconCheckARegular16 />} rightIcon={<IconCheckARegular16 />}>
          Both Icons Link
        </Link>
        <Link loading rightIcon={<IconCheckARegular16 />}>
          Right Icon Link
        </Link>
        <Link loading icon={<IconCheckARegular16 />} rightIcon={<IconCheckARegular16 />} warning>
          Both Icons Link Warning
        </Link>
      </Gapped>
    </Gapped>
  );
};

export const Danger: Story = () => (
  <Link icon={<IconCheckARegular16 />} use="danger">
    Simple Link
  </Link>
);

export const Grayed: Story = () => <Link use="grayed">Simple link</Link>;

export const Disabled: Story = () => <Link disabled>Simple link</Link>;

export const WithOnClick = () => (
  <>
    <SingleToast />
    <Link onClick={() => SingleToast.push('Clicked!')}>Simple Link</Link>
  </>
);
WithOnClick.storyName = 'With onClick';
WithOnClick.parameters = { creevey: { skip: true } };

export const Loading: Story = () => (
  <Gapped vertical>
    <Link loading>Simple loading </Link>
    <div style={{ width: '300px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <div style={{ width: '150px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <Link loading icon={<IconCheckARegular16 />}>
      Loading link with icon
    </Link>
  </Gapped>
);
export const FocusedStyledLink: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider value={ThemeFactory.create({ linkHoverTextDecorationStyle: 'dotted' }, theme)}>
            <Link icon={<IconCheckARegular16 />}>Simple Link</Link>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};

type LinkState = Partial<LinkProps<'a' | 'button'>>;

const linkUseStates: LinkState[] = [{ use: 'default' }, { use: 'danger' }, { use: 'success' }, { use: 'grayed' }];
const componentPropStates: LinkState[] = [
  { children: 'Button' },
  { disabled: true },
  { icon: <IconCheckARegular16 /> },
  { icon: <IconCheckARegular16 />, loading: true },
  { rightIcon: <IconCheckARegular16 /> },
  { rightIcon: <IconCheckARegular16 />, loading: true },
  { icon: <IconCheckARegular16 />, rightIcon: <IconCheckARegular16 /> },
  { icon: <IconCheckARegular16 />, rightIcon: <IconCheckARegular16 />, loading: true },
  { warning: true },
  { error: true },
];

export const LinkAsButton: Story = () => {
  return (
    <ComponentTable
      Component={Link}
      cols={linkUseStates.map((state) => ({ props: state }))}
      rows={componentPropStates.map((x) => ({ props: x }))}
      presetProps={{ children: 'Button', component: 'button' }}
    />
  );
};

export const LinkAsButtonValidation: Story = () => {
  return (
    <Gapped vertical gap={10}>
      <Button use="link" warning>
        Warning
      </Button>
      <Link warning>Warning</Link>
      <Button use="link" error>
        Error
      </Button>
      <Link error>Error</Link>
    </Gapped>
  );
};

export const MultilineLink: Story = () => {
  return (
    <div style={{ width: 300 }}>
      <ComponentTable
        Component={Link}
        cols={[{ props: {} }, { props: { error: true } }, { props: { warning: true } }]}
        rows={[{ props: {} }]}
        presetProps={{ children: 'Mul tilyi  Multili ne Link Multiline' }}
      />
    </div>
  );
};

export const SameColorsInDifferentUse: Story = () => {
  const differentColorStyles = {
    linkColor: 'blue',
    linkHoverColor: 'red',
    linkActiveColor: 'yellow',

    linkGrayedColor: 'blue',
    linkGrayedHoverColor: 'red',
    linkGrayedActiveColor: 'yellow',
  };

  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <Gapped vertical>
            <ThemeContext.Provider value={ThemeFactory.create(differentColorStyles, theme)}>
              <Gapped vertical>
                <Link use="default">Я дефолтная ссылка, закастомленная под серую</Link>
                <Link use="grayed">Я серая ссылка</Link>
                <span>Они должны быть одинаковых цветов</span>
              </Gapped>
            </ThemeContext.Provider>
          </Gapped>
        );
      }}
    </ThemeContext.Consumer>
  );
};
SameColorsInDifferentUse.parameters = { creevey: { skip: true } };

export const HintOnDisabledLink = () => (
  <Hint text="TEXT">
    <Link disabled>DISABLED LINK</Link>
  </Hint>
);
HintOnDisabledLink.storyName = 'HintOnDisabledLink';
