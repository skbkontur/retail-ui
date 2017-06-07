// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';

import Tabs from '../Tabs';
const { Tab } = Tabs;

class UncTabs extends React.Component {
  state = {
    active: 'fuji'
  };

  render() {
    return (
      <Tabs
        value={this.state.active}
        onChange={(_, v) => this.setState({ active: v })}
        vertical={this.props.vertical}
      >
        <Tab id="fuji">🌋&nbsp;&nbsp;Fuji</Tab>
        <Tab id="tahat">⛰&nbsp;&nbsp;Tahat</Tab>
        <Tab id="alps">🗻&nbsp;&nbsp;Alps</Tab>
      </Tabs>
    );
  }
}

const RouteTab = props =>
  <Tab id={props.to} onClick={linkTo('Tabs', props.to)}>
    {props.children}
  </Tab>;

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

class MyLink extends React.Component {
  render() {
    return <a {...this.props} />;
  }
}

const MyLinkTab = props => <Tab component={MyLink} {...props} />;

class TabsWithMyLink extends React.Component {
  state = {
    active: 'fuji'
  };

  render() {
    return (
      <Tabs
        value={this.state.active}
        onChange={(_, v) => this.setState({ active: v })}
        vertical={this.props.vertical}
      >
        <MyLinkTab id="fuji">🌋&nbsp;&nbsp;Fuji</MyLinkTab>
        <MyLinkTab id="tahat">⛰&nbsp;&nbsp;Tahat</MyLinkTab>
        <MyLinkTab id="alps">🗻&nbsp;&nbsp;Alps</MyLinkTab>
      </Tabs>
    );
  }
}

storiesOf('Tabs', module)
  .add('simple', () => <UncTabs />)
  .add('first', () => <RouterTabs value="first" />)
  .add('another', () => <RouterTabs value="another" />)
  .add('hrefs first', () =>
    <Tabs value="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">
        Hrefs first
      </Tab>
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">
        Hrefs second
      </Tab>
    </Tabs>
  )
  .add('hrefs second', () =>
    <Tabs value="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">
        Hrefs first
      </Tab>
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">
        Hrefs second
      </Tab>
    </Tabs>
  )
  .add('vertical', () => <UncTabs vertical />)
  .add('with component', () => <TabsWithMyLink />);
