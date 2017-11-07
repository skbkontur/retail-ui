import '../index';

import { mount } from 'enzyme';
import React from 'react';
import { mountTest } from '../TestingTestUtils';

import RenderContainer from '../../components/RenderContainer';

// Not supporting React 16
xdescribe('ReactTesting', () => {
  it('follows through RenderContainer', () => {
    const wrapper = mount(
      <div>
        <div tid="a">
          <RenderContainer>
            <div tid="b">b</div>
          </RenderContainer>
        </div>
      </div>
    );

    const foundNodes = ReactTesting.findDOMNodes('a b', wrapper.node);
    expect(foundNodes.length).toBe(1);
    expect(foundNodes[0].innerHTML).toBe('b');

    wrapper.unmount();
  });

  it('works for <div ref tid> case.', () => {
    const ref = jest.fn();
    const { node, unmount } = mountTest(<div ref={ref} tid="a" />);

    expect(node).toBeTruthy();
    expect(node).toBe(ref.mock.calls[0][0]);

    unmount();
  });

  it('works for <div tid ref> case.', () => {
    const ref = jest.fn();
    const { node, unmount } = mountTest(<div tid="a" ref={ref} />);

    expect(node).toBeTruthy();
    expect(node).toBe(ref.mock.calls[0][0]);

    unmount();
  });
});
