import React, { createRef, forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';

import { callChildRefs } from '../utils';

describe('callChildRefs', () => {
  it('correctly merges refs and calls them', () => {
    const ComponentWithImperativeMethods = forwardRef((_, ref) => {
      useImperativeHandle(ref, () => 'refValue');

      return null;
    });

    const funcRef = jest.fn();
    const objRef = createRef();
    const Example = ({ visible }: { visible: boolean }) => {
      if (visible) {
        const child = <ComponentWithImperativeMethods ref={funcRef} />;
        return React.cloneElement(child, {
          ref: (instance: React.ReactInstance) => {
            const originalRef = (child as React.RefAttributes<any>)?.ref;
            originalRef && callChildRefs([originalRef, objRef], instance);
          },
        });
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
