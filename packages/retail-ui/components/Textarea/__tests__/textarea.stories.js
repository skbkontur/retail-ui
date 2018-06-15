
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Textarea from '../Textarea';

type State = {
  value: string | null
};

class AutoresizableTextarea extends React.Component<{}, State> {
  state = {
    value: ''
  };

  handleChange = (_, value: string | null) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <label htmlFor={'textarea'}>click me</label>
        <br />
        <Textarea
          autoResize
          id={'textarea'}
          placeholder={'type something'}
          resize={'vertical'}
          value={this.state.value}
          width={250}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

storiesOf('Textarea', module)
  .add('Simple', () => <Textarea />)
  .add('Filled', () => (
    <Textarea
      value={
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
        Modi enim voluptatum esse, id libero voluptas similique beatae,\
        molestiae, impedit corrupti corporis asperiores odit ullam provident\
        officia alias aperiam eum quas.'
      }
    />
  ))
  .add('With error', () => (
    <Textarea
      error
      value={
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
        Modi enim voluptatum esse, id libero voluptas similique beatae,\
        molestiae, impedit corrupti corporis asperiores odit ullam provident\
        officia alias aperiam eum quas.'
      }
    />
  ))
  .add('Textarea in inline-flex and text', () => (
    <div>
      <div style={{ display: 'inline-flex' }}>
        <Textarea
          value={
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
            Modi enim voluptatum esse, id libero voluptas similique beatae,\
            molestiae, impedit corrupti corporis asperiores odit ullam\
            provident officia alias aperiam eum quas.'
          }
        />
      </div>
      Lorem text
    </div>
  ))
  .add('Autoresizable textarea', () => <AutoresizableTextarea />);
