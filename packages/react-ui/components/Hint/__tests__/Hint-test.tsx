import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { forwardRef, useState } from 'react';

import { CalendarDay } from '../../Calendar/index.js';
import { Hint } from '../Hint.js';

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

  it('handles onMouseEnter event', async () => {
    const onMouseEnter = vi.fn();
    const hintChildrenText = 'Hello';
    render(
      <Hint text="world" onMouseEnter={onMouseEnter}>
        {hintChildrenText}
      </Hint>,
    );

    await userEvent.hover(screen.getByText(hintChildrenText));

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handles onMouseLeave event', async () => {
    const onMouseLeave = vi.fn();
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
    vi.spyOn(window, 'setTimeout');
    vi.spyOn(window, 'clearTimeout');

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

  it('should work with calendarDay', async () => {
    const onMouseEnter = vi.fn();
    render(
      <Hint text="Hint" onMouseEnter={onMouseEnter}>
        <CalendarDay date="01.01.2021" onDayClick={vi.fn()} />
      </Hint>,
    );

    await userEvent.hover(screen.getByRole('button'));
    expect(await screen.findByText('Hint')).toBeInTheDocument();
  });

  it('should work with memoized component', async () => {
    const MemoizedComponent = React.memo(
      forwardRef((props, ref: React.Ref<HTMLButtonElement>) => (
        <button {...props} ref={ref}>
          Button
        </button>
      )),
    );
    const onMouseEnter = vi.fn();
    render(
      <Hint text="Hint" onMouseEnter={onMouseEnter}>
        <MemoizedComponent />
      </Hint>,
    );

    await userEvent.hover(screen.getByRole('button'));
    expect(await screen.findByText('Hint')).toBeInTheDocument();
  });
});
