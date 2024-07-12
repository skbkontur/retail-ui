import { Tab } from '../Tab';
import React from 'react';
import { Tabs } from '../Tabs';

export default {
  title: 'Navigation/Tab',
  component: Tab,
};

export const Default = () => {
  const [activeBase, setActiveBase] = React.useState('error');
  return (
    <Tabs value={activeBase} onValueChange={setActiveBase}>
      <Tabs.Tab primary id="primary">
        Primary
      </Tabs.Tab>
      <Tabs.Tab success id="success">
        Success
      </Tabs.Tab>
      <Tabs.Tab warning id="warning">
        Warning
      </Tabs.Tab>
      <Tabs.Tab error id="error">
        Error
      </Tabs.Tab>
    </Tabs>
  );
};
