/* eslint-disable react/display-name */
import React, { createRef, forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';

import { memoizedMergeRefs } from '../utils';

describe('mergeRefs', () => {
  it('correctly merges refs', () => {
    const ComponentWithImperativeMethods = forwardRef((_, ref) => {
      useImperativeHandle(ref, () => 'refValue');

      return null;
    });

    const funcRef = jest.fn();
    const objRef = createRef();
    const Example = ({ visible }: { visible: boolean }) => {
      if (visible) {
        return <ComponentWithImperativeMethods ref={memoizedMergeRefs(funcRef, objRef)} />;
      }

      return null;
    };

    const { rerender } = render(<Example visible />);

    expect(funcRef).toHaveBeenCalledTimes(1);
    expect(funcRef).toHaveBeenCalledWith('refValue');
    expect(objRef.current).toBe('refValue');

    rerender(<Example visible={false} />);

    expect(funcRef).toHaveBeenCalledTimes(2);
    expect(funcRef).toHaveBeenCalledWith(null);
    expect(objRef.current).toBe(null);
  });
});
