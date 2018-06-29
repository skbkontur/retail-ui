// @ts-check
import { mount } from 'enzyme';
import * as React from 'react';

/**
 * @typedef {import('enzyme').ReactWrapper} ReactWrapper
 */

/**
 * @typedef {object} ReturnType
 * @property {HTMLElement} node
 * @property {() => ReactWrapper} unmount
 * @property {(props: Object) => ReactWrapper} setProps
 */

class Wrap extends React.Component {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(React.Children.only(children), props);
  }
}

/**
 * @param {React.ReactElement} reactElement
 * @returns {ReturnType}
 */
export function mountTest(reactElement) {
  const wrapper = mount(<Wrap>{reactElement}</Wrap>);

  return {
    // @ts-ignore needs better enzyme typings
    node: ReactTesting.findDOMNodes('a', wrapper.node)[0],
    unmount: wrapper.unmount.bind(wrapper),
    setProps: wrapper.setProps.bind(wrapper)
  };
}
