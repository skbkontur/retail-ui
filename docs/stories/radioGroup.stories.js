import React from 'react';
import {storiesOf} from '@kadira/storybook';

import RadioGroup from '../../components/RadioGroup';

const items = ['One', 'Two', 'Three'];

class Component extends React.Component {
  state = {
    value: '',
  }

  handleChange(el) {
    this.setState({value: el.target.value});
  }

  render() {
    return (
      <RadioGroup
        items={items}
        value={this.state.value}
        onChange={(el) => this.handleChange(el)}
      />
    );
  }
}

storiesOf('RadioGroup', module).
  add('playground', () => {
    return <Component />;
  });
