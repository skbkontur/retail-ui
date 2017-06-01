// @flow
import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';

import Tabs from '../Tabs';

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
        <Tabs.Tab id="fuji">🌋&nbsp;&nbsp;Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat">⛰&nbsp;&nbsp;Tahat</Tabs.Tab>
        <Tabs.Tab id="alps">🗻&nbsp;&nbsp;Alps</Tabs.Tab>
      </Tabs>
    );
  }
}

const RouteTab = props => (
  <Tabs.Tab id={props.to} onClick={linkTo('Tabs', props.to)}>
    {props.children}
  </Tabs.Tab>
);

class RouterTabs extends React.Component {
  render() {
    return (
      <div>
        <h2>Router Tabs</h2>
        <Tabs value={this.props.value}>
          <RouteTab to="first">First Page</RouteTab>
          <RouteTab to="another">Another</RouteTab>
        </Tabs>
      </div>
    );
  }
}

storiesOf('Tabs', module)
  .add('simple', () => <UncTabs />)
  .add('first', () => <RouterTabs value="first" />)
  .add('another', () => <RouterTabs value="another" />);
