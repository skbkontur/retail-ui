import '../../../testing/Lookup';

import {mount} from 'enzyme';
import React from 'react';

import Checkbox from '../Checkbox.adapter';

describe('Checkbox-adapter', () => {
  let wrapper;
  const mnt = (element) => {
    wrapper = mount(<div>{element}</div>);
    return wrapper;
  };

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('isChecked', () => {
    mnt(
      <div>
        <Checkbox tid="a" checked={false} />
        <Checkbox tid="b" checked={true} />
      </div>
    );

    expect(
      Lookup.getAdapter(Lookup.findOne('a')).isChecked()
    ).toBe(false);
    expect(
      Lookup.getAdapter(Lookup.findOne('b')).isChecked()
    ).toBe(true);
  });

  it('setChecked', () => {
    const onChange = jest.fn();
    mnt(<Checkbox tid="a" checked={false} onChange={onChange} />);

    const adapter = Lookup.getAdapter(Lookup.findOne('a'));
    adapter.setChecked(true);
    adapter.setChecked(false);

    expect(onChange.mock.calls[0][1]).toBe(true);
    expect(onChange.mock.calls[1][1]).toBe(false);
  });
});
