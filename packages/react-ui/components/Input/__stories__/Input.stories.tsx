// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { Input, InputProps, InputSize } from '../Input';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';

const styles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  minWidth: '90px',
  padding: '5px',
};

export default {
  title: 'Input',
  parameters: {
    creevey: {
      skip: { tests: 'idle, focus, edit, blur', in: /^(?!\bchrome\b)/, reason: `themes don't affect logic` },
    },
  },
} as Meta;

type InputState = Partial<InputProps>;

const sizeStates: InputState[] = [
  { size: 'small' },
  { size: 'medium' },
  { size: 'large' },
];

const inputDefaultState: InputState[] = [
  {}
];

const inputWidthStates: InputState[] = [
  { width: 'auto' },
  { width: '100px' },
  { width: '350px' }

];

export const DifferentStates: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Input' }}
  />
);

const inputDifferentStates: InputState[] = [
  { disabled: true },
  { value: 'Some text', disabled: true },
  { placeholder: 'Placeholder' },
  { type: 'password' },
  { borderless: true },
  { leftIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon /> },
];

export const Size: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputDefaultState.map((x) => ({ props: x }))}
    presetProps={{ children: 'Input' }}
  />
);

export const Align = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={alignDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ value: 'Value', width: '200px' }}
  />
);

const alignDifferentStates: InputState[] = [
  { align: 'center' },
  { align: 'center', leftIcon: <SearchIcon /> },
  { align: 'center', rightIcon: <SearchIcon /> },
  { align: 'right' },
  { align: 'right', leftIcon: <SearchIcon /> },
  { align: 'right', rightIcon: <SearchIcon /> },
  { align: 'left' },
  { align: 'left', leftIcon: <SearchIcon /> },
  { align: 'left', rightIcon: <SearchIcon /> },
];

export const AlwaysShowMask = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={alwaysShowMaskStates.map((x) => ({ props: x }))}
    presetProps={{ mask: "(***) ***-**-**" }}
  />
);
const alwaysShowMaskStates: InputState[] = [
  {},
  { defaultValue: '95678901' },
  { defaultValue: '956789010A' },
  { alwaysShowMask: true },
  { alwaysShowMask: true, defaultValue: '95678901' },
  { alwaysShowMask: true, defaultValue: '956789010A' },
];

export const Borderless = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={borderlessStates.map((x) => ({ props: x }))}
    presetProps={{ borderless: true }}
  />
);
const borderlessStates: InputState[] = [
  {},
  { mask: '***-***-***' },
  { alwaysShowMask: true, mask: '***-***-***' },
  { prefix: 'prefix' },
  { suffix: 'suffix' },
];

export const Error = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={errorStates.map((x) => ({ props: x }))}
    presetProps={{ error: true }}
  />
);
const errorStates: InputState[] = [
  {},
  { borderless: true },
  { disabled: true, },
  { disabled: true, alwaysShowMask: true, mask: '***-***-***' },
];

export const Warning = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={warningStates.map((x) => ({ props: x }))}
    presetProps={{ warning: true }}
  />
);
const warningStates: InputState[] = [
  {},
  { borderless: true },
  { disabled: true, },
  { disabled: true, alwaysShowMask: true, mask: '***-***-***' },
];

export const RightIcon = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsStates.map((x) => ({ props: x }))}
    presetProps={{ rightIcon: <SearchIcon /> }}
  />
);
export const LeftIcon = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsStates.map((x) => ({ props: x }))}
    presetProps={{ leftIcon: <SearchIcon /> }}
  />
);

const iconsStates: InputState[] = [
  {},
  { defaultValue: 'Value' },
  { prefix: 'PR' },
  { prefix: 'PR', defaultValue: 'Value' },
  { suffix: 'SF' },
  { suffix: 'SF', defaultValue: 'Value' },
  { borderless: true },
  { disabled: true, },
];

// export const InputsWithDifferentSizes: Story = () => (
//   <div>
//     <div id="small-input-wrapper" style={styles}>
//       <Input size="small" />
//     </div>
//     <div id="medium-input-wrapper" style={styles}>
//       <Input size="medium" />
//     </div>
//     <div id="large-input-wrapper" style={styles}>
//       <Input size="large" />
//     </div>
//   </div>
// );
// InputsWithDifferentSizes.storyName = 'Inputs with different sizes';

