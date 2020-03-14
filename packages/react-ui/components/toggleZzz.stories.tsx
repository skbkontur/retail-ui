export default {
  title: '😌 TestRetreat Toggle',
};

export const ToggleOn = () => {
  return <Toggle checked={true} />;
};

export const ToggleOff = () => {
  return <Toggle checked={false} />;
};

const toggleTests = {
  async pressedThenReleased(this: { browser: WebDriver }) {
    const element = await this.browser.findElement({ css: '#test-element' });
    const toggle = await this.browser.findElement({ css: '[data-comp-name~=Toggle]' });

    const idle = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .move({ origin: toggle })
      .perform();

    const hover = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .press()
      .pause(1000) // ждем конца анимации
      .perform();

    const pressed = await element.takeScreenshot();

    await this.browser
      .actions({ bridge: true })
      .release()
      .perform();

    const released = await element.takeScreenshot();

    await expect({ idle, hover, pressed, released }).to.matchImages();
  },
  async focused(this: { browser: WebDriver }) {
    const element = await this.browser.findElement({ css: '#test-element' });

    await this.browser
      .actions({ bridge: true })
      .sendKeys(Key.TAB)
      .perform();

    const focused = await element.takeScreenshot();

    await expect({ focused }).to.matchImages();
  },
};

ToggleOn.story = { parameters: { creevey: { tests: toggleTests } } };

ToggleOff.story = { parameters: { creevey: { tests: toggleTests } } };

class SimpleToggle extends React.Component<any, any> {
  public state = {
    checked: true,
  };

  public render() {
    return (
      <div>
        <Toggle
          checked={this.state.checked}
          onValueChange={() => {
            const { checked } = this.state;
            this.setState({ checked: !checked });
          }}
        />{' '}
        {this.state.checked ? 'On' : 'Off'}
      </div>
    );
  }
}

export const SToggle = () => {
  return <SimpleToggle />;
};
