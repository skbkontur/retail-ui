// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import RadioGroup from '../RadioGroup';

class Component extends React.Component<*, *> {
  state = {
    value: ''
  };

  handleChange(el) {
    this.setState({ value: el.target.value });
  }

  render() {
    return (
      <RadioGroup
        value={this.state.value}
        onChange={el => this.handleChange(el)}
        {...this.props}
      />
    );
  }
}

storiesOf('RadioGroup', module)
  .add('vertical', () => {
    return <Component items={['One', 'Two', 'Three']} />;
  })
  .add('inline', () => <Component inline items={['One', 'Two', 'Three']} />)
  .add('with renderItem', () =>
    <Component
      items={[{ value: 'One' }, { value: 'Two' }]}
      renderItem={x =>
        <div>
          Value: {x.value}
        </div>}
    />
  );
