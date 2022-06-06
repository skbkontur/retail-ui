import React from 'react';
import { render } from '@testing-library/react';

import { getDisplayName } from '../getDisplayName';

describe('getDisplayName', () => {
  it('returns display name for functional component when displayName is set', () => {
    const displayName = 'FC';
    const FunctionalComponent = () => {
      return <div />;
    };
    render(<FunctionalComponent />);
    FunctionalComponent.displayName = displayName;

    expect(getDisplayName(FunctionalComponent)).toBe(displayName);
  });

  it('returns display name for class component when displayName is set from static initializer', () => {
    const displayName = 'CC';
    class ClassComponent extends React.Component {
      public static displayName = displayName;

      render() {
        return <div />;
      }
    }

    render(<ClassComponent />);

    expect(getDisplayName(ClassComponent)).toBe(displayName);
  });
});
