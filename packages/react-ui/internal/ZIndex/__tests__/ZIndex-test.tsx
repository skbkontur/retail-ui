import React from 'react';
import { mount } from 'enzyme';

import { ZIndex } from '../ZIndex';

describe('ZIndex', () => {
  it("shouldn't call unmoun/mount child component while switch `active` prop", () => {
    const unmountFn = jest.fn();
    class Content extends React.Component {
      public componentWillUnmount() {
        unmountFn();
      }
      public render() {
        return <div />;
      }
    }
    const wrapper = mount(
      <ZIndex>
        <Content />
      </ZIndex>,
    );

    wrapper.setProps({ applyZIndex: false });

    expect(unmountFn).not.toHaveBeenCalled();
  });
});
