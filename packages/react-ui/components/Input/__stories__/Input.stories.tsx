import React from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { Story } from '../../../typings/stories';
import { Input, InputSize } from '../Input';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';

const styles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  minWidth: '90px',
  padding: '5px',
};

export default { title: 'Input' };

export const InputsWithDifferentStates: Story = () => (
  <div>
    <div>
      <div style={styles}>Warning</div>
      <div id="warning-small-input-wrapper" style={styles}>
        <Input size="small" warning />
      </div>
      <div id="warning-large-input-wrapper" style={styles}>
        <Input size="large" warning />
      </div>
    </div>

    <div>
      <div style={styles}>Error</div>
      <div id="error-small-input-wrapper" style={styles}>
        <Input size="small" error />
      </div>
      <div id="error-large-input-wrapper" style={styles}>
        <Input size="large" error />
      </div>
    </div>

    <div>
      <div style={styles}>Disabled</div>
      <div id="disabled-small-input-wrapper" style={styles}>
        <Input size="small" disabled />
      </div>
      <div id="disabled-large-input-wrapper" style={styles}>
        <Input size="large" disabled />
      </div>
    </div>

    <div>
      <div style={styles}>
        Disabled
        <br /> (with text)
      </div>
      <div id="disabled-text-small-input-wrapper" style={styles}>
        <Input size="small" value="Some text" disabled />
      </div>
      <div id="disabled-text-large-input-wrapper" style={styles}>
        <Input size="large" value="Some text" disabled />
      </div>
    </div>

    <div>
      <div style={styles}>Placeholder</div>
      <div id="placeholder-small-input-wrapper" style={styles}>
        <Input size="small" placeholder="Placeholder" />
      </div>
      <div id="placeholder-large-input-wrapper" style={styles}>
        <Input size="large" placeholder="Placeholder" />
      </div>
    </div>

    <div>
      <div style={styles}>Password</div>
      <div id="password-small-input-wrapper" style={styles}>
        <Input size="small" value="password" type="password" />
      </div>
      <div id="password-large-input-wrapper" style={styles}>
        <Input size="large" value="password" type="password" />
      </div>
    </div>

    <div>
      <div style={styles}>Borderless</div>
      <div id="borderless-small-input-wrapper" style={styles}>
        <Input size="small" borderless />
      </div>
      <div id="borderless-large-input-wrapper" style={styles}>
        <Input size="large" borderless />
      </div>
    </div>

    <div>
      <div style={styles}>Left icon</div>
      <div id="left-icon-small-input-wrapper" style={styles}>
        <Input size="small" leftIcon={<SearchIcon />} />
      </div>
      <div id="left-icon-large-input-wrapper" style={styles}>
        <Input size="large" leftIcon={<SearchIcon />} />
      </div>
    </div>

    <div>
      <div style={styles}>Right icon</div>
      <div id="right-icon-small-input-wrapper" style={styles}>
        <Input size="small" rightIcon={<SearchIcon />} />
      </div>
      <div id="right-icon-large-input-wrapper" style={styles}>
        <Input size="large" rightIcon={<SearchIcon />} />
      </div>
    </div>

    <div>
      <div style={styles}>Error and Disabled</div>
      <div id="error-disabled-small-input-wrapper" style={styles}>
        <Input size="small" error disabled value="Error and Disabled" />
      </div>
      <div id="error-disabled-large-input-wrapper" style={styles}>
        <Input size="large" error disabled value="Error and Disabled" />
      </div>
    </div>
  </div>
);
InputsWithDifferentStates.storyName = 'Inputs with different states';

