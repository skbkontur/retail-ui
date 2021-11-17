import React from 'react';
import SpinnerIcon from '@skbkontur/react-icons/Spinner';
import CrownIcon from '@skbkontur/react-icons/Crown';
import DocFolderIcon from '@skbkontur/react-icons/DocumentFolder';
import { Button } from '../Button';
import { Link } from '../Link';
import { Input } from '../Input';
import { ComboBox } from '../ComboBox';
import { Spinner } from '../Spinner';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import { MenuItem } from '../MenuItem';
import { Gapped } from '../Gapped';
import { Group } from '../Group';

export default { title: 'Baseline' };

export const ButtonAndText = () => (
  <div>
    <Button>Ok</Button> Simple text
  </div>
);
ButtonAndText.storyName = 'Button and text';

export const MediumButtonAndText = () => (
  <div>
    <Button size="medium">yay</Button> Simple text
  </div>
);
MediumButtonAndText.storyName = 'Medium Button and text';

export const LargeButtonAndText = () => (
  <div>
    <Button size="large">Yay</Button> Simple text
  </div>
);
LargeButtonAndText.storyName = 'Large Button and text';

export const ButtonAndLink = () => (
  <div>
    <Button>Ok</Button> <Link>Ok</Link>
  </div>
);
ButtonAndLink.storyName = 'Button and link';

export const InputAndText = () => (
  <div>
    <Input /> Plain text
  </div>
);
InputAndText.storyName = 'Input and text';

export const ButtonWithoutContentInFlex = () => (
  <div style={{ display: 'flex', alignItems: 'baseline' }}>
    <Button /> Plain text
  </div>
);
ButtonWithoutContentInFlex.storyName = 'Button without content in flex-container';
ButtonWithoutContentInFlex.parameters = { creevey: { skip: [true] } };

export const ButtonWithContentInFlex = () => (
  <div style={{ display: 'flex', alignItems: 'baseline' }}>
    <Button>Hello</Button> Plain text
  </div>
);
ButtonWithContentInFlex.storyName = 'Button with content in flex-container';
ButtonWithContentInFlex.parameters = { creevey: { skip: [true] } };

export const InputWithButton = () => <SimpleForm />;
InputWithButton.storyName = 'Input with button';
InputWithButton.parameters = { creevey: { skip: [true] } };

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
TextInputInputLikeText.storyName = 'Text, Input, InputLikeText';

export const TextLargeInput = () => (
  <div>
    <span>Text</span>
    <Input size="large" value="Large Input" width={120} />
  </div>
);
TextLargeInput.storyName = 'Text, Large Input';

export const TextButtons = () => (
  <div>
    <span>Text</span>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
  </div>
);
TextButtons.storyName = 'Text, Buttons';

export const TextLargeButton = () => (
  <div>
    <span>Text</span>
    <Button size="large">Large</Button>
  </div>
);
TextLargeButton.storyName = 'Text, Large Button';

export const TextSpinner = () => (
  <div>
    <span>Text</span>
    <Spinner type="mini" />
  </div>
);
TextSpinner.storyName = 'Text, Spinner';

export const IconSpinner = () => (
  <div>
    <SpinnerIcon />
    <Spinner type="mini" />
  </div>
);
IconSpinner.storyName = 'Icon, Spinner';

export const Checkboxes = () => (
  <div>
    Lorem <Checkbox initialIndeterminate /> dolor <Checkbox />a<Checkbox checked /> <Checkbox>L1</Checkbox>{' '}
    <Checkbox checked>L1.1</Checkbox>elit. <Button>Button 1</Button> amet.
    <br />
    Lorem <Button>Button 2</Button> ipsum dolor <Checkbox>Label 2</Checkbox> sit <Checkbox /> amet{' '}
    <Checkbox initialIndeterminate /> sit.
  </div>
);
Checkboxes.storyName = 'Checkbox';

