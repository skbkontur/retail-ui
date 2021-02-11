import React from 'react';
import { CSFStory } from 'creevey';

import { Logotype } from '../Logotype';

export default { title: 'Logotype' };

export const WithWidget: CSFStory<JSX.Element> = () => <WithWidgetToggler />;
WithWidget.storyName = 'with widget';

WithWidget.parameters = {
  creevey: {
    tests: {
      async ['without widget']() {
        const element = await this.browser.findElement({ css: '[data-comp-name~="Logotype"' });
        await this.expect(await element.takeScreenshot()).to.matchImage('without widget');
      },
      async ['with widget']() {
        const element = await this.browser.findElement({ css: '[data-comp-name~="Logotype"' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#toggle-widget' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('with widget');
      },
    },
  },
};

class WithWidgetToggler extends React.Component {
  public state = {
    widget: false,
  };

  public toggle = () => {
    this.setState({ widget: !this.state.widget });
  };

  public render() {
    return (
      <div>
        <Logotype suffix="ui" withWidget={this.state.widget} />
        <br />
        <button id="toggle-widget" onClick={this.toggle}>
          toggle widget
        </button>
      </div>
    );
  }
}
