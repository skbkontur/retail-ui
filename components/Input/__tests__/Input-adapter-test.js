import '../../../testing/Lookup';

import {mount} from 'enzyme';
import React from 'react';

import Input from '../Input.adapter';

describe('Input-adapter', () => {
  let wrapper;
  const mnt = (element) => {
    wrapper = mount(<div>{element}</div>);
    return wrapper;
  };

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('getValue', () => {
    mnt(<Input tid="a" value="Kappa" />);

    expect(
      Lookup.getAdapter(Lookup.findOne('a')).getValue()
    ).toBe('Kappa');
  });

  it('setValue', () => {
    const onChange = jest.fn();
    mnt(<Input tid="a" value="" onChange={onChange} />);

    Lookup.getAdapter(Lookup.findOne('a')).setValue('Kappa');

    expect(onChange.mock.calls[0][1]).toBe('Kappa');
  });
});
