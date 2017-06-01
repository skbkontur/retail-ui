// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Tabs from '../Tabs';
import Tab from '../Tab';

class UncTabs extends React.Component {
  state = {
    active: 'fuji'
  };

  render() {
    return (
      <Tabs
        value={this.state.active}
        onChange={(_, v) => this.setState({ active: v })}
      >
        <Tab id="fuji">🌋&nbsp;&nbsp;Fuji</Tab>
        <Tab id="tahat">⛰&nbsp;&nbsp;Tahat</Tab>
        <Tab id="alps">🗻&nbsp;&nbsp;Alps</Tab>
      </Tabs>
    );
  }
}

storiesOf('TabsV2', module).add('simple', () => <UncTabs />);
