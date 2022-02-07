import { mount } from 'enzyme';
import React from 'react';
import { Hint } from '@skbkontur/react-ui/components/Hint';

describe('Call child ref', () => {
  it('should call callback ref', () => {
    const refItem = jest.fn();
    const wrapper = mount<Hint>(
      <Hint text={'test'}>
        <span ref={refItem} />
      </Hint>,
    );

    expect(wrapper).toHaveLength(1);

    expect(refItem.mock.calls.length).toBe(1);
  });

  it('should call object ref', () => {
    const refItem = React.createRef<HTMLSpanElement>();
    const wrapper = mount<Hint>(
      <Hint text={'test'}>
        <span ref={refItem} />
      </Hint>,
    );

    expect(wrapper).toHaveLength(1);

    expect(refItem.current instanceof HTMLSpanElement).toBe(true);
  });
});
