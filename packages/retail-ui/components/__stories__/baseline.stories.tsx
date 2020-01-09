import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SpinnerIcon from '@skbkontur/react-icons/Spinner';

import { Button } from '../Button';
import { Link } from '../Link';
import { Input } from '../Input';
import { ComboBox } from '../ComboBox';
import { Spinner } from '../Spinner';
import { Checkbox } from '../Checkbox';

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
  .add('Input with button', () => <SimpleForm />)
  .add('Text, Input, InputLikeText', () => (
    <div>
      <span>Text</span>
      <Input size="small" value="Small Input" width={80} />
      <Input size="medium" value="Medium Input" width={80} />
      <ComboBox
        placeholder="InputLikeText"
        width={120}
        drawArrow={false}
        searchOnFocus={false}
        getItems={() => Promise.resolve([])}
      />
    </div>
  ))
  .add('Text, Large Input', () => (
    <div>
      <span>Text</span>
      <Input size="large" value="Large Input" width={120} />
    </div>
  ))
  .add('Text, Buttons', () => (
    <div>
      <span>Text</span>
      <Button size="small" children="Small" />
      <Button size="medium" children="Medium" />
    </div>
  ))
  .add('Text, Large Button', () => (
    <div>
      <span>Text</span>
      <Button size="large" children="Large" />
    </div>
  ))
  .add('Text, Spinner', () => (
    <div>
      <span>Text</span>
      <Spinner type="mini" />
    </div>
  ))
  .add('Icon, Spinner', () => (
    <div>
      <SpinnerIcon />
      <Spinner type="mini" />
    </div>
  ))
  .add('Checkbox', () => (
    <div>
      Lorem <Checkbox initialIndeterminate /> dolor <Checkbox />a<Checkbox checked /> <Checkbox>L1</Checkbox>{' '}
      <Checkbox checked>L1.1</Checkbox>elit. <Button>Button 1</Button> amet.
      <br />
      Lorem <Button>Button 2</Button> ipsum dolor <Checkbox>Label 2</Checkbox> sit <Checkbox /> amet{' '}
      <Checkbox initialIndeterminate /> sit.
    </div>
  ));

class SimpleForm extends React.Component<any, any> {
  public state = {
    isFormSubmitted: false,
    value: '',
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
          <Input id="test-input" onChange={e => this.setState({ value: e.target.value })} />
          <Button children="Click" type="submit" />
        </form>
        {this.state.isFormSubmitted && <span id="test-input-value">{this.state.value}</span>}
      </div>
    );
  }
}
