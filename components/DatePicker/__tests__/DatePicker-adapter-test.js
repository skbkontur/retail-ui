import '../../../testing';
import {getAdapter, findOne} from '../../../testing/Lookup';

import {mount} from 'enzyme';
import React from 'react';

import DatePicker from '../DatePicker.adapter';

describe('DatePicker-adapter', () => {
  it('getValue', () => {
    const date = new Date();
    const wrapper = mount(<div><DatePicker tid="a" value={date} /></div>);
    const adapter = getAdapter(findOne('a'));

    expect(adapter.getValue()).toBe(date);

    wrapper.unmount();
  });

  it('setValue', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div><DatePicker tid="a" value={null} onChange={onChange} /></div>
    );
    const adapter = getAdapter(findOne('a'));

    const date = new Date();
    adapter.setValue(date);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toBe(date);
    expect(onChange.mock.calls[0][1]).toBe(date);

    wrapper.unmount();
  });
});
