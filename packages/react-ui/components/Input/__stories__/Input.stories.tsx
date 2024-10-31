// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Meta, Story } from '../../../typings/stories';
import { Input, InputProps } from '../Input';
import { Gapped } from '../../Gapped';

export default {
  title: 'Input',
  component: Input,
} as Meta;

type InputState = Partial<InputProps>;

const sizeStates: InputState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

const inputDefaultState: InputState[] = [{}, { defaultValue: 'Value' }];

const inputWidthStates: InputState[] = [{}, { width: '100px' }, { width: '350px' }];

export const Align: Story = () => (
  <ComponentTable
    Component={Input}
    cols={alignStates.map((x) => ({ props: x }))}
    rows={alignDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ value: 'Value', width: '200px' }}
  />
);

const alignStates: InputState[] = [{ align: 'center' }, { align: 'left' }, { align: 'right' }];

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
  { rightIcon: <SearchIcon />, prefix: 'PR', suffix: 'SF' },
];

export const AlwaysShowMask: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={alwaysShowMaskStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '(***) ***-**-**' }}
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

const borderlessStates: InputState[] = [{}];

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
  { suffix: 'SF' },
];

export const Error: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={errorStates.map((x) => ({ props: x }))}
    presetProps={{ error: true }}
  />
);
const errorStates: InputState[] = [{}, { borderless: true }, { disabled: true }];

export const LeftIcon: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsLeftStates.map((x) => ({ props: x }))}
    presetProps={{ leftIcon: <SearchIcon /> }}
  />
);

export const RightIcon: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsRightStates.map((x) => ({ props: x }))}
    presetProps={{ rightIcon: <SearchIcon /> }}
  />
);

const iconFunc = () => <SearchIcon />;
iconFunc.toString = () => '() => <SearchIcon />';

const iconsStates: InputState[] = [{}, { defaultValue: 'Value' }, { disabled: true }];

const iconsLeftStates: InputState[] = [
  ...iconsStates,
  {
    leftIcon: iconFunc,
  },
  {
    leftIcon: '₽',
  },
];

const iconsRightStates: InputState[] = [
  ...iconsStates,
  {
    rightIcon: iconFunc,
  },
  {
    rightIcon: '₽',
  },
];

export const Mask: Story = () => (
  <ComponentTable
    Component={Input}
    cols={inputWidthStates.map((x) => ({ props: x }))}
    rows={maskStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);

const maskStates: InputState[] = [
  { mask: '**** **********', alwaysShowMask: true },
  { mask: '**** **********', maskChar: '*', alwaysShowMask: true },
  { mask: '*** ***', maskChar: '_', defaultValue: 'Value' },
  { mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'email', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'tel', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'url', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'search', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'date', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'time', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'number', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { mask: '*** ***', placeholder: 'ooo-long-long-long-placeholder' },
];

export const Placeholder: Story = () => (
  <ComponentTable
    Component={Input}
    cols={inputDefaultState.map((x) => ({ props: x }))}
    rows={placeholderStates.map((x) => ({ props: x }))}
    presetProps={{ placeholder: '1234567890' }}
  />
);

const placeholderStates: InputState[] = [{}, { disabled: true }];

export const Prefix: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixStates.map((x) => ({ props: x }))}
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

const inputPrefixStates: InputState[] = [...inputPrefixOrSuffixStates, { prefix: 'ooo-long-long-long-johnson' }];

const inputSuffixStates: InputState[] = [...inputPrefixOrSuffixStates, { suffix: 'ooo-long-long-long-johnson' }];

export const Suffix: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputSuffixStates.map((x) => ({ props: x }))}
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
  { type: 'number', defaultValue: '15', min: 10, max: 20, step: 5 },
  { type: 'search' },
  { type: 'date' },
  { type: 'time' },
  { type: 'email', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' },
  { type: 'url' },
  { type: 'tel' },
];

export const TypeApi: Story = () => (
  <>
    <ComponentTable
      Component={Input}
      cols={typeApiProps.map((x) => ({ props: x }))}
      rows={typeApiTypes.map((x) => ({ props: x }))}
      presetProps={{}}
    />
    <ComponentTable
      Component={Input}
      cols={typeApiPropsDate.map((x) => ({ props: x }))}
      rows={typeApiTypesDate.map((x) => ({ props: x }))}
      presetProps={{}}
    />
    <ComponentTable
      Component={Input}
      cols={typeApiPropsTime.map((x) => ({ props: x }))}
      rows={typeApiTypesTime.map((x) => ({ props: x }))}
      presetProps={{}}
    />
  </>
);

const typeApiTypes: InputState[] = [
  { type: 'number' },
  { type: 'search' },
  { type: 'email' },
  { type: 'url' },
  { type: 'tel' },
];
const typeApiTypesDate: InputState[] = [{ type: 'date' }];
const typeApiTypesTime: InputState[] = [{ type: 'time' }];

const typeApiProps: InputState[] = [
  { leftIcon: <SearchIcon />, value: '123' },
  { rightIcon: <SearchIcon />, value: '123' },
  { rightIcon: <SearchIcon />, placeholder: 'placeholder' },
  { prefix: 'prefix: ' },
  { suffix: ' suffix' },
];
const typeApiPropsDate: InputState[] = [
  { rightIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon /> },
  { value: '2022-05-04' },
  { prefix: 'prefix: ' },
  { suffix: ' suffix' },
];
const typeApiPropsTime: InputState[] = [
  { rightIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon /> },
  { value: '18:00' },
  { prefix: 'prefix: ' },
  { suffix: ' suffix' },
];

export const Warning: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={warningStates.map((x) => ({ props: x }))}
    presetProps={{ warning: true }}
  />
);

const warningStates: InputState[] = [{}, { borderless: true }, { disabled: true }];

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

export const Default: Story = () => (
  <div id="input">
    <Input spellCheck={false} />
  </div>
);

export const WithMask: Story = () => (
  <Input width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
);

export const WithMaskAndCustomUnmaskedValue: Story = () => {
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

export const SelectAllByProp: Story = () => <Input defaultValue="Some value" selectAllOnFocus />;

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
      <button data-tid="select-all" onClick={selectAll}>
        Select all
      </button>
    </div>
  );
};
SelectAllByButton.storyName = 'Select all by button';

export const MaxLength: Story = () => (
  <div id="input">
    <Input maxLength={3} placeholder="maxLength={3}" />
  </div>
);

export const UncontrolledInputWithPlaceholder: Story = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = React.useState<string>();
  return <Input placeholder="Placeholder" onValueChange={(value) => setValue(value)} />;
};
UncontrolledInputWithPlaceholder.storyName = 'Uncontrolled Input with Placeholder';

export const WithMaskAndSelectAllProp: Story = () => {
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

export const SearchTypeApi: Story = () => <Input defaultValue="Some value" type="search" selectAllOnFocus />;

export const InputTypeApi: Story = () => <Input defaultValue={123} type="number" selectAllOnFocus />;
