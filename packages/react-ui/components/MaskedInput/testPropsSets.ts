import { MaskedInputProps } from './MaskedInput';

const [props1, props2]: [Array<Partial<MaskedInputProps>>, Array<Partial<MaskedInputProps>>] = [
  [
    { value: 'invalid' },
    { value: '12' },
    { value: '1234' },
    { value: '12:34' },
    { defaultValue: 'invalid' },
    { defaultValue: '12' },
    { defaultValue: '1234' },
    { defaultValue: '12:34' },
  ],
  [
    {},
    { alwaysShowMask: true },
    { imaskProps: { unmask: true } },
    { imaskProps: { eager: 'remove' } },
    { alwaysShowMask: true, imaskProps: { unmask: true } },
  ],
];

export const testPropsSets: Array<Partial<MaskedInputProps>> = [];

props1.forEach((_props1) => {
  props2.forEach((_props2) => {
    testPropsSets.push(Object.assign({}, _props1, _props2));
  });
});
