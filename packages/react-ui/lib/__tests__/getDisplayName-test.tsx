import React from 'react';
import { render } from '@testing-library/react';

import { getDisplayName } from '../getDisplayName';

const renderFC = () => render(<div />) as any;
class ClassComponent extends React.Component {
  public static displayName = 'CC';

  render() {
    return <div />;
  }
}

describe('getDisplayName', () => {
  it('returns display name for functional component when displayName is set', () => {
    const FC = renderFC();
    FC.displayName = 'FC';

    expect(getDisplayName(FC)).toBe('FC');
  });

  it('returns display name for class component when displayName is set from static initializer', () => {
    expect(getDisplayName(ClassComponent)).toBe('CC');
  });
});
