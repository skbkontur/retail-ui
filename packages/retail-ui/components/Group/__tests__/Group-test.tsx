import { mount, render } from 'enzyme';
import * as React from 'react';
import Group from '../';
import Input from '../../Input';
import Button from '../../Button';

describe('Group', () => {
  it('It renders', () => {
    const wrapper = mount(
      <Group>
        <Input />
        <Button>Test</Button>
      </Group>
    );

    expect(wrapper.exists());
  });

  it('main element in group gets "stretch" class', () => {
    const wrapper = render(
      <Group>
        <Input
          // @ts-ignore
          mainInGroup
          id="test-input"
        />
        <Button>Test</Button>
      </Group>
    );

    const wrappingElements = wrapper.find('.wrap');

    expect(wrappingElements.eq(0).prop('class')).toContain('stretch');
    expect(wrappingElements.eq(1).prop('class')).toContain('fixed');
  });

  it('group does not render wrong child', () => {
    const wrapper = render(<Group>{undefined}</Group>);

    const wrappingElements = wrapper.find('.wrap');

    expect(wrappingElements.length).toBe(0);
  });

  it('first item gets "itemFirst" class', () => {
    const wrapper = render(
      <Group>
        <div id="test-div-1" />
        <div id="test-div-2" />
        <div id="test-div-3" />
      </Group>
    );

    expect(
      wrapper
        .find('#test-div-1')
        .parent()
        .prop('class')
    ).toContain('itemFirst');
    expect(
      wrapper
        .find('#test-div-2')
        .parent()
        .prop('class')
    ).not.toContain('itemFirst');
    expect(
      wrapper
        .find('#test-div-3')
        .parent()
        .prop('class')
    ).not.toContain('itemFirst');
  });

  it('width is applied to the root from props', () => {
    const wrapper = render(
      <Group width="100px">
        <div />
      </Group>
    );

    expect(
      wrapper
        .find('.wrap')
        .parent()
        .prop('style').width
    ).toBe('100px');
  });
});
