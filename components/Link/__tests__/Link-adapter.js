import '../../../testing/Lookup';

import {mount} from 'enzyme';
import React from 'react';

import Link from '../Link.adapter';

describe('Link-adapter', () => {
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
    mnt(<Link tid="a" onClick={onClick} />);

    Lookup.getAdapter(Lookup.findOne('a')).click();

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('isDisabled', () => {
    mnt(
      <div>
        <Link tid="a" />
        <Link tid="b" disabled />
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
