import React, { createRef, forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';

import { mergeRefs } from '../mergeRefs';

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
        return <ComponentWithImperativeMethods ref={mergeRefs(funcRef, objRef)} />;
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
    expect(objRef.current).toBeNull();
  });

  it('save old refs to cache', () => {
    interface CompProps {
      refFn: (element: HTMLDivElement) => void;
      triggerRerender: boolean;
    }
    const funcRef = jest.fn();
    const Comp = ({ refFn, triggerRerender }: CompProps) => {
      return <div ref={mergeRefs(refFn)} style={{width: +triggerRerender }} />;
    };

    const { rerender } = render(<Comp refFn={funcRef} triggerRerender />);
    expect(funcRef).toHaveBeenCalledTimes(1);

    rerender(<Comp refFn={funcRef} triggerRerender={false} />);
    expect(funcRef).toHaveBeenCalledTimes(1);
  });

  it('change ref and call new', () => {
    interface CompProps {
      refFn: (element: HTMLDivElement) => void;
    }
    const funcRef1 = jest.fn();
    const funcRef2 = jest.fn();
    const Comp = ({ refFn }: CompProps) => {
      return <div ref={mergeRefs(refFn)} />;
    };

    const { rerender } = render(<Comp refFn={funcRef1} />);

    rerender(<Comp refFn={funcRef2} />);

    expect(funcRef1.mock.calls).toHaveLength(2);
    expect(funcRef1.mock.calls[0][0]).toBeTruthy(); //attach
    expect(funcRef1.mock.calls[1][0]).toBeNull(); //detach

    expect(funcRef2.mock.calls).toHaveLength(1); //attach new
    expect(funcRef2.mock.calls[0][0]).toBeTruthy();
  });
});
