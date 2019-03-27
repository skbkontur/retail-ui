import * as React from 'react';
import { mount } from 'enzyme';
import OkIcon from '@skbkontur/react-icons/Ok';

test('Icon renders', () => {
  mount(<OkIcon />);
});

test('Icon has right color', () => {
  const wrapper = mount(<OkIcon color="red" />);
  expect(
    wrapper
      .find('.root')
      .first()
      .prop('style'),
  ).toMatchObject({ color: 'red' });
});

test('Icon has right size', () => {
  const wrapper = mount(<OkIcon size="18px" />);
  expect(
    wrapper
      .find('.root')
      .first()
      .prop('style'),
  ).toMatchObject({ fontSize: '18px' });
});
