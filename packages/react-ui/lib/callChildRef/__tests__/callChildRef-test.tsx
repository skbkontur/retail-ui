import React from 'react';
import { render } from '@testing-library/react';

import { Hint } from '../../../components/Hint';

describe('Setting ref to child', () => {
  it('should call callback  ref', () => {
    const refItem = vi.fn();
    render(
      <Hint text={'test'}>
        <span ref={refItem} />
      </Hint>,
    );

    expect(refItem.mock.calls).toHaveLength(1);
  });

  it('should call object ref', () => {
    const refItem = React.createRef<HTMLSpanElement>();
    render(
      <Hint text={'test'}>
        <span ref={refItem} />
      </Hint>,
    );

    expect(refItem.current instanceof HTMLSpanElement).toBe(true);
  });
});
