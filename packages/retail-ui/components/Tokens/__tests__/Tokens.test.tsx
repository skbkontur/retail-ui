import * as React from 'react';
import { mount } from 'enzyme';
import { Tokens } from '../Tokens';

async function getItems(query: string) {
  return ['aaa', 'bbb', 'ccc'].filter(s => s.includes(query));
}

describe('<Tokens />', () => {
  it('should contains placeholder', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tokens
        getItems={getItems}
        selectedItems={[]}
        onChange={onChange}
        placeholder={'Placeholder'}
      />
    );
    expect(wrapper.find('input').props().placeholder).toBe('Placeholder');
  });

  it('should call onChange', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tokens getItems={getItems} selectedItems={[]} onChange={onChange} />
    );
    expect(wrapper.find('aaa')).toHaveLength(0);
    wrapper.simulate('click');
    expect(wrapper.find('aaa')).toHaveLength(1);
  });
});
