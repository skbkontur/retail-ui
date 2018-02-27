// @flow

import * as React from 'react';
import DateInput from '../index';
import { mount } from 'enzyme';

const render = props => mount(<DateInput {...props} />);

const getInput = root => root.find('input');

it('renders', () => {
  render({ value: '10.02.2017' });
});

it('renders with given valid value', () => {
  const root = render({ value: '10.02.2017' });
  expect(getInput(root).prop('value')).toBe('10.02.2017');
});

const KeyDownCases = [
  // [initial date, [...keys], expected date]

  // Date
  ['10.02.2017', ['ArrowUp'], '11.02.2017'],
  ['31.02.2017', ['ArrowUp'], '01.02.2017'],
  ['10.02.2017', ['ArrowDown'], '09.02.2017'],
  ['01.02.2017', ['ArrowDown'], '31.02.2017'],
  ['01.02.2017', ['1'], '1.02.2017'],
  ['01.02.2017', ['1', '2'], '12.02.2017'],
  ['01.02.2017', ['4'], '04.02.2017'],
  ['01.02.2017', ['0'], '0.02.2017'],
  ['01.02.2017', ['0', '2'], '02.02.2017'],

  // Month
  ['10.02.2017', ['ArrowRight', 'ArrowUp'], '10.03.2017'],
  ['10.12.2017', ['ArrowRight', 'ArrowUp'], '10.01.2017'],
  ['10.02.2017', ['ArrowRight', 'ArrowDown'], '10.01.2017'],
  ['10.01.2017', ['ArrowRight', 'ArrowDown'], '10.12.2017'],
  ['01.02.2017', ['ArrowRight', '1'], '01.1.2017'],
  ['01.02.2017', ['ArrowRight', '1', '2'], '01.12.2017'],
  ['01.02.2017', ['ArrowRight', '4'], '01.04.2017'],
  ['01.02.2017', ['ArrowRight', '0'], '01.0.2017'],
  ['01.02.2017', ['ArrowRight', '0', '3'], '01.03.2017'],

  // Year
  ['10.02.2017', ['ArrowRight', 'ArrowRight', 'ArrowUp'], '10.02.2018'],
  ['10.02.9999', ['ArrowRight', 'ArrowRight', 'ArrowUp'], '10.02.0000'],
  ['10.02.2017', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.02.2016'],
  ['10.02.0000', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.02.9999'],
  ['01.02.2017', ['ArrowRight', 'ArrowRight', '1'], '01.02.1'],
  ['01.02.2017', ['ArrowRight', 'ArrowRight', '1', '2'], '01.02.12'],
  [
    '01.02.2017',
    ['ArrowRight', 'ArrowRight', '1', '2', '3', '4'],
    '01.02.1234'
  ],
  [
    '01.02.2017',
    ['ArrowRight', 'ArrowRight', '1', '2', '3', '4', '5'],
    '01.02.2345'
  ]
];

KeyDownCases.forEach(([initDate, keys, expectedDate]) => {
  let keyString = keys.join(' > ');
  let expectedDateStr = `"${expectedDate}"`.padEnd(12, ' ');
  it(`calls onChange with ${expectedDateStr} if value is "${initDate}" and pressed "${keyString}"`, () => {
    const onChange = jest.fn();
    const input = getInput(render({ value: initDate, onChange }));
    input.simulate('click');
    keys.forEach(key => input.simulate('keydown', { key }));
    expect(onChange).toHaveBeenLastCalledWith(
      { target: { value: expectedDate } },
      expectedDate
    );
  });
});

const PasteCases = [
  '10.02.2017',
  '10/02/2017',
  '10-02-2017',
  '2017.02.10',
  '2017/02/10',
  '2017-02-10'
];

PasteCases.forEach(text => {
  it(`handles paste "${text}"`, () => {
    const onChange = jest.fn();
    const input = getInput(render({ onChange }));
    input.simulate('paste', { clipboardData: { getData: () => text } });
    expect(onChange).toHaveBeenCalledWith(
      { target: { value: '10.02.2017' } },
      '10.02.2017'
    );
  });
});
