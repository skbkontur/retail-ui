import * as React from 'react';
import { mount } from 'enzyme';
import TokenInput from '../TokenInput';

async function getItems(query: string) {
  return ['aaa', 'bbb', 'ccc'].filter(s => s.includes(query));
}

describe('<TokenInput />', () => {
  it('should contains placeholder', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TokenInput
        getItems={getItems}
        selectedItems={[]}
        onChange={onChange}
        placeholder="Placeholder"
      />
    );
    expect(wrapper.find('input').props().placeholder).toBe('Placeholder');
  });
});
