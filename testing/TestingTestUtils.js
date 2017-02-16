// @flow

import { mount } from 'enzyme';
import React from 'react';

class Wrap extends React.Component {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(React.Children.only(children), props);
  }
}

type ReturnType = {
  node: HTMLElement,
  unmount: () => void,
  setProps: (props: {[_: string]: any}) => void,
};

export function mountTest(
  reactElement: React.Element<any>
): ReturnType {
  const wrapper = mount(<Wrap>{reactElement}</Wrap>);

  return {
    node: ReactTesting.findDOMNodes('a', wrapper.node)[0],
    unmount: wrapper.unmount.bind(wrapper),
    setProps: wrapper.setProps.bind(wrapper)
  };
}
