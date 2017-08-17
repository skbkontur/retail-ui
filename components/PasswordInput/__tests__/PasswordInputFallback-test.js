import { mount } from 'enzyme';
import React from 'react';

import PasswordInputFallback from '../PasswordInputFallback';
import Input from '../../Input';

const setup = props => {
  return mount(
    <PasswordInputFallback value="" refInput={() => {}} {...props} />
  );
};

describe('PasswordInputFallback', () => {
  it('renders', () => {
    setup();
  });

  it('should render text and password Inputs', () => {
    const component = setup();
    const inputs = component.find(Input);

    expect(inputs).toHaveLength(2);
    expect(inputs.nodes[0].props.type).toBe('password');
    expect(inputs.nodes[1].props.type).toBe('text');
  });
});
