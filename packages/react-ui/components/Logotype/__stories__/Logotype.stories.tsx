import React from 'react';

import { Logotype } from '../../Logotype';

export default { title: 'Logotype' };

export const WithWidget = () => <WithWidgetToggler />;
WithWidget.story = { name: 'with widget' };

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
