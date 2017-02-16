import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import ComboBox from '../ComboBox.js';

describe('ComboBox', () => {
  it('autoFocus', () => {
    const wrapper = mount(<ComboBox autoFocus source={() => null} />);
    const focusable = ReactDOM.findDOMNode(wrapper.get(0).renderer._focusable);

    expect(focusable.ownerDocument.activeElement).toBe(focusable);
  });

  it('handles focus', () => {
    const wrapper = mount(<ComboBox source={() => null} />);
    wrapper.instance().focus();

    const focusable = ReactDOM.findDOMNode(wrapper.get(0).renderer._focusable);
    expect(focusable.ownerDocument.activeElement).toBe(focusable);
  });

  /* No longer supporting this */
  it.skip('fetches items when opened by entering a char', async () => {
    const source = jest.fn(() => Promise.resolve({ values: [] }));
    const wrapper = mount(<ComboBox source={source} />);

    expect(source.mock.calls.length).toBe(0);
    wrapper.find('[tabIndex]').simulate('keypress', {
      charCode: 'a'.charCodeAt(0)
    });

    expect(source.mock.calls.length).toBe(1);
    expect(source.mock.calls[0][0]).toBe('a');
  });

  it('uses static info', () => {
    const render = jest.fn();
    mount(
      <ComboBox
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
      <ComboBox
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
