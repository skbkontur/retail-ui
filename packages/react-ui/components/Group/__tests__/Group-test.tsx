import { mount, render } from 'enzyme';
import React from 'react';

import { Group } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { jsStyles } from '../Group.styles';

describe('Group', () => {
  it('It renders', () => {
    const wrapper = mount(
      <Group>
        <Input />
        <Button>Test</Button>
      </Group>,
    );

    expect(wrapper.exists());
  });

  it('main element in group gets "stretch" class', () => {
    const wrapper = render(
      <Group>
        <Input width="100%" id="test-input" />
        <Button>Test</Button>
      </Group>,
    );

    const wrappingElements = wrapper.find(`.${jsStyles.root()} > *`);

    expect(wrappingElements.eq(0).prop('class')).toContain(jsStyles.stretch());
    expect(wrappingElements.eq(1).prop('class')).toContain(jsStyles.fixed());
  });

  it('group does not render wrong child', () => {
    const wrapper = render(<Group>{undefined}</Group>);

    const wrappingElements = wrapper.find(`.${jsStyles.root()} *`);

    expect(wrappingElements.length).toBe(0);
  });

  it('first item gets "itemFirst" class', () => {
    const wrapper = render(
      <Group>
        <div id="test-div-1" />
        <div id="test-div-2" />
        <div id="test-div-3" />
      </Group>,
    );

    expect(
      wrapper
        .find('#test-div-1')
        .parent()
        .prop('class'),
    ).toContain(jsStyles.itemFirst());
    expect(
      wrapper
        .find('#test-div-2')
        .parent()
        .prop('class'),
    ).not.toContain(jsStyles.itemFirst());
    expect(
      wrapper
        .find('#test-div-3')
        .parent()
        .prop('class'),
    ).not.toContain(jsStyles.itemFirst());
  });

  it('width is applied to the root from props', () => {
    const wrapper = render(
      <Group width="100px">
        <div />
      </Group>,
    );

    expect(
      wrapper
        .find(`.${jsStyles.root()} > *`)
        .parent()
        .prop('style').width,
    ).toBe('100px');
  });

  it('applies width from prop', () => {
    const width = '99px';
    const wrapper = mount(<Group width={width} />);

    expect(getComputedStyle(wrapper.getDOMNode()).width).toBe(width);
  });
});
