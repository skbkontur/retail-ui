import '../../../testing/Lookup';

import {mount} from 'enzyme';
import React from 'react';

import Button from '../Button.adapter';

describe('Button-adapter', () => {
  let wrapper;
  const mnt = (element) => {
    wrapper = mount(<div>{element}</div>);
    return wrapper;
  };

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('click', () => {
    const onClick = jest.fn();
    mnt(<Button tid="a" onClick={onClick} />);

    Lookup.getAdapter(Lookup.findOne('a')).click();

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('isDisabled', () => {
    mnt(
      <div>
        <Button tid="a" />
        <Button tid="b" disabled />
      </div>
    );

    expect(
      Lookup.getAdapter(Lookup.findOne('a')).isDisabled()
    ).toBe(false);
    expect(
      Lookup.getAdapter(Lookup.findOne('b')).isDisabled()
    ).toBe(true);
  });
});
