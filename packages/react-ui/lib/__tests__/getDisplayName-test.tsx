import React from 'react';

import { getDisplayName } from '../getDisplayName';

const FunctionalComponent = () => <div />;
class ClassComponentDisplay extends React.Component {
  public static displayName = 'CC';

  render() {
    return <div />;
  }
}

class ClassComponent extends React.Component {
  render() {
    return <div />;
  }
}

describe('getDisplayName', () => {
  it('returns display name for functional component when displayName is set', () => {
    expect(getDisplayName(FunctionalComponent)).toBe('FunctionalComponent');
  });

  it('returns display name for class component when displayName is set from static initializer', () => {
    expect(getDisplayName(ClassComponentDisplay)).toBe('CC');
  });

  it('returns display name for class component', () => {
    expect(getDisplayName(ClassComponent)).toBe('ClassComponent');
  });
});
