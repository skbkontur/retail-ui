// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';

import { ComponentTable } from '../../../internal/ComponentTable';
import { SearchLoupeIcon16Regular } from '../../../internal/icons2022/SearchLoupeIcon/SearchLoupeIcon16Regular';
import { Meta, Story } from '../../../typings/stories';
import { MaskedInput, MaskedInputProps } from '../MaskedInput';
import { Input, InputProps } from '../../Input';

export default {
  title: 'MaskedInput',
  parameters: {
    creevey: {
      skip: { 'other themes will become deprecated': { in: /^(?!.*2022.*)/ } },
    },
  },
} as Meta;

type InputState = Partial<MaskedInputProps>;

const sizeStates: InputState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Mask: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={maskStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '(999) 999-99-99' }}
  />
);

// FIXME: починить тесты до 5.0
Mask.parameters = {
  creevey: {
    skip: true,
  },
};

const maskStates: InputState[] = [
  {},
  { defaultValue: '95678901' },
  { defaultValue: '956789010A' },
  { mask: '****', value: 'overflow' },
  { placeholder: 'mask with placeholder' },
  { alwaysShowMask: true },
  { alwaysShowMask: true, maskChar: null },
  { alwaysShowMask: true, maskChar: 'X' },
  { alwaysShowMask: true, defaultValue: '95678901' },
  { alwaysShowMask: true, defaultValue: '956789010A' },
  { alwaysShowMask: true, placeholder: 'mask with placeholder' },
  { alwaysShowMask: true, type: 'email', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'tel', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'url', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'search', mask: '*** ***', defaultValue: 'Value' },
];

export const PrefixOrSuffix: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '+7 (999) 999 99 99' }}
  />
);
const inputPrefixOrSuffixStates: InputState[] = [
  {},
  { rightIcon: <SearchLoupeIcon16Regular /> },
  { rightIcon: <SearchLoupeIcon16Regular />, value: '+79876543210' },
  { leftIcon: <SearchLoupeIcon16Regular /> },
  { leftIcon: <SearchLoupeIcon16Regular />, value: '+79876543210' },
  { rightIcon: <SearchLoupeIcon16Regular />, placeholder: 'Placeholder' },
  { leftIcon: <SearchLoupeIcon16Regular />, placeholder: 'Placeholder' },
  { prefix: 'prefix:' },
  { prefix: 'prefix:', value: '+79876543210' },
  { suffix: '/suffix' },
  { suffix: '/suffix', value: '+79876543210' },
];

export const PrefixesAndSuffixes: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={[{}]}
    rows={prefixesAndSuffixesStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '+7 (999) 999 99 99', width: '250px' }}
  />
);
const prefixesAndSuffixesStates: InputState[] = [
  {
    rightIcon: <SearchLoupeIcon16Regular />,
    leftIcon: <SearchLoupeIcon16Regular />,
    prefix: 'prefix:',
    suffix: '/suffix',
    placeholder: 'Placeholder',
  },
  {
    rightIcon: <SearchLoupeIcon16Regular />,
    leftIcon: <SearchLoupeIcon16Regular />,
    prefix: 'prefix:',
    suffix: '/suffix',
    value: '+7987654321',
    alwaysShowMask: true,
  },
];

export const Validations: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={validationsStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '99:99' }}
  />
);

// FIXME: починить тесты до 5.0
Validations.parameters = {
  creevey: {
    skip: 'chrome2022Dark',
  },
};

const validationsStates: InputState[] = [
  { warning: true },
  { value: '12', warning: true },
  { alwaysShowMask: true, warning: true },
  { value: '12', alwaysShowMask: true, warning: true },
  { error: true },
  { value: '12', error: true },
  { alwaysShowMask: true, error: true },
  { value: '12', alwaysShowMask: true, error: true },
];

export const Positions: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={positionsStates.map((x) => ({ props: x }))}
    presetProps={{ alwaysShowMask: true, mask: '**** **** ****' }}
  />
);

const positionsStates: InputState[] = [
  { value: '1' },
  { value: '1111 1' },
  { value: '1111 1111 111' },
  { value: 'W' },
  { value: 'WWWW W' },
  { value: 'WWWW WWWW WWW' },
  { value: 'W1W1 W1W1 W1' },
];

export const Disabled: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={disabledStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '99:99', disabled: true }}
  />
);

const disabledStates: InputState[] = [
  {},
  { alwaysShowMask: true },
  { value: '12' },
  { value: '12', alwaysShowMask: true },
  { placeholder: 'Placeholder' },
];

export const AllLabGrotesqueStyles: Story = () => {
  const fontStyles = [
    {
      fontStyle: 'normal',
      fontWeight: 100,
    },
    {
      fontStyle: 'normal',
      fontWeight: 300,
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
    },
    {
      fontStyle: 'normal',
      fontWeight: 600,
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
    },
    {
      fontStyle: 'normal',
      fontWeight: 900,
    },
    {
      fontStyle: 'italic',
      fontWeight: 100,
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
    },
    {
      fontStyle: 'italic',
      fontWeight: 500,
    },
    {
      fontStyle: 'italic',
      fontWeight: 600,
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
    },
    {
      fontStyle: 'italic',
      fontWeight: 900,
    },
  ];

  return (
    <ComponentTable
      Component={MaskedInput}
      cols={sizeStates.map((x) => ({ props: x }))}
      rows={fontStyles.map((x) => ({ props: { style: x } }))}
      presetProps={{ mask: '+7 999-999-99-99', defaultValue: '123', alwaysShowMask: true }}
    />
  );
};

