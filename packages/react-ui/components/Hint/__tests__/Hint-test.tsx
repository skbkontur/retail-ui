import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Hint } from '../Hint';

describe('Hint', () => {
  it('has children', () => {
    const { getByText } = render(
      <Hint pos="left" disableAnimations useWrapper={false} text="world">
        Hello
      </Hint>,
    );

    getByText('Hello');
  });

  it('has hint content', () => {
    const { getByText } = render(
      <Hint pos="left" manual opened disableAnimations useWrapper={false} text="world">
        Hello
      </Hint>,
    );

    const hint = getByText('Hello');
    userEvent.hover(hint);

    getByText('world');
  });
});
