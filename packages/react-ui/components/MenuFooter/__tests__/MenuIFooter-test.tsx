import { render } from '@testing-library/react';
import React from 'react';

import { MenuFooter } from '../MenuFooter.js';

describe('MenuFooter', () => {
  it('has id attribute', () => {
    const menuFooterId = 'menuFooterId';
    const result = render(<MenuFooter id={menuFooterId}>Footer</MenuFooter>);
    expect(result.container.querySelector(`#${menuFooterId}`)).not.toBeNull();
  });
});
