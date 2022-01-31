import React, { useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Hint } from '../Hint';

describe('Hint', () => {
  it('has `children`', () => {
    const children = 'children';
    const hintBody = 'hint body';

    const { getByText } = render(
      <Hint pos="left" text={hintBody}>
        {children}
      </Hint>,
    );

    getByText(children);
  });

  it('has `hint` content', () => {
    const children = 'children';
    const hintBody = 'hint body';

    const { getByText } = render(
      <Hint pos="left" manual opened text={hintBody}>
        {children}
      </Hint>,
    );

    getByText(hintBody);
  });

  it('opens and closes `manual` hint on button click', () => {
    const children = 'children';
    const hintBody = 'hint body';

    const Component = () => {
      const [isOpened, setIsOpened] = useState(false);

      return (
        <>
          <Hint pos="left" manual opened={isOpened} text={hintBody}>
            {children}
          </Hint>
          <button onClick={() => setIsOpened(!isOpened)}>toggle hint</button>
        </>
      );
    };
    const { getByText, queryByText, getByRole } = render(<Component />);
    const button = getByRole('button');

    // By default we should only see `children`.
    getByText(children);
    expect(queryByText(hintBody)).not.toBeInTheDocument();

    // After we click on the button we should see both `children` and `hint` content.
    userEvent.click(button);
    getByText(children);
    getByText(hintBody);

    // After we click on the button the second time we should see only `children`.
    userEvent.click(button);
    getByText(children);
    expect(queryByText(hintBody)).not.toBeInTheDocument();
  });
});
