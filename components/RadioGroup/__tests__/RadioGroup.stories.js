// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import RadioGroup from '../RadioGroup';

class Component extends React.Component {
  state = {
    value: ''
  }

  handleChange(el) {
    this.setState({ value: el.target.value });
  }

  render() {
    return (
      <RadioGroup
        items={this.props.items}
        value={this.state.value}
        onChange={(el) => this.handleChange(el)}
        renderItem={this.props.renderItem}
      />
    );
  }
}

storiesOf('RadioGroup', module)
  .add('playground', () => {
    return <Component items={['One', 'Two', 'Three']} />;
  })
  .add('With renderItem', () => (
    <Component
      items={[{ value: 'One' }, { value: 'Two' }]}
      renderItem={x => <div>Value: {x.value}</div>}
    />
  ));
