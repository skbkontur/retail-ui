import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Hint } from '../Hint';
import { delay } from '../../../lib/utils';

describe('Hint', () => {
  it('should render without crash', () => {
    const hintChildrenText = 'Hello';
    render(<Hint text="world">{hintChildrenText}</Hint>);

    const hintChildren = screen.getByText(hintChildrenText);
    expect(hintChildren).toBeInTheDocument();
  });

  it('should render with empty hint content', () => {
    expect(() => render(<Hint text={null}>Test</Hint>)).not.toThrow();
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

  it('should open hint manually', async () => {
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
    await userEvent.click(openButton);

    const hintContentUpdated = screen.getByText(hintText);
    expect(hintContentUpdated).toBeInTheDocument();
  });

  it('handels onMouseEnter event', async () => {
    const onMouseEnter = jest.fn();
    const hintChildrenText = 'Hello';
    render(
      <Hint text="world" onMouseEnter={onMouseEnter}>
        {hintChildrenText}
      </Hint>,
    );

    await userEvent.hover(screen.getByText(hintChildrenText));

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseLeave event', async () => {
    const onMouseLeave = jest.fn();
    const hintChildrenText = 'Hello';
    render(
      <Hint text="world" onMouseLeave={onMouseLeave}>
        {hintChildrenText}
      </Hint>,
    );
    await userEvent.unhover(screen.getByText(hintChildrenText));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('clears timer after unmount', async () => {
    jest.spyOn(window, 'setTimeout');
    jest.spyOn(window, 'clearTimeout');

    const hintRef = React.createRef<Hint>();

    const { unmount } = render(
      <Hint text="Hello" ref={hintRef}>
        Anchor
      </Hint>,
    );

    // @ts-expect-error: Use of private property.
    expect(hintRef.current.timer).toBeUndefined();

    await userEvent.hover(screen.getByText('Anchor'));

    // @ts-expect-error: Use of private property.
    const { timer } = hintRef.current;

    expect(timer).toBeDefined();

    unmount();

    expect(clearTimeout).toHaveBeenCalledWith(timer);
  });

  it('passes data-tid', async () => {
    const hintChildrenText = 'Базовая';
    render(
      <Hint text="Подсказка" data-tid="my-test-id">
        {hintChildrenText}
      </Hint>,
    );

    await userEvent.hover(screen.getByText(hintChildrenText));
    await delay(500);
    expect(screen.getByTestId('my-test-id')).toBeInTheDocument();
  });
});
