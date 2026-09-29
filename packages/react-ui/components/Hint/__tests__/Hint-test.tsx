import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { forwardRef, useState } from 'react';

import { RenderEnvironmentProvider } from '../../../lib/renderEnvironment/index.js';
import { CalendarDay } from '../../Calendar/index.js';
import { Hint } from '../Hint.js';
import { HINT_DEFAULT_DELAY_BEFORE_SHOW, HINT_SKIP_DELAY_DURATION, resetForTests } from '../HintDelayController.js';

describe('Hint', () => {
  describe('hover series', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      resetForTests(window);
    });

    afterEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
      resetForTests(window);
    });

    it('opens the next hint instantly after the previous one was shown', () => {
      render(
        <>
          <Hint text="Hint A">Anchor A</Hint>
          <Hint text="Hint B">Anchor B</Hint>
        </>,
      );

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint A')).toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByText('Anchor A'));
      fireEvent.mouseEnter(screen.getByText('Anchor B'));

      expect(screen.getByText('Hint B')).toBeInTheDocument();
    });

    it('keeps hover series isolated between render environments', () => {
      const firstIframe = document.body.appendChild(document.createElement('iframe'));
      const secondIframe = document.body.appendChild(document.createElement('iframe'));
      const firstRoot = firstIframe.contentDocument?.body;
      const secondRoot = secondIframe.contentDocument?.body;

      if (!firstRoot || !secondRoot) {
        throw new Error('Iframe document is not available');
      }

      const firstRender = render(
        <RenderEnvironmentProvider rootNode={firstRoot}>
          <Hint text="Hint A" delayBeforeShow={0}>
            Anchor A
          </Hint>
        </RenderEnvironmentProvider>,
        { container: firstRoot },
      );
      const secondRender = render(
        <RenderEnvironmentProvider rootNode={secondRoot}>
          <Hint text="Hint B">Anchor B</Hint>
        </RenderEnvironmentProvider>,
        { container: secondRoot },
      );

      fireEvent.mouseEnter(firstRender.getByText('Anchor A'));
      expect(firstRender.getByText('Hint A')).toBeInTheDocument();

      fireEvent.mouseEnter(secondRender.getByText('Anchor B'));
      expect(secondRender.queryByText('Hint B')).not.toBeInTheDocument();

      firstRender.unmount();
      secondRender.unmount();
      firstIframe.remove();
      secondIframe.remove();
    });

    it('does not open before default delay on first hover', () => {
      render(<Hint text="Hint A">Anchor A</Hint>);

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW - 1);
      });

      expect(screen.queryByText('Hint A')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(screen.getByText('Hint A')).toBeInTheDocument();
    });

    it('respects custom delayBeforeShow', () => {
      const customDelay = 800;
      render(
        <Hint text="Hint A" delayBeforeShow={customDelay}>
          Anchor A
        </Hint>,
      );

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(customDelay - 1);
      });
      expect(screen.queryByText('Hint A')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByText('Hint A')).toBeInTheDocument();
    });

    it('does not warm up series if mouse leaves before opening', () => {
      render(
        <>
          <Hint text="Hint A">Anchor A</Hint>
          <Hint text="Hint B">Anchor B</Hint>
        </>,
      );

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW - 1);
      });
      fireEvent.mouseLeave(screen.getByText('Anchor A'));

      expect(screen.queryByText('Hint A')).not.toBeInTheDocument();

      fireEvent.mouseEnter(screen.getByText('Anchor B'));
      expect(screen.queryByText('Hint B')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint B')).toBeInTheDocument();
    });

    it('applies full delay again after skip-delay window expires', () => {
      render(
        <>
          <Hint text="Hint A">Anchor A</Hint>
          <Hint text="Hint B">Anchor B</Hint>
        </>,
      );

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint A')).toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(HINT_SKIP_DELAY_DURATION);
      });

      fireEvent.mouseEnter(screen.getByText('Anchor B'));
      expect(screen.queryByText('Hint B')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint B')).toBeInTheDocument();
    });

    it('opens subsequent hint instantly even with a larger delayBeforeShow', () => {
      render(
        <>
          <Hint text="Hint A">Anchor A</Hint>
          <Hint text="Hint B" delayBeforeShow={2000}>
            Anchor B
          </Hint>
        </>,
      );

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint A')).toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByText('Anchor A'));
      fireEvent.mouseEnter(screen.getByText('Anchor B'));

      expect(screen.getByText('Hint B')).toBeInTheDocument();
    });

    it('does not warm up series from manual mode', () => {
      render(
        <>
          <Hint text="Hint A" manual opened>
            Anchor A
          </Hint>
          <Hint text="Hint B">Anchor B</Hint>
        </>,
      );

      expect(screen.getByText('Hint A')).toBeInTheDocument();

      fireEvent.mouseEnter(screen.getByText('Anchor B'));
      expect(screen.queryByText('Hint B')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint B')).toBeInTheDocument();
    });

    it('clears pending open timer on unmount without warming the series', () => {
      const { unmount } = render(
        <>
          <Hint text="Hint A">Anchor A</Hint>
          <Hint text="Hint B">Anchor B</Hint>
        </>,
      );

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      expect(screen.queryByText('Hint A')).not.toBeInTheDocument();

      unmount();

      render(<Hint text="Hint B">Anchor B</Hint>);
      fireEvent.mouseEnter(screen.getByText('Anchor B'));
      expect(screen.queryByText('Hint B')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint B')).toBeInTheDocument();
    });

    it('does not keep skip-delay window after unmount of an opened hint', () => {
      const { unmount } = render(
        <>
          <Hint text="Hint A">Anchor A</Hint>
          <Hint text="Hint B">Anchor B</Hint>
        </>,
      );

      fireEvent.mouseEnter(screen.getByText('Anchor A'));
      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint A')).toBeInTheDocument();

      unmount();

      render(<Hint text="Hint B">Anchor B</Hint>);
      fireEvent.mouseEnter(screen.getByText('Anchor B'));
      expect(screen.queryByText('Hint B')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(HINT_DEFAULT_DELAY_BEFORE_SHOW);
      });
      expect(screen.getByText('Hint B')).toBeInTheDocument();
    });
  });

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
