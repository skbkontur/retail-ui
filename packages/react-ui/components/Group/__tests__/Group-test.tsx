import { mount, render } from 'enzyme';
import React from 'react';

import { Group } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { styles } from '../Group.styles';

describe('Group', () => {
  it('renders', () => {
    const wrapper = mount(
      <Group>
        <Input />
        <Button>Test</Button>
      </Group>,
    );

    expect(wrapper.exists()).toBe(true);
  });

  it('main element in group gets "stretch" class', () => {
    const wrapper = render(
      <Group>
        <Input width="100%" id="test-input" />
        <Button>Test</Button>
      </Group>,
    );

    const wrappingElements = wrapper.find(`.${styles.root()} > *`);

    expect(wrappingElements.eq(0).prop('class')).toContain(styles.stretch());
    expect(wrappingElements.eq(1).prop('class')).toContain(styles.fixed());
  });

  it('group does not render wrong child', () => {
    const wrapper = render(<Group>{undefined}</Group>);

    const wrappingElements = wrapper.find(`.${styles.root()} *`);

    expect(wrappingElements).toHaveLength(0);
  });

  it('width is applied to the root from props', () => {
    const wrapper = render(
      <Group width="100px">
        <div />
      </Group>,
    );

    expect(wrapper.find(`.${styles.root()} > *`).parent().prop('style').width).toBe('100px');
  });
});
