import { describe, it, expect } from 'vitest';
import React, { memo, forwardRef } from 'react';

import { isMemo, isForwardRef, isElement } from '../react-is.js';

describe('isMemo', () => {
  it('returns true for a React.memo element', () => {
    const PlainComponent = () => <div />;
    const MemoComponent = memo(PlainComponent);
    expect(isMemo(<MemoComponent />)).toBe(true);
  });

  it('returns false for a regular function component', () => {
    const RegularComponent = () => <div />;
    expect(isMemo(<RegularComponent />)).toBe(false);
  });

  it('returns false for a forwardRef element', () => {
    const Forwarded = forwardRef<HTMLDivElement>((props, ref) => <div {...props} ref={ref} />);
    expect(isMemo(<Forwarded />)).toBe(false);
  });

  it('returns false for a React element (not a component type)', () => {
    const element = <div />;
    expect(isMemo(element)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isMemo(null)).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isMemo(42)).toBe(false);
    expect(isMemo('string')).toBe(false);
    expect(isMemo(true)).toBe(false);
  });

  it('returns false for an object without $$typeof', () => {
    expect(isMemo({})).toBe(false);
    expect(isMemo({ type: 'div' })).toBe(false);
  });
});

describe('isForwardRef', () => {
  it('returns true for a forwardRef element', () => {
    const Forwarded = forwardRef<HTMLDivElement>((props, ref) => <div {...props} ref={ref} />);
    expect(isForwardRef(<Forwarded />)).toBe(true);
  });

  it('returns false for a regular function component', () => {
    const RegularComponent = () => <div />;
    expect(isForwardRef(<RegularComponent />)).toBe(false);
  });

  it('returns false for a memo component', () => {
    const MemoComponent = memo(() => <div />);
    expect(isForwardRef(<MemoComponent />)).toBe(false);
  });

  it('returns false for a React element', () => {
    const PlainElement = <div />;
    expect(isForwardRef(PlainElement)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isForwardRef(null)).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isForwardRef(42)).toBe(false);
    expect(isForwardRef('string')).toBe(false);
    expect(isForwardRef(true)).toBe(false);
  });
});

describe('isElement', () => {
  it('returns true for a JSX element', () => {
    const PlainElement = <div />;
    expect(isElement(PlainElement)).toBe(true);
  });

  it('returns true for an element created with React.createElement', () => {
    const CreatedElement = React.createElement('div');
    expect(isElement(CreatedElement)).toBe(true);
  });

  it('returns true for a Fragment', () => {
    const FragmentElement = <React.Fragment>hello</React.Fragment>;
    expect(isElement(FragmentElement)).toBe(true);
  });

  it('returns false for a component function (not an element)', () => {
    const Component = () => <div />;
    expect(isElement(Component)).toBe(false);
  });

  it('returns false for a memo component (not an element)', () => {
    const MemoComponent = memo(() => <div />);
    expect(isElement(MemoComponent)).toBe(false);
  });

  it('returns false for a forwardRef component (not an element)', () => {
    const Forwarded = forwardRef<HTMLDivElement>((props, ref) => <div {...props} ref={ref} />);
    expect(isElement(Forwarded)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isElement(null)).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isElement(42)).toBe(false);
    expect(isElement('string')).toBe(false);
    expect(isElement(true)).toBe(false);
  });

  it('returns false for an object without $$typeof', () => {
    expect(isElement({})).toBe(false);
    expect(isElement({ type: 'div' })).toBe(false);
  });

  it('returns false for an object with $$typeof but wrong type', () => {
    const fakeElement = { $$typeof: Symbol('not.the.right.one') };
    expect(isElement(fakeElement)).toBe(false);
  });
});
