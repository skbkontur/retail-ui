// @flow

import { mount } from 'enzyme';
import type { ReactWrapper } from 'enzyme';
import * as React from 'react';

class Wrap extends React.Component<*> {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(React.Children.only(children), props);
  }
}

type ReturnType = {
  node: HTMLElement,
  unmount: () => ReactWrapper,
  // eslint-disable-next-line
  setProps: (props: Object) => ReactWrapper
};

export function mountTest(reactElement: React.Element<*>): ReturnType {
  const wrapper = mount(<Wrap>{reactElement}</Wrap>);

  return {
    // $FlowIssue needs better enzyme typings
    node: ReactTesting.findDOMNodes('a', wrapper.node)[0],
    unmount: wrapper.unmount.bind(wrapper),
    setProps: wrapper.setProps.bind(wrapper)
  };
}
