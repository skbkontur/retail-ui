import React from 'react';
import { linkTo } from '@storybook/addon-links';

import { Story, CreeveyTests } from '../../../typings/stories';
import { ComponentTable } from '../../../internal/ComponentTable';
import { Tabs } from '../Tabs';
import { TabProps } from '../Tab';
import { Modal } from '../../Modal';
import { Button } from '../../Button';
import { delay } from '../../../lib/utils';
const { Tab } = Tabs;

const Img: React.FC<{ size: string }> = ({ size }) => (
  <img
    src={`data:image/svg+xml;base64,${btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect fill="grey" width="100%" height="100%" /></svg>`,
    )}`}
    alt="test"
  />
);

enum Mountain {
  fuji = 'Fuji',
  tahat = 'Tahat',
  alps = 'Alps',
}

interface UncTabsState {
  active: Mountain;
}

class UncTabs extends React.Component<any, UncTabsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      active: Mountain.fuji,
    };
  }

  public render() {
    return (
      <Tabs<Mountain>
        value={this.state.active}
        onValueChange={(v) => this.setState({ active: v })}
        vertical={this.props.vertical}
      >
        <Tab id={Mountain.fuji}>{Mountain.fuji}</Tab>
        <Tab id={Mountain.tahat}>{Mountain.tahat}</Tab>
        <Tab id={Mountain.alps}>{Mountain.alps}</Tab>
      </Tabs>
    );
  }
}

const RouteTab = (props: any) => (
  // @ts-ignore: wrong @storybook/addon-links types
  <Tab id={props.to} onClick={linkTo('Tabs', props.to)}>
    {props.children}
  </Tab>
);

class RouterTabs extends React.Component<any> {
  public render() {
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

const MyLink = (props: React.InputHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{props.children}</a>;

class TabsWithMyLink extends React.Component<any, any> {
  public state = {
    active: 'fuji',
  };

  public render() {
    return (
      <Tabs
        value={this.state.active}
        onValueChange={(v) =>
          this.setState({
            active: v,
          })
        }
        vertical={this.props.vertical}
      >
        <Tab id="fuji" component={(props) => <MyLink {...props} to="/1" />}>
          <span role="img" aria-label="fuji">
            🌋&nbsp;&nbsp;Fuji
          </span>
        </Tab>
        <Tab id="tahat" component={(props) => <MyLink {...props} to="/2" />}>
          <span role="img" aria-label="tahat">
            ⛰&nbsp;&nbsp;Tahat
          </span>
        </Tab>
        <Tab id="alps" component={(props) => <MyLink {...props} to="/3" />}>
          <span role="img" aria-label="alps">
            🗻&nbsp;&nbsp;Alps
          </span>
        </Tab>
      </Tabs>
    );
  }
}

class UnexpectedUpdatedTab extends React.Component<{ id: string }, any> {
  public state = {
    updated: false,
  };

  public render() {
    return (
      <Tab {...this.props}>
        {this.state.updated ? ':P' : <button onClick={() => this.setState({ updated: true })}>Update me</button>}
      </Tab>
    );
  }
}

class OhMyTabs extends React.Component<any, any> {
  public state = {
    active: 'fuji',
  };

  public render() {
    return (
      <Tabs
        value={this.state.active}
        onValueChange={(v) => this.setState({ active: v })}
        vertical={this.props.vertical}
      >
        <UnexpectedUpdatedTab id="fuji">
          <span role="img" aria-label="fuji">
            🌋&nbsp;&nbsp;Fuji
          </span>
        </UnexpectedUpdatedTab>
        <UnexpectedUpdatedTab id="tahat">
          <span role="img" aria-label="tahat">
            ⛰&nbsp;&nbsp;Tahat
          </span>
        </UnexpectedUpdatedTab>
        <UnexpectedUpdatedTab id="alps">
          <span role="img" aria-label="alps">
            🗻&nbsp;&nbsp;Alps
          </span>
        </UnexpectedUpdatedTab>
      </Tabs>
    );
  }
}

class DisabledTab extends React.Component<any, any> {
  public state = {
    active: 'first',
  };

  public render() {
    return (
      <Tabs value={this.state.active} onValueChange={(v) => this.setState({ active: v })}>
        <Tab id="first">First</Tab>
        <Tab id="second" disabled>
          Second (disabled)
        </Tab>
        <Tab id="third" disabled>
          Third (disabled)
        </Tab>
        <Tab id="fourth">Fourth</Tab>
      </Tabs>
    );
  }
}

class TabsInModal extends React.Component<any, any> {
  public state = {
    active: '1',
    opened: false,
    error: true,
    warning: true,
    success: true,
    primary: true,
  };

  public render() {
    return (
      <div>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
      </div>
    );
  }

  private renderModal() {
    const TabElement = function GetTabElement(props: { style?: React.CSSProperties; children: React.ReactNode }) {
      return <div style={{ marginLeft: 10, fontSize: 14, ...props.style }}>{props.children}</div>;
    };

    return (
      <Modal onClose={this.close} width={600}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <div style={{ marginLeft: -30 }}>
            <Tabs vertical value={this.state.active} onValueChange={(v) => this.setState({ active: v })}>
              <Tab id="1">
                <TabElement>Normal</TabElement>
              </Tab>
              <Tab id="2" success>
                <TabElement>Success</TabElement>
              </Tab>
              <Tab id="3" success={this.state.success} onClick={this.toggleSuccess}>
                <TabElement>Success-dynamic</TabElement>
              </Tab>
              <Tab id="4" warning>
                <TabElement>Warning</TabElement>
              </Tab>
              <Tab id="5" warning={this.state.warning} onClick={this.toggleWarning}>
                <TabElement>Warning-dynamic</TabElement>
              </Tab>
              <Tab id="6" error>
                <TabElement style={{ color: '#e14c30' }}>Error</TabElement>
              </Tab>
              <Tab id="7" error={this.state.error} warning onClick={this.toggleError}>
                <TabElement style={{ color: '#e14c30' }}>Error-dynamic over warning</TabElement>
              </Tab>
              <Tab id="8" primary>
                <TabElement style={{ color: '#1e8dd4' }}>Primary</TabElement>
              </Tab>
              <Tab id="9" primary={this.state.primary} onClick={this.togglePrimary}>
                <TabElement style={{ color: '#1e8dd4' }}>Primary-dynamic</TabElement>
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

  private open = () => {
    this.setState({ opened: true });
  };

  private close = () => {
    this.setState({ opened: false });
  };

  private toggleError = () => {
    this.setState({ error: !this.state.error });
  };

  private toggleWarning = () => {
    this.setState({ warning: !this.state.warning });
  };

  private toggleSuccess = () => {
    this.setState({ success: !this.state.success });
  };

  private togglePrimary = () => {
    this.setState({ primary: !this.state.primary });
  };
}

class TabsTable extends React.Component {
  public static TestTab = class TestTab extends React.Component<TabProps & { vertical?: boolean }, any> {
    public render() {
      const { vertical, ...tabProps } = this.props;
      return (
        <Tabs vertical={vertical} value="">
          <Tab {...tabProps}>Tab</Tab>
        </Tabs>
      );
    }
  };

  public render() {
    const rows = [{}, { primary: true }, { error: true }, { warning: true }];
    const cols = [{}, { vertical: true }, { disabled: true }, { vertical: true, disabled: true }];
    return (
      <div>
        <ComponentTable
          Component={TabsTable.TestTab}
          rows={rows.map((x) => ({ props: x }))}
          cols={cols.map((x) => ({ props: x }))}
        />
      </div>
    );
  }
}

export default { title: 'Tabs' };

const tabsTests: CreeveyTests = {
  async plain() {
    await this.expect(await this.takeScreenshot()).to.matchImage('plain');
  },
  async hovered() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
  },
  async clicked() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  },
  async mouseLeave() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .move({
        origin: this.browser.findElement({ css: 'body' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('mouseLeave');
  },
  async focused() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .move({
        origin: this.browser.findElement({ css: 'body' }),
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('focused');
  },
  async tabPress() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await delay(1000);
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
      .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(2)' }))
      .perform();
    await delay(1000);
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await delay(1000);
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ENTER)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
  },
};

export const Simple: Story = () => <UncTabs />;
Simple.storyName = 'simple';

Simple.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie118px', 'ie11NewTheme'], tests: 'hovered' }],
    tests: {
      ...tabsTests,
      async ['move focus forward']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(1)' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ARROW_RIGHT)
          .pause(500)
          .sendKeys(this.keys.ARROW_DOWN)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('move focus forward');
      },
      async ['move focus backward']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(3)' }))
          .perform();
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ARROW_LEFT)
          .perform();
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ARROW_UP)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('move focus backward');
      },
      async ['reset focus after click']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(1)' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ARROW_RIGHT)
          .pause(500)
          .click(this.browser.findElement({ css: '[data-comp-name~="Tab"]:nth-child(3)' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('reset focus after click');
      },
    },
  },
};

export const First = () => <RouterTabs value="first" />;
First.storyName = 'first';
First.parameters = { creevey: { skip: [true] } };

export const Another = () => <RouterTabs value="another" />;
Another.storyName = 'another';
Another.parameters = { creevey: { skip: [true] } };

export const HrefsFirst = () => (
  <Tabs value="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">
    <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">Hrefs first</Tab>
    <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">Hrefs second</Tab>
  </Tabs>
);
HrefsFirst.storyName = 'hrefs first';
HrefsFirst.parameters = { creevey: { skip: [true] } };

export const HrefsSecond = () => (
  <Tabs value="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">
    <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs first">Hrefs first</Tab>
    <Tab href="/iframe.html?selectedKind=Tabs&selectedStory=hrefs second">Hrefs second</Tab>
  </Tabs>
);
HrefsSecond.storyName = 'hrefs second';
HrefsSecond.parameters = { creevey: { skip: [true] } };

export const Vertical: Story = () => <UncTabs vertical />;
Vertical.storyName = 'vertical';
Vertical.parameters = {
  creevey: { skip: [{ in: ['ie11', 'ie118px', 'ie11NewTheme'], tests: 'hovered' }], tests: tabsTests },
};

export const WithComponent = () => <TabsWithMyLink />;
WithComponent.storyName = 'with component';
WithComponent.parameters = { creevey: { skip: [true] } };

export const WithUnexpectedTabSizeChange = () => <OhMyTabs />;
WithUnexpectedTabSizeChange.storyName = 'with unexpected tab size change';
WithUnexpectedTabSizeChange.parameters = { creevey: { skip: [true] } };

export const WithDisabledTab: Story = () => <DisabledTab />;
WithDisabledTab.storyName = 'with disabled tab';
WithDisabledTab.parameters = {
  creevey: { skip: [{ in: ['ie11', 'ie118px', 'ie11NewTheme'], tests: 'hovered' }], tests: tabsTests },
};

export const TabsInModalStory = () => <TabsInModal />;
TabsInModalStory.storyName = 'tabs in modal';
TabsInModalStory.parameters = { creevey: { skip: [true] } };

export const HoverTable = () => <TabsTable />;
HoverTable.storyName = 'hover table';
HoverTable.parameters = { creevey: { skip: [true] } };

export const TabsWithImage: Story = () => {
  const [activeTab, setActiveTab] = React.useState('search4');

  return (
    <Tabs value={activeTab} vertical onValueChange={(tab) => setActiveTab(tab)}>
      <Tabs.Tab id="search1">
        <Img size={'75px'} />
      </Tabs.Tab>
      <Tabs.Tab id="search2">
        <Img size={'105px'} />
      </Tabs.Tab>
      <Tabs.Tab id="search3">
        <Img size={'25px'} />
      </Tabs.Tab>
      <Tabs.Tab id="search4">
        <Img size={'150px'} />
      </Tabs.Tab>
      <Tabs.Tab id="search5">
        <Img size={'30px'} />
      </Tabs.Tab>
      <Tabs.Tab id="search6">
        <Img size={'100px'} />
      </Tabs.Tab>
    </Tabs>
  );
};
TabsWithImage.storyName = 'Tabs with images';

TabsWithImage.parameters = {
  creevey: {
    delay: 500,
  },
};
