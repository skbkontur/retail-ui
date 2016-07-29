import {mount} from 'enzyme';
import React from 'react';

import ComboBoxRenderer from '../ComboBoxRenderer';

const source = text => Promise.resolve([]);

describe('ComboBoxRenderer', () => {
  function editAndBlur(wrapper, text = 'foo') {
    const valueElement = wrapper.find('[tabIndex]');
    if (valueElement.length) {
      valueElement.simulate('click');
    }
    wrapper.find('input').
      simulate('change', {target: {value: text}}).
      simulate('keydown', {key: 'Enter'});
  }

  it('does not close if not recovered', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBoxRenderer
        value={null}
        source={source}
        onChange={onChange}
      />
    );

    editAndBlur(wrapper);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe(null);

    const input = wrapper.find('Input');
    expect(input.prop('value')).toBe('foo');
    expect(input.prop('error')).toBe(true);
  });

  it('closes when value was recovered', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBoxRenderer
        value="bar"
        source={source}
        recover={x => ({value: x})}
        onChange={onChange}
      />
    );

    editAndBlur(wrapper);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');
    expect(wrapper.find('InputLikeText').length).toBe(1);
  });

  it('calls onError when value was not recovered', () => {
    const onError = jest.fn();
    const wrapper = mount(
      <ComboBoxRenderer
        value={null}
        source={source}
        recover={text => (text === 'bar' ? {value: 'bar'} : null)}
        onError={onError}
      />
    );

    editAndBlur(wrapper);

    expect(onError.mock.calls.length).toBe(1);
    expect(onError.mock.calls[0][0]).toBe('not_recovered');

    editAndBlur(wrapper, 'bar');

    expect(onError.mock.calls.length).toBe(2);
    expect(onError.mock.calls[1][0]).toBe(null);
  });

  it('resets on escape press', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBoxRenderer value="" source={source} onChange={onChange} />
    );

    wrapper.find('[tabIndex]').simulate('click');
    wrapper.find('input').
      simulate('change', {target: {value: '123'}}).
      simulate('keydown', {key: 'Escape'});

    expect(onChange.mock.calls.length).toBe(0);
    expect(wrapper.find('InputLikeText').length).toBe(1);
  });

  it('selects item by keyboard', async () => {
    const items = ['foo', 'bar'];
    const promise = Promise.resolve({values: items});
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBoxRenderer value="" source={() => promise} onChange={onChange} />
    );

    wrapper.find('[tabIndex]').simulate('click');
    await promise;
    wrapper.find('input').
      simulate('keydown', {key: 'ArrowDown'}).
      simulate('keydown', {key: 'Enter'});

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');
  });
});
