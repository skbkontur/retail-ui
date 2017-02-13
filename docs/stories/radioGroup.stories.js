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
      <div>
        <div>
          <RadioGroup
            items={items}
            value={this.state.value}
            onChange={(el) => this.handleChange(el)}
          />
        </div>
      </div>
    );
  }
}

storiesOf('RadioGroup', module).
  add('playground', () => {
    return <Component />;
  });
