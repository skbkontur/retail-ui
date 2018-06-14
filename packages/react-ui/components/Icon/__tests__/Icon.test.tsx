import * as React from 'react';
import { mount } from 'enzyme';

import Icon from '../Icon';

test('Icon renders', () => {
  mount(<Icon name="Ok" />);
});

test('Icon has right color', () => {
  const wrapper = mount(<Icon name="Ok" color="red" />);
  expect(
    wrapper
      .children()
      .first()
      .prop('style')
  ).toMatchObject({ color: 'red' });
});

test('Icon has right size', () => {
  const wrapper = mount(<Icon name="Ok" size="18px" />);
  expect(
    wrapper
      .children()
      .first()
      .prop('style')
  ).toMatchObject({ fontSize: '18px' });
});