AllLabGrotesqueStyles.parameters = {
  creevey: {
    skip: true,
  },
};

const [propsPreset, propsSetA, propsSetB]: [
  MaskedInputProps,
  Array<Partial<MaskedInputProps>>,
  Array<Partial<MaskedInputProps>>,
] = [
  { mask: '+7 999-999-99-99', placeholder: 'placeholder' },
  [
    { value: '' },
    { value: 'invalid' },
    { value: '12' },
    { value: '123' },
    { value: '1234' },
    { value: '+7 12' },
    { defaultValue: '' },
    { defaultValue: 'invalid' },
    { defaultValue: '12' },
    { defaultValue: '123' },
    { defaultValue: '1234' },
    { defaultValue: '+7 12' },
  ],
  [{}, { alwaysShowMask: true }, { unmask: true }, { alwaysShowMask: true, unmask: true }],
];

const testPropsSets: MaskedInputProps[] = [];

propsSetA.forEach((_props1) => {
  propsSetB.forEach((_props2) => {
    testPropsSets.push(Object.assign({ id: testPropsSets.length }, propsPreset, _props1, _props2));
  });
});

export const CompareWithInput: Story = () => {
  const Comp = ({ comp, ...props }: { comp: 'MaskedInput' | 'Input-mask' | 'Input' } & MaskedInputProps) => {
    const [value, setValue] = useState(props.value);

    if (comp === 'MaskedInput') {
      return <MaskedInput {...({ ...props, value } as MaskedInputProps)} onValueChange={setValue} />;
    }
    if (comp === 'Input-mask') {
      return <Input {...({ ...props, value } as InputProps)} onValueChange={setValue} />;
    }
    return <Input {...({ ...props, value, mask: undefined } as InputProps)} onValueChange={setValue} />;
  };

  return (
    <ComponentTable<any, any, any>
      Component={Comp}
      cols={[{ comp: 'MaskedInput' }, { comp: 'Input-mask' }, { comp: 'Input' }].map((x) => ({ props: x }))}
      rows={testPropsSets.map((x) => ({ props: x }))}
    />
  );
};

CompareWithInput.parameters = {
  creevey: {
    skip: true,
  },
};

const DEFAULT_PROPS: MaskedInputProps = {
  mask: '+7 999 999-99-99',
  width: 150,
  maskChar: '_',
};

export const Default: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} value={value} onValueChange={setValue} />;
};

export const IdleFocusEditBlurWithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} placeholder="Телефон" value={value} onValueChange={setValue} />;
};

export const IdleFocusBlurWithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} placeholder="Телефон" value={value} onValueChange={setValue} />;
};

export const IdleFocusAppendRemoveBlurWithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} placeholder="Телефон" value={value} onValueChange={setValue} />;
};

export const IdleFocusBlurWithPrefix: Story = () => {
  const [value, setValue] = React.useState<string>();
  return (
    <MaskedInput {...DEFAULT_PROPS} mask="999 999-99-99" prefix="+7&nbsp;" value={value} onValueChange={setValue} />
  );
};

export const WithCustomUnmaskedValue: Story = () => {
  const [value, setValue] = useState('795');

  return (
    <>
      <span>unmask value: {value}</span>
      <br />
      <MaskedInput
        {...DEFAULT_PROPS}
        alwaysShowMask
        value={value}
        onValueChange={(value) => setValue(value.replace(/\D/g, ''))}
      />
    </>
  );
};

export const WithUnmaskedAndFixedValue: Story = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <span>unmasked value: &quot;{value}&quot;</span>
      <br />
      <MaskedInput
        {...DEFAULT_PROPS}
        mask="+{7} 999 999-99-99"
        unmask
        alwaysShowMask
        value={value}
        onValueChange={setValue}
      />
    </>
  );
};

export const IdleFocusBlurAndUncontrolled: Story = () => <MaskedInput {...DEFAULT_PROPS} />;

export const IdleFocusBlurAndUncontrolledWithDefaultValue: Story = () => (
  <>
    <h3>Известная проблема</h3>
    <span>
      При появлении маски по фокусу ломается неконтролируемый ввод, если <code>defaultValue</code> содержит любую
      фиксированную часть маски.
    </span>
    <br />
    <MaskedInput {...DEFAULT_PROPS} defaultValue="+7 123" />
    <br />
    <br />
    <span>
      Когда <code>defaultValue</code> не содержит фиксированных частей, то всё норм.
    </span>
    <br />
    <MaskedInput {...DEFAULT_PROPS} defaultValue="123" />
    <br />
    <br />
    <span>Самый простой способ обойти проблему - всегда показывать маску.</span>
    <br />
    <MaskedInput {...DEFAULT_PROPS} defaultValue="+7 123" alwaysShowMask />
  </>
);

export const SelectAllByProp: Story = () => {
  const [value, setValue] = React.useState('12');
  return (
    <div>
      <MaskedInput
        {...DEFAULT_PROPS}
        mask="9999"
        value={value}
        onValueChange={setValue}
        selectAllOnFocus
        alwaysShowMask
      />
    </div>
  );
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
        <MaskedInput {...DEFAULT_PROPS} value="+7 123 654" ref={(element) => (input = element)} alwaysShowMask />
      </div>
      <button data-tid="select-all" onClick={selectAll}>
        Select all
      </button>
    </div>
  );
};

export const RewriteInMiddle: Story = () => {
  const [value, setValue] = React.useState('12');

  return <MaskedInput {...DEFAULT_PROPS} mask="9999" alwaysShowMask value={value} onValueChange={setValue} />;
};