// InputsWithDifferentSizes.parameters = {
//   creevey: {
//     tests: {
//       async 'Plain small'() {
//         const element = await this.browser.findElement({ css: '#small-input-wrapper' });
//         await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
//       },
//       async 'Focused small'() {
//         const element = await this.browser.findElement({ css: '#small-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
//       },
//       async 'With typed text small'() {
//         const element = await this.browser.findElement({ css: '#small-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
//           .sendKeys('Test...')
//           .pause(500)
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
//       },
//       async 'With long typed text small'() {
//         const element = await this.browser.findElement({ css: '#small-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#small-input-wrapper input' }))
//           .sendKeys('Test...')
//           .sendKeys(
//             'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//           )
//           .pause(500)
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
//       },
//       async 'Plain medium'() {
//         const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
//         await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
//       },
//       async 'Focused medium'() {
//         const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#medium-input-wrapper input' }))
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
//       },
//       async 'With typed text medium'() {
//         const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#medium-input-wrapper input' }))
//           .sendKeys('Test...')
//           .pause(500)
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
//       },
//       async 'With long typed text medium'() {
//         const element = await this.browser.findElement({ css: '#medium-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#medium-input-wrapper input' }))
//           .sendKeys('Test...')
//           .sendKeys(
//             'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//           )
//           .pause(500)
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
//       },
//       async 'Plain large'() {
//         const element = await this.browser.findElement({ css: '#large-input-wrapper' });
//         await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
//       },
//       async 'Focused large'() {
//         const element = await this.browser.findElement({ css: '#large-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#large-input-wrapper input' }))
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
//       },
//       async 'With typed text large'() {
//         const element = await this.browser.findElement({ css: '#large-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#large-input-wrapper input' }))
//           .sendKeys('Test...')
//           .pause(500)
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
//       },
//       async 'With long typed text large'() {
//         const element = await this.browser.findElement({ css: '#large-input-wrapper' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#large-input-wrapper input' }))
//           .sendKeys('Test...')
//           .sendKeys(
//             'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//           )
//           .pause(500)
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
//       },
//     },
//   },
// };

export const PlaceholderAndMask = () => (
  <ComponentTable
    Component={Input}
    cols={inputWidthStates.map((x) => ({ props: x }))}
    rows={PlaceholderAndMaskStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);

const PlaceholderAndMaskStates: InputState[] = [
  { placeholder: '1234567890 1234567890 1234567890' },
  { mask: "********** ********** **********", maskChar: '_', alwaysShowMask: true },
  { placeholder: '1234567890 1234567890', mask: "********** ********** **********", maskChar: '_', alwaysShowMask: true }
];

// export const PlaceholderAndMask = () => (
//   <div>
//     <table style={{ borderSpacing: 10 }}>
//       <tr>
//         <td />
//         <td>width: &quot;auto&quot;</td>
//         <td>width: 100px</td>
//         <td>width: 350px</td>
//       </tr>
//       <tr>
//         <td>placeholder</td>
//         <td>
//           <Input placeholder="1234567890 1234567890 1234567890" />
//         </td>
//         <td>
//           <Input width={100} placeholder="1234567890 1234567890 1234567890" />
//         </td>
//         <td>
//           <Input width={350} placeholder="1234567890 1234567890 1234567890" />
//         </td>
//       </tr>
//       <tr>
//         <td> mask</td>
//         <td>
//           <Input mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
//         </td>
//         <td>
//           <Input width={100} mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
//         </td>
//         <td>
//           <Input width={350} mask="********** ********** **********" maskChar={'_'} alwaysShowMask />
//         </td>
//       </tr>
//       <tr>
//         <td>placeholder and mask</td>
//         <td>
//           <Input
//             mask="********** ********** **********"
//             maskChar={'_'}
//             alwaysShowMask
//             placeholder="1234567890 1234567890 1234567890"
//           />
//         </td>
//         <td>
//           <Input
//             width={100}
//             mask="********** ********** **********"
//             maskChar={'_'}
//             alwaysShowMask
//             placeholder="1234567890 1234567890 1234567890"
//           />
//         </td>
//         <td>
//           <Input
//             width={350}
//             mask="********** ********** **********"
//             maskChar={'_'}
//             alwaysShowMask
//             placeholder="1234567890 1234567890 1234567890"
//           />
//         </td>
//       </tr>
//     </table>
//     <table style={{ borderSpacing: 10 }}>
//       <tr>
//         <td />
//         <td>focused</td>
//         <td>blured</td>
//       </tr>
//       <tr>
//         <td>placeholder and mask</td>
//         <td>
//           <Input
//             autoFocus
//             mask="********** ********** **********"
//             maskChar={'_'}
//             placeholder="1234567890 1234567890 1234567890"
//           />
//         </td>
//         <td>
//           <Input
//             mask="********** ********** **********"
//             maskChar={'_'}
//             placeholder="1234567890 1234567890 1234567890"
//           />
//         </td>
//       </tr>
//     </table>
//   </div>
// );

const testMaskedInput: CreeveyTests = {
  async 'idle, focus, edit, blur'() {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };

    const idle = await this.takeScreenshot();

    await click('input').perform();
    const focused = await this.takeScreenshot();

    await click('input').sendKeys('953').perform();
    const edited = await this.takeScreenshot();

    await click('body').perform();
    const blured = await this.takeScreenshot();

    await this.expect({ idle, focused, edited, blured }).to.matchImages();
  },
};

