import React from 'react';
import { describe, expect, it } from 'vitest';

import { isRefableElement } from '../utils.js';

describe('isRefableElement', () => {
  it('returns true for intrinsic elements', () => {
    const element = React.createElement('div');
    expect(isRefableElement(element)).toBe(true);
  });

  it('returns true for class components', () => {
    class ClassComponent extends React.Component {
      render() {
        return null;
      }
    }

    const element = React.createElement(ClassComponent);
    expect(isRefableElement(element)).toBe(true);
  });

  it('returns true for forwardRef components', () => {
    const ForwardRefComponent = React.forwardRef<HTMLDivElement>(() => null);
    const element = React.createElement(ForwardRefComponent);
    expect(isRefableElement(element)).toBe(true);
  });

  it('returns true for memo components', () => {
    const MemoComponent = React.memo(() => null);
    const element = React.createElement(MemoComponent);
    expect(isRefableElement(element)).toBe(true);
  });

  it('returns false for regular function components', () => {
    const FunctionComponent = () => null;
    const element = React.createElement(FunctionComponent);
    expect(isRefableElement(element)).toBe(false);
  });
});
