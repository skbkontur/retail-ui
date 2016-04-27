import '../index';

import {mount} from 'enzyme';
import React from 'react';

import RenderContainer from '../../components/RenderContainer';

describe('ReactTesting', () => {
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
  });
});
