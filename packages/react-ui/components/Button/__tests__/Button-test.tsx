import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import { Button, ButtonType } from '../Button';

describe('Button', () => {
  it('has correct label', () => {
    render(<Button>Foo</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Foo');
  });

  (['submit', 'button', 'reset'] as ButtonType[]).forEach((type) => {
    it(`sets type ${type} when type=${type} specified`, () => {
      render(<Button type={type} />);
      expect(screen.getByRole('button')).toHaveProperty('type', type);
    });
  });

  it('handels click event', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} />);
    userEvent.click(screen.getByRole('button'));

    expect(onClick.mock.calls).toHaveLength(1);
  });

  it('handels onBlur event', () => {
    const onBlur = jest.fn();
    render(<Button onBlur={onBlur} />);

    userEvent.click(screen.getByRole('button'));
    screen.getByRole('button').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handels onFocus event', () => {
    const onFocus = jest.fn();
    render(<Button onFocus={onFocus} />);

    userEvent.click(screen.getByRole('button'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(<Button onKeyDown={onKeyDown} />);

    userEvent.type(screen.getByRole('button'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseEnter event', () => {
    const onMouseEnter = jest.fn();
    render(<Button onMouseEnter={onMouseEnter} />);

    userEvent.type(screen.getByRole('button'), '{mouseenter}');

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseOver event', () => {
    const onMouseOver = jest.fn();
    render(<Button onMouseOver={onMouseOver} />);

    userEvent.type(screen.getByRole('button'), '{mouseover}');
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseLeave event', () => {
    const onMouseLeave = jest.fn();
    render(<Button onMouseLeave={onMouseLeave} />);

    fireEvent.mouseLeave(screen.getByRole('button'));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('autofocus', () => {
    render(<Button autoFocus />);
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('unable to focus disabled element', () => {
    render(<Button disabled />);
    userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('unable to focus loading element', () => {
    render(<Button loading />);
    userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('has focus() method', () => {
    const btnRef = React.createRef<Button>();
    render(<Button ref={btnRef} />);
    screen.getByRole('button').focus();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('has blur() method', () => {
    const btnRef = React.createRef<Button>();
    render(<Button ref={btnRef} />);
    screen.getByRole('button').focus();
    expect(screen.getByRole('button')).toHaveFocus();
    btnRef.current?.blur();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('props aria-describedby applied correctly', () => {
    render(
      <div>
        <Button aria-describedby="elementId" />
        <p id="elementId">Description</p>
      </div>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'elementId');
    expect(button).toHaveAccessibleDescription('Description');
  });

  it('passes `aria-haspopup` attribute', () => {
    render(<Button aria-haspopup />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'true');
  });

  it('passes `aria-expanded` attribute', () => {
    render(<Button aria-expanded />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('passes correct value into `aria-controls` attribute', () => {
    const controlsId = 'controls';
    render(<Button aria-controls={controlsId} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', controlsId);
  });

  it('passes correct value to `aria-label` attribute', () => {
    const label = 'label';
    render(<Button aria-label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('passes correct value to `role` attribute', () => {
    const role = 'link';
    render(<Button role={role} />);

    expect(screen.getByRole(role)).toBeInTheDocument();
  });

  it('switches `aria-checked` from `false` to `true`', () => {
    const Component = () => {
      const [isChecked, setIsChecked] = useState(false);
      return <Button role="switch" onClick={() => setIsChecked(true)} aria-checked={isChecked} />;
    };

    render(<Component />);

    const button = screen.getByRole('switch');
    expect(button).not.toBeChecked();
    userEvent.click(button);
    expect(button).toBeChecked();
  });
});
