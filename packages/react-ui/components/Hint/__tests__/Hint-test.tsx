import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Hint } from '../Hint';

describe('Hint', () => {
  it('should render without crash', () => {
    const hintChildrenText = 'Hello';
    render(<Hint text="world">{hintChildrenText}</Hint>);

    const hintChildren = screen.getByText(hintChildrenText);
    expect(hintChildren).toBeInTheDocument();
  });

  it('should not open be controlled manually without `manual` prop passed', () => {
    const hintText = 'world';
    render(
      <Hint opened text={hintText}>
        Hello
      </Hint>,
    );

    const hintContent = screen.queryByText(hintText);
    expect(hintContent).not.toBeInTheDocument();
  });

  it('should open hint manually', () => {
    const hintText = 'world';
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Hint opened={isOpen} manual text="world">
            Hello
          </Hint>
          <button onClick={() => setIsOpen(true)}>open manually</button>
        </>
      );
    };

    render(<Component />);

    const hintContent = screen.queryByText(hintText);
    expect(hintContent).not.toBeInTheDocument();

    const openButton = screen.getByRole('button');
    userEvent.click(openButton);

    const hintContentUpdated = screen.getByText(hintText);
    expect(hintContentUpdated).toBeInTheDocument();
  });
});
