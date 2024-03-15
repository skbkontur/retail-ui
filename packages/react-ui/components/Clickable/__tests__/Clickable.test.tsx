import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Clickable, ClickableDataTids } from '../Clickable';

describe('ClickableButton', () => {
  it('should provide access to ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Clickable ref={ref}>button</Clickable>);

    expect(ref.current).toBeDefined();
  });

  it('should have root data-tid', () => {
    render(<Clickable>test</Clickable>);

    expect(screen.getByTestId(ClickableDataTids.root)).toBeInTheDocument();
  });

  it('should change default root data-tid', () => {
    const dataTid = 'test';
    render(<Clickable data-tid={dataTid}>test</Clickable>);

    expect(screen.getAllByTestId(dataTid)[0]).toBeInTheDocument();
  });

  it('should be able to pass custom event', () => {
    const onMouseDown = jest.fn();
    render(<Clickable onMouseDown={onMouseDown}>test</Clickable>);

    userEvent.click(screen.getByRole('button'));

    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });

  it('handles onBlur event', () => {
    const onBlur = jest.fn();
    render(<Clickable onBlur={onBlur} />);

    userEvent.click(screen.getByRole('button'));
    screen.getByRole('button').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handles onFocus event', () => {
    const onFocus = jest.fn();
    render(<Clickable onFocus={onFocus} />);

    userEvent.click(screen.getByRole('button'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handles onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(<Clickable onKeyDown={onKeyDown} />);

    userEvent.type(screen.getByRole('button'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('handles onMouseEnter event', () => {
    const onMouseEnter = jest.fn();
    render(<Clickable onMouseEnter={onMouseEnter} />);

    userEvent.type(screen.getByRole('button'), '{mouseenter}');

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handles onMouseOver event', () => {
    const onMouseOver = jest.fn();
    render(<Clickable onMouseOver={onMouseOver} />);

    userEvent.type(screen.getByRole('button'), '{mouseover}');
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('handles onMouseLeave event', () => {
    const onMouseLeave = jest.fn();
    render(<Clickable onMouseLeave={onMouseLeave} />);

    fireEvent.mouseLeave(screen.getByRole('button'));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('event `onClickCapture` works correctly', () => {
    const onClickCapture = jest.fn();
    render(<Clickable onClickCapture={onClickCapture} />);

    expect(onClickCapture).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('button'));

    expect(onClickCapture).toHaveBeenCalledTimes(1);
  });

  it('events `onMouseDown` and `onMouseUp` work correctly', () => {
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    render(<Clickable onMouseDown={onMouseDown} onMouseUp={onMouseUp} />);

    expect(onMouseDown).not.toHaveBeenCalled();
    expect(onMouseUp).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('button'));

    expect(onMouseDown).toHaveBeenCalledTimes(1);
    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });

  describe('a11y', () => {
    it('should be able to focus active element', () => {
      render(<Clickable />);
      userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('should be able to focus disabled element', () => {
      render(<Clickable isDisabled />);
      userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('should be able to focus loading element', () => {
      render(<Clickable isLoading />);
      userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('should be able to pass custom `role` attribute', () => {
      render(
        <Clickable as="div" role="link">
          test
        </Clickable>,
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('sets correct value for `aria-describedby` attribute', () => {
      render(
        <div>
          <Clickable aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'elementId');
      expect(button).toHaveAccessibleDescription('Description');
    });

    it('sets correct value for `aria-haspopup` attribute', () => {
      render(<Clickable aria-haspopup />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'true');
    });

    it('sets correct value for `aria-expanded` attribute', () => {
      render(<Clickable aria-expanded />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets correct value for `aria-controls` attribute', () => {
      const controlsId = 'controls';
      render(<Clickable aria-controls={controlsId} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-controls', controlsId);
    });

    it('sets correct value for `aria-label` attribute', () => {
      const label = 'label';
      render(<Clickable aria-label={label} />);

      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('can switch value of `aria-checked` attribute', () => {
      const Component = () => {
        const [isChecked, setIsChecked] = React.useState(false);
        return <Clickable role="switch" onClick={() => setIsChecked(true)} aria-checked={isChecked} />;
      };

      render(<Component />);

      const button = screen.getByRole('switch');
      expect(button).not.toBeChecked();
      userEvent.click(button);
      expect(button).toBeChecked();
    });

    it('should be able to pass custom `tabIndex` attribute', () => {
      render(<Clickable tabIndex={-1}>test</Clickable>);

      userEvent.tab();

      expect(screen.getByRole('button')).not.toHaveFocus();
    });

    it('should be able to pass custom `aria-disabled` attribute', () => {
      render(<Clickable aria-disabled="true">test</Clickable>);

      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should add `aria-disabled` attribute when disabled is passed', () => {
      render(<Clickable isDisabled>test</Clickable>);

      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
