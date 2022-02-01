import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

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

  it('has `children` when inside of wrapper', () => {
    const children = 'children';
    const hintBody = 'hint body';

    const { getByText } = render(
      <Hint pos="left" useWrapper text={hintBody}>
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

  it('shows and hides hint on hover', async () => {
    const children = 'children';
    const hintBody = 'hint body';

    const Component = () => {
      return (
        <Hint pos="left" text={hintBody}>
          {children}
        </Hint>
      );
    };
    const { getByText, queryByText } = render(<Component />);

    const hint = getByText(children);

    // When we hover over hint container, hint body should appear.
    await waitFor(() => userEvent.hover(hint));
    await waitFor(() => getByText(hintBody));

    // When we hover away from hint container, hint body should disappear.
    await waitFor(() => userEvent.unhover(hint));
    await waitFor(() => expect(queryByText(hintBody)).not.toBeInTheDocument());
  });

  it('shows and hides hint on hover when animations are disabled', async () => {
    const children = 'children';
    const hintBody = 'hint body';

    const Component = () => {
      return (
        <Hint pos="left" disableAnimations text={hintBody}>
          {children}
        </Hint>
      );
    };
    const { getByText, queryByText } = render(<Component />);

    const hint = getByText(children);

    // When we hover over hint container, hint body should appear.
    await waitFor(() => userEvent.hover(hint));
    await waitFor(() => getByText(hintBody));

    // When we hover away from hint container, hint body should disappear.
    await waitFor(() => userEvent.unhover(hint));
    await waitFor(() => expect(queryByText(hintBody)).not.toBeInTheDocument());
  });

  it('shows and hides `manual` hint on button click', () => {
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

  it('shows and hides `manual` hint on button click when animations are disabled', () => {
    const children = 'children';
    const hintBody = 'hint body';

    const Component = () => {
      const [isOpened, setIsOpened] = useState(false);

      return (
        <>
          <Hint pos="left" disableAnimations manual opened={isOpened} text={hintBody}>
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