export const DifferentFontsAndSizes = () => (
  <div>
    <Gapped vertical gap={4}>
      <div
        style={{
          fontFamily: 'Arial',
          height: '60px',
          backgroundImage: `
            linear-gradient(0deg, transparent 0, transparent 58px, #CCC 58px, #CCC 59px, transparent 59px),
            linear-gradient(0deg, transparent 0, transparent 50px, #CCC 50px, #CCC 51px, transparent 51px),
            linear-gradient(0deg, transparent 0, transparent 30px, #CCC 30px, #CCC 40px, transparent 40px),
            linear-gradient(0deg, transparent 0, transparent 19px, #CCC 19px, #CCC 20px, transparent 20px),
            linear-gradient(0deg, transparent 0, transparent 11px, #CCC 11px, #CCC 12px, transparent 12px)
          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Arial </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">MenuItem</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={40}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="small">S</Button>

          <Input size="medium" value="M" width={44} />
          <ComboBox
            placeholder="M"
            size="medium"
            width={44}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="medium">M</Button>


          <Input size="large" value="L" width={48} />
          <ComboBox
            placeholder="L"
            size="large"
            width={48}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="large">L</Button>

          <Group width="70px" >
            <Input placeholder="H" width="100%" size="large" />
            <Button narrow size="large" >H</Button>
          </Group>

        </Gapped>
      </div>

      <div
        style={{
          fontFamily: 'Lab Grotesque',
          height: '60px',
          backgroundImage: `
          linear-gradient(0deg, transparent 0, transparent 58px, #CCC 58px, #CCC 59px, transparent 59px),
          linear-gradient(0deg, transparent 0, transparent 50px, #CCC 50px, #CCC 51px, transparent 51px),
          linear-gradient(0deg, transparent 0, transparent 30px, #CCC 30px, #CCC 40px, transparent 40px),
          linear-gradient(0deg, transparent 0, transparent 19px, #CCC 19px, #CCC 20px, transparent 20px),
          linear-gradient(0deg, transparent 0, transparent 11px, #CCC 11px, #CCC 12px, transparent 12px)
          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Lab Grotesque </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">MenuItem</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={40}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="small">S</Button>

          <Input size="medium" value="M" width={44} />
          <ComboBox
            placeholder="M"
            size="medium"
            width={44}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="medium">M</Button>


          <Input size="large" value="L" width={48} />
          <ComboBox
            placeholder="L"
            size="large"
            width={48}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="large">L</Button>

          <Group width="70px" >
            <Input placeholder="H" width="100%" size="large" />
            <Button narrow size="large" >H</Button>
          </Group>

        </Gapped>
      </div>

      <div
        style={{
          fontFamily: 'Segoe UI',
          height: '60px',
          backgroundImage: `
            linear-gradient(0deg, transparent 0, transparent 57px, #CCC 57px, #CCC 58px, transparent 58px),
            linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
            linear-gradient(0deg, transparent 0, transparent 29px, #CCC 29px, #CCC 39px, transparent 39px),
            linear-gradient(0deg, transparent 0, transparent 18px, #CCC 18px, #CCC 19px, transparent 19px),
            linear-gradient(0deg, transparent 0, transparent 10px, #CCC 10px, #CCC 11px, transparent 11px)


          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Segoe UI </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">MenuItem</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={40}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="small">S</Button>

          <Input size="medium" value="M" width={44} />
          <ComboBox
            placeholder="M"
            size="medium"
            width={44}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="medium">M</Button>


          <Input size="large" value="L" width={48} />
          <ComboBox
            placeholder="L"
            size="large"
            width={48}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="large">L</Button>

          <Group width="70px" >
            <Input placeholder="H" width="100%" size="large" />
            <Button narrow size="large" >H</Button>
          </Group>
        </Gapped>

      </div>
      <div
        style={{
          fontFamily: 'Times New Roman',
          height: '60px',
          backgroundImage: `
          linear-gradient(0deg, transparent 0, transparent 58px, #CCC 58px, #CCC 59px, transparent 59px),
          linear-gradient(0deg, transparent 0, transparent 50px, #CCC 50px, #CCC 51px, transparent 51px),
          linear-gradient(0deg, transparent 0, transparent 30px, #CCC 30px, #CCC 40px, transparent 40px),
          linear-gradient(0deg, transparent 0, transparent 19px, #CCC 19px, #CCC 20px, transparent 20px),
          linear-gradient(0deg, transparent 0, transparent 11px, #CCC 11px, #CCC 12px, transparent 12px)
          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Times New Roman </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">MenuItem</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={40}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="small">S</Button>

          <Input size="medium" value="M" width={44} />
          <ComboBox
            placeholder="M"
            size="medium"
            width={44}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="medium">M</Button>


          <Input size="large" value="L" width={48} />
          <ComboBox
            placeholder="L"
            size="large"
            width={48}
            drawArrow={false}
            searchOnFocus={false}
            getItems={() => Promise.resolve([])}
          />
          <Button size="large">L</Button>

          <Group width="70px" >
            <Input placeholder="H" width="100%" size="large" />
            <Button narrow size="large" >H</Button>
          </Group>

        </Gapped>

      </div>
    </Gapped>
  </div>
);
DifferentFontsAndSizes.storyName = 'Different fonts and sizes';




class SimpleForm extends React.Component<any, any> {
  public state = {
    isFormSubmitted: false,
    value: '',
  };

  public render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({ isFormSubmitted: true });
          }}
        >
          <Input id="test-input" onValueChange={(value) => this.setState({ value })} />
          <Button type="submit">Click</Button>
        </form>
        {this.state.isFormSubmitted && <span id="test-input-value">{this.state.value}</span>}
      </div>
    );
  }
}