InputsWithDifferentStates.parameters = {
  creevey: {
    tests: {
      async 'Warning small'() {
        const element = await this.browser.findElement({ css: '#warning-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Warning small');
      },
      async 'Warning large'() {
        const element = await this.browser.findElement({ css: '#warning-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Warning large');
      },
      async 'Error small'() {
        const element = await this.browser.findElement({ css: '#error-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Error small');
      },
      async 'Error large'() {
        const element = await this.browser.findElement({ css: '#error-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Error large');
      },
      async 'Disabled small'() {
        const element = await this.browser.findElement({ css: '#disabled-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Disabled small');
      },
      async 'Disabled large'() {
        const element = await this.browser.findElement({ css: '#disabled-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Disabled large');
      },
      async 'Disabled text small'() {
        const element = await this.browser.findElement({ css: '#disabled-text-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Disabled text small');
      },
      async 'Disabled text large'() {
        const element = await this.browser.findElement({ css: '#disabled-text-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Disabled text large');
      },
      async 'Placeholder small'() {
        const element = await this.browser.findElement({ css: '#placeholder-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Placeholder small');
      },
      async 'Placeholder large'() {
        const element = await this.browser.findElement({ css: '#placeholder-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Placeholder large');
      },
      async 'Password small'() {
        const element = await this.browser.findElement({ css: '#password-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Password small');
      },
      async 'Password large'() {
        const element = await this.browser.findElement({ css: '#password-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Password large');
      },
      async 'Borderless small'() {
        const element = await this.browser.findElement({ css: '#borderless-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Borderless small');
      },
      async 'Borderless large'() {
        const element = await this.browser.findElement({ css: '#borderless-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Borderless large');
      },
      async 'Left icon small'() {
        const element = await this.browser.findElement({ css: '#left-icon-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Left icon small');
      },
      async 'Left icon large'() {
        const element = await this.browser.findElement({ css: '#left-icon-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Left icon large');
      },
      async 'Right icon small'() {
        const element = await this.browser.findElement({ css: '#right-icon-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Right icon small');
      },
      async 'Right icon large'() {
        const element = await this.browser.findElement({ css: '#right-icon-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Right icon large');
      },
      async 'Error and Disabled large'() {
        const element = await this.browser.findElement({ css: '#error-disabled-large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Error and Disabled large');
      },
      async 'Error and Disabled small'() {
        const element = await this.browser.findElement({ css: '#error-disabled-small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Error and Disabled large');
      },
    },
  },
};

export const InputsWithDifferentSizes: Story = () => (
  <div>
    <div id="small-input-wrapper" style={styles}>
      <Input size="small" />
    </div>
    <div id="medium-input-wrapper" style={styles}>
      <Input size="medium" />
    </div>
    <div id="large-input-wrapper" style={styles}>
      <Input size="large" />
    </div>
  </div>
);
InputsWithDifferentSizes.storyName = 'Inputs with different sizes';

InputsWithDifferentSizes.parameters = {
  creevey: {
    tests: {
      async 'Plain small'() {
        const element = await this.browser.findElement({ css: '#small-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
      },
      async 'Focused small'() {
        const element = await this.browser.findElement({ css: '#small-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
      },
      async 'With typed text small'() {
        const element = await this.browser.findElement({ css: '#small-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
          .sendKeys('Test...')
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
      },
      async 'With long typed text small'() {
        const element = await this.browser.findElement({ css: '#small-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
          .sendKeys('Test...')
          .sendKeys(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          )
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
      },
      async 'Plain medium'() {
        const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
      },
      async 'Focused medium'() {
        const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#medium-input-wrapper input' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
      },
      async 'With typed text medium'() {
        const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#medium-input-wrapper input' }))
          .sendKeys('Test...')
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
      },
      async 'With long typed text medium'() {
        const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#medium-input-wrapper input' }))
          .sendKeys('Test...')
          .sendKeys(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          )
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
      },
      async 'Plain large'() {
        const element = await this.browser.findElement({ css: '#large-input-wrapper' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
      },
      async 'Focused large'() {
        const element = await this.browser.findElement({ css: '#large-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#large-input-wrapper input' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
      },
      async 'With typed text large'() {
        const element = await this.browser.findElement({ css: '#large-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#large-input-wrapper input' }))
          .sendKeys('Test...')
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
      },
      async 'With long typed text large'() {
        const element = await this.browser.findElement({ css: '#large-input-wrapper' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#large-input-wrapper input' }))
          .sendKeys('Test...')
          .sendKeys(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          )
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
      },
    },
  },
};

export const PlaceholderAndMask = () => (
  <div>
    <table style={{ borderSpacing: 10 }}>
      <tr>
        <td />
        <td>width: &quot;auto&quot;</td>
        <td>width: 100px</td>
        <td>width: 350px</td>
      </tr>
      <tr>
        <td>placeholder</td>
        <td>
          <Input placeholder="1234567890 1234567890 1234567890" />
        </td>
        <td>
          <Input width={100} placeholder="1234567890 1234567890 1234567890" />
        </td>
        <td>
          <Input width={350} placeholder="1234567890 1234567890 1234567890" />
        </td>
      </tr>
      <tr>
        <td> mask</td>
        <td>
          <Input mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
        </td>
        <td>
          <Input width={100} mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
        </td>
        <td>
          <Input width={350} mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
        </td>
      </tr>
      <tr>
        <td>placeholder and mask</td>
        <td>
          <Input
            mask="********** ********** **********"
            maskChar={'_'}
            alwaysShowMask
            placeholder="1234567890 1234567890 1234567890"
          />
        </td>
        <td>
          <Input
            width={100}
            mask="********** ********** **********"
            maskChar={'_'}
            alwaysShowMask
            placeholder="1234567890 1234567890 1234567890"
          />
        </td>
        <td>
          <Input
            width={350}
            mask="********** ********** **********"
            maskChar={'_'}
            alwaysShowMask
            placeholder="1234567890 1234567890 1234567890"
          />
        </td>
      </tr>
    </table>
    <table style={{ borderSpacing: 10 }}>
      <tr>
        <td />
        <td>focused</td>
        <td>blured</td>
      </tr>
      <tr>
        <td>placeholder and mask</td>
        <td>
          <Input
            autoFocus
            mask="********** ********** **********"
            maskChar={'_'}
            placeholder="1234567890 1234567890 1234567890"
          />
        </td>
        <td>
          <Input
            mask="********** ********** **********"
            maskChar={'_'}
            placeholder="1234567890 1234567890 1234567890"
          />
        </td>
      </tr>
    </table>
  </div>
);
PlaceholderAndMask.storyName = 'Placeholder and Mask';

export const InputWithPhoneMask: Story = () => (
  <Input width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
);
InputWithPhoneMask.storyName = 'Input with phone mask';

InputWithPhoneMask.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
      async Editing() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .sendKeys('9')
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Editing');
      },
      async Blured() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .sendKeys('9')
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'body' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Blured');
      },
    },
  },
};

export const SelectAllByProp: Story = () => <Input defaultValue="Some value" selectAllOnFocus />;
SelectAllByProp.storyName = 'Select all by prop';

SelectAllByProp.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
    },
  },
};

export const SelectAllByButton: Story = () => {
  let input: Input | null = null;

  const selectAll = () => {
    if (input) {
      input.selectAll();
    }
  };

  return (
    <div>
      <div>
        <Input ref={(element) => (input = element)} defaultValue="Some value" />
      </div>
      <Button onClick={selectAll}>Select all</Button>
    </div>
  );
};
SelectAllByButton.storyName = 'Select all by button';

SelectAllByButton.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Selected() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Selected');
      },
    },
  },
};

export const InputWithMaxLengthAttr = () => <Input maxLength={3} placeholder="maxLength={3}" />;
InputWithMaxLengthAttr.storyName = 'Input with maxLength attr';
InputWithMaxLengthAttr.parameters = { creevey: { skip: [true] } };

export const ManualBlinking = () => {
  class Sample extends React.Component {
    private input: Input | null = null;

    public render() {
      return (
        <Gapped>
          <Input ref={this.refInput} />
          <button onClick={this.handleClick}>Blink!</button>
        </Gapped>
      );
    }

    private handleClick = () => {
      if (this.input) {
        this.input.blink();
      }
    };

    private refInput = (element: Input | null) => {
      this.input = element;
    };
  }

  return <Sample />;
};
ManualBlinking.storyName = 'Manual blinking';
ManualBlinking.parameters = { creevey: { skip: [true] } };

export const PrefixAndSuffixSmall: Story = () => <InputWithPrefixSuffix size="small" />;
PrefixAndSuffixSmall.storyName = 'Prefix and suffix small';

PrefixAndSuffixSmall.parameters = {
  creevey: {
    tests: {
      async Plain() {
        const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-small' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
      },
      async 'First input focused'() {
        const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-small' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#inputWithPrefixOrSuffx-small input' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('First input focused');
      },
    },
  },
};

export const PrefixAndSuffixMedium: Story = () => <InputWithPrefixSuffix size="medium" />;
PrefixAndSuffixMedium.storyName = 'Prefix and suffix medium';

PrefixAndSuffixMedium.parameters = {
  creevey: {
    tests: {
      async Plain() {
        const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-medium' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
      },
      async 'First input focused'() {
        const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-medium' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#inputWithPrefixOrSuffx-medium input' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('First input focused');
      },
    },
  },
};

export const PrefixAndSuffixLarge: Story = () => <InputWithPrefixSuffix size="large" />;
PrefixAndSuffixLarge.storyName = 'Prefix and suffix large';

PrefixAndSuffixLarge.parameters = {
  creevey: {
    tests: {
      async Plain() {
        const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-large' });
        await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
      },
      async 'First input focused'() {
        const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-large' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#inputWithPrefixOrSuffx-large input' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('First input focused');
      },
    },
  },
};

export const TextStylesReset = () => (
  <div
    style={{
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontVariant: 'small-caps slashed-zero',
      fontStretch: 'expanded',
      color: 'red',
      lineHeight: '50px',
      textAlign: 'right',
      textShadow: '3px 3px 3px #333',
      textTransform: 'uppercase',
      letterSpacing: '5px',
    }}
  >
    <Gapped vertical>
      <span>Inherited Styles</span>
      <Input placeholder="Placeholder" />
      <Input defaultValue="Value" />
      <Input defaultValue="Disabled" disabled />
      <Input mask="a9*MASK" alwaysShowMask />
      <Input leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
    </Gapped>
  </div>
);
TextStylesReset.storyName = 'text styles reset';

function InputWithPrefixSuffix({ size }: { size: InputSize }) {
  return (
    <div style={{ padding: 4 }} id={`inputWithPrefixOrSuffx-${size}`}>
      <div style={{ margin: '20px 10px 10px', fontSize: '1.5em' }}>Size {size}</div>
      <div>
        <div style={{ ...styles, width: 100 }}>Prefix</div>
        <div style={styles}>
          <Input size={size} prefix="Prefix" placeholder="Placeholder" />
        </div>
        <div style={styles}>
          <Input size={size} prefix="Prefix" defaultValue="Value" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div style={{ ...styles, width: 100 }}>Suffix</div>
        <div style={styles}>
          <Input size={size} suffix="suffix" placeholder="Placeholder" />
        </div>
        <div style={styles}>
          <Input size={size} suffix="suffix" defaultValue="Value" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div style={{ ...styles, width: 100 }}>Both preffix and suffix</div>
        <div style={styles}>
          <Input size={size} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
        </div>
        <div style={styles}>
          <Input size={size} prefix="Prefix" suffix="suffix" defaultValue="Value" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div style={{ ...styles, width: 100 }}>Both preffix and suffix with rightIcon</div>
        <div style={styles}>
          <Input size={size} rightIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
        </div>
        <div style={styles}>
          <Input size={size} rightIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div style={{ ...styles, width: 100 }}>Both preffix and suffix with leftIcon</div>
        <div style={styles}>
          <Input size={size} leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
        </div>
        <div style={styles}>
          <Input size={size} leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
        </div>
      </div>
    </div>
  );
}

export const UncontrolledInputWithPlaceholder: Story = () => {
  const [_, setValue] = React.useState<string>();
  return <Input placeholder="Placeholder" onValueChange={(value) => setValue(value)} />;
};
UncontrolledInputWithPlaceholder.storyName = 'Uncontrolled Input With Placeholder';
UncontrolledInputWithPlaceholder.parameters = {
  creevey: {
    tests: {
      async PlainAndTyped() {
        const plain = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .sendKeys('text')
          .perform();
        const typed = await this.takeScreenshot();
        await this.expect({ plain, typed }).to.matchImages();
      },
    },
  },
};
