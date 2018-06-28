// This import has to go before react import.
import * as Lookup from './Lookup';

import { mount } from 'enzyme';
import * as React from 'react';

class Wrap extends React.Component<*> {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(React.Children.only(children), props);
  }
}

let nextID = 0;

// eslint-disable-next-line
/* type MountFunc = (element: React.Element<*>) => any; */

export function testAdapter(
  testName /* string */,
  fn /* (mount: MountFunc) => void | Promise<void> */
) {
  it(testName, () => {
    let mounted = [];
    function mount_(element) {
      const tid = 'tid_' + ++nextID;
      const wrapper = mount(
        <Wrap>
          {React.cloneElement(element, {
            'data-tid-auto': tid
          })}
        </Wrap>
      );
      const adapter = Lookup.getAdapter(Lookup.findOne(tid));
      adapter.setProps = wrapper.setProps.bind(wrapper);
      adapter.wrapper = wrapper;
      mounted.push(wrapper);
      return adapter;
    }
    function cleanup() {
      for (const wrapper of mounted) {
        wrapper.unmount();
      }
    }

    let result = null;
    try {
      result = fn(mount_);
    } finally {
      if (result && typeof result.then === 'function') {
        result.then(cleanup, cleanup);
      } else {
        cleanup();
      }
    }
    return result;
  });
}
