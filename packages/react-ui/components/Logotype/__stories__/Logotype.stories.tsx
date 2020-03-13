import React from 'react';
import { storiesOf } from '@storybook/react';

import { Logotype } from '../Logotype';

storiesOf('Logotype', module).add('with widget', () => <WithWidgetToggler />);

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
