import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import ComboBoxOld from '../index';

jest.mock('../../RenderContainer', () => props => <div {...props} />);

describe('ComboBox', () => {
  it('autoFocus', () => {
    const wrapper = mount(<ComboBoxOld autoFocus source={() => null} />);
    const focusable = ReactDOM.findDOMNode(wrapper.instance());

    expect(
      focusable.contains(focusable.ownerDocument.activeElement)
    ).toBeTruthy();
  });

  it('handles focus', () => {
    const wrapper = mount(<ComboBoxOld source={() => null} />);
    wrapper.instance().focus();

    const focusable = ReactDOM.findDOMNode(wrapper.instance());

    expect(
      focusable.contains(focusable.ownerDocument.activeElement)
    ).toBeTruthy();
  });

  it('uses static info', () => {
    const render = jest.fn();
    mount(
      <ComboBoxOld
        value="foo"
        info="bar"
        source={jest.fn()}
        renderValue={render}
      />
    );

    expect(render.mock.calls[0][1]).toBe('bar');
  });

  it('uses promise info', async () => {
    const info = jest.fn(val => Promise.resolve(val.toUpperCase()));
    const render = jest.fn();
    const wrapper = mount(
      <ComboBoxOld
        value="foo"
        info={info}
        source={jest.fn()}
        renderValue={render}
      />
    );

    // Initial render.
    expect(info.mock.calls[0]).toEqual(['foo']);
    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0]).toEqual(['foo', null]);

    // Info promise resolved.
    await info.mock.instances[0];
    expect(render.mock.calls[1]).toEqual(['foo', 'FOO']);

    // Rerender with new value.
    wrapper.setProps({ value: 'bar' });
    expect(render.mock.calls[2]).toEqual(['bar', null]);

    // New value promise resolved.
    await info.mock.instances[1];
    expect(render.mock.calls[3]).toEqual(['bar', 'BAR']);

    // Rerender with the same value.
    wrapper.setProps({ value: 'bar' });
    expect(info.mock.calls.length).toBe(2);
    expect(render.mock.calls[4]).toEqual(['bar', 'BAR']);
  });
});
