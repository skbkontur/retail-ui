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
import { Toggle } from '../Toggle';
import { MenuItem } from '../MenuItem';
import { Gapped } from '../Gapped';
import { Group } from '../Group';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';

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
          height: '50px',
          margin: '20px',
          backgroundImage: `
          linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
          linear-gradient(0deg, transparent 0, transparent 39px, #666 39px, #666 42px, transparent 42px),
          linear-gradient(0deg, transparent 0, transparent 26px, #666 26px, #666 29px, transparent 29px),
          linear-gradient(0deg, transparent 0, transparent 18px, #CCC 18px, #CCC 19px, transparent 19px)
          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Arial </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Toggle>Tg</Toggle>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">Menu</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={60}
            searchOnFocus={false}
          />
          <Button size="small">S</Button>
          <Group width="70px" >
            <Input placeholder="S" width="100%" size="small" />
            <Button narrow size="small" >S</Button>
          </Group>
        </Gapped>
      </div>
      <div
        style={{
          fontFamily: 'Lab Grotesque',
          height: '50px',
          margin: '20px',
          backgroundImage: `
          linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
          linear-gradient(0deg, transparent 0, transparent 39px, #666 39px, #666 42px, transparent 42px),
          linear-gradient(0deg, transparent 0, transparent 26px, #666 26px, #666 29px, transparent 29px),
          linear-gradient(0deg, transparent 0, transparent 18px, #CCC 18px, #CCC 19px, transparent 19px)
          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Lab Grotesque </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Toggle>Tg</Toggle>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">Menu</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={60}
            searchOnFocus={false}
          />
          <Button size="small">S</Button>
          <Group width="70px" >
            <Input placeholder="S" width="100%" size="small" />
            <Button narrow size="small" >S</Button>
          </Group>
        </Gapped>
      </div>

      <div
        style={{
          fontFamily: 'Segoe UI',
          height: '50px',
          margin: '20px',
          backgroundImage: `
          linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
          linear-gradient(0deg, transparent 0, transparent 39px, #666 39px, #666 42px, transparent 42px),
          linear-gradient(0deg, transparent 0, transparent 26px, #666 26px, #666 29px, transparent 29px),
          linear-gradient(0deg, transparent 0, transparent 18px, #CCC 18px, #CCC 19px, transparent 19px)
          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Segoe UI </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Toggle>Tg</Toggle>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">Menu</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={60}
            searchOnFocus={false}
          />
          <Button size="small">S</Button>
          <Group width="70px" >
            <Input placeholder="S" width="100%" size="small" />
            <Button narrow size="small" >S</Button>
          </Group>
        </Gapped>
      </div>
      <div
        style={{
          fontFamily: 'Times New Roman',
          height: '50px',
          margin: '20px',
          backgroundImage: `
          linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
          linear-gradient(0deg, transparent 0, transparent 39px, #666 39px, #666 42px, transparent 42px),
          linear-gradient(0deg, transparent 0, transparent 26px, #666 26px, #666 29px, transparent 29px),
          linear-gradient(0deg, transparent 0, transparent 18px, #CCC 18px, #CCC 19px, transparent 19px)
          `
        }}
      >
        <Gapped>
          <div style={{ width: '120px'}}>Times New Roman </div>
          <CrownIcon/>
          <Link>Ok</Link>
          <Toggle>Tg</Toggle>
          <Checkbox initialIndeterminate>Ch</ Checkbox>
          <Checkbox checked>Ch</Checkbox>
          <Radio checked value="value">Rd</Radio>
          <MenuItem state="hover">Menu</MenuItem>
          <Input size="small" value="S" width={40} />
          <ComboBox
            placeholder="S"
            width={60}
            searchOnFocus={false}
          />
          <Button size="small">S</Button>
          <Group width="70px" >
            <Input placeholder="S" width="100%" size="small" />
            <Button narrow size="small" >S</Button>
          </Group>
        </Gapped>
      </div>
    </Gapped>
  </div>
);
DifferentFontsAndSizes.storyName = 'Different fonts in small';


export const NewStoryDifferentFontsAndSizesThemeM = () => <DifferentFontsAndSizesThemeM />;
NewStoryDifferentFontsAndSizesThemeM.storyName = 'Different fonts in medium';


class DifferentFontsAndSizesThemeM extends React.Component<any, any> {
  public render() {
    return (
      <div style={{ fontSize: '16px', lineHeight: '22px' }}>
      <ThemeContext.Consumer>
        {theme =>
        <ThemeContext.Provider value={ThemeFactory.create({
            checkboxBoxSize: '20px',
            checkboxLabelGap: '10px',
            checkboxPaddingY: '9px',
            checkboxFontSize: '16px',
            checkboxLineHeight: '22px',

            radioSize: '20px',
            radioBulletSize: '10px',
            radioLabelGap: '10px',
            radioPaddingY: '9px',
            radioFontSize: '16px',
            radioLineHeight: '22px',

            menuItemFontSize: '16px',
            menuItemLineHeight: '22px',
            menuItemPaddingY: '9px',
            menuItemPaddingX: '12px',

            toggleHeight: '22px',
            toggleCaptionGap: '10px',
            toggleWidth: '34px',

          }, theme)}>
            <Gapped vertical gap={4}>
              <div
                style={{
                  fontFamily: 'Arial',
                  height: '50px',
                  margin: '20px',
                  backgroundImage: `
                  linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
                  linear-gradient(0deg, transparent 0, transparent 36px, #666 36px, #666 40px, transparent 40px),
                  linear-gradient(0deg, transparent 0, transparent 20px, #666 20px, #666 24px, transparent 24px),
                  linear-gradient(0deg, transparent 0, transparent 10px, #CCC 10px, #CCC 11px, transparent 11px)
                  `
                }}
              >
                <Gapped>
                  <div style={{ width: '140px'}}>Arial </div>
                  <CrownIcon/>
                  <Link>Ok</Link>
                  <Toggle>Tg</Toggle>
                  <Checkbox initialIndeterminate>Ch</ Checkbox>
                  <Checkbox checked>Ch</Checkbox>
                  <Radio checked value="value">Rd</Radio>
                  <MenuItem state="hover">Menu</MenuItem>
                  <Input size="medium" value="M" width={40} />
                  <ComboBox
                    placeholder="M"
                    width={80}
                    size="medium"
                    searchOnFocus={false}
                  />
                  <Button size="medium">M</Button>
                  <Group width="70px" >
                    <Input placeholder="M" width="100%" size="medium" />
                    <Button narrow size="medium" >M</Button>
                  </Group>
                </Gapped>
              </div>


              <div
                style={{
                  fontFamily: 'Lab Grotesque',
                  height: '50px',
                  margin: '20px',
                  backgroundImage: `
                  linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
                  linear-gradient(0deg, transparent 0, transparent 36px, #666 36px, #666 40px, transparent 40px),
                  linear-gradient(0deg, transparent 0, transparent 20px, #666 20px, #666 24px, transparent 24px),
                  linear-gradient(0deg, transparent 0, transparent 10px, #CCC 10px, #CCC 11px, transparent 11px)
                  `
                }}
              >
              <Gapped>
                <div style={{ width: '140px'}}>Lab Grotesque </div>
                <CrownIcon/>
                <Link>Ok</Link>
                <Toggle>Tg</Toggle>
                <Checkbox initialIndeterminate>Ch</ Checkbox>
                <Checkbox checked>Ch</Checkbox>
                <Radio checked value="value">Rd</Radio>
                <MenuItem state="hover">Menu</MenuItem>
                <Input size="medium" value="M" width={40} />
                <ComboBox
                  placeholder="M"
                  width={80}
                  size="medium"
                  searchOnFocus={false}
                />
                <Button size="medium">M</Button>
                <Group width="70px" >
                  <Input placeholder="M" width="100%" size="medium" />
                  <Button narrow size="medium" >M</Button>
                </Group>
              </Gapped>
              </div>

              <div
                style={{
                  fontFamily: 'Segoe UI',
                  height: '50px',
                  margin: '20px',
                  backgroundImage: `
                  linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
                  linear-gradient(0deg, transparent 0, transparent 36px, #666 36px, #666 40px, transparent 40px),
                  linear-gradient(0deg, transparent 0, transparent 20px, #666 20px, #666 24px, transparent 24px),
                  linear-gradient(0deg, transparent 0, transparent 10px, #CCC 10px, #CCC 11px, transparent 11px)
                  `
                }}
              >
              <Gapped>
                <div style={{ width: '140px'}}>Segoe UI </div>
                <CrownIcon/>
                <Link>Ok</Link>
                <Toggle>Tg</Toggle>
                <Checkbox initialIndeterminate>Ch</ Checkbox>
                <Checkbox checked>Ch</Checkbox>
                <Radio checked value="value">Rd</Radio>
                <MenuItem state="hover">Menu</MenuItem>
                <Input size="medium" value="M" width={40} />
                <ComboBox
                  placeholder="M"
                  width={80}
                  size="medium"
                  searchOnFocus={false}
                />
                <Button size="medium">M</Button>
                <Group width="70px" >
                  <Input placeholder="M" width="100%" size="medium" />
                  <Button narrow size="medium" >M</Button>
                </Group>
              </Gapped>
              </div>

              <div
                style={{
                  fontFamily: 'Times New Roman',
                  height: '50px',
                  margin: '20px',
                  backgroundImage: `
                  linear-gradient(0deg, transparent 0, transparent 49px, #CCC 49px, #CCC 50px, transparent 50px),
                  linear-gradient(0deg, transparent 0, transparent 36px, #666 36px, #666 40px, transparent 40px),
                  linear-gradient(0deg, transparent 0, transparent 20px, #666 20px, #666 24px, transparent 24px),
                  linear-gradient(0deg, transparent 0, transparent 10px, #CCC 10px, #CCC 11px, transparent 11px)
                  `
                }}
              >
              <Gapped>
                <div style={{ width: '140px'}}>Times New Roman </div>
                <CrownIcon/>
                <Link>Ok</Link>
                <Toggle>Tg</Toggle>
                <Checkbox initialIndeterminate>Ch</ Checkbox>
                <Checkbox checked>Ch</Checkbox>
                <Radio checked value="value">Rd</Radio>
                <MenuItem state="hover">Menu</MenuItem>
                <Input size="medium" value="M" width={40} />
                <ComboBox
                  placeholder="M"
                  width={80}
                  size="medium"
                  searchOnFocus={false}
                />
                <Button size="medium">M</Button>
                <Group width="70px" >
                  <Input placeholder="M" width="100%" size="medium" />
                  <Button narrow size="medium" >M</Button>
                </Group>
              </Gapped>
              </div>
            </Gapped>
        </ThemeContext.Provider>}
      </ThemeContext.Consumer>
      </div>
    );
  }
}

export const NewStoryDifferentFontsAndSizesThemeL = () => <DifferentFontsAndSizesThemeL />;
NewStoryDifferentFontsAndSizesThemeL.storyName = 'Different fonts in large';


class DifferentFontsAndSizesThemeL extends React.Component<any, any> {
  public render() {
    return (
      <div
      style={{ fontSize: '18px', lineHeight: '24px' }}
      >
      <ThemeContext.Consumer>
        {theme =>
        <ThemeContext.Provider value={ThemeFactory.create({
            checkboxBoxSize: '22px',
            checkboxLabelGap: '12px',
            checkboxPaddingY: '11px',
            checkboxFontSize: '18px',
            checkboxLineHeight: '24px',

            radioSize: '22px',
            radioBulletSize: '12px',
            radioLabelGap: '12px',
            radioPaddingY: '11px',
            radioFontSize: '18px',
            radioLineHeight: '24px',

            menuItemFontSize: '18px',
            menuItemLineHeight: '24px',
            menuItemPaddingY: '12px',
            menuItemPaddingX: '14px',

            toggleHeight: '24px',
            toggleCaptionGap: '12px',
            toggleWidth: '36px',
          }, theme)}>
          <Gapped vertical gap={4}>
            <div
              style={{
                fontFamily: 'Arial',
                height: '50px',
                margin: '20px',
                backgroundImage: `
                linear-gradient(0deg, transparent 0, transparent 49px, #ccc 49px, #ccc 50px, transparent 50px),
                linear-gradient(0deg, transparent 0, transparent 33px, #666 33px, #666 37px, transparent 37px),
                linear-gradient(0deg, transparent 0, transparent 15px, #666 15px, #666 19px, transparent 19px),
                linear-gradient(0deg, transparent 0, transparent 2px, #ccc 2px, #ccc 3px, transparent 3px)
                `
              }}
            >
              <Gapped>
                <div style={{ width: '160px'}}>Arial </div>
                <CrownIcon/>
                <Link>Ok</Link>
                <Toggle>Tg</Toggle>
                <Checkbox initialIndeterminate>Ch</ Checkbox>
                <Checkbox checked>Ch</Checkbox>
                <Radio checked value="value">Rd</Radio>
                <MenuItem state="hover">Menu</MenuItem>
                <Input size="large" value="L" width={40} />
                <ComboBox
                  placeholder="L"
                  width={80}
                  size="large"
                  searchOnFocus={false}
                />
                <Button size="large">L</Button>
                <Group width="70px" >
                  <Input placeholder="L" width="100%" size="large" />
                  <Button narrow size="large" >L</Button>
                </Group>
              </Gapped>
            </div>


            <div
              style={{
                fontFamily: 'Lab Grotesque',
                height: '50px',
                margin: '20px',
                backgroundImage: `
                linear-gradient(0deg, transparent 0, transparent 49px, #ccc 49px, #ccc 50px, transparent 50px),
                linear-gradient(0deg, transparent 0, transparent 33px, #666 33px, #666 37px, transparent 37px),
                linear-gradient(0deg, transparent 0, transparent 15px, #666 15px, #666 19px, transparent 19px),
                linear-gradient(0deg, transparent 0, transparent 2px, #ccc 2px, #ccc 3px, transparent 3px)
                `
              }}
            >
            <Gapped>
              <div style={{ width: '160px'}}>Lab Grotesque </div>
              <CrownIcon/>
              <Link>Ok</Link>
              <Toggle>Tg</Toggle>
              <Checkbox initialIndeterminate>Ch</ Checkbox>
              <Checkbox checked>Ch</Checkbox>
              <Radio checked value="value">Rd</Radio>
              <MenuItem state="hover">Menu</MenuItem>
              <Input size="large" value="L" width={40} />
              <ComboBox
                placeholder="L"
                width={80}
                size="large"
                searchOnFocus={false}
              />
              <Button size="large">L</Button>
              <Group width="70px" >
                <Input placeholder="L" width="100%" size="large" />
                <Button narrow size="large" >L</Button>
              </Group>
            </Gapped>
            </div>

            <div
              style={{
                fontFamily: 'Segoe UI',
                height: '50px',
                margin: '20px',
                backgroundImage: `
                linear-gradient(0deg, transparent 0, transparent 49px, #ccc 49px, #ccc 50px, transparent 50px),
                linear-gradient(0deg, transparent 0, transparent 33px, #666 33px, #666 37px, transparent 37px),
                linear-gradient(0deg, transparent 0, transparent 15px, #666 15px, #666 19px, transparent 19px),
                linear-gradient(0deg, transparent 0, transparent 2px, #ccc 2px, #ccc 3px, transparent 3px)
                `
              }}
            >
            <Gapped>
              <div style={{ width: '160px'}}>Segoe UI </div>
              <CrownIcon/>
              <Link>Ok</Link>
              <Toggle>Tg</Toggle>
              <Checkbox initialIndeterminate>Ch</ Checkbox>
              <Checkbox checked>Ch</Checkbox>
              <Radio checked value="value">Rd</Radio>
              <MenuItem state="hover">Menu</MenuItem>
              <Input size="large" value="L" width={40} />
              <ComboBox
                placeholder="L"
                width={80}
                size="large"
                searchOnFocus={false}
              />
              <Button size="large">L</Button>
              <Group width="70px" >
                <Input placeholder="L" width="100%" size="large" />
                <Button narrow size="large" >L</Button>
              </Group>
            </Gapped>
            </div>

            <div
              style={{
                fontFamily: 'Times New Roman',
                height: '50px',
                margin: '20px',
                backgroundImage: `
                linear-gradient(0deg, transparent 0, transparent 49px, #ccc 49px, #ccc 50px, transparent 50px),
                linear-gradient(0deg, transparent 0, transparent 33px, #666 33px, #666 37px, transparent 37px),
                linear-gradient(0deg, transparent 0, transparent 15px, #666 15px, #666 19px, transparent 19px),
                linear-gradient(0deg, transparent 0, transparent 2px, #ccc 2px, #ccc 3px, transparent 3px)
                `
              }}
            >
            <Gapped>
              <div style={{ width: '160px'}}>Times New Roman </div>
              <CrownIcon/>
              <Link>Ok</Link>
              <Toggle>Tg</Toggle>
              <Checkbox initialIndeterminate>Ch</ Checkbox>
              <Checkbox checked>Ch</Checkbox>
              <Radio checked value="value">Rd</Radio>
              <MenuItem state="hover">Menu</MenuItem>
              <Input size="large" value="L" width={40} />
              <ComboBox
                placeholder="L"
                width={80}
                size="large"
                searchOnFocus={false}
              />
              <Button size="large">L</Button>
              <Group width="70px" >
                <Input placeholder="L" width="100%" size="large" />
                <Button narrow size="large" >L</Button>
              </Group>
            </Gapped>
            </div>
          </Gapped>
          </ThemeContext.Provider>}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

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
