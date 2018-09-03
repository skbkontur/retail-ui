// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../Button';
import Link from '../Link';
import Input from '../Input';

storiesOf('Baseline', module)
  .add('Button and text', () => (
    <div>
      <Button>Ok</Button> Simple text
    </div>
  ))
  .add('Medium Button and text', () => (
    <div>
      <Button size="medium">yay</Button> Simple text
    </div>
  ))
  .add('Large Button and text', () => (
    <div>
      <Button size="large">Yay</Button> Simple text
    </div>
  ))
  .add('Button and link', () => (
    <div>
      <Button>Ok</Button> <Link>Ok</Link>
    </div>
  ))
  .add('Input and text', () => (
    <div>
      <Input /> Plain text
    </div>
  ))
  .add('Button without content in flex-container', () => (
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <Button /> Plain text
    </div>
  ))
  .add('Button with content in flex-container', () => (
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <Button children="Hello" /> Plain text
    </div>
  ))
  .add('Input with button', () => <SimpleForm />);

class SimpleForm extends React.Component<any, any> {
  public state = {
    isFormSubmitted: false,
    value: ''
  };

  public render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.setState({ isFormSubmitted: true });
          }}
        >
          <Input
            id="test-input"
            onChange={e => this.setState({ value: e.target.value })}
          />
          <Button children="Click" type="submit" />
        </form>
        {this.state.isFormSubmitted && (
          <span id="test-input-value">{this.state.value}</span>
        )}
      </div>
    );
  }
}
