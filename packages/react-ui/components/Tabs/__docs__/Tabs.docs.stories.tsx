import React from 'react';
import { Tabs } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/Tabs',
  component: Tabs,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [active, setActive] = React.useState('fuji');

  return (
    <Tabs value={active} onValueChange={setActive}>
      <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
      <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
      <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
    </Tabs>
  );
};
Example1.storyName = 'Базовый пример';

/** Компонент может отображать табы двумя способами: горизонтально (по умолчанию) и вертикально. */
export const Example2: Story = () => {
  const [active, setActive] = React.useState('fuji');

  return (
    <Tabs vertical value={active} onValueChange={setActive}>
      <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
      <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
      <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
    </Tabs>
  );
};
Example2.storyName = 'Расположение табов';

export const Example3: Story = () => {
  const [active, setActive] = React.useState('fuji');
  const renderCaption = (caption) => <span style={{ display: 'inline-block', width: 60 }}>{caption}</span>;
  return (
    <div>
      <div>
        {renderCaption('small')}
        <Tabs value={active} onValueChange={setActive} size="small">
          <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
          <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
          <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
        </Tabs>
      </div>
      <div>
        {renderCaption('medium')}
        <Tabs value={active} onValueChange={setActive} size="medium">
          <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
          <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
          <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
        </Tabs>
      </div>
      <div>
        {renderCaption('large')}
        <Tabs value={active} onValueChange={setActive} size="large">
          <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
          <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
          <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};
Example3.storyName = 'Размер';
