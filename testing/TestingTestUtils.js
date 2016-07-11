// @flow

import {mount} from 'enzyme';
import React from 'react';

export function mountTest(
  reactElement: React.Element<mixed>
): {node: HTMLElement} {
  const wrapper = mount(<div>{reactElement}</div>);

  return {
    node: ReactTesting.findDOMNodes('a', wrapper.node)[0],
    unmount: wrapper.unmount.bind(wrapper),
  };
}
