import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Button, ButtonType } from '../Button';

describe('Button', () => {
  it('Has correct label', () => {
    render(<Button>Foo</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Foo');
  });

  (['submit', 'button', 'reset'] as ButtonType[]).forEach((type) => {
    it(`sets type ${type} when type=${type} specified`, () => {
      render(<Button type={type} />);
      expect(screen.getByRole('button')).toHaveProperty('type', type);
    });
  });

  it('Handels click event', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} />);
    userEvent.click(screen.getByRole('button'));

    expect(onClick.mock.calls).toHaveLength(1);
  });

  it('Handels onBlur event', () => {
    const onBlur = jest.fn();
    render(<Button onBlur={onBlur} />);

    userEvent.click(screen.getByRole('button'));
    screen.getByRole('button').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('Handels onFocus event', () => {
    const onFocus = jest.fn();
    render(<Button onFocus={onFocus} />);

    userEvent.click(screen.getByRole('button'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Handels onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(<Button onKeyDown={onKeyDown} />);

    userEvent.type(screen.getByRole('button'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('Handels onMouseEnter event', () => {
    const onMouseEnter = jest.fn();
    render(<Button onMouseEnter={onMouseEnter} />);

    userEvent.type(screen.getByRole('button'), '{mouseenter}');

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('Handels onMouseOver event', () => {
    const onMouseOver = jest.fn();
    render(<Button onMouseOver={onMouseOver} />);

    userEvent.type(screen.getByRole('button'), '{mouseover}');
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('Handels onMouseLeave event', () => {
    const onMouseLeave = jest.fn();
    render(<Button onMouseLeave={onMouseLeave} />);

    fireEvent.mouseLeave(screen.getByRole('button'));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('Autofocus', () => {
    render(<Button autoFocus />);
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('Unable to focus disabled element', () => {
    render(<Button disabled />);
    userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  test('Unable to focus loading element', () => {
    render(<Button loading />);
    userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });
});

// title	string | undefined
// className	string | undefined
// data-tid	string | undefined
