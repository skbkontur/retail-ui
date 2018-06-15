
/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { storiesOf, linkTo } from '@storybook/react';

import Tabs from '../Tabs';
import Modal from '../../Modal';
import Button from '../../Button';
const { Tab } = Tabs;

class UncTabs extends React.Component<*, *> {
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
        <Tab id="fuji">Fuji</Tab>
        <Tab id="tahat">Tahat</Tab>
        <Tab id="alps">Alps</Tab>
      </Tabs>
    );
  }
}

const RouteTab = props => (
  <Tab id={props.to} onClick={linkTo('Tabs', props.to)}>
    {props.children}
  </Tab>
);

class RouterTabs extends React.Component<*> {
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

class MyLink extends React.Component<*> {
  render() {
    return <a {...this.props} />;
  }
}

const MyLinkTab = props => <Tab component={MyLink} {...props} />;

class TabsWithMyLink extends React.Component<*, *> {
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

class UnexpectedUpdatedTab extends React.Component<*, *> {
  state = {
    updated: false
  };

  render() {
    return (
      <Tab {...this.props}>
        {this.state.updated ? (
          ':P'
        ) : (
          <button onClick={() => this.setState({ updated: true })}>
            Update me
          </button>
        )}
      </Tab>
    );
  }
}

class OhMyTabs extends React.Component<*, *> {
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
        <UnexpectedUpdatedTab id="fuji">
          🌋&nbsp;&nbsp;Fuji
        </UnexpectedUpdatedTab>
        <UnexpectedUpdatedTab id="tahat">
          ⛰&nbsp;&nbsp;Tahat
        </UnexpectedUpdatedTab>
        <UnexpectedUpdatedTab id="alps">
          🗻&nbsp;&nbsp;Alps
        </UnexpectedUpdatedTab>
      </Tabs>
    );
  }
}

class DisabledTab extends React.Component<*, *> {
  state = {
    active: 'first'
  };

  render() {
    return (
      <Tabs
        value={this.state.active}
        onChange={(_, v) => this.setState({ active: v })}
      >
        <Tab id="first">First</Tab>
        <Tab id="second" disabled>
          Second (disabled)
        </Tab>
        <Tab id="third">Third</Tab>
        <Tab id="fourth">Third</Tab>
      </Tabs>
    );
  }
}

class TabsInModal extends React.Component<*, *> {
  state = {
    active: '1',
    opened: false,
    error: true,
    warning: true,
    success: true,
    primary: true
  };

  render() {
    return (
      <div>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
      </div>
    );
  }

  renderModal() {
    const TabElement = function TabElement(props: {
      style?: mixed,
      children: React.Node
    }) {
      return (
        <div style={{ marginLeft: 10, fontSize: 14, ...props.style }}>
          {props.children}
        </div>
      );
    };

    return (
      <Modal onClose={this.close} width={600}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <div style={{ marginLeft: -30 }}>
            <Tabs
              vertical
              value={this.state.active}
              onChange={(_, v) => this.setState({ active: v })}
            >
              <Tab id="1">
                <TabElement>Normal</TabElement>
              </Tab>
              <Tab id="2" success>
                <TabElement>Success</TabElement>
              </Tab>
              <Tab
                id="3"
                success={this.state.success}
                onClick={this.toggleSuccess}
              >
                <TabElement>Success-dynamic</TabElement>
              </Tab>
              <Tab id="4" warning>
                <TabElement>Warning</TabElement>
              </Tab>
              <Tab
                id="5"
                warning={this.state.warning}
                onClick={this.toggleWarning}
              >
                <TabElement>Warning-dynamic</TabElement>
              </Tab>
              <Tab id="6" error>
                <TabElement style={{ color: '#e14c30' }}>Error</TabElement>
              </Tab>
              <Tab
                id="7"
                error={this.state.error}
                warning
                onClick={this.toggleError}
              >
                <TabElement style={{ color: '#e14c30' }}>
                  Error-dynamic over warning
                </TabElement>
              </Tab>
              <Tab id="8" primary>
                <TabElement style={{ color: '#1e8dd4' }}>Primary</TabElement>
              </Tab>
              <Tab
                id="9"
                primary={this.state.primary}
                onClick={this.togglePrimary}
              >
                <TabElement style={{ color: '#1e8dd4' }}>
                  Primary-dynamic
                </TabElement>
              </Tab>
              <Tab id="10" disabled>
                <TabElement>Disabled</TabElement>
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
        <Modal.Footer panel>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  open = () => {
    this.setState({ opened: true });
  };

  close = () => {
    this.setState({ opened: false });
  };

  toggleError = () => {
    this.setState({ error: !this.state.error });
  };

  toggleWarning = () => {
    this.setState({ warning: !this.state.warning });
  };

  toggleSuccess = () => {
    this.setState({ success: !this.state.success });
  };

  togglePrimary = () => {
    this.setState({ primary: !this.state.primary });
  };
}

storiesOf('Tabs', module)
  .add('simple', () => <UncTabs />)
  .add('first', () => <RouterTabs value="first" />)
  .add('another', () => <RouterTabs value="another" />)
  .add('hrefs first', () => (
    <Tabs value="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">
        Hrefs first
      </Tab>
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">
        Hrefs second
      </Tab>
    </Tabs>
  ))
  .add('hrefs second', () => (
    <Tabs value="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">
        Hrefs first
      </Tab>
      <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">
        Hrefs second
      </Tab>
    </Tabs>
  ))
  .add('vertical', () => <UncTabs vertical />)
  .add('with component', () => <TabsWithMyLink />)
  .add('with unexpected tab size change', () => <OhMyTabs />)
  .add('with disabled tab', () => <DisabledTab />)
  .add('tabs in modal', () => <TabsInModal />);
