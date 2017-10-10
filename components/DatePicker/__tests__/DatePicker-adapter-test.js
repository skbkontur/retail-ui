// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import DatePicker from '../DatePicker.adapter';

// Not supporting React 16
xdescribe('DatePicker-adapter', () => {
  testAdapter('getValue', mount => {
    const date = new Date();
    const adapter = mount(<DatePicker value={date} />);
    expect(adapter.getValue()).toBe(date);
  });

  testAdapter('setValue', mount => {
    const onChange = jest.fn();
    const adapter = mount(<DatePicker value={null} onChange={onChange} />);

    const date = new Date();
    adapter.setValue(date);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].target.value).toBe(date);
    expect(onChange.mock.calls[0][1]).toBe(date);
  });

  testAdapter('getStringValue', mount => {
    const date = new Date(Date.UTC(2016, 8, 29));
    const adapter = mount(<DatePicker value={date} />);
    expect(adapter.getStringValue()).toBe('2016-09-29T00:00:00.000Z');
  });

  testAdapter('setStringValue', mount => {
    const onChange = jest.fn();
    const adapter = mount(<DatePicker value={null} onChange={onChange} />);

    adapter.setStringValue('2016-09-29T00:00:00.000Z');

    const time = new Date(Date.UTC(2016, 8, 29)).getTime();
    expect(onChange.mock.calls.length).toBe(1);
    // $FlowIssue
    expect(onChange.mock.calls[0][0].target.value.getTime()).toBe(time);
    // $FlowIssue
    expect(onChange.mock.calls[0][1].getTime()).toBe(time);
  });
});
