import { render } from '@testing-library/react';
import React from 'react';

import { MenuHeader } from '../MenuHeader';

describe('MenuHeader', () => {
  it('has id attribute', () => {
    const menuHeaderId = 'menuHeaderId';
    const result = render(<MenuHeader id={menuHeaderId}>Header</MenuHeader>);
    expect(result.container.querySelector(`#${menuHeaderId}`)).not.toBeNull();
  });
});
