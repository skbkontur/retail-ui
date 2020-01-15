import { mount } from 'enzyme';
import React from 'react';

import { PasswordInputFallback, PasswordInputFallbackProps } from '../PasswordInputFallback';
import { Input } from '../../Input';

const setup = (props?: PasswordInputFallbackProps) => {
  return mount(
    <PasswordInputFallback value="" refInput={() => undefined} {...props} />,
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
    const nodes = inputs.getElements();
    expect(nodes[0].props.type).toBe('password');
    expect(nodes[1].props.type).toBe('text');
  });
});
