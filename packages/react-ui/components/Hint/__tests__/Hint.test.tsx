import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor, screen } from '@testing-library/react';

import { Hint } from '../Hint';

describe('Hint', () => {
  it('should have `children`', () => {
    const children = 'children';

    render(
      <Hint pos="left" text={'hintBody'}>
        {children}
      </Hint>,
    );

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should have `children` when inside of the wrapper', () => {
    const children = 'children';

    render(
      <Hint pos="left" useWrapper text={'hint body'}>
        {children}
      </Hint>,
    );

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should have `hint` content', () => {
    const hintBody = 'hint body';

    render(
      <Hint pos="left" manual opened text={hintBody}>
        children
      </Hint>,
    );

    expect(screen.getByText(hintBody)).toBeInTheDocument();
  });

  it('should show and hide hint on hover', async () => {
    const children = 'children';
    const hintBody = 'hint body';

    const Component = () => {
      return (
        <Hint pos="left" text={hintBody}>
          {children}
        </Hint>
      );
    };
    render(<Component />);

    const hint = screen.getByText(children);

    // When we hover over hint container, hint body should appear.
    userEvent.hover(hint);
    await screen.findByText(hintBody);

    // When we hover away from hint container, hint body should disappear.
    userEvent.unhover(hint);
    await waitFor(() => expect(screen.queryByText(hintBody)).not.toBeInTheDocument());
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
    render(<Component />);

    const hint = screen.getByText(children);

    // When we hover over hint container, hint body should appear.
    userEvent.hover(hint);
    await screen.findByText(hintBody);

    // When we hover away from hint container, hint body should disappear.
    userEvent.unhover(hint);
    await waitFor(() => expect(screen.queryByText(hintBody)).not.toBeInTheDocument());
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
    render(<Component />);
    const button = screen.getByRole('button');

    // By default we should only see `children`.
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.queryByText(hintBody)).not.toBeInTheDocument();

    // After we click on the button we should see both `children` and `hint` content.
    userEvent.click(button);
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.getByText(hintBody)).toBeInTheDocument();

    // After we click on the button the second time we should see only `children`.
    userEvent.click(button);
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.queryByText(hintBody)).not.toBeInTheDocument();
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
    render(<Component />);
    const button = screen.getByRole('button');

    // By default we should only see `children`.
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.queryByText(hintBody)).not.toBeInTheDocument();

    // After we click on the button we should see both `children` and `hint` content.
    userEvent.click(button);
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.getByText(hintBody)).toBeInTheDocument();

    // After we click on the button the second time we should see only `children`.
    userEvent.click(button);
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.queryByText(hintBody)).not.toBeInTheDocument();
  });
});
