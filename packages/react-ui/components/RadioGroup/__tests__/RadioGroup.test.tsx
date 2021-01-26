import React from 'react';
import { mount } from 'enzyme';

import { RadioGroup, RadioGroupProps } from '../RadioGroup';
import { Radio } from '../../Radio';

const render = (
  props: Partial<RadioGroupProps<any>> & {
    children?: React.ReactElement<any>;
  },
) => mount<RadioGroup<any>>(<RadioGroup {...props} />);

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
}

describe('<RadioGroup />', () => {
  it('renders radios inside for items prop', () => {
    const items = ['one', 'two', 'three'];
    const wrapper = render({ items });
    expect(wrapper.find(Radio)).toHaveLength(3);
  });

  it('renders radios with correct labels', () => {
    const items = ['one', 'two', 'three'];
    const radios = render({ items }).find(Radio);
    items.forEach((item, index) => {
      expect(radios.at(index).text()).toBe(item);
    });
  });

  it('renders radios with correct values', () => {
    const items = ['one', 'two', 'three'];
    const radios = render({ items }).find(Radio);
    items.forEach((item, index) => {
      expect(radios.at(index).prop('value')).toBe(item);
    });
  });

  it('renders radios with renderItem prop', () => {
    const items = ['one', 'two', 'three'];
    const renderItem = (x: string) => x.toUpperCase();
    const radios = render({ items, renderItem }).find(Radio);
    items.forEach((item, index) => {
      expect(radios.at(index).text()).toBe(renderItem(item));
    });
  });

  it('checks radio on click', () => {
    const items = ['one', 'two', 'three'];
    const root = render({ items });
    root
      .find(Radio)
      .at(0)
      .find('input')
      .simulate('change');

    expect(
      root
        .find(Radio)
        .at(0)
        .find('input')
        .prop('checked'),
    ).toBeTruthy();
  });

  it('calls onValueChange on radio click', () => {
    const items = ['one', 'two', 'three'];
    const onValueChange = jest.fn();
    render({ items, onValueChange })
      .find(Radio)
      .at(0)
      .find('input')
      .simulate('change');
    expect(onValueChange).toHaveBeenCalled();
    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('one');
  });

  it('disables all radios on disabled prop', () => {
    const items = ['one', 'two', 'three'];
    const wrapper = render({ items, disabled: true });
    const radios = wrapper.find(Radio);
    radios.forEach(x => {
      expect(x.find('input').prop('disabled')).toBeTruthy();
    });
  });

  it('passes given name to all radios on name prop', () => {
    const items = ['one', 'two', 'three'];
    const wrapper = render({ items, name: 'SupaGroup' });
    const radios = wrapper.find(Radio);
    radios.forEach(x => {
      expect(x.find('input').prop('name')).toBe('SupaGroup');
    });
  });

  it('activates radio with defaultValue', () => {
    const items = ['one', 'two', 'three'];
    const wrapper = render({ items, defaultValue: 'two' });
    const radios = wrapper.find(Radio);
    expect(
      radios
        .at(1)
        .find('input')
        .prop('checked'),
    ).toBeTruthy();
  });

  it('passes onMouse* events to radiogroup wrapper', () => {
    const props = {
      onMouseOver: () => undefined,
      onMouseEnter: () => undefined,
      onMouseLeave: () => undefined,
    };
    const wrapper = render({ items: [], ...props }).first();
    Object.keys(props).forEach(prop => {
      expect(wrapper.prop(prop)).toBe(props[prop as keyof typeof props]);
    });
  });

  it('renders children', () => {
    const wrapper = render({ children: <span className="myDupaComponent" /> });
    expect(wrapper.find('.myDupaComponent')).toHaveLength(1);
  });

  it('checks children radio on click', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const root = render({ children });
    root
      .find(Radio)
      .at(0)
      .find('input')
      .simulate('change');

    expect(
      root
        .find(Radio)
        .at(0)
        .find('input')
        .prop('checked'),
    ).toBeTruthy();
  });

  it('calls onValueChange on children radio click', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const onValueChange = jest.fn();
    render({ children, onValueChange })
      .find(Radio)
      .at(0)
      .find('input')
      .simulate('change');
    expect(onValueChange).toHaveBeenCalled();
    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('one');
  });

  it('disables all children radios on disabled prop', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const wrapper = render({ children, disabled: true });
    const radios = wrapper.find(Radio);
    radios.forEach(x => {
      expect(x.find('input').prop('disabled')).toBeTruthy();
    });
  });

  it('passes given name to all children radios on name prop', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const wrapper = render({ children, name: 'SupaGroup' });
    const radios = wrapper.find(Radio);
    radios.forEach(x => {
      expect(x.find('input').prop('name')).toBe('SupaGroup');
    });
  });

  it('activates children radio with defaultValue', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const wrapper = render({ children, defaultValue: 'two' });
    const radios = wrapper.find(Radio);
    expect(
      radios
        .at(1)
        .find('input')
        .prop('checked'),
    ).toBeTruthy();
  });

  it('has focus method', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const wrapper = render({ children, defaultValue: 'two' });
    const instance = wrapper.instance();
    expect(instance.focus).toBeInstanceOf(Function);
  });

  it('does not fail on focus', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const wrapper = render({ children, defaultValue: 'two' });
    const instance = wrapper.instance();
    instance.focus();
  });

  it('has Prevent static prop', () => {
    expect(RadioGroup.Prevent).toBeDefined();
  });

  it('works with number values', () => {
    const items = [1, 2, 3, 4];
    const root = render({ items });
    root
      .find(Radio)
      .at(0)
      .find('input')
      .simulate('change');

    expect(
      root
        .find(Radio)
        .at(0)
        .find('input')
        .prop('checked'),
    ).toBeTruthy();
  });

  it('calls onBlur after radio click', () => {
    const items = ['one', 'two', 'three'];
    const onBlur = jest.fn();
    const wrapper = mount<RadioGroup<any>>(<RadioGroup items={items} onBlur={onBlur} />);
    wrapper
      .find(Radio)
      .at(0)
      .simulate('focus')
      .simulate('blur')
      .simulate('blur');

    clickOutside();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur after radio click', () => {
    const onBlur = jest.fn();
    const onRadioBlur = jest.fn();
    const wrapper = mount<RadioGroup<any>>(
      <RadioGroup onBlur={onBlur}>
        <Radio value="one" onBlur={onRadioBlur} />
        <Radio value="two" onBlur={onRadioBlur} />
      </RadioGroup>,
    );
    const radioOne = wrapper
      .find(Radio)
      .at(0)
      .find('input')
      .at(0);
    const radioTwo = wrapper
      .find(Radio)
      .at(1)
      .find('input')
      .at(0);

    radioOne.simulate('focus');
    radioOne.simulate('blur');
    radioTwo.simulate('blur');

    clickOutside();

    expect(onRadioBlur).toHaveBeenCalledTimes(2);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('applies width from prop', () => {
    const width = '99px';
    const wrapper = mount(<RadioGroup items={[]} width={width} />);

    expect(getComputedStyle(wrapper.getDOMNode()).width).toBe(width);
  });
});
