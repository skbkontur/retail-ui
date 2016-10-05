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

  it('getStringValue', () => {
    const date = new Date(Date.UTC(2016, 8, 29));
    const wrapper = mount(<div><DatePicker tid="a" value={date} /></div>);
    const adapter = getAdapter(findOne('a'));

    expect(adapter.getStringValue()).toBe('2016-09-29T00:00:00.000Z');

    wrapper.unmount();
  });

  it('setStringValue', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div><DatePicker tid="a" value={null} onChange={onChange} /></div>
    );
    const adapter = getAdapter(findOne('a'));

    adapter.setStringValue('2016-09-29T00:00:00.000Z');

    const time = new Date(Date.UTC(2016, 8, 29)).getTime();
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value.getTime()).toBe(time);
    expect(onChange.mock.calls[0][1].getTime()).toBe(time);

    wrapper.unmount();
  });
});
