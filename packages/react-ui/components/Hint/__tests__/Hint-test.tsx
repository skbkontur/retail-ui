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

  it('handels onMouseEnter event', () => {
    const onMouseEnter = jest.fn();
    const hintChildrenText = 'Hello';
    render(
      <Hint text="world" onMouseEnter={onMouseEnter}>
        {hintChildrenText}
      </Hint>,
    );

    userEvent.hover(screen.getByText(hintChildrenText));

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseLeave event', () => {
    const onMouseLeave = jest.fn();
    const hintChildrenText = 'Hello';
    render(
      <Hint text="world" onMouseLeave={onMouseLeave}>
        {hintChildrenText}
      </Hint>,
    );
    userEvent.unhover(screen.getByText(hintChildrenText));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('clears timer after unmount', () => {
    jest.useFakeTimers();
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

    userEvent.hover(screen.getByText('Anchor'));

    // @ts-expect-error: Use of private property.
    const { timer } = hintRef.current;

    expect(timer).toBeDefined();

    unmount();

    expect(clearTimeout).toHaveBeenCalledWith(timer);
  });

  describe('test getPosAndPositions method', () => {
    it('flag, no allowedPositions, no pos', () => {
      const hint = new Hint({ text: '' });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toBeUndefined();
    });
    it('no flag, no allowedPositions, no pos', () => {
      const hint = new Hint({ text: '' });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top center', 'top left', 'top right']);
    });

    it('flag, no allowedPositions, pos', () => {
      const hint = new Hint({ text: '', pos: 'top' });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toBeUndefined();
    });
    it('no flag, no allowedPositions, pos', () => {
      const hint = new Hint({ text: '', pos: 'top' });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top center', 'top left', 'top right']);
    });

    it('flag, allowedPositions, no pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom right'] });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top', 'top right', 'bottom right']);
    });
    it('no flag, allowedPositions, no pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom right'] });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top center', 'top left', 'top right']);
    });

    it('flag, allowedPositions, first pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom right'], pos: 'top' });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top', 'top right', 'bottom right']);
    });
    it('no flag, allowedPositions, first pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom right'], pos: 'top' });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top center', 'top left', 'top right']);
    });

    it('flag, allowedPositions, equal pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['bottom right'], pos: 'bottom right' });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toEqual(['bottom right']);
    });
    it('no flag, allowedPositions, equal pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['bottom right'], pos: 'bottom right' });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['bottom right']);
    });

    it('flag, allowedPositions, not first pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom right'], pos: 'top right' });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top', 'top right', 'bottom right']);
    });
    it('no flag, allowedPositions, not first pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top right'], pos: 'top right' });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top right']);
    });

    it('flag, allowedPositions, need normalize pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom center'], pos: 'bottom' });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top', 'top right', 'bottom center']);
    });
    it('no flag, allowedPositions, need normalize pos', () => {
      const hint = new Hint({
        text: '',
        allowedPositions: ['top', 'top right', 'bottom left', 'bottom right'],
        pos: 'bottom',
      });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['bottom center', 'bottom left', 'bottom right']);
    });

    it('flag, allowedPositions, another pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom center'], pos: 'left middle' });
      hint.featureFlags = { popupUnifyPositioning: true };
      expect(() => hint.getPositions()).toThrow();
    });
    it('no flag, allowedPositions, another pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom center'], pos: 'left middle' });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['left middle']);
    });

    it('flag, need normalize allowedPositions, pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom center'], pos: 'top center' });
      hint.featureFlags = { popupUnifyPositioning: true };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top', 'top right', 'bottom center']);
    });
    it('no flag, need normalize allowedPositions, pos', () => {
      const hint = new Hint({ text: '', allowedPositions: ['top', 'top right', 'bottom center'], pos: 'top center' });
      hint.featureFlags = { popupUnifyPositioning: false };
      const positions = hint.getPositions();
      expect(positions).toEqual(['top center']);
    });
  });
});