export const Mask: Story = () => (
  <Input width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
);
Mask.parameters = {
  creevey: {
    tests: testMaskedInput,
  },
};

export const MaskAndCustomUnmaskedValue: Story = () => {
  const [value, setValue] = useState('+795');

  return (
    <Input
      width="150"
      mask="+7 999 999-99-99"
      maskChar={'_'}
      placeholder="+7"
      alwaysShowMask
      value={value}
      onValueChange={(value) => setValue(value.replace(/\s/g, ''))}
    />
  );
};

MaskAndCustomUnmaskedValue.parameters = {
  creevey: {
    tests: testMaskedInput,
  },
};

export const SelectAllByProp: Story = () => <Input defaultValue="Some value" selectAllOnFocus />;

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
        <Input ref={(element) => (input = element)} defaultValue="Some value" /><Button onClick={selectAll}>Select all</Button>
      </div>
    </div>
  );
};
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

export const OLDInputWithMaxLengthAttr = () => <Input maxLength={3} placeholder="maxLength={3}" />;
OLDInputWithMaxLengthAttr.storyName = 'OLD Input with maxLength attr';
OLDInputWithMaxLengthAttr.parameters = { creevey: { skip: [true] } };

export const OLDManualBlinking = () => {
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
OLDManualBlinking.storyName = 'OLD Manual blinking';
OLDManualBlinking.parameters = { creevey: { skip: [true] } };

export const Prefix = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ prefix: 'Prefix' }}
  />
);
const inputPrefixOrSuffixStates: InputState[] = [
  {},
  { value: 'Value' },
  { placeholder: 'Placeholder' },
  { rightIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon />, value: 'Value' },
  { rightIcon: <SearchIcon />, placeholder: 'Placeholder' },
  { leftIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon />, value: 'Value' },
  { leftIcon: <SearchIcon />, placeholder: 'Placeholder' },
];

export const Suffix = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ suffix: 'Suffix' }}
  />
);

export const PrefixAndSuffixBoth = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ prefix: 'Prefix', suffix: 'Suffix' }}
  />
);


// export const PrefixAndSuffixSmall: Story = () => <InputWithPrefixSuffix size="small" />;
// PrefixAndSuffixSmall.storyName = 'Prefix and suffix small';

// PrefixAndSuffixSmall.parameters = {
//   creevey: {
//     tests: {
//       async Plain() {
//         const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-small' });
//         await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
//       },
//       async 'First input focused'() {
//         const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-small' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#inputWithPrefixOrSuffx-small input' }))
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('First input focused');
//       },
//     },
//   },
// };

// export const PrefixAndSuffixMedium: Story = () => <InputWithPrefixSuffix size="medium" />;
// PrefixAndSuffixMedium.storyName = 'Prefix and suffix medium';

// PrefixAndSuffixMedium.parameters = {
//   creevey: {
//     tests: {
//       async Plain() {
//         const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-medium' });
//         await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
//       },
//       async 'First input focused'() {
//         const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-medium' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#inputWithPrefixOrSuffx-medium input' }))
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('First input focused');
//       },
//     },
//   },
// };

