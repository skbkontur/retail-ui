// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { Input, InputProps, InputSize } from '../Input';
import { Gapped } from '../../Gapped';

// const styles = {
//   display: 'inline-block',
//   verticalAlign: 'middle',
//   minWidth: '90px',
//   padding: '5px',
// };

export default {
  title: 'Input',
  parameters: {
    creevey: {
      //skip: { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/, tests: 'idle, focus, edit, blur', reason: `themes don't affect logic` },
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
  {},
  { defaultValue: 'Value' }
];

const inputWidthStates: InputState[] = [
  { width: 'auto' },
  { width: '100px' },
  { width: '350px' }
];

export const Align: Story = () => (
  <ComponentTable
    Component={Input}
    cols={alignStates.map((x) => ({ props: x }))}
    rows={alignDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ value: 'Value', width: '200px' }}
  />
);

const alignStates: InputState[] = [
  { align: 'center' },
  { align: 'left' },
  { align: 'right' },
];

const alignDifferentStates: InputState[] = [
  {},
  { leftIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon /> },
  { prefix: 'PR' },
  { suffix: 'SF' },
  { leftIcon: <SearchIcon />, prefix: 'PR' },
  { leftIcon: <SearchIcon />, suffix: 'SF' },
  { rightIcon: <SearchIcon />, prefix: 'PR' },
  { rightIcon: <SearchIcon />, suffix: 'SF' },
  { leftIcon: <SearchIcon />, prefix: 'PR', suffix: 'SF' },
  { rightIcon: <SearchIcon />, prefix: 'PR', suffix: 'SF' }
];

export const AlwaysShowMask: Story = () => (
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

export const Borderless: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={borderlessStates.map((x) => ({ props: x }))}
    presetProps={{ borderless: true }}
  />
);

const borderlessStates: InputState[] = [
  {},
];

export const Disabled: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={disabledStates.map((x) => ({ props: x }))}
    presetProps={{ disabled: true }}
  />
);

const disabledStates: InputState[] = [
  {},
  { value: 'Some text' },
  { placeholder: 'Placeholder' },
  { type: 'password', value: 'Value' },
  { leftIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon /> },
  { prefix: 'PR' },
  { suffix: 'SF' }
];

export const Error: Story = () => (
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
];

export const LeftIcon: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsStates.map((x) => ({ props: x }))}
    presetProps={{ leftIcon: <SearchIcon /> }}
  />
);

export const RightIcon: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsStates.map((x) => ({ props: x }))}
    presetProps={{ rightIcon: <SearchIcon /> }}
  />
);

const iconsStates: InputState[] = [
  {},
  { defaultValue: 'Value' },
  { disabled: true, },
];

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
  <ComponentTable
    Component={Input}
    cols={inputWidthStates.map((x) => ({ props: x }))}
    rows={maskStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />

  //<Input width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
);
Mask.parameters = {
  creevey: {
    tests: testMaskedInput,
  },
};

const maskStates: InputState[] = [
  { mask: "**** **********", alwaysShowMask: true },
  { mask: "**** **********", maskChar: '*', alwaysShowMask: true },
  { mask: "*** ***", maskChar: '_', defaultValue: 'Value' },
  { mask: "*** ***", maskChar: '_', defaultValue: 'Value', alwaysShowMask: true }

];

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

export const Placeholder: Story = () => (
  <ComponentTable
    Component={Input}
    cols={inputDefaultState.map((x) => ({ props: x }))}
    rows={placeholderStates.map((x) => ({ props: x }))}
    presetProps={{ placeholder: '1234567890' }}
  />
);

const placeholderStates: InputState[] = [
  {},
  { disabled: true }
];

export const Prefix: Story = () => (
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

export const Suffix: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ suffix: 'Suffix' }}
  />
);

export const PrefixAndSuffixBoth: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ prefix: 'Prefix', suffix: 'Suffix' }}
  />
);

export const Size: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputDefaultState.map((x) => ({ props: x }))}
    presetProps={{ children: 'Input' }}
  />
);

export const TextStylesReset: Story = () => (
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

export const Type: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={typeStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);

const typeStates: InputState[] = [
  { type: 'text', defaultValue: 'Value' },
  { type: 'password', defaultValue: 'Value' },
  { type: 'password', defaultValue: 'Value', disabled: true },
  { mask: '***-***', type: 'password', alwaysShowMask: true },
  { mask: '***-***', type: 'password', alwaysShowMask: true, defaultValue: 'Value' },
  { mask: '***-***', type: 'password', alwaysShowMask: true, defaultValue: 'Value', disabled: true },
];

export const Warning: Story = () => (
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
];

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
        <Input ref={(element) => (input = element)} defaultValue="Some value" /><button onClick={selectAll}>Select all</button>
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

export const MaxLength: Story = () => <Input maxLength={3} placeholder="maxLength={3}" />;
MaxLength.parameters = {
  creevey: {
    //skip: [true]

  }
};

export const BlinkingByButton: Story = () => {
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
BlinkingByButton.parameters = { creevey: { skip: true } };

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

export const UncontrolledInputWithPlaceholder: Story = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = React.useState<string>();
  return <Input placeholder="Placeholder" onValueChange={(value) => setValue(value)} />;
};

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

// const inputTests: CreeveyTests = {
//   async idle() {
//     await this.expect(await this.takeScreenshot()).to.matchImage('idle');
//   },
//   async hover() {
//     await this.browser
//       .actions({
//         bridge: true,
//       })
//       .move({
//         origin: this.browser.findElement({ css: 'button' }),
//       })
//       .perform();
//     await this.expect(await this.takeScreenshot()).to.matchImage('hover');
//   },
//   async pressed() {
//     await this.browser
//       .actions({
//         bridge: true,
//       })
//       .move({
//         origin: this.browser.findElement({ css: 'button' }),
//       })
//       .press()
//       .perform();
//     await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
//     await this.browser
//       .actions({
//         bridge: true,
//       })
//       .release()
//       .perform();
//   },
//   async clicked() {
//     await this.browser
//       .actions({
//         bridge: true,
//       })
//       .click(this.browser.findElement({ css: 'button' }))
//       .perform();
//     await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
//   },
//   async tabPress() {
//     await this.browser
//       .actions({
//         bridge: true,
//       })
//       .sendKeys(this.keys.TAB)
//       .pause(500)
//       .perform();
//     await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
//   },
// };

// export const PlaygroundDefault = () => <Button>Hello</Button>;

// PlaygroundDefault.parameters = {
//   creevey: {
//     skip: [
//       { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },
//       { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover', 'pressed', 'clicked'] },
//     ],
//     tests: buttonTests,
//   },
// };

export const MaskSelectAllOnFocus: Story = () => {
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
MaskSelectAllOnFocus.parameters = {
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

//const input = '[data-tid="Input__root"])';

const inputTests: CreeveyTests = {
  async 'Plain'() {
    await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
  },
  async 'Focused'() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
  },
  async 'With typed text'() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .sendKeys('Test...')
      .pause(500)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('With typed text');
  },
  async 'With long typed text'() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'input' }))
      .sendKeys('Test...')
      .sendKeys(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      )
      .pause(500)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('With long typed text small');
  },
};

export const PlaygroundDefault: Story = () => (
  <Input />
);

PlaygroundDefault.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome\b)/, reason: `themes don't affect logic` },
    tests: inputTests,
  },
};

export const PlaygroundDisabled: Story = () => (
  <Input disabled />
);

PlaygroundDisabled.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome\b)/, reason: `themes don't affect logic` },
    tests: inputTests,
  },
};
