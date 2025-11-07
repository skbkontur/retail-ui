import React, { createRef, forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';

import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  it('correctly merges refs', () => {
    const ComponentWithImperativeMethods = forwardRef((_, ref) => {
      useImperativeHandle(ref, () => 'refValue');

      return null;
    });

    const funcRef = vi.fn();
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
    }
    const funcRef = vi.fn();
    const Comp = ({ refFn }: CompProps) => {
      return <div ref={mergeRefs(refFn)} />;
    };

    const { rerender } = render(<Comp refFn={funcRef} />);
    expect(funcRef).toHaveBeenCalledTimes(1);

    rerender(<Comp refFn={funcRef} />);
    expect(funcRef).toHaveBeenCalledTimes(1);
  });

  it('change ref and call new', () => {
    interface CompProps {
      refFn: (element: HTMLDivElement) => void;
    }
    const funcRef1 = vi.fn();
    const funcRef2 = vi.fn();
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

  describe('return callbacks comparation', () => {
    const funcRef1 = vi.fn();
    const funcRef2 = vi.fn();
    const funcRef3 = vi.fn();
    it('set same refs return same callbacks', () => {
      const firstCall = mergeRefs(funcRef1, funcRef2, funcRef3);
      const secondCall = mergeRefs(funcRef1, funcRef2, funcRef3);
      expect(firstCall === secondCall).toBeTruthy();

      const thirdCall = mergeRefs(funcRef1, funcRef2, funcRef3);
      expect(secondCall === thirdCall).toBeTruthy();
      expect(firstCall === thirdCall).toBeTruthy();
    });

    it('change order return different callbacks', () => {
      const firstCall = mergeRefs(funcRef1, funcRef2, funcRef3);
      const secondCall = mergeRefs(funcRef2, funcRef3, funcRef2);
      expect(firstCall !== secondCall).toBeTruthy();

      const thirdCall = mergeRefs(funcRef1, funcRef2, funcRef3);
      expect(secondCall !== thirdCall).toBeTruthy();
      expect(firstCall === thirdCall).toBeTruthy();
    });

    it('change params count return different callbacks', () => {
      const firstCall = mergeRefs(funcRef1, funcRef2, funcRef3);
      const secondCall = mergeRefs(funcRef2, funcRef3);
      expect(firstCall !== secondCall).toBeTruthy();

      const thirdCall = mergeRefs(funcRef1);
      expect(secondCall !== thirdCall).toBeTruthy();
      expect(firstCall !== thirdCall).toBeTruthy();
    });

    it('change params return different callbacks', () => {
      const firstCall = mergeRefs(funcRef1, funcRef2);
      const secondCall = mergeRefs(funcRef1, funcRef3);
      expect(firstCall !== secondCall).toBeTruthy();

      const thirdCall = mergeRefs(funcRef1, funcRef3);
      expect(secondCall === thirdCall).toBeTruthy();
    });

    it('params can be null/undefined and will be ignored', () => {
      const firstCall = mergeRefs(funcRef1, null, funcRef2);
      const secondCall = mergeRefs(funcRef1, funcRef2, undefined);
      expect(firstCall === secondCall).toBeTruthy();

      const thirdCall = mergeRefs(funcRef1, funcRef2);
      expect(secondCall === thirdCall).toBeTruthy();
    });
  });
});
