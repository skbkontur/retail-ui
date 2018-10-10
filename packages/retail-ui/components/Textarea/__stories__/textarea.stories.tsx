import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Textarea from '../Textarea';
import Button from '../../Button';

interface AutoresizableTextareaState {
  value: string | null;
}

class AutoresizableTextarea extends React.Component<
  {},
  AutoresizableTextareaState
> {
  public state = {
    value: ''
  };

  public render() {
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

  private handleChange = (_: any, value: string | null) => {
    this.setState({ value });
  };
}

const TEXT_SAMPLE =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi enim voluptatum esse, id libero voluptas similique beatae, molestiae, impedit corrupti corporis asperiores odit ullam provident officia alias aperiam eum quas.';

storiesOf('Textarea', module)
  .add('Simple', () => <Textarea value="" />)
  .add('Filled', () => <Textarea value={TEXT_SAMPLE} />)
  .add('With error', () => <Textarea error value={TEXT_SAMPLE} />)
  .add('Textarea in inline-flex and text', () => (
    <div>
      <div style={{ display: 'inline-flex' }}>
        <Textarea value={TEXT_SAMPLE} />
      </div>
      Lorem text
    </div>
  ))
  .add('Autoresizable textarea', () => <AutoresizableTextarea />)
  .add('Textarea with custom width', () => (
    <Textarea width={400} value={TEXT_SAMPLE} />
  ))
  .add('Select all by prop', () => (
    <Textarea defaultValue={TEXT_SAMPLE} selectAllOnFocus />
  ))
  .add('Select all by button', () => {
    let textarea: Textarea | null = null;
    const handleClick = () => {
      if (textarea) {
        textarea.selectAll();
      }
    };

    return (
      <div>
        <Button onClick={handleClick}>Select All</Button>
        <div>
          <Textarea
            defaultValue={TEXT_SAMPLE}
            ref={element => {
              textarea = element;
            }}
          />
        </div>
      </div>
    );
  });
