import {mount} from 'enzyme';
import React from 'react';

import RenderContainer from '../../RenderContainer';
import Tooltip from '../Tooltip.js';

jest.mock('../../RenderContainer/RenderContainer.js', () => {
  return function RenderContainerMock(props) {
    return <div>{props.children}</div>;
  };
});

describe('Tooltip', () => {
  const render = () => '';

  it('keeps child ref', () => {
    const refFn = jest.fn();
    const wrapper = mount(
      <Tooltip render={render}>
        <div ref={refFn} />
      </Tooltip>
    );

    expect(refFn.mock.calls.length).toBe(1);
    expect(refFn.mock.calls[0][0]).toBe(wrapper.find('div').node);
  });

  it('calls onFocus/onBlur when trigger=focus', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount(
      <Tooltip trigger="focus" render={render}>
        <input onFocus={onFocus} onBlur={onBlur} />
      </Tooltip>
    );
    const input = wrapper.find('input');

    input.simulate('focus');
    expect(wrapper.state('opened')).toBe(true);
    expect(onFocus.mock.calls.length).toBe(1);

    input.simulate('blur');
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('does not show tooltip in render func returned false', () => {
    const wrapper = mount(
      <div>
        <div id="foo">
          <Tooltip trigger="opened" render={render}>foo</Tooltip>
        </div>
        <div id="bar">
          <Tooltip trigger="opened" render={() => null}>bar</Tooltip>
        </div>
      </div>
    );

    expect(wrapper.find('#foo').find(RenderContainer).length).toBe(1);
    expect(wrapper.find('#bar').find(RenderContainer).length).toBe(0);
  });

  it('calls `onCloseClick` when click on the cross', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Tooltip trigger="opened" render={render} onCloseClick={onClose}>
        <div />
      </Tooltip>
    );

    wrapper.find('.cross').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });
});
