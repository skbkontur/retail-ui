// @flow

import {mount} from 'enzyme';
import React from 'react';

export function mountTest(reactElement: React.Element): {node: HTMLElement} {
  const wrapper = mount(<div>{reactElement}</div>);

  return {
    node: ReactTesting.findDOMNodes('a', wrapper.node)[0],
  };
}