// export const PrefixAndSuffixLarge: Story = () => <InputWithPrefixSuffix size="large" />;
// PrefixAndSuffixLarge.storyName = 'Prefix and suffix large';

// PrefixAndSuffixLarge.parameters = {
//   creevey: {
//     tests: {
//       async Plain() {
//         const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-large' });
//         await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
//       },
//       async 'First input focused'() {
//         const element = await this.browser.findElement({ css: '#inputWithPrefixOrSuffx-large' });
//         await this.browser
//           .actions({
//             bridge: true,
//           })
//           .click(this.browser.findElement({ css: '#inputWithPrefixOrSuffx-large input' }))
//           .perform();
//         await this.expect(await element.takeScreenshot()).to.matchImage('First input focused');
//       },
//     },
//   },
// };

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

// function InputWithPrefixSuffix({ size }: { size: InputSize }) {
//   return (
//     <div style={{ padding: 4 }} id={`inputWithPrefixOrSuffx-${size}`}>
//       <div style={{ margin: '20px 10px 10px', fontSize: '1.5em' }}>Size {size}</div>
//       <div>
//         <div style={{ ...styles, width: 100 }}>Prefix</div>
//         <div style={styles}>
//           <Input size={size} prefix="Prefix" placeholder="Placeholder" />
//         </div>
//         <div style={styles}>
//           <Input size={size} prefix="Prefix" defaultValue="Value" />
//         </div>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'baseline' }}>
//         <div style={{ ...styles, width: 100 }}>Suffix</div>
//         <div style={styles}>
//           <Input size={size} suffix="suffix" placeholder="Placeholder" />
//         </div>
//         <div style={styles}>
//           <Input size={size} suffix="suffix" defaultValue="Value" />
//         </div>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'baseline' }}>
//         <div style={{ ...styles, width: 100 }}>Both preffix and suffix</div>
//         <div style={styles}>
//           <Input size={size} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
//         </div>
//         <div style={styles}>
//           <Input size={size} prefix="Prefix" suffix="suffix" defaultValue="Value" />
//         </div>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'baseline' }}>
//         <div style={{ ...styles, width: 100 }}>Both preffix and suffix with rightIcon</div>
//         <div style={styles}>
//           <Input size={size} rightIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
//         </div>
//         <div style={styles}>
//           <Input size={size} rightIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
//         </div>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'baseline' }}>
//         <div style={{ ...styles, width: 100 }}>Both preffix and suffix with leftIcon</div>
//         <div style={styles}>
//           <Input size={size} leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" placeholder="Placeholder" />
//         </div>
//         <div style={styles}>
//           <Input size={size} leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
//         </div>
//       </div>
//     </div>
//   );
// }

export const OLDUncontrolledInputWithPlaceholder: Story = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = React.useState<string>();
  return <Input placeholder="Placeholder" onValueChange={(value) => setValue(value)} />;
};
OLDUncontrolledInputWithPlaceholder.storyName = 'OLD Uncontrolled Input with Placeholder';
OLDUncontrolledInputWithPlaceholder.parameters = {
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

export const OLDInputWithMaskSelectAll: Story = () => {
  const inputRef = React.useRef<Input>(null);
  const [value, setValue] = React.useState('11');
  const selectAll = React.useCallback(() => {
    inputRef.current?.selectAll();
  }, [inputRef.current]);
  return (
    <div>
      <Input mask="9999" maskChar={'_'} ref={inputRef} value={value} onValueChange={setValue} onFocus={selectAll} />
    </div>
  );
};
OLDInputWithMaskSelectAll.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome\b)/, reason: `themes don't affect logic` },
    tests: {
      async PlainAndSelected() {
        const plain = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .pause(500)
          .perform();
        const selectAllHalfFilledInput = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .sendKeys('1111')
          .click(this.browser.findElement({ css: 'body' }))
          .click(this.browser.findElement({ css: 'input' }))
          .pause(500)
          .perform();
        const selectAllFilledInput = await this.takeScreenshot();
        await this.expect({ plain, selectAllHalfFilledInput, selectAllFilledInput }).to.matchImages();
      },
    },
  },
};
