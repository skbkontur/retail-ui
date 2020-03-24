import React from 'react';
import SpinnerIcon from '@skbkontur/react-icons/Spinner';

import { Button } from '../Button';
import { Link } from '../Link';
import { Input } from '../Input';
import { ComboBox } from '../ComboBox';
import { Spinner } from '../Spinner';
import { Checkbox } from '../Checkbox';

export default { title: 'Baseline' };

export const ButtonAndText = () => (
  <div>
    <Button>Ok</Button> Simple text
  </div>
);
ButtonAndText.story = { name: 'Button and text' };

export const MediumButtonAndText = () => (
  <div>
    <Button size="medium">yay</Button> Simple text
  </div>
);
MediumButtonAndText.story = { name: 'Medium Button and text' };

export const LargeButtonAndText = () => (
  <div>
    <Button size="large">Yay</Button> Simple text
  </div>
);
LargeButtonAndText.story = { name: 'Large Button and text' };

export const ButtonAndLink = () => (
  <div>
    <Button>Ok</Button> <Link>Ok</Link>
  </div>
);
ButtonAndLink.story = { name: 'Button and link' };

export const InputAndText = () => (
  <div>
    <Input /> Plain text
  </div>
);
InputAndText.story = { name: 'Input and text' };

export const ButtonWithoutContentInFlex = () => (
  <div style={{ display: 'flex', alignItems: 'baseline' }}>
    <Button /> Plain text
  </div>
);
ButtonWithoutContentInFlex.story = {
  name: 'Button without content in flex-container',
  parameters: { creevey: { skip: [true] } },
};

export const ButtonWithContentInFlex = () => (
  <div style={{ display: 'flex', alignItems: 'baseline' }}>
    <Button>Hello</Button> Plain text
  </div>
);
ButtonWithContentInFlex.story = {
  name: 'Button with content in flex-container',
  parameters: { creevey: { skip: [true] } },
};

export const InputWithButton = () => <SimpleForm />;
InputWithButton.story = { name: 'Input with button', parameters: { creevey: { skip: [true] } } };

export const TextInputInputLikeText = () => (
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
);
TextInputInputLikeText.story = { name: 'Text, Input, InputLikeText' };

export const TextLargeInput = () => (
  <div>
    <span>Text</span>
    <Input size="large" value="Large Input" width={120} />
  </div>
);
TextLargeInput.story = { name: 'Text, Large Input' };

export const TextButtons = () => (
  <div>
    <span>Text</span>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
  </div>
);
TextButtons.story = { name: 'Text, Buttons' };

export const TextLargeButton = () => (
  <div>
    <span>Text</span>
    <Button size="large">Large</Button>
  </div>
);
TextLargeButton.story = { name: 'Text, Large Button' };

export const TextSpinner = () => (
  <div>
    <span>Text</span>
    <Spinner type="mini" />
  </div>
);
TextSpinner.story = { name: 'Text, Spinner' };

export const IconSpinner = () => (
  <div>
    <SpinnerIcon />
    <Spinner type="mini" />
  </div>
);
IconSpinner.story = { name: 'Icon, Spinner' };

export const Checkboxes = () => (
  <div>
    Lorem <Checkbox initialIndeterminate /> dolor <Checkbox />a<Checkbox checked /> <Checkbox>L1</Checkbox>{' '}
    <Checkbox checked>L1.1</Checkbox>elit. <Button>Button 1</Button> amet.
    <br />
    Lorem <Button>Button 2</Button> ipsum dolor <Checkbox>Label 2</Checkbox> sit <Checkbox /> amet{' '}
    <Checkbox initialIndeterminate /> sit.
  </div>
);
Checkboxes.story = { name: 'Checkbox' };

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
          <Input id="test-input" onValueChange={value => this.setState({ value })} />
          <Button type="submit">Click</Button>
        </form>
        {this.state.isFormSubmitted && <span id="test-input-value">{this.state.value}</span>}
      </div>
    );
  }
}
